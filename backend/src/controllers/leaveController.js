const prisma = require('../config/db');

exports.getMyLeaveRequests = async (req, res, next) => {
    try {
        const requests = await prisma.leaveRequest.findMany({
            where: { studentId: req.user.id },
            orderBy: { createdAt: 'desc' }
        });
        res.status(200).json({ success: true, count: requests.length, data: requests });
    } catch (err) {
        next(err);
    }
};

exports.createLeaveRequest = async (req, res, next) => {
    try {
        const { reason, startDate, endDate } = req.body;
        const leave = await prisma.leaveRequest.create({
            data: {
                reason,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                studentId: req.user.id,
                status: 'pending'
            }
        });
        res.status(201).json({ success: true, data: leave });
    } catch (err) {
        next(err);
    }
}

exports.getAllLeaveRequests = async (req, res, next) => {
    try {
        const requests = await prisma.leaveRequest.findMany({
            include: { student: { select: { name: true, email: true } } },
            orderBy: { createdAt: 'desc' }
        });
        res.status(200).json({ success: true, count: requests.length, data: requests });
    } catch (err) {
        next(err);
    }
}
