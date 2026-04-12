# Forensic Protocol v3.0 | 🛰️ Advanced Monitoring System

![GitHub language count](https://img.shields.io/github/languages/count/ar5594/full-info-discord)
![GitHub top language](https://img.shields.io/github/languages/top/ar5594/full-info-discord)

**Forensic Protocol v3.0** is a sophisticated monitoring and analytics system designed for the Discord platform. It provides high-precision tools for tracking voice activity, managing automated grids (Nodes), and generating live status reports for connected servers.

---

## 🚀 Key Features

* **Radar Monitoring System:** Advanced radar to monitor multiple server nodes simultaneously and identify their real-time status.
* **Voice Activity Leaderboard:** Displays real-time voice engagement rankings with detailed channel breakdowns.
* **Live Network Activity:** Automated report generation for network pulses and target linking within the grid.
* **Access Level Management:** Built-in permission system supporting "Administrator" levels to ensure data security.
* **Forensic Logging:** Dedicated broadcast channels for live activity feeds and transparent reporting.

---

## 📁 Project Structure

The project follows a modular architecture based on **JavaScript** and **Node.js**:

* **`index.js`**: The main entry point and the core engine of the bot.
* **`commands/`**: Contains advanced logic for specific operations:
    * `radar.js`: Manages the radar grid and active monitoring.
    * `checkuser.js`: Analyzes user data and engagement metrics.
    * `check.js`: Validates connection status and system stability.
* **`config.json`**: Configuration file for managing tokens, IDs, and target channels.

---

## 🛠️ Commands

| Command | Description |
| :--- | :--- |
| `/radar view` | View the current status of the radar and linked grid. |
| `/radar live` | Add a new server node to the active monitoring grid. |
| `/radar livelink` | Link a specific target to the active monitoring session. |
| `/radar livesend` | Execute and broadcast a live network activity report. |

---

## ⚙️ Installation

```bash
# 1. Clone the repository
git clone [https://github.com/ar5594/full-info-discord.git](https://github.com/ar5594/full-info-discord.git)

# 2. Install dependencies
npm install

# 3. Configure the bot
# Update config.json with your credentials (Token, IDs)

# 4. Start the system
node index.js
