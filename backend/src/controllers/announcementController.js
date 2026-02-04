const prisma = require('../config/db');

// @desc    Get all announcements
// @route   GET /api/v1/announcements
// @access  Private
exports.getAnnouncements = async (req, res, next) => {
    try {
        const announcements = await prisma.announcement.findMany({
            orderBy: { date: 'desc' }
        });
        res.status(200).json({ success: true, count: announcements.length, data: announcements });
    } catch (err) {
        next(err);
    }
};

// @desc    Create announcement
// @route   POST /api/v1/announcements
// @access  Private/Admin/Teacher
exports.createAnnouncement = async (req, res, next) => {
    try {
        // author not in current schema explicitly, just title/content/date
        const announcement = await prisma.announcement.create({
            data: {
                title: req.body.title,
                content: req.body.content
            }
        });
        res.status(201).json({ success: true, data: announcement });
    } catch (err) {
        next(err);
    }
};
