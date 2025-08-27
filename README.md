
---

# 🌍 Smart Trip

A full-stack travel recommendation web app built with **Django (backend)** and **React + shadcn/ui (frontend)**.
Smart Trip allows users to create accounts, plan trips, and receive personalized travel recommendations based on trip data and pricing.

---

## 🚀 Features

* 🔐 **Authentication System**

  * User signup, login, logout
  * Secure sessions and JWT tokens

* 🧳 **Trip Management**

  * Add, update, and delete trips
  * Store details like destination, budget, dates

* 🤖 **Recommendation System**

  * Suggests trips and destinations based on preferences
  * Uses pricing, location, and previous trips

* 🎨 **Modern UI with shadcn/ui**

  * Clean, responsive design
  * Dark/light theme support
  * Tailwind + TypeScript

---

## 🛠️ Tech Stack

* **Backend**: Django, Django REST Framework
* **Frontend**: React, shadcn/ui, TailwindCSS, TypeScript
* **Database**: SQLite (dev) / MySQL/PostgreSQL (prod)
* **Auth**: Django Auth + JWT

---

## ⚡ Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/smart-trip.git
cd smart-trip
```

### 2. Backend (Django) Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows

pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start server
python manage.py runserver
```

Backend runs at: **[http://127.0.0.1:8000/](http://127.0.0.1:8000/)**

---

### 3. Frontend (React + shadcn/ui) Setup

```bash
cd frontend
npm install

# Setup shadcn components if not done
npx shadcn-ui init
npx shadcn-ui add button card input navbar

# Run dev server
npm run dev
```

Frontend runs at: **[http://localhost:5173/](http://localhost:5173/)** (Vite default)

---



## ▶️ Usage

1. Register/Login as a user
2. Add trip details (destination, budget, duration) as Admin
3. Get recommendations based on your preferences
4. Explore and manage trips from dashboard

---

## 🔮 Future Enhancements

* AI-powered recommendations (using ML models)
* Payment integration for bookings
* Social sharing of trip plans
* Map integration for destinations

---


