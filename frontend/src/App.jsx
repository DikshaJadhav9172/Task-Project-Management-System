import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import RoleGuard from './components/RoleGuard';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Dashboard Pages
import UserDashboard from './pages/dashboard/UserDashboard';
import ManagerDashboard from './pages/dashboard/ManagerDashboard';

// Task Pages
import TaskList from './pages/tasks/TaskList';
import TaskDetails from './pages/tasks/TaskDetails';
import CreateTask from './pages/tasks/CreateTask';
import TasksManager from './pages/tasks/TasksManager';

// Project Pages
import ProjectList from './pages/projects/ProjectList';
import CreateProject from './pages/projects/CreateProject';
import ProjectDetails from './pages/projects/ProjectDetails';

// Admin Pages
import UserManagement from './pages/admin/UserManagement';

import './App.css';

const DashboardRouter = () => {
  const { user } = useAuth();

  if (user?.role?.toLowerCase() === 'admin') {
    return <ManagerDashboard />;
  }

  if (user?.role?.toLowerCase() === 'manager') {
    return <ManagerDashboard />;
  }

  return <UserDashboard />;
};

const AppContent = () => {
  const location = useLocation();
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className={`app-layout ${isAuthRoute ? 'auth-layout' : ''}`}>
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="page-content">
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Dashboard Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardRouter />
                </ProtectedRoute>
              } 
            />

            {/* User Task Routes */}
            <Route 
              path="/tasks" 
              element={
                <ProtectedRoute>
                  <RoleGuard allowedRoles={['User', 'Manager', 'Admin']}>
                    <TaskList />
                  </RoleGuard>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/task/:id" 
              element={
                <ProtectedRoute>
                  <TaskDetails />
                </ProtectedRoute>
              } 
            />

            {/* Manager Task Routes */}
            <Route 
              path="/tasks-manager" 
              element={
                <ProtectedRoute>
                  <RoleGuard allowedRoles={['Manager', 'Admin']}>
                    <TasksManager />
                  </RoleGuard>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-task" 
              element={
                <ProtectedRoute>
                  <RoleGuard allowedRoles={['Manager', 'Admin']}>
                    <CreateTask />
                  </RoleGuard>
                </ProtectedRoute>
              } 
            />

            {/* Project Routes */}
            <Route 
              path="/projects" 
              element={
                <ProtectedRoute>
                  <RoleGuard allowedRoles={['Manager', 'Admin']}>
                    <ProjectList />
                  </RoleGuard>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/project/:id" 
              element={
                <ProtectedRoute>
                  <RoleGuard allowedRoles={['Manager', 'Admin']}>
                    <ProjectDetails />
                  </RoleGuard>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-project" 
              element={
                <ProtectedRoute>
                  <RoleGuard allowedRoles={['Manager', 'Admin']}>
                    <CreateProject />
                  </RoleGuard>
                </ProtectedRoute>
              } 
            />

            {/* Admin Routes */}
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute>
                  <RoleGuard allowedRoles={['Admin']}>
                    <UserManagement />
                  </RoleGuard>
                </ProtectedRoute>
              } 
            />

            {/* Catch All */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;
