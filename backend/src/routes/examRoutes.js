const express = require('express');
const {
    createExam,
    submitResults,
    getStudentResults
} = require('../controllers/examController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/', authorize('admin'), createExam);
router.post('/results', authorize('teacher', 'admin'), submitResults);
router.get('/results/:studentId', getStudentResults);

module.exports = router;
