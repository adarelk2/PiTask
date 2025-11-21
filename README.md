# TaskPi — Decentralized Micro-Task Platform on Pi Network

TaskPi is a decentralized micro-task platform built for the **Pi Network Hackathon**.  
Users complete simple tasks (visit a link, upload proof, download an app, etc.) and earn **Pi**.  

TaskPi uses reputation, human validation, and anti-fraud logic to create a fair, scalable ecosystem.

---

## 🚀 Core Features

### 1. Multi-Level User System
| Level | Description |
|-------|-------------|
| **Level 1 – Beginner** | Simple, auto-approved tasks. No validation required. |
| **Level 2 – Trusted Performer** | Requires proof. Reviewed by validator. Accuracy added. |
| **Level 3 – Validator** | Trusted users who review & approve/reject others' submissions. |

### 2. Task Lifecycle
1. Publisher creates a task and deposits Pi  
2. User claims the task  
3. User submits proof  
4. Validator/Admin approves  
5. User receives Pi  

### 3. Anti-Fraud System
- No AI auto-review  
- Human validators only  
- Accuracy system for every user  
- Publishers cannot review their own tasks  
- Audit logs for every action  

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Node.js + Express |
| View Engine | Handlebars (HBS) |
| Database | MySQL |
| Sessions | SQL-backed express-session |
| Localization | JSON under `/locales` |
| Security | Validation Factory, custom middleware |
| Payments | Pi SDK (Testnet) |

---

## 📁 Project Structure

```
TaskPi/
│── bin/
│── config/
│── constants/
│── core/
│   ├── Application.js
│   ├── Controller.js
│   ├── Model.js
│   ├── DB.js
│   ├── Logger.js
│   ├── LogReader.js
│   └── validations/
│── locales/
│── middleware/
│── models/
│── public/
│── routes/
│── views/
│── package.json
└── README.md
```

---

## ⚙️ Installation

### 1. Clone
```
git clone https://github.com/<your-user>/TaskPi.git
cd TaskPi
```

### 2. Install
```
npm install
```

### 3. Create `.env`
```
PORT=3000
DB_HOST=...
DB_USER=...
DB_PASS=...
DB_NAME=TaskPi
PI_API_KEY=...
PI_APP_ID=...
SESSION_SECRET=your-secret
```

### 4. Run
```
npm start
```

---

## 🌐 Multi-Language Support

Supported languages:  
**English, Hebrew, Simplified Chinese, Traditional Chinese, Vietnamese**

Translations stored in:
```
/locales/en.json
/locales/he.json
/locales/zh-CN.json
/locales/zh-TW.json
/locales/vi.json
```

---

## 🔒 Anti-Fraud & Security

- Proof review: manual or validator-based  
- Accuracy score:  
  ```
  accuracy = approved / total
  ```
- Validator restrictions  
- Session security: HTTP-only, secure cookies  
- Review logs stored in SQL  

---

## 🔧 Custom MVC Framework

TaskPi uses a **custom-built MVC engine**:

- `Application.js` — routes, middleware, bootstrapping  
- `Controller.js` / `BaseController.js` — main controller logic  
- `Model.js` — database wrapper  
- `CreateValidationFactory.js` — dynamic validation rules  
- `CreateCalculatorKDFactory.js` — performance scoring engine  

---

## 🔁 Task Flow

```
Publisher → Task created → User claims → User submits proof
        ↓                             ↓
      Escrow locked            Validator reviews
        ↓                             ↓
       Approved → Pi released to user
```

---

## 🗄️ Database (from SQL dump)

- `users` — wallet, level, accuracy, balance  
- `tasks` — reward, level, proof type  
- `task_submissions` — proof, status, reviewer  
- `completed_payments` — Pi transaction log  
- `sessions` — login/session store  

---

## 🏆 Roadmap

- Mainnet transition  
- Community-powered validation  
- UI redesign  
- AI-based task recommendations  
- Decentralized validator reputation  
- Proof-of-Humanity enhancements  

---

## 👥 Team

TaskPi is actively developed for the Pi Network Hackathon.  
Team invitations and Join Codes will be enabled by Pi once available.
