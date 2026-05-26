# Graph Report - .  (2026-05-21)

## Corpus Check
- 48 files · ~229,370 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 175 nodes · 226 edges · 20 communities (16 shown, 4 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 22 edges (avg confidence: 0.73)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_GitHub Fetch Utils|GitHub Fetch Utils]]
- [[_COMMUNITY_Models and Schemas|Models and Schemas]]
- [[_COMMUNITY_React Components App|React Components App]]
- [[_COMMUNITY_Cerebras API Utilities|Cerebras API Utilities]]
- [[_COMMUNITY_Main Pipeline Flow|Main Pipeline Flow]]
- [[_COMMUNITY_NPM Dependencies|NPM Dependencies]]
- [[_COMMUNITY_NPM Dev Dependencies|NPM Dev Dependencies]]
- [[_COMMUNITY_API Key Manager|API Key Manager]]
- [[_COMMUNITY_Vision Knowledge Base|Vision Knowledge Base]]
- [[_COMMUNITY_Logging Configuration|Logging Configuration]]
- [[_COMMUNITY_App Settings Config|App Settings Config]]
- [[_COMMUNITY_Dashboard Components|Dashboard Components]]
- [[_COMMUNITY_Claude Settings|Claude Settings]]

## God Nodes (most connected - your core abstractions)
1. `devDependencies` - 13 edges
2. `_get()` - 12 edges
3. `run_vision()` - 11 edges
4. `SecurityHeadersMiddleware` - 9 edges
5. `fetch_all_repo_data()` - 8 edges
6. `_run_pipeline()` - 7 edges
7. `run_creative()` - 7 edges
8. `RoundRobinRotator` - 6 edges
9. `scripts` - 5 edges
10. `dependencies` - 5 edges

## Surprising Connections (you probably didn't know these)
- `SecurityHeadersMiddleware` --uses--> `GitHubAuthError`  [INFERRED]
  main.py → utils/github.py
- `SecurityHeadersMiddleware` --uses--> `GitHubNotFoundError`  [INFERRED]
  main.py → utils/github.py
- `_enforce_cd_after_clone()` --calls--> `SetupStep`  [INFERRED]
  main.py → models/schemas.py
- `_run_pipeline()` --calls--> `parse_github_url()`  [INFERRED]
  main.py → utils/github.py
- `_run_pipeline()` --calls--> `run_vision()`  [INFERRED]
  main.py → layers/vision.py

## Communities (20 total, 4 thin omitted)

### Community 0 - "GitHub Fetch Utils"
Cohesion: 0.12
Nodes (26): Exception, fetch_all_repo_data(), fetch_file(), fetch_readme(), fetch_release_installers(), fetch_repo_meta(), fetch_tree(), _get() (+18 more)

### Community 1 - "Models and Schemas"
Cohesion: 0.16
Nodes (19): BaseHTTPMiddleware, BaseModel, AnalyzeRequest, CommonError, DependencyDetail, DependencyHealth, DependencyReport, Prerequisite (+11 more)

### Community 2 - "React Components App"
Cohesion: 0.17
Nodes (6): expOptions, Icons, osOptions, App(), ErrorBoundary, useScrollReveal()

### Community 3 - "Cerebras API Utilities"
Cohesion: 0.14
Nodes (12): build_creative_prompt(), layers/creative.py — Layer 2: Guide Generator  Takes RepoDNA directly from Layer, Build the system prompt with the user's OS and experience level injected., Layer 2 — Guide Generator.      Uses the readme_setup_commands extracted by Laye, run_creative(), call_creative(), call_vision(), CerebrasRotator (+4 more)

### Community 4 - "Main Pipeline Flow"
Cohesion: 0.15
Nodes (14): analyze_repo(), _cache_key(), _enforce_cd_after_clone(), lifespan(), main.py — FastAPI entry point for Reponify.  Zero business logic. Only wires up, Serve the frontend index.html from the same origin as the API., Hardcoded guarantee: cd always follows git clone.     This runs after all AI lay, Execute the 2-layer analysis pipeline (Vision → Creative). (+6 more)

### Community 5 - "NPM Dependencies"
Cohesion: 0.13
Nodes (14): dependencies, react, react-dom, @splinetool/react-spline, @splinetool/runtime, name, private, scripts (+6 more)

### Community 6 - "NPM Dev Dependencies"
Cohesion: 0.15
Nodes (13): devDependencies, autoprefixer, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, postcss (+5 more)

### Community 8 - "Vision Knowledge Base"
Cohesion: 0.25
Nodes (7): layers/vision.py — Layer 1: Repo Vision  Fetches all repository data from GitHub, Layer 1 — Repo Vision.      1. Parse the GitHub URL into owner/repo.     2. Fetc, run_vision(), parse_github_url(), Extract (owner, repo) from a GitHub URL.     Supports:       https://github.com/, get_os_specific_data(), get_prerequisite()

### Community 9 - "Logging Configuration"
Cohesion: 0.33
Nodes (5): _JSONFormatter, utils/logging_config.py — Structured JSON logging for Reponify.  Call setup_logg, Emit each log record as a single-line JSON object., Configure root logger with JSON output to stdout.     Call once at application s, setup_logging()

## Knowledge Gaps
- **60 isolated node(s):** `main.py — FastAPI entry point for Reponify.  Zero business logic. Only wires up`, `Generate a composite cache key from URL + OS + experience level.`, `Inject standard HTTP security headers on every response.`, `Serve the frontend index.html from the same origin as the API.`, `Hardcoded guarantee: cd always follows git clone.     This runs after all AI lay` (+55 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `run_vision()` connect `Vision Knowledge Base` to `GitHub Fetch Utils`, `Models and Schemas`, `Cerebras API Utilities`, `Main Pipeline Flow`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Why does `run_creative()` connect `Cerebras API Utilities` to `GitHub Fetch Utils`, `Models and Schemas`, `Main Pipeline Flow`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Why does `_run_pipeline()` connect `Main Pipeline Flow` to `Vision Knowledge Base`, `Cerebras API Utilities`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Are the 9 inferred relationships involving `run_vision()` (e.g. with `_run_pipeline()` and `parse_github_url()`) actually correct?**
  _`run_vision()` has 9 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `SecurityHeadersMiddleware` (e.g. with `AnalyzeRequest` and `ReponifyResponse`) actually correct?**
  _`SecurityHeadersMiddleware` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `main.py — FastAPI entry point for Reponify.  Zero business logic. Only wires up`, `Generate a composite cache key from URL + OS + experience level.`, `Inject standard HTTP security headers on every response.` to the rest of the system?**
  _60 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `GitHub Fetch Utils` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._