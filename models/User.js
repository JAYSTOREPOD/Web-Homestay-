const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength:15,
    maxlength: 20, // Giới hạn tên tối đa 20 ký tự
    match: /^[A-Za-z\s]+$/ // Chỉ cho phép chữ cái và khoảng trắng
  },
  username: { 
    type: String,
    required: true,
    minlength:15,
    maxlength: 20, // Giới hạn username tối đa 20 ký tự
    match: /^[A-Za-z0-9!@#$%^&*()_+={}\[\]:;"'<>?,./|\\`~]+$/
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/ // Kiểm tra định dạng email
  },
  password: {
    type: String,
    required: true,
    minlength:15,
    validate: {
      validator: function(v) {
        // Mật khẩu tối đa 20 ký tự, chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 số, và 1 ký tự đặc biệt
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
      },
      message: props => `${props.value} không hợp lệ! Mật khẩu phải chứa ít nhất một chữ thường, một chữ hoa, một chữ số, một ký tự đặc biệt và có độ dài từ 8 đến 20 ký tự.`
    }
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        // Số điện thoại phải có 10 số và chỉ nhận số
        return /^\d{10}$/.test(v);
      },
      message: props => `${props.value} không phải là số điện thoại hợp lệ! Số điện thoại phải có 10 chữ số.`
    }
  },
  role: {
    type: String,
    enum: ['Admin', 'Staff', 'Customer'],  
    required: false,
    default: 'Customer'
  },
  resetPasswordToken: { type: String }, 
  resetPasswordExpires: { type: Date }   
});

const User = mongoose.model('User', userSchema);

module.exports = User;
