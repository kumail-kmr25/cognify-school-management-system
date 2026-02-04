const express = require('express');
const { createBackup } = require('../controllers/backupController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.use(authorize('admin')); // Only admin can backup

router.post('/', createBackup);

module.exports = router;
