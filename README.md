<![CDATA[<div align="center">

# 🎓 Cognify School Management System

**Smarter Schools, Simpler Management**

[![Built with Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-24.x-green?style=flat&logo=node.js)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17.x-blue?style=flat&logo=postgresql)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.3-2D3748?style=flat&logo=prisma)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

A modern, secure, and feature-rich school management system built with cutting-edge technologies. Designed to streamline administrative tasks, enhance communication, and improve the educational experience for schools of all sizes.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Usage](#-usage) • [Security](#-security) • [Contributing](#-contributing)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Security](#-security)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🌟 Overview

Cognify is a comprehensive school management platform that digitizes and simplifies school operations. From attendance tracking to exam management, from parent-teacher communication to administrative workflows, Cognify provides a unified solution for modern educational institutions.

### Why Cognify?

- ✅ **Role-Based Access Control** - Separate portals for Admins, Teachers, Students, and Parents
- ✅ **Real-Time Updates** - Instant notifications and live chat functionality
- ✅ **Data Security** - Industry-standard security with HTTPS, JWT, and encrypted passwords
- ✅ **Modern UI/UX** - Beautiful dark mode interface with responsive design
- ✅ **Production-Ready** - Built with PostgreSQL, Prisma ORM, and enterprise-grade architecture

---

## ✨ Features

### 👨‍💼 Admin Portal
- **User Management** - Create, update, and manage users (teachers, students, parents)
- **Class Management** - Organize classes, assign teachers, and manage subjects
- **System Monitoring** - View activity logs, generate backups, and monitor system health
- **Announcements** - Broadcast important messages to all users
- **Analytics Dashboard** - Comprehensive overview of attendance, exams, and performance

### 👨‍🏫 Teacher Portal
- **Attendance Marking** - Quick and easy daily attendance tracking
- **Exam Management** - Create exams and enter student results
- **Resource Sharing** - Upload and manage teaching materials
- **Timetable Access** - View and manage class schedules
- **Student Communication** - Direct messaging with students and parents

### 👨‍🎓 Student Portal
- **Attendance Tracking** - View personal attendance records
- **Exam Results** - Access grades and performance reports
- **Leave Requests** - Submit and track leave applications
- **Resource Library** - Download study materials and assignments
- **Chat System** - Communicate with teachers and peers
- **Notifications** - Receive important updates and announcements

### 👨‍👩‍👧 Parent Portal
- **Child Monitoring** - Track child's attendance and academic performance
- **Communication** - Direct messaging with teachers and administrators
- **Notifications** - Stay updated on school events and announcements

### 🔔 Core Features
- **Real-Time Notifications** - Instant alerts for important events
- **Live Chat** - Built-in messaging system with auto-refresh
- **Dark Mode** - Easy on the eyes with beautiful dark theme
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Activity Logging** - Complete audit trail of all system actions
- **Backup System** - Automated database backup functionality

---

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 16.1 (React 19)
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Type Safety**: TypeScript

### Backend
- **Runtime**: Node.js 24.x
- **Framework**: Express.js 4.x
- **Database**: PostgreSQL 17.x
- **ORM**: Prisma 7.3
- **Authentication**: JWT (HTTP-only cookies)
- **Security**: Helmet, XSS-Clean, Rate Limiting, HPP

### DevOps & Infrastructure
- **Version Control**: Git & GitHub
- **Package Manager**: npm
- **Development Server**: Nodemon
- **SSL/TLS**: HTTPS with self-signed certs (dev)
- **Process Management**: PM2 ready

---

## 🏗️ Architecture

```
┌─────────────────┐
│   Next.js App   │  ← Frontend (Port 3000)
│   (Tailwind)    │
└────────┬────────┘
         │ HTTPS
         ↓
┌─────────────────┐
│  Express API    │  ← Backend (Port 5000)
│   + Security    │
└────────┬────────┘
         │ Prisma ORM
         ↓
┌─────────────────┐
│   PostgreSQL    │  ← Database (Port 5432)
│   (Relational)  │
└─────────────────┘
```

### Database Schema
- **14 Models**: User, Class, Subject, Attendance, Exam, Result, Notification, Timetable, LeaveRequest, ActivityLog, Message, Resource, Announcement, Fee
- **Foreign Keys**: Enforced data integrity with relational constraints
- **Indexes**: Optimized for common queries (user_id, class_id, date)

---

## 📦 Installation

### Prerequisites
- Node.js 24.x or higher
- PostgreSQL 17.x
- npm (comes with Node.js)
- Git

### Step 1: Clone Repository

```bash
git clone https://github.com/kumail-kmr25/cognify-school-management-system.git
cd cognify-school-management-system
```

### Step 2: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

### Step 3: Database Setup

**Create PostgreSQL Database:**
```sql
CREATE DATABASE school_management;
```

**Configure Environment:**
Create `backend/.env` file:
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/school_management?schema=public
JWT_SECRET=your_super_secret_jwt_key_here
FRONTEND_URL=http://localhost:3000
```

**Run Migrations:**
```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

### Step 4: Start Development Servers

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

### Step 5: Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: https://localhost:5000
- **Prisma Studio**: `npx prisma studio` (Database GUI)

---

## 🎯 Usage

### Default Credentials

After running the seed script, use these test accounts:

**Admin:**
- Email: `admin@cognify.school`
- Password: `admin123`

**Teacher:**
- Email: `teacher@cognify.school`
- Password: `teacher123`

**Student:**
- Email: `student@cognify.school`
- Password: `student123`

> ⚠️ **Important**: Change these credentials in production!

### Creating Your First User

1. Navigate to http://localhost:3000
2. Click "Register"
3. Select role (Admin, Teacher, Student, Parent)
4. Fill in details
5. Login with credentials

---

## 📚 API Documentation

### Authentication Endpoints

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/me
```

### User Management

```http
GET    /api/v1/users
PUT    /api/v1/users/:id
DELETE /api/v1/users/:id
```

### Academic Operations

```http
GET  /api/v1/academic/classes
POST /api/v1/academic/classes
GET  /api/v1/academic/subjects
POST /api/v1/academic/subjects
```

### Attendance

```http
POST /api/v1/attendance
GET  /api/v1/attendance?studentId=xxx&classId=xxx
```

### Exams & Results

```http
POST /api/v1/exams
POST /api/v1/exams/results
GET  /api/v1/exams/results/:studentId
```

### Notifications & Messages

```http
GET  /api/v1/notifications
POST /api/v1/notifications
GET  /api/v1/messages
POST /api/v1/messages
```

### System Operations

```http
GET  /api/v1/logs
POST /api/v1/backup
```

**Full API Documentation**: See [API.md](docs/API.md) for detailed request/response examples.

---

## 🔐 Security

Cognify implements multiple layers of security:

### Network Security
- ✅ **HTTPS Only** - All traffic encrypted with SSL/TLS
- ✅ **CORS Protection** - Whitelist-based origin control
- ✅ **Helmet Headers** - Security headers (CSP, HSTS, X-Frame-Options)
- ✅ **Trust Proxy** - Correct IP detection behind reverse proxies

### Authentication & Authorization
- ✅ **JWT Tokens** - Secure, stateless authentication
- ✅ **HTTP-Only Cookies** - Prevents XSS token theft
- ✅ **Password Hashing** - bcrypt with salt rounds
- ✅ **Role-Based Access** - Granular permission system

### Attack Prevention
- ✅ **Rate Limiting** - 100 req/10min (global), 10 req/hour (auth)
- ✅ **XSS Protection** - Input sanitization with xss-clean
- ✅ **SQL Injection** - Parameterized queries via Prisma
- ✅ **HPP Protection** - Parameter pollution prevention
- ✅ **Request Size Limits** - 10KB body limit

### Data Protection
- ✅ **Activity Logging** - Full audit trail (IP, action, timestamp)
- ✅ **Environment Secrets** - No hardcoded credentials
- ✅ **Database Isolation** - Not publicly exposed
- ✅ **Error Handling** - No stack traces in production

### Security Checklist
- [x] HTTPS enforced
- [x] Passwords never logged
- [x] Tokens in HTTP-only cookies
- [x] Failed login attempts logged
- [x] Rate limiting active
- [x] CORS whitelist configured
- [x] Database access restricted
- [x] Input validation on all routes

**Security Audit Report**: See [SECURITY.md](SECURITY.md) for details.

---

## 📁 Project Structure

```
cognify-school-management-system/
├── frontend/                    # Next.js Frontend
│   ├── src/
│   │   ├── app/                # App router pages
│   │   │   ├── admin/         # Admin portal
│   │   │   ├── teacher/       # Teacher portal
│   │   │   ├── student/       # Student portal
│   │   │   └── parent/        # Parent portal
│   │   ├── components/        # Reusable UI components
│   │   └── utils/             # API client & helpers
│   ├── public/                # Static assets
│   └── package.json
│
├── backend/                     # Express.js Backend
│   ├── src/
│   │   ├── controllers/       # Route handlers
│   │   ├── middleware/        # Auth, error, security
│   │   ├── routes/            # API routes
│   │   └── config/            # Database config
│   ├── prisma/
│   │   └── schema.prisma      # Database schema
│   ├── scripts/               # Utility scripts
│   │   └── migrateData.js     # Mongo → Postgres migration
│   ├── server.js              # Express app entry
│   └── package.json
│
├── docs/                        # Documentation
│   ├── API.md                 # API reference
│   ├── DEPLOYMENT.md          # Deployment guide
│   └── MIGRATION.md           # Database migration guide
│
├── .gitignore
├── README.md
├── LICENSE
└── docker-compose.yml          # Docker setup (optional)
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push to branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines
- Follow existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Kumail Ali Bhat**

- GitHub: [@kumail-kmr25](https://github.com/kumail-kmr25)
- Email: kumail.kmr25@gmail.com

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Database ORM by [Prisma](https://www.prisma.io/)

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/kumail-kmr25/cognify-school-management-system?style=social)
![GitHub forks](https://img.shields.io/github/forks/kumail-kmr25/cognify-school-management-system?style=social)
![GitHub issues](https://img.shields.io/github/issues/kumail-kmr25/cognify-school-management-system)

---

<div align="center">

**Made with ❤️ for educational institutions worldwide**

⭐ Star this repo if you find it helpful!

</div>]]>
