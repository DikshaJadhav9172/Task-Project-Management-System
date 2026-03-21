import React, { useState, useEffect } from 'react';
import api, { showErrorToast } from '../../services/api';
import { ClipboardList, CheckCircle, Clock,Activity } from "lucide-react";
import './Dashboard.css';

const UserDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get('/dashboard/user');
      setDashboard(response.data);
    } catch (error) {
      showErrorToast(error.response?.data?.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const onFocus = () => fetchDashboard();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="spinner-large"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1>Your Dashboard</h1>

      <div className="cards-grid">
        <div className="dashboard-card">
          <div className="card-icon"> <ClipboardList size={20} /></div>
          <div className="card-content">
            <h3>Total Tasks</h3>
            <p className="card-number">{dashboard?.totalTasks || 0}</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon"><CheckCircle size={20} /></div>
          <div className="card-content">
            <h3>Completed</h3>
            <p className="card-number">{dashboard?.completedTasks || 0}</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon"><Clock size={20} /></div>
          <div className="card-content">
            <h3>Pending</h3>
            <p className="card-number">{dashboard?.pendingTasks || 0}</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon"><Activity size={20} /></div>
          <div className="card-content">
            <h3>In Progress</h3>
            <p className="card-number">{dashboard?.inProgressTasks || 0}</p>
          </div>
        </div>
      </div>

      <div className="empty-state">
        <p>👋 Welcome! Start by viewing your tasks.</p>
      </div>
    </div>
  );
};

export default UserDashboard;
