from typing import Optional
from pydantic import BaseModel

class AnalyzeRequest(BaseModel):
    github_url: str
    os: str = "Windows"
    experience_level: str = "beginner"

class RepoOverview(BaseModel):
    name: str
    description: Optional[str] = "No description provided"
    language: str
    stars: int
    topics: list[str]
    plain_explanation: str

class Prerequisite(BaseModel):
    name: str
    version: str
    why: str
    download_url: Optional[str] = ""
    status: str        # "required" | "optional"
    kb_verified: bool = False
    install_command: Optional[str] = None
    verify_command: Optional[str] = None

class DependencyDetail(BaseModel):
    name: str
    status: str        # "healthy" | "warning" | "critical"
    message: Optional[str] = "No issues found"

class DependencyHealth(BaseModel):
    score: int         # 1-100
    healthy: int
    warnings: int
    critical: int
    details: list[DependencyDetail]

class SetupStep(BaseModel):
    step_number: int
    title: str
    command: str
    what_it_does: str
    what_you_learn: str
    download_url: Optional[str] = None

class TechStackItem(BaseModel):
    name: str
    role: str
    explanation: Optional[str] = "No explanation provided"

class CommonError(BaseModel):
    error: str
    why: Optional[str] = "Unknown cause"
    fix: Optional[str] = "No fix provided"

class ReponifyResponse(BaseModel):
    repo_overview: RepoOverview
    prerequisites: list[Prerequisite]
    dependency_health: DependencyHealth
    setup_steps: list[SetupStep]
    tech_stack: list[TechStackItem]
    common_errors: list[CommonError]
    has_direct_installer: bool = False
    installer_links: list[dict] = []
    recommended_method: str = "commands"

# ---------------------------------------------------------
# INTERMEDIATE LAYER MODELS (Based on pipeline description)
# ---------------------------------------------------------

class RepoDNA(BaseModel):
    """Output of Layer 1 (Vision)"""
    repo_overview: RepoOverview
    tech_stack: list[TechStackItem]
    prerequisites: list[Prerequisite]
    raw_dependencies: dict[str, str] = {}  # {"package_name": "version"}
    file_tree_summary: str = ""
    readme_summary: str = ""
    readme_setup_commands: list[str] = []
    installation_method: str = "git_clone"
    exact_run_commands: list[str] = []
    exact_install_commands: list[str] = []
    entry_point_file: Optional[str] = None
    repo_type: str = "runnable_app"
    requires_env_setup: bool = False
    required_env_variables: list[dict] = []
    has_docker: bool = False
    has_install_script: bool = False
    has_makefile: bool = False
    makefile_run_commands: list[str] = []
    has_direct_installer: bool = False
    installer_links: list[dict] = []

class DependencyReport(BaseModel):
    """Output of Layer 2 (Live Research)"""
    dependency_health: DependencyHealth
    research_notes: str

class SetupGuide(ReponifyResponse):
    """Output of Layer 2 (Guide Generator) - effectively the final structure"""
    pass
