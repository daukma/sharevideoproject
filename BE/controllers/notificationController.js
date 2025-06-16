const Notification = require('../models/notificationModel');


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
    const search = req.query.search || '';

    // Tạo điều kiện lọc
    const query = search
      ? {
        $or: [
          { message: { $regex: search, $options: 'i' } },
        ]
      }
      : {};

    const total = await Notification.countDocuments(query);
    const totalPage = Math.ceil(total / limit);
    const notifications = await Notification.find(query).limit(limit).skip((page - 1) * limit).populate('userId', 'name profile username').sort({ createdAt: -1 });
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
const getNotificationsForUser = async (req, res) => {
  const { id } = req.user
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const total = await Notification.countDocuments();
    const totalPage = Math.ceil(total / limit);
    const notifications = await Notification.find({ $or: [{ useToId: id }, { notificationType: 'system' }] }).limit(limit).skip((page - 1) * limit).populate('userId', 'name profile username').sort({ createdAt: -1 });
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

const updateNotification = async (req, res) => {
  try {
    const { id } = req.params; // Lấy id của thông báo cần cập nhật từ tham số URL
    const { message, notificationType, useToId, videoId, commentId } = req.body;

    // Tìm thông báo theo id
    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({
        status: false,
        message: 'Thông báo không tồn tại',
      });
    }

    // Cập nhật các trường cần thiết
    notification.message = message || notification.message;
    notification.notificationType = notificationType || notification.notificationType;
    notification.useToId = useToId || notification.useToId;
    notification.videoId = videoId || notification.videoId;
    notification.commentId = commentId || notification.commentId;

    // Lưu lại thông báo sau khi cập nhật
    await notification.save();

    res.status(200).json({
      status: true,
      message: 'Cập nhật thông báo thành công',
      data: notification,
    });
  } catch (error) {
    console.error('Lỗi cập nhật thông báo:', error);
    res.status(500).json({
      status: false,
      message: 'Có lỗi xảy ra, thử lại sau',
    });
  }
};
const getNotificationsForUser = async (req, res) => {
  const { id } = req.user
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const total = await Notification.countDocuments();
    const totalPage = Math.ceil(total / limit);
    const notifications = await Notification.find({ $or: [{ useToId: id }, { notificationType: 'system' }] }).limit(limit).skip((page - 1) * limit).populate('userId', 'name profile username').sort({ createdAt: -1 });
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


module.exports = {
  createNotification,
  createSystemNotification,
  getAllNotifications,
<<<<<<< Updated upstream
=======
  deleteNotification,
  updateNotification,
>>>>>>> Stashed changes
  getNotificationsForUser
};