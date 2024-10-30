 
const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');
const authMiddleware = require('../middleware/authMiddleware'); 

 
router.use(authMiddleware);

 
router.get('/user/:userId', authMiddleware,recommendationController.getRecommendationsForUser);

 
router.post('/', authMiddleware,recommendationController.createRecommendation);

 
router.get('/:id',authMiddleware, recommendationController.getRecommendationById);

 
router.put('/:id',authMiddleware, recommendationController.updateRecommendation);

 
router.delete('/:id',authMiddleware, recommendationController.deleteRecommendation);

module.exports = router;
