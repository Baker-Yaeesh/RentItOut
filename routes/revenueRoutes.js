 
const express = require('express');
const router = express.Router();
const revenueController = require('../controllers/revenueController');
const authMiddleware = require('../middleware/authMiddleware');
 
router.get('/', authMiddleware,revenueController.getAllRevenue);

 
router.get('/:id', authMiddleware,revenueController.getRevenueById);
router.put('/:id', authMiddleware, revenueController.updateRevenue);

router.put('/:id', authMiddleware, revenueController.updateRevenue); // New update route
router.post('/', authMiddleware,revenueController.createRevenue);

 
 

 
router.delete('/:id', authMiddleware,revenueController.deleteRevenue);

module.exports = router;
