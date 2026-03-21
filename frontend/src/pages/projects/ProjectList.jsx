import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ArrowRight } from 'lucide-react';
import api, { showErrorToast } from '../../services/api';
import './Projects.css';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      showErrorToast(error.response?.data?.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="projects-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h1>Projects</h1>

        {/* 🔥 Better button */}
        <Link to="/create-project" className="btn-primary">
          <Plus size={16} />
          New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="empty-state">
          <p>No projects yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map(project => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className="project-card"
            >
              {/* 🔥 Header with arrow */}
              <div className="project-card-header">
                <h3>{project.name}</h3>
                <ArrowRight size={16} className="card-arrow" />
              </div>

              <p className="project-description">
                {project.description}
              </p>

              <p className="project-meta">
                <span className="project-meta-label">Created by</span>{' '}
                <strong>{project.created_by_name || '—'}</strong>
              </p>

              <div className="project-dates">
                <span>
                  Start: {new Date(project.start_date).toLocaleDateString()}
                </span>
                <span>
                  End: {new Date(project.end_date).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;