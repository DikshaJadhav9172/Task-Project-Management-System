import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import api, { showErrorToast } from '../../services/api';
import './Projects.css';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [projectRes, tasksRes] = await Promise.all([
          api.get(`/projects/${id}`),
          api.get('/tasks'),
        ]);

        setProject(projectRes.data);
        setTasks((tasksRes.data || []).filter((t) => String(t.project_id) === String(id)));
      } catch (error) {
        showErrorToast(error.response?.data?.message || 'Failed to load project');
        navigate('/projects');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [id, navigate]);

  const summary = useMemo(() => {
    const normalize = (s) => String(s || '').trim().toLowerCase();

    const total = tasks.length;
    const completed = tasks.filter((t) => normalize(t.status) === 'completed').length;
    const pending = tasks.filter((t) => normalize(t.status) === 'pending').length;
    const inProgress = tasks.filter((t) => normalize(t.status) === 'in progress').length;

    return { total, completed, pending, inProgress };
  }, [tasks]);

  const progressPct = useMemo(() => {
    if (!summary.total) return 0;
    return Math.round((summary.completed / summary.total) * 100);
  }, [summary]);

  if (loading) {
    return (
      <div className="projects-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="projects-container">
        <div className="empty-state">Project not found</div>
      </div>
    );
  }

  return (
    <div className="projects-container">
      {/* 🔥 Back Button */}
      <button className="btn-secondary" onClick={() => navigate('/projects')}>
        <ArrowLeft size={16} />
        Back to Projects
      </button>

      <div className="form-card" style={{ marginTop: '1rem' }}>
        {/* Header */}
        <div className="projects-header">
          <div>
            <h1>{project.name}</h1>
            <p className="project-description">{project.description}</p>
            <p className="project-meta">
              <span className="project-meta-label">Created by</span>{' '}
              <strong>{project.created_by_name || '—'}</strong>
            </p>
          </div>
        </div>

        {/* Dates */}
        <div className="project-dates" style={{ borderTop: 'none' }}>
          <span>
            Start: {project.start_date ? new Date(project.start_date).toLocaleDateString() : '—'}
          </span>
          <span>
            End: {project.end_date ? new Date(project.end_date).toLocaleDateString() : '—'}
          </span>
        </div>

        {/* Progress */}
        <div className="project-progress">
          <div className="project-progress-row">
            <div>
              <div className="project-progress-title">Project progress</div>
              <div className="project-progress-subtitle">
                {summary.completed}/{summary.total} tasks completed
              </div>
            </div>
            <div className="project-progress-pct">{progressPct}%</div>
          </div>

          <div className="project-progress-bar">
            <div
              className="project-progress-fill"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div className="project-progress-legend">
            <span className="legend-item">
              <span className="legend-dot completed" />
              Completed ({summary.completed})
            </span>
            <span className="legend-item">
              <span className="legend-dot inprogress" />
              In Progress ({summary.inProgress})
            </span>
            <span className="legend-item">
              <span className="legend-dot pending" />
              Pending ({summary.pending})
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="projects-grid" style={{ marginTop: '1.2rem' }}>
          {[
            { label: 'Total Tasks', value: summary.total },
            { label: 'Completed', value: summary.completed },
            { label: 'Pending', value: summary.pending },
            { label: 'In Progress', value: summary.inProgress },
          ].map((c) => (
            <div key={c.label} className="project-card">
              <h3>{c.label}</h3>
              <p className="card-number">{c.value}</p>
            </div>
          ))}
        </div>

        {/* Tasks */}
        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.75rem' }}>Tasks</h3>

          {tasks.length === 0 ? (
            <div className="empty-state">
              No tasks in this project yet.
            </div>
          ) : (
            <div className="projects-grid">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className="project-card task-card"
                  onClick={() => navigate(`/task/${t.id}`)}
                >
                  {/* 🔥 clickable hint */}
                  <div className="project-card-header">
                    <h3>{t.title}</h3>
                    <ArrowRight size={16} className="card-arrow" />
                  </div>

                  <p className="project-description">{t.description}</p>

                  <div className="project-dates">
                    <span>Status: {t.status}</span>
                    <span>Assigned: {t.assigned_user_name || 'Unassigned'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;