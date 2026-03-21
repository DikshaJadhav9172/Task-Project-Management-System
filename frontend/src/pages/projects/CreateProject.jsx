import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api, { showErrorToast, showSuccessToast } from '../../services/api';
import './Projects.css';

const CreateProject = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.start_date || !formData.end_date) {
      showErrorToast('Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      await api.post('/projects', formData);
      showSuccessToast('Project created successfully');
      navigate('/projects');
    } catch (error) {
      showErrorToast(error.response?.data?.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-project-container">
      
      {/* 🔥 Header with back */}
      <div className="projects-header">
        <div>
          <h1>Create Project</h1>
          <p className="project-subtitle">Set up a new project for your team</p>
        </div>

        <button 
          className="btn-secondary"
          onClick={() => navigate('/projects')}
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      {/* Form */}
      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Project Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Website Redesign"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Briefly describe the project..."
            disabled={loading}
            rows="4"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="start_date">Start Date *</label>
            <input
              id="start_date"
              name="start_date"
              type="date"
              value={formData.start_date}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="end_date">End Date *</label>
            <input
              id="end_date"
              name="end_date"
              type="date"
              value={formData.end_date}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Project'}
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/projects')}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;