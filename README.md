

## NextStep AI: From Confusion to Clarity

An **AI-powered career assistant** that helps students identify their skills, choose the right career path, and become job-ready with personalized guidance.

---

##  Overview

**NextStep AI** is designed to solve the problem of career confusion among students. It analyzes user skills, recommends suitable domains, and provides a structured learning roadmap along with resume building and interview preparation — all in one platform.

---


##  Key Features

*  **Skill Analyzer** – Evaluate strengths and skill gaps
*  **Domain Recommendation** – Suggest best-fit career paths
*  **Resume Builder** – Generate ATS-friendly resumes
*  **Interview Preparation** – AI-generated role-based questions
*  **AI Chat Assistant** – Real-time career guidance
*  **Personalized Learning Path** – Step-by-step roadmap

---

** Project Structure**

### Client (Frontend - Vite + React)

```
client/
│── dist/                # Production build
│── node_modules/        # Dependencies
│── public/              # Static assets
│── src/                 # Main source code
│   ├── components/      # Reusable UI components
│   ├── pages/           # Application pages
│   ├── assets/          # Images, icons
│   ├── App.jsx          # Root component
│   └── main.jsx         # Entry point
│
│── index.html           # Main HTML file
│── package.json         # Project config
│── vite.config.js       # Vite config
│── eslint.config.js     # Linting config
```

---

###  Backend (FastAPI)

```
backend/
│── __pycache__/         # Python cache (ignored)
│── config/              # App configuration
│── controllers/         # Business logic
│── database/            # DB connection
│── middleware/          # Custom middleware
│── models/              # Database models
│── routes/              # API routes
│── services/            # AI & external services
│── utils/               # Helper functions
│── venv/                # Virtual environment (ignored)
│
│── main.py              # Entry point
│── requirements.txt     # Dependencies
│── .env                 # Environment variables (ignored)
│── .env.example         # Sample env file
│── .gitignore
```

---

**# How It Works**

1.  **User Authentication**

   * User signs up or logs into the platform

2. **Skill Analysis**

   * User inputs skills / answers questions
   * AI evaluates strengths & weaknesses

3.  **Career Recommendation**

   * Suggests best-fit domains (Dev, Data, etc.)

4.  **Personalized Roadmap**

   * Step-by-step learning plan is generated

5.  **Resume + Interview Prep**

   * Build resume
   * Practice AI-generated interview questions

6.  **AI Assistant (Core Feature)**

   * Users interact with **NextStep AI**
   * Get real-time career guidance and answers

---

**# Tech Stack**

### Frontend

* React.js (Vite)
* Tailwind CSS (if used)

### Backend

* FastAPI (Python)
* MongoDB

### AI Integration

* Gemini API / OpenAI API

### Tools

* Git & GitHub
* REST APIs

---

##  Getting Started

### 1️ Clone the Repository

```bash
git clone https://github.com/your-username/nextstep-ai.git
cd nextstep-ai
```

### 2️ Setup Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3️ Setup Frontend

```bash
cd client
npm install
npm run dev
```

---

##  Environment Variables

Create a `.env` file in backend:

```
MONGO_URL=your_mongo_url
JWT_SECRET_KEY=your_secret_key
GEMINI_API_KEY=your_api_key
```

---

##  Future Improvements

*  More accurate AI recommendations
*  Dashboard with progress tracking
*  Job portal integration

---

##  Author

* **Vanshika**
* **Harsh**

---

## ⭐ Contribution

Feel free to fork this repo and contribute!

---

