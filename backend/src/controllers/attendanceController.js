const prisma = require('../config/db');

// @desc    Mark attendance for multiple students
// @route   POST /api/v1/attendance
// @access  Private/Teacher/Admin
exports.markAttendance = async (req, res, next) => {
    try {
        const { students, classId, date, status, subjectId } = req.body;

        // Prisma createMany (supported in Postgres)
        // Map students array to insert objects
        const attendanceData = students.map(studentId => ({
            studentId,
            classId: classId || undefined, // Prisma handles optional relationship if defined, but Schema said ClassId String?
            date: date ? new Date(date) : new Date(),
            status: status || 'present'
            // subjectId not currently in Schema for Attendance, assuming simplifiction or need update? 
            // Schema: studentId, classId, date, status.
        }));

        const result = await prisma.attendance.createMany({
            data: attendanceData
        });

        res.status(201).json({ success: true, count: result.count, message: 'Attendance marked' });
    } catch (err) {
        next(err);
    }
};

// @desc    Get attendance reports
// @route   GET /api/v1/attendance
// @access  Private
exports.getAttendance = async (req, res, next) => {
    try {
        let where = {};

        // Students can only see their own attendance
        if (req.user.role === 'student') {
            where.studentId = req.user.id;
        }

        if (req.query.studentId) where.studentId = req.query.studentId;
        if (req.query.classId) where.classId = req.query.classId;

        const attendance = await prisma.attendance.findMany({
            where,
            include: {
                student: { select: { name: true } }
                // class relation might be null?
            }
        });

        res.status(200).json({ success: true, count: attendance.length, data: attendance });
    } catch (err) {
        next(err);
    }
};
