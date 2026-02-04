const prisma = require('../config/db');

exports.getLogs = async (req, res, next) => {
    try {
        const logs = await prisma.activityLog.findMany({
            include: { user: { select: { name: true, role: true } } },
            orderBy: { createdAt: 'desc' },
            take: 100
        });
        res.status(200).json({ success: true, count: logs.length, data: logs });
    } catch (err) {
        next(err);
    }
};

exports.logAction = async (userId, action, details, ip) => {
    try {
        await prisma.activityLog.create({
            data: { userId, action, details, ip }
        });
    } catch (err) {
        console.error("Logging failed", err);
    }
}
