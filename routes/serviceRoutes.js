const express = require('express');
const { getAllServices, getServiceById, createService, updateService, deleteService } = require('../controllers/serviceController');
const { verifyToken } = require('../middlewares/auth'); 

const router = express.Router();

router.get('/', verifyToken, getAllServices); 
router.get('/:id', verifyToken, getServiceById); 
router.post('/', verifyToken, createService); 
router.put('/:id', verifyToken, updateService); 
router.delete('/:id', verifyToken, deleteService); 

module.exports = router;
