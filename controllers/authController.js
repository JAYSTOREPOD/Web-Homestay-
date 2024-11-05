const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); 
const nodemailer = require('nodemailer'); 

// Cấu hình gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Hàm gửi email
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return reject(error);
      }
      console.log('Email sent:', info.response);
      resolve(info);
    });
  });
};

// Đăng ký người dùng
exports.register = async (req, res) => {
  const { name, username, password, phone, email } = req.body;


  if (!name || !username || !password || !phone || !email) {
    return res.status(400).json({ message: 'Vui lòng cung cấp tất cả các trường bắt buộc.' });
  }

  try {
    
    const existingUser = await User.findOne({ $or: [{ phone }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Số điện thoại hoặc email đã được đăng ký.' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = new User({ name, username, password: hashedPassword, phone, email, verified: false });
    
  
    const verificationToken = crypto.randomBytes(32).toString('hex');
    user.verificationToken = verificationToken;
    await user.save();

    // Gửi email xác thực
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const verificationLink = `http://yourdomain.com/verify-email?token=${verificationToken}`;
    await transporter.sendMail({
      to: email,
      subject: 'Xác thực tài khoản của bạn',
      text: `Nhấn vào liên kết này để xác thực tài khoản của bạn: ${verificationLink}`,
    });

    res.status(201).json({ message: 'Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản của bạn.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xác thực email
exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: 'Token xác thực không hợp lệ.' });
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: 'Email xác thực thành công!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Đăng nhập người dùng

exports.login = async (req, res) => {
  const { email, password } = req.body; // Chỉnh sửa từ username sang email

  if (!email || !password) {
    return res.status(400).json({ message: 'Vui lòng cung cấp email và mật khẩu.' });
  }

  try {
    const user = await User.findOne({ email }); // Tìm kiếm người dùng theo email
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Thông tin đăng nhập không chính xác.' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Quên mật khẩu
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng với email này.' });
    }

    const token = crypto.randomBytes(20).toString('hex');


    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; 

    await user.save();

 
    await sendEmail(
      user.email,
      'Đặt lại mật khẩu',
      `Bạn đang nhận được email này vì bạn (hoặc ai đó) đã yêu cầu đặt lại mật khẩu cho tài khoản của bạn.\n\n` +
      `Vui lòng nhấp vào liên kết sau để đặt lại mật khẩu:\n\n` +
      `http://${req.headers.host}/reset/${token}\n\n` +
      `Nếu bạn không yêu cầu, vui lòng bỏ qua email này và mật khẩu của bạn sẽ không bị thay đổi.\n`
    );

    res.status(200).json({ message: 'Email đặt lại mật khẩu đã được gửi đến ' + user.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
  // console.log("Request params:", req.params)

// Khôi phục mật khẩu
exports.resetPassword = async (req, res) => {
  const { token } = req.params; // Hoặc req.body nếu bạn gửi token trong body
  const { newPassword } = req.body;

  console.log("Received token:", token);

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() } 
    });

    console.log("Found user:", user);

    if (!user) {
      return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.status(200).json({ message: 'Mật khẩu đã được cập nhật thành công.' });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: 'Có lỗi xảy ra trong quá trình khôi phục mật khẩu.' });
  }
};



// Thay đổi mật khẩu
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body; // Lấy mật khẩu cũ và mật khẩu mới từ yêu cầu
  const userId = req.user.id; // Lấy ID người dùng từ token JWT

  try {
    const user = await User.findById(userId); // Tìm người dùng theo ID
    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(401).json({ message: 'Mật khẩu cũ không chính xác.' });
    }

    // Băm mật khẩu mới và lưu vào người dùng
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save(); // Lưu thay đổi vào cơ sở dữ liệu

    res.status(200).json({ message: 'Mật khẩu đã được cập nhật thành công.' }); // Phản hồi thành công
  } catch (error) {
    res.status(500).json({ message: error.message }); // Phản hồi lỗi
  }
};
