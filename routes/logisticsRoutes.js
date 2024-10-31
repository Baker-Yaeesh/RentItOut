const express = require('express');
const {
    createLogistics,
    getAllLogistics,
    getLogisticsById,
    updateLogistics,
    deleteLogistics
} = require('../controllers/logisticsController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createLogistics);
router.get('/', authMiddleware, getAllLogistics);
router.get('/:id', authMiddleware, getLogisticsById);
router.put('/:id', authMiddleware, updateLogistics);
router.delete('/:id', authMiddleware, deleteLogistics);

module.exports = router;
