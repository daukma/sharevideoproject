const express = require('express');
const router = express.Router();

const { createSystemNotification, getAllNotifications, deleteNotification } = require('../controllers/notificationController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.post('/', authMiddleware, adminMiddleware, createSystemNotification);
router.get('/', authMiddleware, adminMiddleware, getAllNotifications); // Lấy tất cả thông báo
router.delete('/:id', authMiddleware, adminMiddleware, deleteNotification)

module.exports = router;