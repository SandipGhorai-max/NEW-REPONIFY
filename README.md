<div align="center">

<img src="frontend/src/assets/LOGO.png" alt="Reponify Logo" width="150" height="150" style="border-radius: 20px; box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);">

# <img src="https://readme-typing-svg.herokuapp.com?font=JetBrains+Mono&weight=800&size=48&duration=3000&pause=1000&color=00D4FF&center=true&vCenter=true&width=600&height=80&lines=REPONIFY;From+Zero+to+Running;AI-Powered+Setup+Guides;Stop+Guessing,+Start+Coding" alt="Animated Typing Header" />

**Transform any public GitHub repository into a precise, step-by-step setup guide customized to your OS and experience level in seconds.**

<p align="center">
  <img src="https://img.shields.io/badge/Powered%20by-Cerebras%20AI-FF6F00?style=for-the-badge&logo=cpu&logoColor=white" />
  <img src="https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Backend-FastAPI%20%2B%20Python-005571?style=for-the-badge&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/Design-TailwindCSS%20%2B%203D%20Spline-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
</p>

</div>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" />

## 🚀 The Reponify Experience

*Reponify features a fully interactive 3D WebGL Spline model integrated seamlessly into a gorgeous, glassmorphic UI, ensuring that setting up projects feels like stepping into the future.*

<div align="center">
  <img src="frontend/src/assets/paste-url.png" alt="Hero UI Preview" width="85%" style="border-radius: 12px; box-shadow: 0 20px 40px rgba(0,0,0,0.4);" />
</div>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" />

## 🌈 Visual Feature Showcase

We don't just generate text. We analyze the exact DNA of a repository and provide a stunning visual dashboard of its health, requirements, and commands.

<table align="center" width="100%" style="border-collapse: collapse; border: none;">
  <tr>
    <td width="50%" align="center" style="border: none;">
      <img src="frontend/src/assets/os-aware-commands.jpeg" width="90%" style="border-radius:10px; box-shadow: 0 10px 20px rgba(0,212,255,0.1);" />
      <br><br><strong>💻 OS-Aware Commands</strong><br><sub>No more translating Linux instructions for Windows. Get exact `winget`, `brew`, or `apt` commands natively.</sub>
    </td>
    <td width="50%" align="center" style="border: none;">
      <img src="frontend/src/assets/dependency-health.jpg" width="90%" style="border-radius:10px; box-shadow: 0 10px 20px rgba(0,212,255,0.1);" />
      <br><br><strong>🏥 Dependency Health Checks</strong><br><sub>Visually score the health of the tech stack and flag deprecated packages before you even install them.</sub>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center" style="border: none; padding-top: 20px;">
      <img src="frontend/src/assets/error-prediction.jpg" width="90%" style="border-radius:10px; box-shadow: 0 10px 20px rgba(0,212,255,0.1);" />
      <br><br><strong>⚠️ Predictive Error Fixing</strong><br><sub>Reponify anticipates common compilation and runtime errors for the stack, providing instant fixes.</sub>
    </td>
    <td width="50%" align="center" style="border: none; padding-top: 20px;">
      <img src="frontend/src/assets/tech-stack-explainer.jpg" width="90%" style="border-radius:10px; box-shadow: 0 10px 20px rgba(0,212,255,0.1);" />
      <br><br><strong>🧠 Tech Stack Explainer</strong><br><sub>Perfect for beginners: Plain-English explanations of every technology powering the repository.</sub>
    </td>
  </tr>
</table>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" />

## ⚡ 4-Layer AI Pipeline

Under the hood, Reponify coordinates an ultra-fast **Cerebras Llama 3.1 8B** and **GPT-OSS 120B** LLM pipeline.

```mermaid
sequenceDiagram
    autonumber
    actor Developer
    participant UI as 3D React Frontend
    participant Core as FastAPI Engine
    participant V1 as Vision Layer (Llama 3.1)
    participant C2 as Creative Layer (GPT-OSS)

    Developer->>UI: Input https://github.com/owner/repo
    UI->>Core: Analyze with [OS] & [Experience Level]
    Core->>V1: Parse File Tree, Configs, Package.json
    Note over V1: Extracts exact repo DNA & commands
    V1-->>Core: Return Structured RepoDNA JSON
    Core->>C2: Generate custom step-by-step guide
    Note over C2: Injects Official Download URLs & Fixes
    C2-->>Core: Return SetupGuide JSON
    Core-->>UI: Serve Guide & Health Score
    UI-->>Developer: Render Beautiful Step-by-Step UI
```

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" />

## 🌟 Developer Profiles

Customize the generated guide to match your exact expertise.

*   🔰 **Beginner**: Verbosely explains concepts, includes verification commands, and holds your hand.
*   🛠️ **Intermediate**: Focuses purely on project-specific steps with light assistance.
*   ⚡ **Advanced**: Zero prose. Maximum density. Just raw, actionable shell commands.

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" />

## 🛠️ Quick Start

### 1. Requirements
* <img src="https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python&logoColor=white" /> 
* <img src="https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white" />

### 2. Run the FastAPI Backend
```bash
# Clone & enter folder
git clone https://github.com/SandipGhorai-max/NEW-REPONIFY.git
cd NEW-REPONIFY

# Setup Python environment
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Setup credentials
cp .env.example .env
# --> Edit .env with your Cerebras & GitHub tokens! <--

# Launch server
uvicorn main:app --reload --port 8000
```

### 3. Launch the 3D Frontend
```bash
cd frontend
npm install

# Connect to backend
echo "VITE_API_URL=http://127.0.0.1:8000" > .env

# Start dev server
npm run dev
```
> 🎉 **Navigate to `http://localhost:5173` to see it in action!**

<br>

<div align="center">
  <sub>Built with ❤️ for developers who just want their projects to run.</sub>
</div>
