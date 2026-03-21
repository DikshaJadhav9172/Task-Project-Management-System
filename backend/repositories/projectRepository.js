const pool = require('../config/db');
const Project = require('../models/Project');

async function createProject({ name, description, start_date, end_date, status, created_by }) {
  const result = await pool.query(
    `INSERT INTO projects (name, description, start_date, end_date, status, created_by)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [name, description, start_date, end_date, status, created_by]
  );
  return new Project(result.rows[0]);
}

async function getProjects() {
  const result = await pool.query(
    `SELECT p.*,
            u.name AS created_by_name
     FROM projects p
     JOIN users u ON u.id = p.created_by
     ORDER BY p.created_at DESC`
  );
  return result.rows.map((row) => new Project(row));
}

async function getProjectById(id) {
  const result = await pool.query(
    `SELECT p.*,
            u.name AS created_by_name
     FROM projects p
     JOIN users u ON u.id = p.created_by
     WHERE p.id = $1`,
    [id]
  );
  if (!result.rows[0]) return null;
  return new Project(result.rows[0]);
}

async function updateProject(id, fields) {
  const { name, description, start_date, end_date, status } = fields;
  const result = await pool.query(
    `UPDATE projects
     SET name = $1,
         description = $2,
         start_date = $3,
         end_date = $4,
         status = $5
     WHERE id = $6
     RETURNING *`,
    [name, description, start_date, end_date, status, id]
  );
  if (!result.rows[0]) return null;
  return new Project(result.rows[0]);
}

async function deleteProject(id) {
  await pool.query(`DELETE FROM projects WHERE id = $1`, [id]);
}

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
};

