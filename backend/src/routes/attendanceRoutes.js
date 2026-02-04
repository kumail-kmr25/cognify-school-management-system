const express = require('express');
const {
    markAttendance,
    getAttendance
} = require('../controllers/attendanceController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router
    .route('/')
    .get(getAttendance)
    .post(authorize('teacher', 'admin'), markAttendance);

module.exports = router;
