const userRepository = require('../repositories/userRepository');


// ✅ GET USERS (with search + role filter)
async function getAllUsers({ search, role } = {}) {
  let users = await userRepository.findAllUsers();

  // Filter by role
  if (role) {
    users = users.filter(u => u.role === role);
  }

  // 🔍 Search by name/email
  if (search) {
    const keyword = search.toLowerCase();
    users = users.filter(u =>
      u.name?.toLowerCase().includes(keyword) ||
      u.email.toLowerCase().includes(keyword)
    );
  }

  return users;
}


// ✅ UPDATE ROLE
async function updateUserRole(userId, role) {
  const user = await userRepository.updateUserRole(userId, role);

  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  return user;
}


// ✅ DELETE USER
async function deleteUser(userId) {
  const deleted = await userRepository.deleteUser(userId);

  if (!deleted) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  return true; // optional clarity
}


module.exports = {
  getAllUsers,
  updateUserRole,
  deleteUser
};