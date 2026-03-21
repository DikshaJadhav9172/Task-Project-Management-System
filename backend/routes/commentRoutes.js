const express = require('express');
const commentController = require('../controllers/commentController');
const { authenticateJWT } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticateJWT, commentController.createComment);
router.get('/:taskId', authenticateJWT, commentController.getCommentsByTask);

module.exports = router;

