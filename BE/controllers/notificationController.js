const Notification = require('../models/notificationModel');
const User = require('../models/userModel');


const createNotification = async ({
  notificationType,
  message,
  userId,       // người thực hiện hành động (sender)
  useToId,      // người nhận thông báo (recipient)
  videoId = null,
  commentId = null,
}) => {// nếu không có useToId thì sử dụng userId
  if (useToId && userId.toString() === useToId.toString()) return;
  await Notification.create({
    notificationType,
    message,
    userId,
    useToId,
    videoId,
    commentId,
  });
}

const createSystemNotification = async (req, res) => {
  const { message } = req.body;
  const notifications = {
    notificationType: 'system',
    message,
    userId: req.user.id,
  };

  await Notification.create(notifications);

  res.json({ status: true, message: 'Thông báo hệ thống đã được gửi tới tất cả người dùng' });
};

const getAllNotifications = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const total = await Notification.countDocuments();
    const totalPage = Math.ceil(total / limit);
    const notifications = await Notification.find().limit(limit).skip((page - 1) * limit).populate('userId', 'name profile username').sort({ createdAt: -1 });
    res.status(200).json({
      status: true, message: 'Lấy danh sách thành công', data: notifications, metaData: {
        total,
        page,
        limit,
        totalPage
      }
    });
  } catch (error) {
    console.error('Lỗi lấy thông báo:', error);
    res.status(500).json({ status: false, message: 'Có lỗi xảy ra, thử lại sau' });
  }
}
const deleteNotification = async (req, res) => {
  try {
    const id = req.params.id;
    const notification = await Notification.findByIdAndDelete(id);
    if (!notification) return res.status(404).json({ status: false, message: 'Thông báo không tồn tại' });
    res.json({ status: true, message: 'Xóa thông báo thành công' });
  } catch (error) {
    console.error('Lỗi xóa thông báo:', error);
    res.status(500).json({ status: false, message: 'Có lỗi xảy ra, thử lại sau' });
  }
}

module.exports = {
  createNotification,
  createSystemNotification,
  getAllNotifications,
  deleteNotification
};