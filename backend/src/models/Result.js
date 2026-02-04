const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    exam: {
        type: mongoose.Schema.ObjectId,
        ref: 'Exam',
        required: true
    },
    marksObtained: {
        type: Number,
        required: true
    },
    remarks: String
});

module.exports = mongoose.model('Result', ResultSchema);
