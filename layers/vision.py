"""
layers/vision.py — Layer 1: Repo Vision

Fetches all repository data from GitHub, then uses Cerebras (llama3.1-8b)
to analyze the content and produce a structured RepoDNA model.
"""

import json

from models.schemas import RepoDNA
from utils.github import fetch_all_repo_data, fetch_release_installers, parse_github_url, GitHubAuthError, GitHubNotFoundError
from utils.cerebras import call_vision
from utils.knowledge_base import get_prerequisite, get_os_specific_data


VISION_SYSTEM_PROMPT = (
    "You are an expert developer tool that analyzes GitHub repositories. "
    "Always respond with valid JSON only. No markdown, no explanations, no extra text."
)

VISION_PROMPT_TEMPLATE = """
You are an expert developer tool that analyzes GitHub repositories.
You have been given the following data about a repository. Analyze it
and return a structured JSON response.

=== REPOSITORY METADATA ===
{meta_json}

=== README ===
{readme}

=== FILE TREE ===
{file_tree}

=== PACKAGE / DEPENDENCY FILES ===
{package_files}

=== ENVIRONMENT FILES ===
{env_files}

=== DOCKER FILES ===
{docker_files}

=== INSTALL / SETUP SCRIPTS ===
{script_files}

Based on the above information, produce a JSON object with this EXACT structure:
{{
  "repo_overview": {{
    "name": "<repo name>",
    "description": "<short description or 'No description provided'>",
    "language": "<primary programming language>",
    "stars": <star count as integer>,
    "topics": ["<topic1>", "<topic2>"],
    "plain_explanation": "<2-3 sentence explanation of what this project does, written for a beginner>"
  }},
  "tech_stack": [
    {{
      "name": "<technology name>",
      "role": "<what role it plays, e.g. 'web framework', 'database', 'testing'>",
      "explanation": "<1 sentence beginner-friendly explanation of this technology>"
    }}
  ],
  "prerequisites": [
    {{
      "name": "<prerequisite name, e.g. Node.js, Python>",
      "version": "<recommended version>",
      "why": "<why this is needed>",
      "download_url": "<official download URL or empty string>",
      "status": "required"
    }}
  ],
  "raw_dependencies": {{
    "<package_name>": "<version_constraint>"
  }},
  "file_tree_summary": "<2-3 sentence summary of the project structure>",
  "readme_summary": "<3-4 sentence summary of the README content>",
  "readme_setup_commands": [
    "<Extract the EXACT commands from the README's Quick Start, Installation, or Getting Started section, IN ORDER. Include only actual terminal/shell commands the user should run. If the README shows 'npm install -g foo' then 'foo', list exactly those two commands. If there is no clear setup section, return an empty list.>"
  ],
  "installation_method": "<installation method>",
  "exact_run_commands": ["<command1>", "<command2>"],
  "exact_install_commands": ["<command1>", "<command2>"],
  "entry_point_file": "<filename or null>",
  "repo_type": "<repo_type>",
  "requires_env_setup": <true or false>,
  "required_env_variables": [
    {{"key": "<key>", "description": "<description>", "required": <true or false>, "where_to_get": "<source>"}}
  ],
  "has_docker": <true or false>,
  "has_install_script": <true or false>,
  "has_makefile": <true or false>,
  "makefile_run_commands": ["<command1>"]
}}

Rules:
- Detect ALL technologies from the file tree and dependency files.
- Extract prerequisites that a beginner would need to install first.
- raw_dependencies should map package name → version from the dependency files.
- CRITICAL: For readme_setup_commands, extract the EXACT commands from the README as-is. Do NOT invent commands. If the README says "npm install -g mypackage" followed by "mypackage", list exactly ["npm install -g mypackage", "mypackage"]. Preserve the original commands word-for-word.

For exact_run_commands and exact_install_commands:
ONLY include commands you can see verbatim in the README. 
If you cannot find them — return empty list.
NEVER invent commands.

For entry_point_file detection:

Scan the file tree for files matching 
these patterns IN THIS PRIORITY ORDER:

PYTHON PROJECTS — look for:
Priority 1: Any file matching gradio_*.py
Priority 2: Any file matching *_app.py
Priority 3: app.py
Priority 4: main.py
Priority 5: run.py
Priority 6: serve.py
Priority 7: demo.py
Priority 8: server.py
Priority 9: start.py
Priority 10: Any .py file in root that 
             is not __init__.py or setup.py
             or test_*.py or *_test.py

NODE PROJECTS — look for:
Priority 1: index.js or index.ts in root
Priority 2: server.js or server.ts
Priority 3: app.js or app.ts
Priority 4: main.js or main.ts
Priority 5: src/index.js or src/index.ts

ALSO check the README for any line containing:
'python ' followed by a filename ending in .py
'node ' followed by a filename ending in .js
Extract that filename as the entry_point_file.

Set entry_point_file to the FIRST match found.
The file MUST exist in the provided file tree.
Never set entry_point_file to a file not in tree.

If no match found: set to null.

For installation_method:
Check in this priority order:
1. Has docker-compose file → docker
2. Has install.sh/setup.sh → install_script
3. Has Makefile with run target → makefile
4. Has package.json/requirements.txt → package_manager
5. Nothing above → git_clone

For required_env_variables:
Read .env.example line by line.
Extract every KEY=value line.
Read the comment above each key for description.
If no .env.example exists — empty list.

- If a field is unknown, use a sensible default (empty string, empty list, 0).
- Return ONLY valid JSON. No markdown, no explanations.
"""


