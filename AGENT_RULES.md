# Agent Rules & Continuity Guide

> **Notice for Any AI Agent / Assistant Reading This File**:
> This file contains the mandatory operating rules, user preferences, and project context established by the project owner (a 2nd-year Computer Science student). 
> **You MUST read and strictly adhere to all guidelines in this document across all current and future conversation threads.**

---

## 1. Core Operating Principles (Non-Negotiable)

### Rule 1: Approval Gate Before Coding
* **NO UNAPPROVED CODE**: Never write, edit, or delete application code without presenting a plain-English plan first and receiving explicit user approval.
* When proposing any phase, feature, or architectural change:
  1. Break it down simply.
  2. Ask any necessary clarifying questions.
  3. Wait for the user to explicitly say "proceed", "approved", or give the go-ahead.

### Rule 2: Beginner-Friendly Communication (2nd-Year CS Level)
* The user is a 2nd-year CS student. Avoid heavy, ungrounded enterprise jargon.
* Explain technical concepts with intuitive mental models and real-world analogies (e.g. explain proxying as a "middleman helper" that strips the "do not embed" tag).
* Always explain **why** something is needed, not just *what* library is being installed.

### Rule 3: Maintain the Human-Readable Changelog (`ACTIVITY_LOG.md`)
* After every single completed milestone or set of changes, you **must update [ACTIVITY_LOG.md](file:///c:/Users/LENOVO/Downloads/zweiten_jahre2026_2027/intro_to_cs/os_simulator/ACTIVITY_LOG.md)**.
* Log entries must be written in plain English and include:
  1. **Date & Milestone**
  2. **What was added / changed** (and why)
  3. **How the user can test / verify it** with their own eyes (step-by-step commands or clicks)
  4. **Current Status & What comes next**

---

## 2. Project Vision & Core Requirements

The project is a **Web-Based Cross-OS & Device Environment Simulator** that lets users enter any website URL and interact with it in a realistic operating system environment.

### Target Supported Environments:
1. **macOS (Sonoma/Sequoia style)**: Top menu bar, traffic-light window controls (close/minimize/maximize), bottom dock with hover effects, macOS wallpaper.
2. **Windows 10**: Left-aligned taskbar, classic square window buttons (`—`, `□`, `✕`), Start menu.
3. **Windows 11**: Centered taskbar icons, rounded window corners, modern Fluent/Mica glass styling.
4. **iPhone (iOS / iPhone 15-16 Pro style)**: Dynamic Island, iOS status bar, safe-area insets, home indicator bar, portrait/landscape orientation toggle, interactive virtual keyboard that dynamically resizes the inner viewport.
5. **Samsung Galaxy (Android / S24 Ultra style)**: Centered punch-hole camera cutout, One UI status bar, 3-button navigation bar, portrait/landscape toggle, interactive Samsung virtual keyboard.

### Special Technical Requirements:
* **Anti-Iframe Blocking Engine (Middleman Proxy)**: Must work for arbitrary websites (e.g., Google, GitHub) by routing requests through a local proxy that strips blocking headers (`X-Frame-Options`, `Content-Security-Policy: frame-ancestors`).
* **Dual-Layer Resolution & Auto-Fit Scaler**:
  * Outer Screen Resolution (simulated monitor: 1080p, 1440p, 4K, custom).
  * Inner Window Resolution (browser window or phone viewport).
  * Smooth mathematical CSS scaling so that large resolutions fit cleanly inside the user's physical browser screen without ugly scrollbars.

---

## 3. Tech Stack Architecture

* **Frontend**: React (Vite) + TypeScript + Tailwind CSS + Lucide Icons + Framer Motion (for smooth phone rotations & keyboard animations).
* **Backend**: Node.js + Express (serving as the unblocking proxy and asset rewriter).
* **Workspace Structure**:
  * `/client`: Frontend UI code.
  * `/server`: Unblocking middleman proxy server.
  * `/ACTIVITY_LOG.md`: Living progress diary.
  * `/AGENT_RULES.md`: This continuity file.
  * `/PROJECT_PLAN.md`: Deep technical specifications.

---

## 4. Continuity Quick-Check for New Threads

If you are an agent starting in a brand new chat thread:
1. Read `AGENT_RULES.md` (this file) to reload all behavioral rules.
2. Read `ACTIVITY_LOG.md` to see the exact state of work completed so far.
3. Greet the user, summarize the current milestone where the last agent left off, and ask for their direction before writing any code.
