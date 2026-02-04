const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a class name'],
        unique: true,
        trim: true
    },
    sections: [{
        type: String,
        required: true
    }],
    subjects: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Subject'
    }],
    teacher: {
        type: mongoose.Schema.ObjectId,
        ref: 'User' // Class Teacher
    }
});

module.exports = mongoose.model('Class', ClassSchema);
