// socket/index.js
const { Server } = require('socket.io');

const connectedUsers = new Map();

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*", // hoặc domain React
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    }
  });

  io.on('connection', (socket) => {
    console.log('🟢 Socket connected:', socket.id);

    socket.on('register', (userId) => {
      connectedUsers.set(userId, socket.id);
      console.log(`✅ User ${userId} registered with socket ${socket.id}`);
    });

    socket.on('disconnect', () => {
      for (const [userId, socketId] of connectedUsers.entries()) {
        if (socketId === socket.id) {
          connectedUsers.delete(userId);
          console.log(`🔴 User ${userId} disconnected`);
          break;
        }
      }
    });
  });

  return { io, connectedUsers };
}

module.exports = setupSocket;