# 🔍 Forensic Engine v2.0 | High-Precision Discord Metadata Scraper

A specialized tool for digital forensics and metadata extraction within the Discord ecosystem. This engine leverages advanced scraping techniques to provide deep insights into server infrastructures and user permission matrices.

---

## 🚀 Instant Deployment
Everything is pre-configured for immediate execution.
1. **Configure Tokens:** Insert your `Bot Token`, `Client ID`, and `User Token` directly into the code files.
2. **Launch:** Simply run `node index.js` to initialize the Forensic Engine.

---

## 🧬 Core Intelligence & Architecture

The engine is built on a dual-layer architecture for maximum data retrieval:

* **Layer 1: Discord.js (v14.13.0)** * Handles high-level API interactions.
    * Powers the `/check` command to dissect invite links, revealing owner IDs, server creation logs, and real-time population counts.
* **Layer 2: Discord.js-Selfbot-v13** * The "Scraper" core used in `/checkuser`.
    * Enables "Node Discovery" to identify mutual servers and extract full permission matrices (Admin, Manage Server, etc.) that are normally invisible to standard bots.

---

## 📊 Command Matrix

| Command | Function | Forensic Output |
| :--- | :--- | :--- |
| `/check` | Link Analysis | Owner ID, Server Age, Verification Level, Link Permanency. |
| `/checkuser` | User Deep-Trace | Mutual Servers, Detailed Permissions, Profile Banners, Join Dates. |

---

## 📂 System Structure
* `index.js`: Primary handler & Slash Command refresher.
* `commands/check.js`: Metadata extraction for invite signatures.
* `commands/checkuser.js`: Deep-layer permission and server tracing.
* `package.json`: Pre-defined environment dependencies.

---

## ⚠️ Legal Notice
Designed for forensic research and security auditing. Users must comply with Discord's Terms of Service. Developed for the 2026 digital environment.

**Engine Operator:** k9k (r.vu)
