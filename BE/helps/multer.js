// config/multer.js
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Đường dẫn tới thư mục video
const videoDir = path.join(__dirname, '../public/videos');

// Kiểm tra nếu thư mục videos không tồn tại thì tạo mới
if (!fs.existsSync(videoDir)) {
  fs.mkdirSync(videoDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, videoDir); // Sử dụng đường dẫn videoDir
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // Giới hạn dung lượng 100MB
  fileFilter(req, file, cb) {
    const allowedTypes = ['video/', 'image/'];
    if (!allowedTypes.some(type => file.mimetype.startsWith(type))) {
      return cb(new Error('Chỉ được upload file ảnh hoặc video'));
    }
    cb(null, true);
  },
});

module.exports = upload;