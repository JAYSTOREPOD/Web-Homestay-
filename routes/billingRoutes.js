const express = require('express');
const { getAllBills, getBillById, createBill, updateBill, deleteBill, refundBill } = require('../controllers/billingController');
const { verifyToken } = require('../middlewares/auth'); 
const router = express.Router();

router.get('/', verifyToken, getAllBills); 
router.get('/:id', verifyToken, getBillById);
router.post('/', verifyToken, createBill);
router.put('/:id', verifyToken, updateBill); 
router.delete('/:id', verifyToken, deleteBill); 
// router.put('/:id/refund', verifyToken, refundBill);

module.exports = router;
