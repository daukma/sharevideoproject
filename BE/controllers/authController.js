require('dotenv').config();
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../utils/token');
const tokenModel = require('../models/tokenModel');

exports.register = async (req, res) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const { username, password, phone, address, name, profile, dob } = req.body;

  if (req.file) {
    profile = `${process.env.HOST}:${process.env.PORT}/uploads/${req.file.filename}`;
=======
  const { username, password, phone, address, name, dob } = req.body;
  let profile = '/default.png'
  if (req.file) {
    profile = `/videos/${req.file.filename}`;
>>>>>>> Stashed changes
=======
  const { username, password, phone, address, name, dob } = req.body;
  let profile = '/default.png'
  if (req.file) {
    profile = `/videos/${req.file.filename}`;
>>>>>>> Stashed changes
  }
  // 1. Check thiếu dữ liệu
  if (!username || !password) {
    return res.status(400).json({ status: false, message: 'Vui lòng nhập đầy đủ username, password và email' });
  } try {
    // 2. Check username đã tồn tại
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ status: false, message: 'Tài khoản đã tồn tại!' });
    }
    // 3. Hash password & tạo user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, dob, phone, address, name, profile });
    await user.save();

    res.status(201).json({ status: true, message: 'Đăng ký thành công' });
  } catch (error) {
    console.error('Đăng ký lỗi:', error);
    res.status(500).json({ status: false, message: 'Có lỗi xảy ra, thử lại sau' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ status: false, message: 'Vui lòng nhập username và password' });
  }
  try {
    // 2. Tìm user theo username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ status: false, message: 'Sai tài khoản hoặc mật khẩu' });
    }
    // 3. So sánh password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: false, message: 'Sai tài khoản hoặc mật khẩu' });
    }
    // 4. Tạo token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const existingToken = await tokenModel.findOne({ userId: user._id });
    if (existingToken) {
      existingToken.refreshToken = refreshToken;
      await existingToken.save();
    } else {
      await tokenModel.create({ userId: user._id, refreshToken });
    }

    res.json({
      status: true,
      message: 'Đăng nhập thành công',
      data: {
        accessToken,
        refreshToken,
        roles: user.roles
      }
    });

  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    res.status(500).json({ status: false, message: 'Có lỗi xảy ra, thử lại sau' });
  }
};

exports.refresh = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(403).json({ status: false, message: 'Refresh token không hợp lệ' });
  }

  try {
    const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const storedToken = await Token.findOne({ userId: payload.id, refreshToken: token });
    if (!storedToken) return res.status(403).json({ status: 'falied', message: 'Token không hợp lệ' });

    const newAccessToken = generateAccessToken(user);
    res.json({ status: true, accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ status: false, message: 'Refresh token sai hoặc hết hạn' });
  }
};

exports.logout = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: 'Thiếu token' });

  try {
    await Token.findOneAndDelete({ refreshToken: token });
    res.json({ status: false, message: 'Đăng xuất thành công' })
  }
  catch (error) {
    console.error('Lỗi đăng xuất:', error);
    res.status(500).json({ status: false, message: 'Có lỗi xảy ra, thử lại sau' });
  }
};

exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json({ status: true, data: { user } });
};
