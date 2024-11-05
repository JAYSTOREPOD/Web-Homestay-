const mongoose = require('mongoose'); // Nhập mongoose

const BillSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  paymentDate: { type: Date },
  status: { type: String, enum: ['Paid', 'Unpaid'], required: true },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  isRefunded: { type: Boolean, default: false },
  refundAmount: { type: Number },
  refundDate: { type: Date }
});

module.exports = mongoose.model('Bill', BillSchema);
