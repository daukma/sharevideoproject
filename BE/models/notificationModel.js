const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  notificationType: {
    type: String,
    required: true,
    enum: ['system', 'like', 'comment', 'follow', 'reply']
  },
  message: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
  useToId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isRead: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);