const express = require('express');
const {
    getAnnouncements,
    createAnnouncement
} = require('../controllers/announcementController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router
    .route('/')
    .get(getAnnouncements)
    .post(authorize('admin', 'teacher'), createAnnouncement);

module.exports = router;
