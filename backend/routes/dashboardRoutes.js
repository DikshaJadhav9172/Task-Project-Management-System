const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const { authenticateJWT, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get(
  '/user',
  authenticateJWT,
  authorizeRoles('User', 'Manager', 'Admin'),
  dashboardController.getUserDashboard
);

router.get(
  '/manager',
  authenticateJWT,
  authorizeRoles('Manager', 'Admin'),
  dashboardController.getManagerDashboard
);

module.exports = router;

