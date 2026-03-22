const taskRepository = require('../repositories/taskRepository');

async function createTask(data) {
  const taskData = {
    ...data,
    assigned_user: data.assigned_user_id, 
    status: data.status || 'Pending'
  };
  return taskRepository.createTask(taskData);
}

async function getTasks(userId, userRole) {
  if (userRole === "User") {
    return taskRepository.getTasksByUser(userId);
  }

  return taskRepository.getTasks();
}

async function getTaskById(id) {
  const task = await taskRepository.getTaskById(id);
  if (!task) {
    const err = new Error('Task not found');
    err.status = 404;
    throw err;
  }
  return task;
}

async function updateTask(id, data, userRole) {
  const role = String(userRole || ''); 
  if (Object.prototype.hasOwnProperty.call(data, 'status')) {
    if (role !== 'User') {
      const err = new Error('Only team members can update task status');
      err.status = 403;
      throw err;
    }
  }

   if (!['User', 'Manager', 'Admin'].includes(role)) {
    const err = new Error('You do not have permission to update tasks');
    err.status = 403;
    throw err;
  }
  
  const task = await taskRepository.updateTask(id, data);
  if (!task) {
    const err = new Error('Task not found');
    err.status = 404;
    throw err;
  }
  return task;
}

async function deleteTask(id) {
  await taskRepository.deleteTask(id);
}

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};

