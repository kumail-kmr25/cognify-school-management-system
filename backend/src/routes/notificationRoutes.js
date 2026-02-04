const express = require('express');
const { getMyNotifications, createNotification } = require('../controllers/notificationController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.get('/', getMyNotifications);
router.post('/', authorize('admin'), createNotification);

module.exports = router;
