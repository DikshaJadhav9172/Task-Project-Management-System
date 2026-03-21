const dashboardRepository = require('../repositories/dashboardRepository');

async function getUserDashboard(userId) {
  return dashboardRepository.getUserDashboard(userId);
}

async function getManagerDashboard(managerId) {
  return dashboardRepository.getManagerDashboard(managerId);
}

async function getAdminDashboard() {
  return dashboardRepository.getAdminDashboard();
}

module.exports = {
  getUserDashboard,
  getManagerDashboard,
  getAdminDashboard
};

