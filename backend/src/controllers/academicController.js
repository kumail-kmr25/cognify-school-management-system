const prisma = require('../config/db');

// @desc    Get all classes
// @route   GET /api/v1/academic/classes
// @access  Private/Admin
exports.getClasses = async (req, res, next) => {
    try {
        const classes = await prisma.class.findMany({
            include: {
                subjects: true,
                teacher: { select: { name: true, email: true } }
            }
        });
        res.status(200).json({ success: true, data: classes });
    } catch (err) {
        next(err);
    }
};

// @desc    Create class
// @route   POST /api/v1/academic/classes
// @access  Private/Admin
exports.createClass = async (req, res, next) => {
    try {
        // Prisma create
        const classroom = await prisma.class.create({
            data: req.body
        });
        res.status(201).json({ success: true, data: classroom });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all subjects
// @route   GET /api/v1/academic/subjects
// @access  Private
exports.getSubjects = async (req, res, next) => {
    try {
        const subjects = await prisma.subject.findMany();
        res.status(200).json({ success: true, data: subjects });
    } catch (err) {
        next(err);
    }
};

// @desc    Create subject
// @route   POST /api/v1/academic/subjects
// @access  Private/Admin
exports.createSubject = async (req, res, next) => {
    try {
        const subject = await prisma.subject.create({
            data: req.body
        });
        res.status(201).json({ success: true, data: subject });
    } catch (err) {
        next(err);
    }
};
