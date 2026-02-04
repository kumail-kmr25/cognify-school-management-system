# School Management System (SMS) Pro

A full-stack, role-based School Management System built with **Next.js**, **Node.js**, **Express**, and **MongoDB**.

## 🚀 Features

- **Role-Based Access Control (RBAC)**: Admin, Teacher, Student, Parent.
- **Authentication**: Secure JWT-based auth with protected routes.
- **Academic Management**: Manage Classes, Subjects, and Exams.
- **Student Operations**: Mark Attendance, View Results, Check Fees.
- **Dashboard**: Analytics and quick stats for different roles.
- **Modern UI**: Built with Shadcn/UI, Tailwind CSS, and Framer Motion.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Shadcn/UI
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **DevOps**: Docker, Docker Compose

## 📦 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas)
- Docker (Optional)

### Installation (Local)

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-repo/school-management-system-pro.git
    cd school-management-system-pro
    ```

2.  **Backend Setup:**
    ```bash
    cd backend
    npm install
    
    # 1. Create a .env file based on .env.example
    cp .env.example .env
    
    # 2. Generate SSL Certificates (for HTTPS)
    npm run seed # (Optional) Populate database with dummy data
    node generate-cert.js
    
    # 3. Start Server
    npm run dev
    ```

3.  **Frontend Setup:**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

4.  **Access the App:**
    - Frontend: `http://localhost:3000`
    - Backend API: `https://localhost:5000` (Note the **HTTPS**)
    
    *Note: You must accept the self-signed certificate warning in your browser for the backend URL.*

## 🔑 Demo Credentials

| Role    | Email              | Password    |
| :------ | :----------------- | :---------- |
| Admin   | admin@school.com   | password123 |
| Teacher | john@teacher.com   | password123 |
| Student | (Created by Admin) | password123 |

## 📂 Project Structure

```
├── backend/            # Express.js Server
│   ├── config/         # DB Connection
│   ├── controllers/    # Route Logic
│   ├── middleware/     # Auth & Error Handling
│   ├── models/         # Mongoose Schemas
│   └── routes/         # API Endpoints
├── frontend/           # Next.js Application
│   ├── app/            # App Router Pages
│   ├── components/     # Reusable UI Components
│   └── lib/            # Utilities
└── docker-compose.yml  # Container Orchestration
```

## 📝 API Documentation

Import the Postman Collection (not included in this text file) to test endpoints:
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`
- `GET /api/v1/academic/classes`
- `POST /api/v1/attendance`

---
Built by Antigravity Agent.
