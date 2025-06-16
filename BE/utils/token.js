const jwt = require('jsonwebtoken');

exports.generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, roles: user.roles }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10h' });
};

exports.generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id, roles: user.roles }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};
