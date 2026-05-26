# Reponify 🚀
> **From zero to running in seconds.** An intelligent, AI-powered setup guide generator that translates any public GitHub repository into a precise, step-by-step startup plan tailored to your OS and experience level.

Reponify analyzes the architecture, dependency trees, setup scripts, and package files of a codebase, validating and constructing an optimized guide so developers spend less time configuring and more time building.

---

## 🏗️ Architecture & AI Pipeline

Reponify employs a high-performance **2-Layer AI Pipeline** powered by **Cerebras Cloud SDK** with automated key rotation:

```
                  ┌──────────────────────────────┐
                  │      Public GitHub Repo      │
                  └──────────────┬───────────────┘
                                 │
                                 ▼
                     [ Layer 1: Repo Vision ]
                     - Cerebras Llama 3.1 8B
                     - Parses structure, files, README
                                 │
                                 ▼
                         ┌───────────────┐
                         │    RepoDNA    │
                         └───────┬───────┘
                                 │
                                 ▼
                   [ Layer 2: Guide Generator ]
                     - Cerebras GPT-OSS 120B
                     - Customizes steps for OS & Level
                                 │
                                 ▼
                     ┌───────────────────────┐
                     │  Tailored Setup Guide │
                     └───────────────────────┘
```

1. **Layer 1 (Repo Vision)**: Analyzes the repository metadata, directory structure, package configuration files, environment layouts, and scripts. It utilizes `llama3.1-8b` to generate a structured `RepoDNA` model containing raw stack configuration.
2. **Layer 2 (Creative / Guide Generator)**: Processes the `RepoDNA` using `gpt-oss-120b` to yield a comprehensive `SetupGuide` specific to the user's Profile:
   * **OS-Specific Commands**: Customizes instructions for Windows (PowerShell/winget), macOS (bash/Homebrew), and Linux (apt/yum).
   * **Experience-Aware Content**: 
     * *Beginner*: Verbosely explains what every command does, teaches the underlying concept, provides validation commands, and adds warnings.
     * *Intermediate*: Focuses on project-specific steps with light assistance.
     * *Advanced*: Command-only, minimal explanation for maximum efficiency.

---

## ⚡ Key Features

* **🔑 Intelligent Key Rotation**: Implements active round-robin token rotation for both Cerebras API Keys and GitHub REST API tokens. Instantly shifts keys on rate limits or server errors.
* **📦 Dependency Health Check**: Evaluates dependencies to score repository health and flags potential package conflicts.
* **⚠️ Error Prediction**: Derives potential runtime warnings and provides clear instructions on how to troubleshoot and fix common mistakes.
* **💾 Composite Caching**: Uses a time-to-live cache (TTLCache) mapping unique URL + OS + Experience combinations to bypass pipeline delays on repeated requests.
* **🎨 Premium Frontend Experience**: Styled using Vanilla CSS and Tailwind, featuring a responsive dark mode layout, micro-animations, glassmorphic inputs, and a fully interactive 3D Spline model.

---

## 📂 Project Structure

```
REPONIFY/
├── backend/ (Root files)
│   ├── main.py             # FastAPI Server & Middleware
│   ├── config.py           # Configuration & Settings Schema
│   ├── models/
│   │   └── schemas.py      # Pydantic Schemas & DNA models
│   ├── layers/
│   │   ├── vision.py       # Layer 1 Vision logic
│   │   └── creative.py     # Layer 2 Guide generation logic
│   ├── utils/
│   │   ├── github.py       # GitHub REST client
│   │   ├── key_manager.py  # Rotation logic
│   │   └── logging_config.py
│   └── requirements.txt    # Python Dependencies
│
└── frontend/               # Vite + React 19 SPA
    ├── src/
    │   ├── App.jsx         # App Core & Landing
    │   ├── components/     # UI Modals & Result Dashboards
    │   └── assets/         # App Graphics & Styling Resources
    ├── package.json        # Frontend Dependencies
    └── tailwind.config.js  # Styling Tokens
```

---

## 🚀 Setup & Installation

### 1. Prerequisites
Ensure you have the following installed on your machine:
* **Python 3.11+**
* **Node.js 18+** & **npm**

### 2. Backend Configuration
1. Clone your repository:
   ```bash
   git clone https://github.com/SandipGhorai-max/NEW-REPONIFY.git
   cd NEW-REPONIFY
   ```
2. Create a virtual environment and activate it:
   ```bash
   # Windows
   python -m venv .venv
   .venv\Scripts\activate

   # macOS/Linux
   python3 -m venv .venv
   source .venv/bin/activate
   ```
3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure environment variables. Copy `.env.example` to `.env` and insert your credentials:
   ```bash
   cp .env.example .env
   ```
   Modify `.env` to include your Cerebras and GitHub tokens:
   ```env
   CEREBRAS_API_KEY_1=your_cerebras_key_1
   CEREBRAS_API_KEY_2=your_cerebras_key_2
   CEREBRAS_API_KEY_3=your_cerebras_key_3
   CEREBRAS_API_KEY_4=your_cerebras_key_4

   GITHUB_TOKEN_1=your_github_token_1
   GITHUB_TOKEN_2=your_github_token_2
   ```
5. Run the FastAPI development server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
   The backend will be accessible at `http://127.0.0.1:8000`.

### 3. Frontend Configuration
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Configure the environment by creating a `.env` file inside `frontend/`:
   ```env
   VITE_API_URL=http://127.0.0.1:8000
   ```
4. Run the Vite development server:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

---

## 🛠️ Tech Stack

* **Backend**: Python, FastAPI, Uvicorn, Pydantic, Httpx, Cerebras Cloud SDK
* **Frontend**: React 19, Vite, Tailwind CSS, Spline (3D WebGL Web Agent)
* **API Key Management**: Round-Robin Thread-Safe Key Rotation
* **Testing & Utility**: JSON Repair, Cachetools
