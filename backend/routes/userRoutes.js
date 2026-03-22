const express = require('express');
const userController = require('../controllers/userController');
const { authenticateJWT } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateJWT, userController.getAllUsers);

module.exports = router;
