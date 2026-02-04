const express = require('express');
const { getLogs } = require('../controllers/activityController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.use(authorize('admin')); // Only admin sees logs
router.get('/', getLogs);

module.exports = router;
