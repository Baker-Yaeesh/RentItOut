 
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
    createReview,
    getAllReviews,
    getReviewsByItemId,
    getReviewsByUserId,
    updateReview,
    deleteReview
} = require('../controllers/reviewController');

const router = express.Router();

 
router.post('/', authMiddleware,createReview);  
router.get('/', authMiddleware,getAllReviews);  
router.get('/item/:itemId', authMiddleware,getReviewsByItemId);  
router.get('/user/:userId',authMiddleware, getReviewsByUserId);  
router.put('/:reviewId', authMiddleware,updateReview);  
router.delete('/:reviewId',authMiddleware, deleteReview);  

module.exports = router;
