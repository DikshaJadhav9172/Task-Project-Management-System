const taskService = require('../services/taskService');

async function createTask(req, res, next) {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

async function getTasks(req, res, next) {
  try {
    const userId = req.user?.id;
    const userRole = req.user?.role;

    const tasks = await taskService.getTasks(userId, userRole);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

async function getTaskById(req, res, next) {
  try {
    const task = await taskService.getTaskById(req.params.id);
    res.json(task);
  } catch (err) {
    next(err);
  }
}

async function updateTask(req, res, next) {
  try {
    const userRole = req.user?.role;
    const task = await taskService.updateTask(req.params.id, req.body, userRole);
    res.json(task);
  } catch (err) {
    next(err);
  }
}

async function deleteTask(req, res, next) {
  try {
    await taskService.deleteTask(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};

