import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api, { showErrorToast, showSuccessToast } from '../../services/api';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email || !password) {
        showErrorToast('Please fill all fields');
        setLoading(false);
        return;
      }

      const response = await api.post('/auth/login', { email, password });
      
      if (response.data && response.data.token && response.data.user) {
        login(response.data.user, response.data.token);
        showSuccessToast('Login successful!');

        // Redirect based on role
        const userRole = response.data.user.role?.toLowerCase();
        if (userRole === 'admin') {
          navigate('/admin/users');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      showErrorToast(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome back 👋</h1>
        <p className="auth-subtitle">Manage your tasks efficiently</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
