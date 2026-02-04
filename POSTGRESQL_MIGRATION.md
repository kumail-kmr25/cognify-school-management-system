# PostgreSQL Migration Guide

## ✅ What's Been Done:
1. **Code Migration**: All backend controllers and server configuration have been converted from MongoDB/Mongoose to PostgreSQL/Prisma
2. **Schema Definition**: Created `prisma/schema.prisma` with all 14 models mapped to PostgreSQL tables
3. **Data Migration Script**: Created `scripts/migrateData.js` to transfer existing data from MongoDB to PostgreSQL

## ⚠️ Manual Steps Required:

### 1. Install PostgreSQL
If you don't have PostgreSQL installed:
- Download from: https://www.postgresql.org/download/windows/
- Install with default settings
- Remember the password you set for the `postgres` user

### 2. Create Database
Open PostgreSQL command line (psql) and run:
```sql
CREATE DATABASE school_management;
```

### 3. Update Configuration
Edit `backend/.env` and update DATABASE_URL with your actual PostgreSQL credentials:
```
DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/school_management?schema=public
```

### 4. Run Prisma Migration
Open a PowerShell terminal in the `backend` folder and run:
```powershell
npx prisma migrate dev --name init
```

This will create all tables in PostgreSQL.

### 5. (Optional) Migrate Existing Data
If you have data in MongoDB that you want to transfer:
```powershell
node scripts/migrateData.js
```

### 6. Start the Server
```powershell
npm run dev
```

## 🔧 Troubleshooting

**Error: "Can't reach database server"**
- Ensure PostgreSQL service is running (check Windows Services)
- Verify credentials in DATABASE_URL
- Check if port 5432 is not blocked by firewall

**Migration Script Issues**
- Ensure MongoDB is running if migrating data
- Check that the database names match in both connection strings

## 📊 Database Schema Overview
The PostgreSQL database includes these tables:
- User (with role-based access)
- Class
- Subject
- Attendance
- Exam
- Result
- Notification
- Timetable
- LeaveRequest
- ActivityLog
- Message
- Resource
- Announcement
- Fee

All relationships are enforced via foreign keys for data integrity.
