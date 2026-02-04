const prisma = require('../config/db');

exports.getMyNotifications = async (req, res, next) => {
    try {
        const notifications = await prisma.notification.findMany({
            where: { userId: req.user.id },
            orderBy: { createdAt: 'desc' }
        });
        res.status(200).json({ success: true, count: notifications.length, data: notifications });
    } catch (err) {
        next(err);
    }
};

exports.createNotification = async (req, res, next) => {
    try {
        // Need to ensure userId is passed in body as per Schema, OR if it's meant for mapping to user from req?
        // Usually body has { message, userId, type }
        const notification = await prisma.notification.create({
            data: req.body
        });
        res.status(201).json({ success: true, data: notification });
    } catch (err) {
        next(err);
    }
}
