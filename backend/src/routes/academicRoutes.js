const express = require('express');
const {
    getClasses,
    createClass,
    getSubjects,
    createSubject
} = require('../controllers/academicController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router
    .route('/classes')
    .get(getClasses)
    .post(authorize('admin'), createClass);

router
    .route('/subjects')
    .get(getSubjects)
    .post(authorize('admin'), createSubject);

module.exports = router;
