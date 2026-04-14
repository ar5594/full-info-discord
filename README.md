# 🔍 Forensic Engine | Advanced Discord Metadata & User Tracer

A high-precision forensic tool designed for Discord, focused on metadata extraction, link integrity analysis, and deep user permission tracing. Powered by `discord.js` and `discord.js-selfbot-v13`.

---

## 🛠️ Key Features

* **Forensic Link Analysis (`/check`):** * Extracts hidden server metadata from invite links.
    * Identifies Server Owner ID, creation timestamps, and verification levels.
    * Verifies link integrity (permanency vs. expiration) with precise countdowns.
    * Tracks boost levels and population statistics (Total/Online members).

* **Deep User Radar (`/checkuser`):**
    * Performs a "Node Search" to find mutual servers between the scraper and target.
    * Generates a full Permission Matrix for the target user in specific guilds.
    * Extracts profile banners, account creation dates, and ownership signals.
    * Interactive UI using Select Menus and Buttons for multi-server navigation.

---

## ⚙️ Setup & Installation

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
    cd YOUR_REPO_NAME
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configuration:**
    * Insert your **Bot Token** and **Client ID** in `index.js`.
    * Insert your **User Token** in `commands/checkuser.js` for the forensic scraper to function.

4.  **Execution:**
    ```bash
    node index.js
    ```

---

## 📂 Project Structure

* `index.js`: Main entry point and command handler.
* `commands/check.js`: Logic for invite link forensics.
* `commands/checkuser.js`: Logic for deep user/server permission scraping.
* `package.json`: Dependency management.

---

## ⚠️ Disclaimer
This tool is for educational and forensic research purposes only. The use of self-bots violates Discord's Terms of Service and may lead to account suspension. Use at your own risk.

---

**Developed by:** k9k (r.vu) | **Version:** 2.0.26
