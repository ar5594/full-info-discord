# 🔍 Forensic Engine v2.0 | Advanced Security & Link Tracing

A high-level forensic tool designed to protect Discord communities from "Ghost Advertisers" and fake accounts. This engine exposes the true identity behind invite links, allowing admins to track the original link creator even if they use alternative accounts to spread it.

---

## 🛡️ Anti-Alt Technology
Many users join large community servers with "Alt" (fake) accounts to DM-advertise their own servers. While the account sending the link is fake, they often use **Permanent Links** created by their **Main Accounts**. 

* **The Forensic Engine** traces the "Link Creator" metadata, revealing the main account's ID and creation date instantly, as shown in the system logs.

---

## 🖼️ Forensic Evidence (Demonstration)

### Step 1: The Fake/Alt Account DM
A fake account sends an invite link to your members:
![Alt Account DM](https://cdn.discordapp.com/attachments/1438888082064670793/1493483759989690368/image.png?ex=69df22a3&is=69ddd123&hm=ff7d2d07a51596c79f8eaaf86a52fbf8fbb77e42284a48af24faa2fb4451456a&)

### Step 2: The Deep Trace Result
The engine analyzes the link and exposes the **Real Creator (Main Account)**:
![Deep Trace Result](https://cdn.discordapp.com/attachments/1438888082064670793/1493483859810058372/image.png?ex=69df22bb&is=69ddd13b&hm=e392d13c47a2423f7333f25bae40b946df04910aff0edd14a57b42cee2a0f6d0&)

---

## 🧬 Core Intelligence
* **Link Fingerprinting:** Decodes any `discord.gg` invite to find the **original creator's identity**.
* **Permission Matrix:** Deep-scans target users to check their administrative power in other nodes.
* **Scraper Engine:** Utilizes `discord.js-selfbot-v13` for deep metadata retrieval (Requires mutual server connection).

---

## 🚀 Instant Deployment
1. **Tokens:** Plug your `Bot Token`, `Client ID`, and `User Token` directly into the files.
2. **Launch:** Run `node index.js`. All dependencies are pre-configured.

---

## ⚠️ Important Notices & Disclaimer
* **Self-Botting:** This project uses self-botting techniques which are against Discord TOS. The developer assumes **NO responsibility** for any account suspensions. Use it at your own risk.
* **Mutual Server Requirement:** For the forensic scraper to retrieve detailed info, the Scraper account **must share at least one server** with the target user.

---

## 📞 Technical Support & Customization
If you encounter any crashes, system bugs, or wish to request custom features for the Forensic Engine:
* **Discord Operator:** `r.vu` 
* **Status:** Available for advanced forensic configurations.

**Engine Operator:** k9k (r.vu)
