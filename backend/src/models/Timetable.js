const mongoose = require('mongoose');

const TimetableSchema = new mongoose.Schema({
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        required: true
    },
    periods: [{
        subject: { type: String, required: true },
        startTime: { type: String, required: true }, // e.g. "09:00"
        endTime: { type: String, required: true },   // e.g. "10:00"
        teacher: { type: String } // Optional: Teacher name
    }]
});

module.exports = mongoose.model('Timetable', TimetableSchema);
