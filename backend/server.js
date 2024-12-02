import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Thêm CORS
import connectDB from './config/db.js'; // Kết nối từ file db.js đã sửa
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import staffRoutes from './routes/staffRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import billingRoutes from './routes/billingRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import settingRoutes from './routes/settingRoutes.js';
import logRoutes from './routes/logRoutes.js';

dotenv.config();

const app = express();

// Middleware to parse JSON body
app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost', // Đặt nguồn cho phép kết nối
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Cho phép gửi cookie
};
app.use(cors(corsOptions));

// Kết nối đến database
connectDB();

// Cài đặt routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/payments', billingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/logs', logRoutes);

// Middleware xử lý lỗi khi không tìm thấy route
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Centralized error handler
app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  const message = error.message || 'Server Error';
  res.status(statusCode).json({ message });
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {  
  console.log(`Server running on port ${PORT}`);
});