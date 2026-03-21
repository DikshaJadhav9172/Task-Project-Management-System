const dashboardService = require('../services/dashboardService');

async function getUserDashboard(req, res, next) {
  try {
    const data = await dashboardService.getUserDashboard(req.user.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function getManagerDashboard(req, res, next) {
  try {
    const role = String(req.user?.role || '').toLowerCase();
    const data =
      role === 'admin'
        ? await dashboardService.getAdminDashboard()
        : await dashboardService.getManagerDashboard(req.user.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUserDashboard,
  getManagerDashboard
};

