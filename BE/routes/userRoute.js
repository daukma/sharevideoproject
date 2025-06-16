const express = require('express'); // Import thư viện express
const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const authRolesMiddleware = require('../middlewares/authRolesMiddleware');
const upload = require('../helps/multer');

const { getAllUsers, getUserById, updateUser, deleteUser } = userController; // Import các hàm từ userController // Import middleware xác thực người dùng

router.get('/', authMiddleware, getAllUsers); // Lấy danh sách người dùng
router.get('/:id', authMiddleware, getUserById); // Lấy thông tin người dùng theo ID
router.put('/:id', authMiddleware, authRolesMiddleware, upload.single('image'), updateUser); // Cập nhật thông tin người dùng
router.delete('/:id', authMiddleware, authRolesMiddleware, deleteUser); // Xóa người dùng theo ID

module.exports = router; // Xuất router để sử dụng trong các file khác