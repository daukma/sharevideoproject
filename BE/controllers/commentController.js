const Comment = require('../models/commentModel');
const User = require('../models/userModel');
const { createNotification } = require('./notificationController');

const getAllComments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const total = await Comment.countDocuments();
    const totalPage = Math.ceil(total / limit);
    const comments = await Comment.find().populate('userId', 'name profile username').sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit);
    if (!comments || comments.length === 0) return res.status(404).json({ status: false, message: 'Không tìm thấy bình luận nào' });
    res.json({
      status: true, data: comments, metaData: {
        total,
        page,
        limit,
        totalPage
      }
    });
  } catch (error) {
    console.error('Lỗi lấy danh sách bình luận:', error);
    res.status(500).json({ status: false, message: 'Có lỗi xảy ra, thử lại sau' });
  }
}

const getCommentByVideoId = async (req, res) => {
  const videoId = req.params.videoId;
  try {
    const comments = await Comment.find({ videoId }).populate('userId', 'name profile').sort({ createdAt: -1 });
    if (!comments || comments.length === 0) return res.status(404).json({ status: false, message: 'Không tìm thấy bình luận nào' });
    res.json({ status: true, data: { comments } });
  } catch (error) {
    console.error('Lỗi lấy bình luận:', error);
    res.status(500).json({ status: false, message: 'Có lỗi xảy ra, thử lại sau' });
  }
}


const createComment = async (req, res) => {


  const { videoId, content } = req.body;
  if (!videoId || !content) return res.status(400).json({ status: false, message: 'Vui lòng nhập đầy đủ thông tin' });
  try {
    const comment = await Comment.create({
      videoId,
      userId: req.user.id,
      content,
    });

    const user = await User.findById(req.user.id);
    if (!user) return;
    createNotification({
      notificationType: 'comment',
      message: `${user.name} đã bình luận video của bạn`,
      userId: req.user.id,
      useToId: req.body.userId,
      videoId: videoId,
      commentId: comment._id,
    });

    res.status(201).json({ status: true, message: 'Thêm bình luận thành công', data: { comment } });
  } catch (error) {
    console.error('Lỗi thêm bình luận:', error);
    res.status(500).json({ status: false, message: 'Có lỗi xảy ra, thử lại sau' });
  }
}
const updateComment = async (req, res) => {
  const { content } = req.body;
  const commentId = req.params.id;
  if (!content) return res.status(400).json({ status: false, message: 'Vui lòng nhập nội dung bình luận' });
  try {
    const comment = await Comment.findByIdAndUpdate(commentId, { content }, { new: true });
    if (!comment) return res.status(404).json({ status: false, message: 'Bình luận không tồn tại' });
    res.json({ status: true, message: 'Cập nhật bình luận thành công', data: { comment } });
  } catch (error) {
    console.error('Lỗi cập nhật bình luận:', error);
    res.status(500).json({ status: false, message: 'Có lỗi xảy ra, thử lại sau' });
  }
}
const deleteComment = async (req, res) => {
  const commentId = req.params.id;
  try {
    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) return res.status(404).json({ status: false, message: 'Bình luận không tồn tại' });
    res.json({ status: true, message: 'Xóa bình luận thành công' });
  } catch (error) {
    console.error('Lỗi xóa bình luận:', error);
    res.status(500).json({ status: false, message: 'Có lỗi xảy ra, thử lại sau' });
  }
}

module.exports = {
  getAllComments,
  getCommentByVideoId,
  createComment,
  updateComment,
  deleteComment,
}