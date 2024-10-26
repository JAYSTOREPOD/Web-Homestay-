const Booking = require('../models/Booking');
const mongoose = require('mongoose');

// Lấy tất cả các đặt phòng
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();

    // Định dạng lại ngày giờ cho tất cả các đặt phòng
    const formattedBookings = bookings.map(booking => {
      const options = {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour12: false // Định dạng 24 giờ
      };

      return {
        ...booking._doc,
        startDate: `12 giờ ngày ${booking.startDate.toLocaleString('vi-VN', options)}`,
        endDate: `12 giờ ngày ${booking.endDate.toLocaleString('vi-VN', options)}`
      };
    });

    res.status(200).json(formattedBookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy đặt phòng theo ID
exports.getBookingById = async (req, res) => {
  const bookingId = req.params.id;
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Không tìm thấy đặt phòng.' });
    }

    const options = {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour12: false // Định dạng 24 giờ
    };

    const formattedBooking = {
      ...booking._doc,
      startDate: `12 giờ ngày ${booking.startDate.toLocaleString('vi-VN', options)}`,
      endDate: `12 giờ ngày ${booking.endDate.toLocaleString('vi-VN', options)}`
    };

    res.status(200).json(formattedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tạo đặt phòng mới
exports.createBooking = async (req, res) => {
  const { roomId, userId, checkInDate, checkOutDate } = req.body;

  // Chuyển đổi ngày giờ từ chuỗi thành đối tượng Date
  const startDate = new Date(checkInDate);
  const endDate = new Date(checkOutDate);

  // Kiểm tra nếu giá trị chuyển đổi không hợp lệ
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return res.status(400).json({ message: 'Ngày giờ không hợp lệ.' });
  }

  // Kiểm tra xem startDate có lớn hơn hoặc bằng endDate không
  if (startDate >= endDate) {
    return res.status(400).json({ message: 'Ngày trả phòng phải sau ngày nhận phòng.' });
  }

  // Ghi log giá trị của startDate và endDate
  console.log('Start Date:', startDate);
  console.log('End Date:', endDate);

  try {
    // Kiểm tra tính khả dụng của phòng
    const isAvailable = await Booking.isRoomAvailable(new mongoose.Types.ObjectId(roomId), startDate, endDate);
    if (!isAvailable) {
      return res.status(400).json({ message: 'Phòng không khả dụng trong khoảng thời gian này.' });
    }

    const newBooking = new Booking({
      room: new mongoose.Types.ObjectId(roomId),
      customer: new mongoose.Types.ObjectId(userId),
      startDate,
      endDate
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật đặt phòng
exports.updateBooking = async (req, res) => {
  const bookingId = req.params.id;
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(bookingId, req.body, { new: true });
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Không tìm thấy đặt phòng.' });
    }
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa đặt phòng
exports.deleteBooking = async (req, res) => {
  const bookingId = req.params.id;
  try {
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Không tìm thấy đặt phòng.' });
    }
    res.status(200).json({ message: 'Đặt phòng đã được xóa.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
