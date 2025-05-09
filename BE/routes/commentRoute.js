const express = require('express');
const router = express.Router();

const { getAllComments, getCommentByVideoId, createComment, updateComment, deleteComment } = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');
const authRolesMiddleware = require('../middlewares/authRolesMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.post('/', authMiddleware, createComment); // Tạo bình luận
router.get('/', authMiddleware, adminMiddleware, getAllComments);// Xem tất cả bình luận (chỉ admin)
router.get('/:videoId', authMiddleware, getCommentByVideoId); // Lấy bình luận theo videoId
router.put('/:id', authRolesMiddleware, updateComment); // Cập nhật bình luận theo ID
router.delete('/:id', authRolesMiddleware, deleteComment); // Xóa bình luận theo ID

module.exports = router;