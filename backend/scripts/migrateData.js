const { MongoClient } = require('mongodb');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config(); // Load env vars
const prisma = new PrismaClient();

// Config
const MONGO_URI = 'mongodb://localhost:27017';
const DB_NAME = 'school_management';

async function migrate() {
    console.log("🚀 Starting MongoDB -> PostgreSQL Migration...");

    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        console.log("✅ Connected to MongoDB");
        const db = client.db(DB_NAME);

        // 1. Migrate Users
        console.log("Migrating Users...");
        const users = await db.collection('users').find().toArray();
        const userMap = new Map(); // Old ID -> New ID

        for (const user of users) {
            // Check if email exists to avoid unique constraint errors
            const existing = await prisma.user.findUnique({ where: { email: user.email } });
            if (existing) {
                userMap.set(user._id.toString(), existing.id);
                continue;
            }

            const newUser = await prisma.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    password: user.password, // Already hashed
                    role: user.role || 'student',
                    createdAt: user.createdAt ? new Date(user.createdAt) : new Date()
                }
            });
            userMap.set(user._id.toString(), newUser.id);
        }
        console.log(`✅ Migrated ${users.length} Users`);

        // 2. Migrate Classes
        console.log("Migrating Classes...");
        const classes = await db.collection('classes').find().toArray();
        const classMap = new Map();

        for (const cls of classes) {
            const teacherId = cls.teacher ? userMap.get(cls.teacher.toString()) : null;

            const newClass = await prisma.class.create({
                data: {
                    name: cls.name,
                    teacherId: teacherId
                }
            });
            classMap.set(cls._id.toString(), newClass.id);
        }
        console.log(`✅ Migrated ${classes.length} Classes`);

        // 3. Link Students to Classes
        // In Mongo, students might have 'class' field or classes have 'students' array
        // Let's assume User model had 'class' field in Mongo based on typical schema
        // Re-iterate users to update relation if needed, or do it during User creation if data was available.
        // Let's do a pass if users had class info.
        for (const user of users) {
            if (user.class && classMap.has(user.class.toString()) && userMap.has(user._id.toString())) {
                await prisma.user.update({
                    where: { id: userMap.get(user._id.toString()) },
                    data: { studentClassId: classMap.get(user.class.toString()) }
                });
            }
        }

        // 4. Migrate Subjects
        console.log("Migrating Subjects...");
        const subjects = await db.collection('subjects').find().toArray();
        const subjectMap = new Map();

        for (const sub of subjects) {
            if (!sub.class) continue;
            const classId = classMap.get(sub.class.toString());
            const teacherId = sub.teacher ? userMap.get(sub.teacher.toString()) : null;

            if (classId) {
                const newSub = await prisma.subject.create({
                    data: {
                        name: sub.name,
                        classId: classId,
                        teacherId: teacherId
                    }
                });
                subjectMap.set(sub._id.toString(), newSub.id);
            }
        }
        console.log(`✅ Migrated ${subjects.length} Subjects`);

        // 5. Migrate Attendance
        console.log("Migrating Attendance...");
        const attendance = await db.collection('attendances').find().toArray();
        let attCount = 0;
        for (const att of attendance) {
            const studentId = userMap.get(att.student.toString());
            // const classId = att.class ? classMap.get(att.class.toString()) : null;

            if (studentId) {
                await prisma.attendance.create({
                    data: {
                        date: new Date(att.date),
                        status: att.status || 'present',
                        studentId: studentId
                        // classId: classId // Optional in our new schema
                    }
                });
                attCount++;
            }
        }
        console.log(`✅ Migrated ${attCount} Attendance Records`);

        // 6. Migrate Notifications
        console.log("Migrating Notifications...");
        const notifs = await db.collection('notifications').find().toArray();
        for (const n of notifs) {
            const userId = userMap.get(n.recipient.toString()) || userMap.get(n.user.toString());
            if (userId) {
                await prisma.notification.create({
                    data: {
                        message: n.message,
                        type: n.type || 'info', // Map to string
                        userId: userId,
                        createdAt: n.createdAt ? new Date(n.createdAt) : new Date()
                    }
                });
            }
        }
        console.log(`✅ Migrated ${notifs.length} Notifications`);

        // 7. Migrate Activity Logs
        console.log("Migrating Activity Logs...");
        const logs = await db.collection('activitylogs').find().toArray();
        for (const log of logs) {
            const userId = log.user ? userMap.get(log.user.toString()) : null;
            if (userId) {
                await prisma.activityLog.create({
                    data: {
                        action: log.action,
                        details: log.details || '',
                        ip: log.ip,
                        userId: userId,
                        createdAt: log.createdAt ? new Date(log.createdAt) : new Date()
                    }
                });
            }
        }
        console.log(`✅ Migrated ${logs.length} Activity Logs`);

        console.log("🎉 Migration Complete!");

    } catch (err) {
        console.error("Migration Failed:", err);
    } finally {
        await client.close();
        await prisma.$disconnect();
    }
}

migrate();
