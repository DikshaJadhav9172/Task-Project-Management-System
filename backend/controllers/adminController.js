const adminService = require('../services/adminService');


// ✅ GET USERS (with search + role filter)
async function getUsers(req, res, next) {
  try {
    const { search, role } = req.query;

    const users = await adminService.getAllUsers({ search, role });

    res.json(users);
  } catch (err) {
    next(err);
  }
}


// ✅ UPDATE ROLE
async function updateUserRole(req, res, next) {
  try {
    const { userId, role } = req.body;

    const user = await adminService.updateUserRole(userId, role);

    res.json(user);
  } catch (err) {
    next(err);
  }
}



async function deleteUser(req, res, next) {
  try {
    const userId = req.params.id;

    // 🔒 Prevent self delete (optional but smart)
    if (req.user.id == userId) {
      return res.status(400).json({
        message: "You can't delete yourself"
      });
    }

    await adminService.deleteUser(userId);

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
}


module.exports = {
  getUsers,
  updateUserRole,
  deleteUser
};