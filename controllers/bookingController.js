const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const User = require('../models/User');

// Lấy tất cả các đặt phòng
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();

   
    const formattedBookings = bookings.map(booking => {
      const options = {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour12: false 
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
      hour12: false 
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

  
  const startDate = new Date(checkInDate);
  const endDate = new Date(checkOutDate);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return res.status(400).json({ message: 'Ngày giờ không hợp lệ.' });
  }

  if (startDate >= endDate) {
    return res.status(400).json({ message: 'Ngày trả phòng phải sau ngày nhận phòng.' });
  }

  try {
  
    const roomExists = await Room.findById(roomId);
    if (!roomExists) {
      return res.status(404).json({ message: 'Room ID không tồn tại.' });
    }

   
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: 'User ID không tồn tại.' });
    }

  
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

// Chuyển phòng
exports.moveRoom = async (req, res) => {
  const { bookingId, newRoomId } = req.body;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Đặt phòng không tìm thấy.' });
    }

    // Kiểm tra phòng mới có còn trống không
    const isAvailable = await Booking.isRoomAvailable(newRoomId, booking.startDate, booking.endDate);
    if (!isAvailable) {
      return res.status(400).json({ message: 'Phòng mới không còn trống trong thời gian này.' });
    }

    // Cập nhật phòng
    booking.room = newRoomId;
    await booking.save();
    
    res.status(200).json({ message: 'Chuyển phòng thành công.', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};