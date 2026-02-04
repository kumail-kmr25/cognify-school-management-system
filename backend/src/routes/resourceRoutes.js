const express = require('express');
const { getResources, createResource } = require('../controllers/resourceController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.get('/', getResources);
router.post('/', authorize('admin', 'teacher'), createResource);

module.exports = router;
