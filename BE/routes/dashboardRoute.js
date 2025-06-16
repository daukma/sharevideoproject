const express = require('express');
const router = express.Router();

const { getDashboardSummary, getVideoDashboard } = require('../controllers/dashboardController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/users', authMiddleware, adminMiddleware, getDashboardSummary);
router.get('/videos', authMiddleware, adminMiddleware, getVideoDashboard);

module.exports = router;