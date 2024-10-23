const express = require('express');
const { register, login, forgotPassword, resetPassword, changePassword } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/auth'); 

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset/:token', resetPassword); 
router.post('/reset-password', resetPassword);
router.post('/change-password', verifyToken, changePassword); 

module.exports = router; 
