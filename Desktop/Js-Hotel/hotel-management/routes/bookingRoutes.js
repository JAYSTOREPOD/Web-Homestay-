const express = require('express');
const { getAllBookings, getBookingById, createBooking, updateBooking, deleteBooking } = require('../controllers/bookingController');
const { verifyToken } = require('../middlewares/auth'); 

const router = express.Router();

router.get('/', verifyToken, getAllBookings); 
router.get('/:id', verifyToken, getBookingById);
router.post('/', verifyToken, createBooking);
router.put('/:id', verifyToken, updateBooking);
router.delete('/:id', verifyToken, deleteBooking);

module.exports = router;
