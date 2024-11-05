const express = require('express');
const { getAllReviews, createReview, deleteReview } = require('../controllers/reviewController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/',getAllReviews);  
router.post('/',createReview);  
router.delete('/:id', deleteReview);  

module.exports = router;
