const projectRepository = require('../repositories/projectRepository');

async function createProject(data, user) {
  const payload = {
    ...data,
    status: data.status || 'Active',  // Default status
    created_by: user.id
  };
  return projectRepository.createProject(payload);
}

async function getProjects() {
  return projectRepository.getProjects();
}

async function getProjectById(id) {
  const project = await projectRepository.getProjectById(id);
  if (!project) {
    const err = new Error('Project not found');
    err.status = 404;
    throw err;
  }
  return project;
}

async function updateProject(id, data) {
  const project = await projectRepository.updateProject(id, data);
  if (!project) {
    const err = new Error('Project not found');
    err.status = 404;
    throw err;
  }
  return project;
}

async function deleteProject(id) {
  await projectRepository.deleteProject(id);
}

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
};

