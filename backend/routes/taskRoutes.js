const express = require('express');
const taskController = require('../controllers/taskController');
const { authenticateJWT, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
  '/',
  authenticateJWT,
  authorizeRoles('Manager', 'Admin'),
  taskController.createTask
);

router.get('/', authenticateJWT, taskController.getTasks);
router.get('/:id', authenticateJWT, taskController.getTaskById);

// Only 'User' role is allowed to update task status
router.put(
  '/:id',
  authenticateJWT,
  authorizeRoles('User'), // Only 'User' role is allowed to update task status
  taskController.updateTask
);

router.delete(
  '/:id',
  authenticateJWT,
  authorizeRoles('Manager', 'Admin'),
  taskController.deleteTask
);

module.exports = router;


