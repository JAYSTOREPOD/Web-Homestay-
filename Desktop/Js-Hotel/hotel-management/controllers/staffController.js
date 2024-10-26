// staffController.js

const Staff = require('../models/Staff'); // Giả sử bạn có model Staff

// Lấy danh sách tất cả nhân viên
exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy thông tin nhân viên theo ID
exports.getStaffById = async (req, res) => {
  const staffId = req.params.id;
  try {
    const staff = await Staff.findById(staffId);
    if (!staff) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên.' });
    }
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tạo nhân viên mới
exports.createStaff = async (req, res) => {
  const { name, phone, position, salary, role } = req.body;
  try {
    // Kiểm tra sự tồn tại của phone và position
    const existingStaffByPhone = await Staff.findOne({ phone });
    const existingStaffByPosition = await Staff.findOne({ position });

    if (existingStaffByPhone) {
      return res.status(400).json({ message: "Số điện thoại đã tồn tại." });
    }
    if (existingStaffByPosition) {
      return res.status(400).json({ message: "Vị trí đã tồn tại." });
    }

    const newStaff = new Staff({ name, phone, position, salary, role });
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Cập nhật nhân viên
exports.updateStaff = async (req, res) => {
  const staffId = req.params.id;
  try {
    const updatedStaff = await Staff.findByIdAndUpdate(staffId, req.body, { new: true });
    if (!updatedStaff) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên.' });
    }
    res.status(200).json(updatedStaff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa nhân viên
exports.deleteStaff = async (req, res) => {
  const staffId = req.params.id;
  try {
    const deletedStaff = await Staff.findByIdAndDelete(staffId);
    if (!deletedStaff) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên.' });
    }
    res.status(200).json({ message: 'Nhân viên đã bị xóa.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
