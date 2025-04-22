const Follow = require('../models/followModel');
const { createNotification } = require('./notificationController');

const createFollow = async (req, res) => {
  const { followFromId, followToId } = req.body;
  if (!followFromId || !followToId) return res.status(400).json({ status: false, message: 'Vui lòng nhập đầy đủ thông tin' });
  try {
    const newFollow = new Follow({ followFromId, followToId });
    await newFollow.save();
    createNotification({
      notificationType: 'follow',
      message: `${followFromId} đã theo dõi bạn`,
      userId: followFromId,
      useToId: followToId,
    });
    res.status(201).json({ status: true, message: 'Theo dõi thành công', data: newFollow });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi server', error });
  }
}

const getAllFollows = async (req, res) => {
  try {
    const follows = await Follow.find({}).populate('followFromId followToId', 'name avatart');
    res.status(200).json({ status: true, message: 'Lấy danh sách theo dõi thành công', data: follows });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi server', error });
  }
}

const getFollowFromId = async (req, res) => {
  try {
    const followId = req.params.id;
    const type = req.query.type
    if (!followId) return res.status(400).json({ status: false, message: 'Vui lòng nhập id theo dõi' });
    if (!type) return res.status(400).json({ status: false, message: 'Vui lòng nhập type theo dõi' });
    if (type === 'followFromId') {
      const follow = await Follow.find({ followFromId: followId }).populate('followFromId', 'name avatar');
      if (!follow) return res.status(404).json({ status: false, message: 'Theo dõi không tồn tại' });
      res.status(200).json({ status: true, message: 'Lấy theo dõi thành công', data: follow });
    }
    else {
      const follow = await Follow.find({ followToId: followId }).populate('followToId', 'name avatar');
      if (!follow) return res.status(404).json({ status: false, message: 'Theo dõi không tồn tại' });
      res.status(200).json({ status: true, message: 'Lấy theo dõi thành công', data: follow });
    }

  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi server', error });
  }
}

const updateFollow = async (req, res) => {
  const { followFromId, followToId, status } = req.body;
  if (!followFromId || !followToId) return res.status(400).json({ status: false, message: 'Vui lòng nhập đầy đủ thông tin' });
  try {
    const follow = await Follow.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!follow) return res.status(404).json({ status: false, message: 'Theo dõi không tồn tại' });
    res.status(200).json({ status: true, message: 'Cập nhật theo dõi thành công', data: follow });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi server', error });
  }
}
const deleteFollow = async (req, res) => {
  const followId = req.params.id;
  try {
    const follow = await Follow.findByIdAndDelete(followId);
    if (!follow) return res.status(404).json({ status: false, message: 'Theo dõi không tồn tại' });
    res.status(200).json({ status: true, message: 'Xóa theo dõi thành công' });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi server', error });
  }
}

module.exports = {
  createFollow,
  getAllFollows,
  getFollowFromId,
  updateFollow,
  deleteFollow
};