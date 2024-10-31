 
const express = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

 

 
router.delete('/users/:id',authMiddleware, UserController.deleteUser);

 
router.put('/users/:id',authMiddleware, UserController.updateUser);

 
router.post('/users/check', authMiddleware,UserController.checkUserExists);

module.exports = router;
