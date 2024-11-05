const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/auth');


// Middleware xác thực token
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Không có token, truy cập bị từ chối!' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token không hợp lệ!' });
    }
    req.user = user; // Lưu thông tin người dùng vào request
    next();
  });
};

// Middleware kiểm tra quyền admin
exports.verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Chỉ admin mới có quyền truy cập!' });
  }
  next();
};

// Middleware kiểm tra quyền nhân viên
exports.verifyStaff = (req, res, next) => {
  if (req.user.role !== 'staff' && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Chỉ nhân viên hoặc admin mới có quyền truy cập!' });
  }
  next();
};
