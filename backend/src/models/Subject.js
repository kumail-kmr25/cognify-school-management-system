const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a subject name'],
        unique: true,
        trim: true
    },
    code: {
        type: String,
        required: [true, 'Please add a subject code'],
        unique: true
    },
    description: String
});

module.exports = mongoose.model('Subject', SubjectSchema);
