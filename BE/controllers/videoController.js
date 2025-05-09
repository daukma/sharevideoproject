const Video = require('../models/videoModel');

const uploadVideo = async (req, res) => {
  console.log(req.file)
  const filePath = req.file.path;

  try {
    // Lưu video vào DB
    const video = await Video.create({
      title: req.body.title,
      videoUrl: '/videos/' + req.file.filename, // đường dẫn public
      userId: req.user.id,
    });

    res.status(201).json({ message: 'Upload thành công', video });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi khi xử lý video' });
  }
};

const getAllVideos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const total = await Video.countDocuments();
    const totalPage = Math.ceil(total / limit);
    const videos = await Video.find().limit(limit).skip((page - 1) * limit).populate('userId', 'name profile username').sort({ createdAt: -1 });
    res.status(200).json({
      status: true, message: 'Lấy video thành công', data: videos, metaData: {
        total,
        page,
        limit,
        totalPage
      }
    });
  } catch (error) {
    console.error('Lỗi lấy video:', error);
    res.status(500).json({ status: false, message: 'Có lỗi xảy ra, thử lại sau' });
  }
}

const getVideoById = async (req, res) => {
  const videoId = req.params.id;
  try {
    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ status: false, message: 'Video không tồn tại' });
    res.status(200).json({ status: true, message: 'Lấy video thành công', data: video });
  } catch (error) {
    console.error('Lỗi lấy video:', error);
    res.status(500).json({ status: false, message: 'Có lỗi xảy ra, thử lại sau' });
  }
}

const getVideoByUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const video = await Video.find({ userId });
    if (!video) return res.status(404).json({ status: false, message: 'Video không tồn tại' });
    res.status(200).json({ status: true, message: 'Lấy video thành công', data: video });
  } catch (error) {
    console.error('Lỗi lấy video:', error);
    res.status(500).json({ status: false, message: 'Có lỗi xảy ra, thử lại sau' });
  }
}

const deleteVideo = async (req, res) => {
  try {
    const id = req.params.id;
    const video = await Video.findByIdAndDelete(id);
    if (!video) return res.status(404).json({ status: false, message: 'Video không tồn tại' });
    res.json({ status: true, message: 'Xóa video thành công' });
  } catch (error) {
    console.error('Lỗi xóa video:', error);
    res.status(500).json({ status: false, message: 'Có lỗi xảy ra, thử lại sau' });
  }
}


module.exports = {
  getAllVideos,
  getVideoById,
  deleteVideo,
  uploadVideo,
  getVideoByUser
};