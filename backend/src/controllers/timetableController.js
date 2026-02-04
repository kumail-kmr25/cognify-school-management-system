const prisma = require('../config/db');

exports.getTimetable = async (req, res, next) => {
    try {
        const { classId } = req.query;
        let where = {};
        if (classId) where.classId = classId;

        const timetable = await prisma.timetable.findMany({
            where
        });
        res.status(200).json({ success: true, count: timetable.length, data: timetable });
    } catch (err) {
        next(err);
    }
};

exports.createTimetableEntry = async (req, res, next) => {
    try {
        const timetable = await prisma.timetable.create({
            data: req.body
        });
        res.status(201).json({ success: true, data: timetable });
    } catch (err) {
        next(err);
    }
}
