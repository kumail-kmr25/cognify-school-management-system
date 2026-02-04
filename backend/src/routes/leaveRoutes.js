const express = require('express');
const { getMyLeaveRequests, createLeaveRequest, getAllLeaveRequests } = require('../controllers/leaveController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.get('/my', getMyLeaveRequests);
router.post('/', authorize('student'), createLeaveRequest);
router.get('/all', authorize('admin', 'teacher'), getAllLeaveRequests);

module.exports = router;
