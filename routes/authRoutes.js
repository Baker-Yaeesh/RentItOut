 

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
 
router.post('/register', authMiddleware,authController.register);

 
router.post('/login', authController.login);

 
router.post('/verify', authController.verify);

module.exports = router;
