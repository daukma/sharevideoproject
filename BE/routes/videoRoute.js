const express = require('express');
const router = express.Router();

const upload = require('../helps/multer');
const { uploadVideo, getAllVideos, getVideoById, deleteVideo } = require('../controllers/videoController');
const authMiddleware = require('../middlewares/authMiddleware');
const authRolesMiddleware = require('../middlewares/authRolesMiddleware');

router.post('/upload', authMiddleware, upload.single('video'), uploadVideo);
router.get('/', authMiddleware, getAllVideos); // Lấy danh sách video
router.get('/:id', authMiddleware, getVideoById); // Lấy thông tin video theo ID
router.delete('/:id', authMiddleware, authRolesMiddleware, deleteVideo); // Xóa video theo ID

module.exports = router;