const express = require('express');
const userController = require('../controllers/userController');
const { authenticateJWT } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all users (for task assignment dropdown)
router.get('/', authenticateJWT, userController.getAllUsers);

module.exports = router;