async def run_vision(github_url: str, os: str = "Windows") -> tuple[RepoDNA, str]:
    """
    Layer 1 — Repo Vision.

    1. Parse the GitHub URL into owner/repo.
    2. Fetch all repository data from GitHub REST API.
    3. Send everything to Cerebras (llama3.1-8b) for structured analysis.
    4. Return (RepoDNA, raw_readme_text).

    Raises:
        ValueError: If the GitHub URL is invalid.
        GitHubAuthError: If the GitHub token is bad.
        GitHubNotFoundError: If the repository doesn't exist.
        Exception: If Cerebras call fails.
    """
    try:
        owner, repo = parse_github_url(github_url)
    except ValueError:
        raise

    # Fetch repo data — let auth/not-found errors propagate with clear messages
    try:
        repo_data = await fetch_all_repo_data(owner, repo)
    except GitHubAuthError:
        raise  # Let main.py handle this with a proper HTTP response
    except GitHubNotFoundError:
        raise  # Let main.py handle this with 404
    except Exception as exc:
        raise Exception(f"[vision] Failed to fetch repository data: {exc}") from exc

    # Build the prompt
    readme_text = repo_data.get("readme") or ""
    file_tree_str = repo_data.get("tree_str") or ""
    
    env_files = repo_data.get("env_files", {})
    env_files_text = "\n".join(f"--- {name} ---\n{content}" for name, content in env_files.items())
    
    docker_files = repo_data.get("docker_files", {})
    docker_files_text = "\n".join(f"--- {name} ---\n{content}" for name, content in docker_files.items())
    
    script_files = repo_data.get("script_files", {})
    script_files_text = "\n".join(f"--- {name} ---\n{content}" for name, content in script_files.items())

    package_files = repo_data.get("package_files", {})
    package_files_text = "\n".join(f"--- {name} ---\n{content}" for name, content in package_files.items())

    prompt = VISION_PROMPT_TEMPLATE.format(
        meta_json=json.dumps(repo_data.get("meta", {}), indent=2),
        readme=readme_text or "No README found.",
        file_tree=file_tree_str,
        package_files=package_files_text,
        env_files=env_files_text,
        docker_files=docker_files_text,
        script_files=script_files_text,
    )

    try:
        result = call_vision(prompt=prompt, system=VISION_SYSTEM_PROMPT)
        repo_dna = RepoDNA(**result)

        for prereq in repo_dna.prerequisites:
            kb_data = get_prerequisite(prereq.name)
            if kb_data:
                os_data = get_os_specific_data(kb_data, os)
                prereq.kb_verified = True
                prereq.download_url = os_data["download_url"]
                prereq.install_command = os_data["install_command"]
                prereq.verify_command = kb_data["verify_command"]
            else:
                prereq.kb_verified = False

        # Check GitHub Releases for direct download installers
        try:
            installer_links = await fetch_release_installers(owner, repo, os)
            repo_dna.has_direct_installer = len(installer_links) > 0
            repo_dna.installer_links = installer_links
        except Exception:
            repo_dna.has_direct_installer = False
            repo_dna.installer_links = []

        return repo_dna, readme_text
    except Exception as exc:
        raise Exception(f"[vision] Cerebras analysis failed: {exc}") from exc
