const prisma = require('../config/db');

// @desc    Create new exam
// @route   POST /api/v1/exams
// @access  Private/Admin
exports.createExam = async (req, res, next) => {
    try {
        const exam = await prisma.exam.create({
            data: req.body
        });
        res.status(201).json({ success: true, data: exam });
    } catch (err) {
        next(err);
    }
};

// @desc    Enter exam results
// @route   POST /api/v1/exams/results
// @access  Private/Teacher/Admin
exports.submitResults = async (req, res, next) => {
    try {
        const { results } = req.body; // Array of { studentId, examId, marks }
        // Ensure input uses IDs

        const resultData = results.map(r => ({
            studentId: r.student, // Mapping potential old names to new
            examId: r.exam,
            marks: Number(r.marksObtained) || Number(r.marks)
        }));

        const savedResults = await prisma.result.createMany({
            data: resultData
        });

        res.status(201).json({ success: true, count: savedResults.count });
    } catch (err) {
        next(err);
    }
};

// @desc    Get student results
// @route   GET /api/v1/exams/results/:studentId
// @access  Private
exports.getStudentResults = async (req, res, next) => {
    try {
        const results = await prisma.result.findMany({
            where: { studentId: req.params.studentId },
            include: {
                exam: {
                    include: { subject: { select: { name: true } } }
                }
            }
        });

        res.status(200).json({ success: true, count: results.length, data: results });
    } catch (err) {
        next(err);
    }
};
