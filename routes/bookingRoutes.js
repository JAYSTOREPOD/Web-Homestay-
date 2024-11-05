// bookingRoutes.js
const express = require('express');
const { getAllBookings, getBookingById, createBooking, updateBooking, deleteBooking, moveRoom } = require('../controllers/bookingController');
const { verifyToken } = require('../middlewares/auth'); 

const router = express.Router();

router.get('/', verifyToken, getAllBookings); 
router.get('/:id', verifyToken, getBookingById);
router.post('/', verifyToken, createBooking);
router.put('/:id', verifyToken, updateBooking);
router.delete('/:id', verifyToken, deleteBooking);
router.post('/move', verifyToken, moveRoom); 

module.exports = router;
