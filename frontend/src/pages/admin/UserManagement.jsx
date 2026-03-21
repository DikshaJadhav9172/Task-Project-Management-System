import React, { useState, useEffect } from 'react';
import api, { showErrorToast, showSuccessToast } from '../../services/api';
import './Admin.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [editingRole, setEditingRole] = useState('');
  const [updating, setUpdating] = useState(false);

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchUsers();
  }, [search, roleFilter]);

  const fetchUsers = async () => {
    try {
      const query = new URLSearchParams();
      if (search) query.append('search', search);
      if (roleFilter) query.append('role', roleFilter);

      const response = await api.get(`/admin/users?${query.toString()}`);
      setUsers(response.data);
    } catch (error) {
      showErrorToast(error.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleEditRole = (user) => {
    setEditingId(user.id);
    setEditingRole(user.role);
  };

  const handleSaveRole = async (userId) => {
    setUpdating(true);
    try {
      await api.put('/admin/user-role', {
        userId,
        role: editingRole,
      });

      setUsers(prev =>
        prev.map(u =>
          u.id === userId ? { ...u, role: editingRole } : u
        )
      );

      showSuccessToast('User role updated');
      setEditingId(null);
    } catch (error) {
      showErrorToast(error.response?.data?.message || 'Failed to update role');
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingRole('');
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Delete this user?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/users/${userId}`);
      setUsers(prev => prev.filter(u => u.id !== userId));
      showSuccessToast('User deleted');
    } catch (error) {
      showErrorToast(error.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h1>User Management</h1>

      <div className="admin-controls">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="role-filter"
        >
          <option value="">All Roles</option>
          <option value="User">User</option>
          <option value="Manager">Manager</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      {users.length === 0 ? (
        <div className="empty-state">
          <p>No users found</p>
        </div>
      ) : (
        <div className="users-table-container">

          {/* 🔥 SCROLL WRAPPER */}
          <div className="table-scroll">
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map(user => {
                  const isCurrentUser = currentUser?.id === user.id;

                  return (
                    <tr key={user.id}>
                      <td>{user.id}</td>

                      <td>
                        {user.name || 'N/A'}
                        {isCurrentUser && (
                          <span className="you-badge"> (You)</span>
                        )}
                      </td>

                      <td>{user.email}</td>

                      <td>
                        {editingId === user.id ? (
                          <select
                            value={editingRole}
                            onChange={(e) => setEditingRole(e.target.value)}
                            disabled={updating}
                          >
                            <option>User</option>
                            <option>Manager</option>
                            <option>Admin</option>
                          </select>
                        ) : (
                          <span className={`role-badge role-${user.role?.toLowerCase()}`}>
                            {user.role}
                          </span>
                        )}
                      </td>

                      <td>
                        {editingId === user.id ? (
                          <div className="action-buttons-inline">
                            <button
                              className="btn-save"
                              onClick={() => {
                                if (isCurrentUser) {
                                  showErrorToast("You cannot change your own role");
                                  return;
                                }
                                handleSaveRole(user.id);
                              }}
                              disabled={updating}
                            >
                              {updating ? 'Saving...' : 'Save'}
                            </button>

                            <button
                              className="btn-cancel"
                              onClick={handleCancel}
                              disabled={updating}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="action-buttons-inline">
                            <button
                              className={`btn-edit ${isCurrentUser ? 'disabled-look' : ''}`}
                              onClick={() => {
                                if (isCurrentUser) {
                                  showErrorToast("You cannot change your own role");
                                  return;
                                }
                                handleEditRole(user);
                              }}
                            >
                              Edit
                            </button>

                            <button
                              className={`btn-delete ${isCurrentUser ? 'disabled-look' : ''}`}
                              onClick={() => {
                                if (isCurrentUser) {
                                  showErrorToast("You cannot delete your own account");
                                  return;
                                }
                                handleDeleteUser(user.id);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>
      )}
    </div>
  );
};

export default UserManagement;