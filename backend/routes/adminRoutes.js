const express = require('express');
const adminController = require('../controllers/adminController');
const { authenticateJWT, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ Get users
router.get(
  '/users',
  authenticateJWT,
  authorizeRoles('Admin'),
  adminController.getUsers
);

// ✅ Update role
router.put(
  '/user-role',
  authenticateJWT,
  authorizeRoles('Admin'),
  adminController.updateUserRole
);


router.delete(
  '/users/:id',
  authenticateJWT,
  authorizeRoles('Admin'),
  adminController.deleteUser
);

module.exports = router;