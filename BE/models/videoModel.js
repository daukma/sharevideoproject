const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String },// tiêu đề
  description: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hastags: { type: Array },
  thumbnail: { type: String },
  videoUrl: { type: String },
  like: { type: Array, defaul: [] },
  public: { type: String, default: 'public', enum: ['public', 'private'] }
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);