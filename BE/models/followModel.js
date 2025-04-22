const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
  followFromId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  followToId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    default: 'following',
    enum: ['following', 'unfollow']
  },
}, { timestamps: true });

module.exports = mongoose.model('Follow', followSchema);