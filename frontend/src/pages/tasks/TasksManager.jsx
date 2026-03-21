import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api, { showErrorToast, showSuccessToast } from '../../services/api';
import './Tasks.css';

const TasksManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      showErrorToast(error.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(prev => prev.filter(t => t.id !== taskId));
      showSuccessToast('Task deleted');
    } catch (error) {
      showErrorToast(error.response?.data?.message || 'Failed to delete task');
    }
  };

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'completed':
        return '#27ae60';
      case 'in progress':
        return '#f39c12';
      case 'pending':
        return '#95a5a6';
      default:
        return '#3498db';
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status?.toLowerCase() === filter.toLowerCase();
  });

  if (loading) {
    return (
      <div className="tasks-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h1>All Tasks</h1>
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({tasks.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-btn ${filter === 'in progress' ? 'active' : ''}`}
            onClick={() => setFilter('in progress')}
          >
            In Progress
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks found</p>
        </div>
      ) : (
        <div className="tasks-table-container">
          <table className="tasks-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Assigned To</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map(task => (
                <tr key={task.id}>
                  <td>
                    <Link to={`/task/${task.id}`} className="task-link">
                      {task.title}
                    </Link>
                  </td>
                  <td>
                    <span 
                      className="status-badge small"
                      style={{ backgroundColor: getStatusColor(task.status) }}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td style={{ color: getPriorityColor(task.priority) }}>
                    {task.priority}
                  </td>
                  <td>{task.assigned_user_name || 'Unassigned'}</td>
                  <td>{new Date(task.due_date).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/task/${task.id}`} className="btn-small btn-view">
                        View
                      </Link>
                      <button 
                        className="btn-small btn-delete"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const getPriorityColor = (priority) => {
  const priorityLower = priority?.toLowerCase();
  switch (priorityLower) {
    case 'high':
      return '#e74c3c';
    case 'medium':
      return '#f39c12';
    case 'low':
      return '#27ae60';
    default:
      return '#3498db';
  }
};

export default TasksManager;
