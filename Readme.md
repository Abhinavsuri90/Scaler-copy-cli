# 🚀 SST-Architect: Autonomous Scaler Academy Clone Agent

An intelligent CLI agent developed for the **Scaler School of Technology (SST)**. This tool utilizes a **ReAct (Reasoning and Acting) loop** to autonomously plan, generate, and launch a high-fidelity clone of the Scaler Academy landing page.

## 🛠️ Tech Stack
- **Engine:** Node.js (ESM)
- **AI Model:** GPT-4o-mini (via OpenRouter)
- **Design System:** Plus Jakarta Sans, Glassmorphism, and Responsive CSS
- **Architecture:** ReAct Pattern (Think -> Act -> Observe)

## 🏗️ How it Works
The agent follows a multi-step autonomous process to satisfy the assignment requirements:
1. **THINK:** The agent analyzes design requirements (typography, colors, layout).
2. **TOOL (setupProject):** Initializes a clean environment and creates the `scaler_output` directory.
3. **TOOL (writeFile):** Generates professional HTML5/CSS3 code matching the Scaler aesthetic.
4. **TOOL (openInBrowser):** Automatically launches the final product in the default browser for verification.

## 🚀 Quick Start

### 1. Prerequisites
Ensure you have an OpenRouter API Key and Node.js installed.

### 2. Setup
Create a `.env` file in the root directory and add your key:
```env
OPENROUTER_API_KEY=your_api_key_here