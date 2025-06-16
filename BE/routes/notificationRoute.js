const express = require('express');
const router = express.Router();

<<<<<<< Updated upstream
const { createSystemNotification, getAllNotifications, getNotificationsForUser } = require('../controllers/notificationController');
=======
const { createSystemNotification, getAllNotifications, deleteNotification, updateNotification, getNotificationsForUser } = require('../controllers/notificationController');
>>>>>>> Stashed changes
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.post('/', authMiddleware, adminMiddleware, createSystemNotification);
router.get('/getforuser', authMiddleware, getNotificationsForUser);
router.get('/', authMiddleware, adminMiddleware, getAllNotifications); // Lấy tất cả thông báo
<<<<<<< Updated upstream
=======
router.delete('/:id', authMiddleware, adminMiddleware, deleteNotification)
router.put('/:id', authMiddleware, adminMiddleware, updateNotification)
router.get('/getforuser', authMiddleware, getNotificationsForUser)
>>>>>>> Stashed changes


module.exports = router;