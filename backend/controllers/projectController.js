const projectService = require('../services/projectService');

async function createProject(req, res, next) {
  try {
    const project = await projectService.createProject(req.body, req.user);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
}

async function getProjects(req, res, next) {
  try {
    const projects = await projectService.getProjects();
    res.json(projects);
  } catch (err) {
    next(err);
  }
}

async function getProjectById(req, res, next) {
  try {
    const project = await projectService.getProjectById(req.params.id);
    res.json(project);
  } catch (err) {
    next(err);
  }
}

async function updateProject(req, res, next) {
  try {
    const project = await projectService.updateProject(req.params.id, req.body);
    res.json(project);
  } catch (err) {
    next(err);
  }
}

async function deleteProject(req, res, next) {
  try {
    await projectService.deleteProject(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
};

