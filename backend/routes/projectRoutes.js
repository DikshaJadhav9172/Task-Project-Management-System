const express = require('express');
const projectController = require('../controllers/projectController');
const { authenticateJWT, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
  '/',
  authenticateJWT,
  authorizeRoles('Manager', 'Admin'),
  projectController.createProject
);
router.get('/', authenticateJWT, projectController.getProjects);
router.get('/:id', authenticateJWT, projectController.getProjectById);
router.put(
  '/:id',
  authenticateJWT,
  authorizeRoles('Manager', 'Admin'),
  projectController.updateProject
);
router.delete(
  '/:id',
  authenticateJWT,
  authorizeRoles('Manager', 'Admin'),
  projectController.deleteProject
);

module.exports = router;

