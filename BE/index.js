require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');

const connectDb = require('./helps/connectDb'); // Kết nối DB
const setupSocket = require('./helps/socket'); // Thiết lập socket

const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoute');
const videoRoutes = require('./routes/videoRoute'); // Import videoRoute
const commentRoutes = require('./routes/commentRoute'); // Import commentRoute
const followRoutes = require('./routes/followRoute'); // Import followRoute
const notificationRoutes = require('./routes/notificationRoute'); // Import notificationRoute

const app = express();
app.use(express.json());

connectDb()

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

const server = http.createServer(app);
// Setup socket
const { io, connectedUsers } = setupSocket(server);
app.set('io', io);
app.set('connectedUsers', connectedUsers);

app.use('/videos', express.static('public/videos'));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/videos', videoRoutes); // Sử dụng videoRoute
app.use('/api/v1/comments', commentRoutes); // Sử dụng commentRoute
app.use('/api/v1/follows', followRoutes); // Sử dụng followRoute
app.use('/api/v1/notifications', notificationRoutes); // Sử dụng notificationRoute

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});