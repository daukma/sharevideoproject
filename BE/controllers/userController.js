const User = require('../models/userModel');

const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const total = await User.countDocuments();
    const totalPage = Math.ceil(total / limit);
    const search = req.query.search || '';

    // Tạo điều kiện lọc
    const query = search
      ? {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { username: { $regex: search, $options: 'i' } }
        ]
      }
      : {};

    if (page > totalPage) return res.status(404).json({ status: false, message: 'Không tìm thấy trang này' });

    const skip = (page - 1) * limit;
    const users = (await User.find(query).skip(skip).limit(limit).select('-password'));
    if (!users || users.length === 0) return res.status(404).json({ status: false, message: 'Không tìm thấy người dùng nào' });

    res.json({ status: true, data: users, metaData: { total, page, limit, totalPage } });
  } catch (error) {
    console.error('Lỗi lấy danh sách người dùng:', error);
    res.status(500).json({ status: false, message: 'Có lỗi xảy ra, thử lại sau' });
  }
}
const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select('-password');
    if (!user) return res.status(404).json({ status: false, message: 'Người dùng không tồn tại' });
    res.json({ status: true, data: { user } });
  } catch (error) {
    console.error('Lỗi lấy người dùng:', error);
    res.status(500).json({ status: false, message: 'Có lỗi xảy ra, thử lại sau' });
  }
}
const updateUser = async (req, res) => {
  try {
    // Giả sử bạn xác thực người dùng qua token hoặc session, lấy userId
    const isAdmin = req.roles;

    const updateData = {};

    if ((!isAdmin || isAdmin !== 'admin') && req.body.roles) {
      console.log('admin:', isAdmin, req.body.roles);
      return res.status(403).json({ status: false, message: 'Bạn không có quyền cập nhật roles' });
    } else {
      updateData.roles = req.body.roles;
    }
    const userId = req.params.id; // Thay bằng logic xác thực thực tế, ví dụ: req.user.id từ JWT
    if (!userId) {
      return res.status(401).json({ status: false, message: 'Yêu cầu xác thực' });
    }
    // Dữ liệu từ client
    const { name, address, phone, dob, profile, password } = req.body;
    // Tạo object chứa các trường cần cập nhật
    if (name) updateData.name = name;
    if (address) updateData.address = address;
    if (phone) updateData.phone = phone;
    if (dob) updateData.dob = new Date(dob);
    if (profile) updateData.profile = profile;
    if (password) {
      // Mã hóa password nếu được cung cấp
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }
    // Cập nhật user trong database
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true } // new: trả về document đã cập nhật, runValidators: kiểm tra schema
    );

    if (!user) {
      return res.status(404).json({ status: false, message: 'Người dùng không tồn tại' });
    }
    res.status(200).json({ status: true, message: 'Cập nhật thành công', data: { id: userId } });
  } catch (error) {
    console.error('Lỗi cập nhật user:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ status: false, message: 'Dữ liệu không hợp lệ', errors: error.errors });
    }
    res.status(500).json({ status: false, message: 'Lỗi server', error: error.message });
  }
}
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ status: false, message: 'Người dùng không tồn tại' });
    res.json({ status: true, message: 'Xóa người dùng thành công' });
  } catch (error) {
    console.error('Lỗi xóa người dùng:', error);
    res.status(500).json({ status: false, message: 'Có lỗi xảy ra, thử lại sau' });
  }
}
module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
  // getMe
};