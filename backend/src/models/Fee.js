const mongoose = require('mongoose');

const FeeSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'overdue'],
        default: 'pending'
    },
    paymentDate: Date,
    transactionId: String,
    type: {
        type: String, // e.g., 'Tuition', 'Exam', 'Transport'
        default: 'Tuition'
    }
});

module.exports = mongoose.model('Fee', FeeSchema);
