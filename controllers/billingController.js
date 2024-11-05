const Bill = require('../models/Bill'); // Giả sử bạn có model Bill

// Lấy danh sách tất cả các hóa đơn
exports.getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy thông tin hóa đơn theo ID
exports.getBillById = async (req, res) => {
  const billId = req.params.id;
  try {
    const bill = await Bill.findById(billId);
    if (!bill) {
      return res.status(404).json({ message: 'Không tìm thấy hóa đơn.' });
    }
    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Tạo hóa đơn mới
exports.createBill = async (req, res) => {
  const { invoiceNumber, customerId, amount, description, paymentDate, status, services } = req.body; 
  
  // Kiểm tra dữ liệu đầu vào
  if (!invoiceNumber || !customerId || !amount || !description) {
    return res.status(400).json({ message: 'invoiceNumber, customerId, amount, and description are required.' });
  }

  try {
    const newBill = new Bill({ 
      invoiceNumber, // Số hóa đơn
      customerId, 
      amount, 
      description,
      paymentDate, // Ngày thanh toán (nếu có)
      status, // Trạng thái hóa đơn
      services // Danh sách dịch vụ (nếu có)
    });

    await newBill.save(); // Lưu vào cơ sở dữ liệu
    res.status(201).json(newBill); // Trả về mã 201 và dữ liệu hóa đơn mới tạo
  } catch (error) {
    res.status(500).json({ message: error.message }); // Nếu có lỗi
  }
};



// Cập nhật hóa đơn
exports.updateBill = async (req, res) => {
  const { id } = req.params; 
  const { invoiceNumber, customerId, amount, description, paymentDate, status, services } = req.body; 

  console.log("Updating Bill ID:", id);
  console.log("New Data:", { invoiceNumber, customerId, amount, description, paymentDate, status, services });

  if (!invoiceNumber || !customerId || !amount || !description) {
    return res.status(400).json({ message: 'invoiceNumber, customerId, amount, and description are required.' });
  }

  try {
    const updatedBill = await Bill.findByIdAndUpdate(id, { 
      invoiceNumber,
      customerId,
      amount,
      description,
      paymentDate,
      status,
      services
    }, { new: true, runValidators: true });

    if (!updatedBill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    console.log("Updated Bill:", updatedBill); // Log hóa đơn đã cập nhật
    res.json(updatedBill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Xóa hóa đơn
exports.deleteBill = async (req, res) => {
  const billId = req.params.id;
  try {
    const deletedBill = await Bill.findByIdAndDelete(billId);
    if (!deletedBill) {
      return res.status(404).json({ message: 'Không tìm thấy hóa đơn.' });
    }
    res.status(200).json({ message: 'Hóa đơn đã bị xóa.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // Hoàn tiền cho hóa đơn
// exports.refundBill = async (req, res) => {
//   const { id } = req.params; // Lấy ID từ tham số URL
//   const { refundAmount } = req.body; // Số tiền hoàn lại

//   // Kiểm tra số tiền hoàn lại
//   if (!refundAmount || refundAmount <= 0) {
//     return res.status(400).json({ message: 'Refund amount must be greater than 0.' });
//   }

//   try {
//     // Tìm hóa đơn theo ID
//     const bill = await Bill.findById(id);

//     if (!bill) {
//       return res.status(404).json({ message: 'Bill not found' });
//     }

//     // Kiểm tra xem hóa đơn đã được hoàn tiền chưa
//     if (bill.isRefunded) {
//       return res.status(400).json({ message: 'Bill has already been refunded.' });
//     }

//     // Cập nhật hóa đơn với thông tin hoàn tiền
//     bill.isRefunded = true;
//     bill.refundAmount = refundAmount;
//     bill.refundDate = new Date(); // Cập nhật ngày hoàn tiền

//     const updatedBill = await bill.save(); // Lưu thay đổi vào cơ sở dữ liệu

//     res.json(updatedBill); // Trả về hóa đơn đã được cập nhật
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
