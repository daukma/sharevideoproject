const express = require('express');
const router = express.Router();

const { createSystemNotification, getAllNotifications, getNotificationsForUser } = require('../controllers/notificationController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.post('/', authMiddleware, adminMiddleware, createSystemNotification);
router.get('/getforuser', authMiddleware, getNotificationsForUser);
router.get('/', authMiddleware, adminMiddleware, getAllNotifications); // Lấy tất cả thông báo


module.exports = router;