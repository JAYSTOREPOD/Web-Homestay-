const mongoose = require('mongoose');
// const Booking = require('../models/Booking');
const Room = require('../models/Room');

// Lấy tất cả phòng và phân loại theo trạng thái
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    
    const roomStatusCounts = {
      available: 0,
      booked: 0,
      in_use: 0,
      under_maintenance: 0,
      cleaning: 0,
    };

    rooms.forEach(room => {
      if (room.status === "available") roomStatusCounts.available += 1;
      else if (room.status === "booked") roomStatusCounts.booked += 1;
      else if (room.status === "in_use") roomStatusCounts.in_use += 1;
      else if (room.status === "under_maintenance") roomStatusCounts.under_maintenance += 1;
      else if (room.status === "cleaning") roomStatusCounts.cleaning += 1;
    });

    res.status(200).json({ rooms, roomStatusCounts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy phòng theo ID
exports.getRoomById = async (req, res) => {
  const roomId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    return res.status(400).json({ message: 'ID phòng không hợp lệ.' });
  }

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Phòng không tìm thấy.' });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Tạo phòng mới
exports.createRoom = async (req, res) => {
  const { name, type, price, amenities, quantity } = req.body;
  try {
    const newRoom = new Room({ name, type, price, amenities, quantity, availableQuantity: quantity });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật phòng
exports.updateRoom = async (req, res) => {
  const roomId = req.params.id;
  try {
    const updatedRoom = await Room.findByIdAndUpdate(roomId, req.body, { new: true });
    if (!updatedRoom) {
      return res.status(404).json({ message: 'Phòng không tìm thấy.' });
    }
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa phòng
exports.deleteRoom = async (req, res) => {
  const roomId = req.params.id;
  try {
    const deletedRoom = await Room.findByIdAndDelete(roomId);
    if (!deletedRoom) {
      return res.status(404).json({ message: 'Phòng không tìm thấy.' });
    }
    res.status(200).json({ message: 'Phòng đã được xóa.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật trạng thái phòng
exports.updateRoomStatus = async (req, res) => {
  const roomId = req.params.id;
  const { status } = req.body;

  try {
    const validStatuses = ['available', 'booked', 'in_use', 'under_maintenance', 'cleaning', 'cleaned'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Trạng thái không hợp lệ.' });
    }

    const updatedRoom = await Room.findByIdAndUpdate(roomId, { status }, { new: true });
    if (!updatedRoom) {
      return res.status(404).json({ message: 'Phòng không tìm thấy.' });
    }
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Chức năng tìm kiếm phòng
exports.searchRooms = async (req, res) => {
  const { type, status, minPrice, maxPrice, sort, features } = req.query;

  // Kiểm tra các tham số bắt buộc
  if (!type || !status || minPrice === undefined || maxPrice === undefined || !sort) {
      return res.status(400).json({ message: 'Tất cả các tham số bắt buộc phải có.' });
  }

  try {
      // Lập query
      const query = {
          type,
          status,
          price: { $gte: minPrice, $lte: maxPrice }
      };

      if (features) {
          query.features = { $all: features.split(',') }; // Giả định bạn lưu trữ features trong mảng
      }

      // Sắp xếp kết quả
      const sortOption = sort === 'priceAsc' ? { price: 1 } : { price: -1 };

      const rooms = await Room.find(query).sort(sortOption);
      res.status(200).json(rooms);
  } catch (error) {
      res.status(500).json({ message: 'Lỗi máy chủ.' });
  }
};



// Hàm để lấy số lượng trạng thái phòng
// const getRoomStatusCounts = async () => {
//   const counts = await Room.aggregate([
//     { $group: { _id: "$status", count: { $sum: 1 } } }
//   ]);
  
//   const roomStatusCounts = {};
//   counts.forEach(count => {
//     roomStatusCounts[count._id] = count.count;
//   });
  
//   return roomStatusCounts;
// };

// Chuyển phòng
// exports.moveRoom = async (req, res) => {
//   const { bookingId, newRoomId } = req.body;

//   try {
//     const booking = await Booking.findById(bookingId);
//     if (!booking) {
//       return res.status(404).json({ message: 'Đặt phòng không tồn tại.' });
//     }

//     const isAvailable = await Booking.isRoomAvailable(newRoomId, booking.startDate, booking.endDate);
//     if (!isAvailable) {
//       return res.status(400).json({ message: 'Phòng mới không khả dụng.' });
//     }

//     booking.room = newRoomId;
//     await booking.save();

//     res.status(200).json({ message: 'Chuyển phòng thành công.', booking });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
