
module.exports = (req, res, next) => {
  const user = req.user;
  if (user.roles === 'admin') {
    return next();
  }
  return res.status(403).json({ status: false, message: 'Bạn không có quyền thao tác.' });
};
