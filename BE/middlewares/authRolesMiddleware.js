const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const user = req.user;
  const userId = req.params.id;

  if (user.roles === 'admin') {
    req.roles = 'admin'
    return next();
  }

  if (user.id === userId) {
    return next();
  }

  return res.status(403).json({ status: false, message: 'Bạn không có quyền thao tác.' });
};
