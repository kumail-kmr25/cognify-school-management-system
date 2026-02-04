const express = require('express');
const { getMyMessages, sendMessage } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.get('/', getMyMessages);
router.post('/', sendMessage);

module.exports = router;
