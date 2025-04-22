require('dotenv').config();

const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_LINK);
  } catch (error) {
    console.error('❌ Không thể kết nối MongoDB:', error.message);
    process.exit(1); // thoát app nếu connect fail
  }
};

// Sự kiện kết nối
mongoose.connection.on('connected', () => {
  console.log('✅ Đã kết nối MongoDB!');
});

// Sự kiện mất kết nối
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB bị ngắt kết nối.');
});

// Sự kiện lỗi
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB lỗi:', err);
});

process.on('SIGINT', async () => {
  await conn.close();
  console.log('Kết nối đến MongoDB đã đóng.');
  process.exit(0);
});

module.exports = connectDB;