const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: { // Là id của người bình luận 
    type: mongoose.Schema.Types.ObjectId,// Kiểu dữ liêu Schema.Types.ObjectId,
    ref: 'User', // Liên kết đến bảng user
    required: true
  },
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true
  },
  reptoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  content: {
    type: String,
    required: true,
    trim: true, // Cắt khoảng trắng
  },
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);