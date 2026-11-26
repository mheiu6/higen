# Project Activity Log & Progress Diary

> **Welcome!** This file is your easy-to-read progress log. Every milestone, feature, and change made by the AI will be recorded here in plain English, along with exact instructions on how you can test and see the work yourself.

---

## 📌 Log Entries

### [2026-11-26] — Git Ignore Configuration (.gitignore)
* **Milestone**: Version Control Hygiene & Git Ignore Setup
* **What was done**:
  * Created [.gitignore](file:///c:/Users/LENOVO/Downloads/zweiten_jahre2026_2027/intro_to_cs/os_simulator/.gitignore) at the root of the project.
  * Added rules to exclude `node_modules/` (both client and server), build artifacts (`dist/`), environment files, and OS cache files (`Thumbs.db`, `.DS_Store`).
* **Why it was done**:
  * Prevented thousands of third-party package files from being accidentally tracked by Git, resolving Windows LF/CRLF line-ending warnings and keeping the Git repository small and fast.
* **How to verify**:
  1. In your terminal, clear Git's cached index and re-add your project files:
     ```bash
     git rm -r --cached .
     git add .
     git status
     ```
  2. Notice that `node_modules/` is completely ignored, and only your clean source files are staged without LF/CRLF warnings.
* **Current Status**:
  * Git ignore configured. Ready to proceed to **Step 2: Unblocker Middleman Proxy Server**.

---

### [2026-11-25] — Step 1: Project Setup & Foundation (COMPLETED)
* **Milestone**: Step 1: Project Skeleton, Server & Client Scaffolding
* **What was done**:
  * **Backend Server (`/server`)**:
    * Created an Express.js backend server with CORS enabled.
    * Installed `express`, `cors`, and `axios`.
    * Implemented a `/api/health` endpoint that returns server status.
    * Tested and verified the backend starts cleanly on port `3001` and returns:
      `{ "status": "ok", "message": "OS Simulator Backend Server is running smoothly!" }`.
  * **Frontend Client (`/client`)**:
    * Scaffolded a fast React + TypeScript application with Vite.
    * Installed Tailwind CSS for authentic OS styling, `lucide-react` for system icons, and `framer-motion` for mobile animations.
    * Configured Vite proxy so requests to `/api` automatically route to the Express backend.
    * Created an initial health verification dashboard (`App.tsx`) showing client status and backend connectivity.
    * Verified production build: `vite build` completed successfully with 0 errors.
  * **Root Scripts (`package.json`)**:
    * Added commands: `npm run server` and `npm run client` for convenient single-command development.
* **Why it was done**:
  * Gives us a solid, error-free foundation where the user interface can reliably talk to the backend helper server before we build the website unblocker and OS interfaces.
* **How to verify**:
  1. Open a terminal in the project root:
     ```bash
     npm run server
     ```
     You will see: `[OS Simulator Server] Running on http://localhost:3001`
  2. In your browser or another terminal, visit:
     `http://localhost:3001/api/health`
     You will see the JSON response confirming the server is alive!
  3. In a second terminal:
     ```bash
     npm run client
     ```
     Open `http://localhost:5173` in your browser to see the Cross-OS Simulator starter screen showing green active badges.
* **Current Status**:
  * Step 1 is complete! Ready to present the plan for **Step 2: Unblocker Middleman Proxy Server**.

---

### [2026-11-25] — Project Continuity & Rulebook Setup
* **Milestone**: Project Foundation & Continuity Setup
* **What was done**:
  * Established `AGENT_RULES.md` to lock in core rules for all future AI agents (requiring beginner-friendly explanations, plans before code, and continuity protection across chat threads).
  * Created this `ACTIVITY_LOG.md` to track every modification with user-friendly verification steps.
  * Verified project environment tools: Node.js `v22.21.0` and npm `10.9.4` are installed and ready.
* **Why it was done**:
  * To ensure you always have full visibility and control over what is being built, and so any fresh chat thread can pick up immediately without restarting or losing context.
* **How to verify**:
  * You can open [AGENT_RULES.md](file:///c:/Users/LENOVO/Downloads/zweiten_jahre2026_2027/intro_to_cs/os_simulator/AGENT_RULES.md) and [ACTIVITY_LOG.md](file:///c:/Users/LENOVO/Downloads/zweiten_jahre2026_2027/intro_to_cs/os_simulator/ACTIVITY_LOG.md) to review their contents.
* **Current Status**:
  * Step 1 completed.

---
