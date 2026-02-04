const express = require('express');
const { getTimetable, createTimetableEntry } = require('../controllers/timetableController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.get('/', getTimetable);
router.post('/', authorize('admin'), createTimetableEntry);

module.exports = router;
