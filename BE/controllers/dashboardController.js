const User = require('../models/userModel');
const Video = require('../models/videoModel');

const moment = require('moment');

exports.getDashboardSummary = async (req, res) => {
  try {
    // Tổng số user
    const total = await User.countDocuments();

    // Số user mới theo từng tháng (12 tháng gần nhất)
    const monthlyGrowth = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: moment().subtract(11, 'months').startOf('month').toDate()
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          users: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);

    // Chuyển dữ liệu về dạng dễ đọc
    const formattedData = monthlyGrowth.map(item => ({
      month: `${item._id.month}/${item._id.year}`,
      users: item.users
    }));

    return res.json({
      total,
      monthlyGrowth: formattedData
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getVideoDashboard = async (req, res) => {
  try {
    // Tổng số video
    const total = await Video.countDocuments();

    // Video mới theo tháng (trong 12 tháng gần nhất)
    const monthlyGrowth = await Video.aggregate([
      {
        $match: {
          createdAt: {
            $gte: moment().subtract(11, 'months').startOf('month').toDate()
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          videos: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);

    const formatted = monthlyGrowth.map(item => ({
      month: `${item._id.month}/${item._id.year}`,
      videos: item.videos
    }));

    return res.json({
      total,
      monthlyGrowth: formatted
    });
  } catch (err) {
    console.error('Video dashboard error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};