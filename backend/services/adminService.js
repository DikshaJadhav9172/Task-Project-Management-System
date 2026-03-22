const userRepository = require('../repositories/userRepository');

async function getAllUsers({ search, role } = {}) {
  let users = await userRepository.findAllUsers();

  // Filter by role
  if (role) {
    users = users.filter(u => u.role === role);
  }

  if (search) {
    const keyword = search.toLowerCase();
    users = users.filter(u =>
      u.name?.toLowerCase().includes(keyword) ||
      u.email.toLowerCase().includes(keyword)
    );
  }

  return users;
}

async function updateUserRole(userId, role) {
  const user = await userRepository.updateUserRole(userId, role);

  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  return user;
}


async function deleteUser(userId) {
  const deleted = await userRepository.deleteUser(userId);

  if (!deleted) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  return true; 
}


module.exports = {
  getAllUsers,
  updateUserRole,
  deleteUser
};
