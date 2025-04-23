const express = require('express');
const router = express.Router();

const { createFollow, getAllFollows, getFollowFromId, getFollowToId, updateFollow, deleteFollow } = require('../controllers/followController');
const authMiddleware = require('../middlewares/authMiddleware');
const authRolesMiddleware = require('../middlewares/authRolesMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.post('/', authMiddleware, createFollow);
router.get('/', adminMiddleware, getAllFollows);
router.get('/:id', authMiddleware, getFollowFromId); // Lấy bình luận theo videoId
router.put('/:id', authMiddleware, authRolesMiddleware, updateFollow); // Cập nhật bình luận theo ID
router.delete('/:id', adminMiddleware, deleteFollow); // Xóa bình luận theo ID

module.exports = router;