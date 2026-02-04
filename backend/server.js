const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { errorHandler } = require('./src/middleware/errorMiddleware');

const cookieParser = require('cookie-parser');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const { limiter, authLimiter } = require('./src/middleware/rateLimitMiddleware');

// Load env vars
dotenv.config();

// Connect to database (Prisma is lazy)
// const prisma = require('./src/config/db');

const app = express();

// Trust Proxy (if behind nginx/heroku)
app.set('trust proxy', 1);

// Security Headers
app.use(helmet());

// Cross Origin Resource Sharing
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

// Rate Limiting
app.use('/api', limiter);
app.use('/api/v1/auth', authLimiter);

// Body Parser
app.use(express.json({ limit: '10kb' })); // Limit body size
app.use(cookieParser());

// Data Sanitization against XSS
app.use(xss());

// Prevent Parameter Pollution
app.use(hpp({
    whitelist: [
        'role',
        'subjects'
    ]
}));

// Compression
app.use(compression());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Route files
const authRoutes = require('./src/routes/authRoutes');
const academicRoutes = require('./src/routes/academicRoutes');
const userRoutes = require('./src/routes/userRoutes');
const attendanceRoutes = require('./src/routes/attendanceRoutes');
const examRoutes = require('./src/routes/examRoutes');
const announcementRoutes = require('./src/routes/announcementRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
const timetableRoutes = require('./src/routes/timetableRoutes');
const leaveRoutes = require('./src/routes/leaveRoutes');
const resourceRoutes = require('./src/routes/resourceRoutes');
const messageRoutes = require('./src/routes/messageRoutes');
const activityRoutes = require('./src/routes/activityRoutes');
const backupRoutes = require('./src/routes/backupRoutes');

// Mount routers
app.get('/', (req, res) => res.send('SMS API is running...'));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/academic', academicRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/attendance', attendanceRoutes);
app.use('/api/v1/exams', examRoutes);
app.use('/api/v1/announcements', announcementRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/timetable', timetableRoutes);
app.use('/api/v1/leave', leaveRoutes);
app.use('/api/v1/resources', resourceRoutes);
app.use('/api/v1/messages', messageRoutes);
app.use('/api/v1/logs', activityRoutes);
app.use('/api/v1/backup', backupRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// FOR DEVELOPMENT ONLY: Using self-signed certs
// In production, your cloud provider (Heroku/AWS/Vercel) manages SSL termination
const https = require('https');
const fs = require('fs');

let server;
try {
    const key = fs.readFileSync('server.key');
    const cert = fs.readFileSync('server.cert');
    server = https.createServer({ key, cert }, app).listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT} (HTTPS) 🔒`);
        console.log(`Database: PostgreSQL via Prisma at ${process.env.DATABASE_URL}`);
    });
} catch (e) {
    console.log("No SSL certs found, falling back to HTTP");
    server = app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT} (HTTP)`);
        console.log(`Database: PostgreSQL via Prisma at ${process.env.DATABASE_URL}`);
    });
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
