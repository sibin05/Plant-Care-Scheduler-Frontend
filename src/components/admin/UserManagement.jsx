import React, { useState, useEffect } from 'react';
import { getAllUsers, createUser, updateUser, deleteUser } from '../../services/userService';
import AddUserModal from './AddUserModal';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
      setError('');
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (userData) => {
    try {
      await createUser(userData);
      setSuccess('User created successfully!');
      setError('');
      fetchUsers();
      setShowAddModal(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Failed to create user: ' + error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        setSuccess('User deleted successfully!');
        setError('');
        fetchUsers();
        setTimeout(() => setSuccess(''), 3000);
      } catch (error) {
        console.error('Error deleting user:', error);
        setError('Failed to delete user: ' + error.message);
      }
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    try {
      await updateUser(userId, { role: newRole });
      setSuccess('User role updated successfully!');
      setError('');
      fetchUsers();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error updating user role:', error);
      setError('Failed to update user role: ' + error.message);
    }
  };

  const testConnection = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Test response status:', response.status);
      const data = await response.text();
      console.log('Test response data:', data);
      setSuccess('Connection test completed - check console');
    } catch (error) {
      console.error('Connection test failed:', error);
      setError('Connection test failed: ' + error.message);
    }
  };

  if (loading) return <div className="loading">Loading users...</div>;

  return (
    <div className="user-management">
      <div className="user-management-header">
        <h2>User Management</h2>
        <button 
          className="add-user-btn"
          onClick={() => setShowAddModal(true)}
        >
          Add User
        </button>
        
        
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Location</th>
              <th>Experience</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <select 
                    value={user.role} 
                    onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="PLANT_CARE_SPECIALIST">PLANT_CARE_SPECIALIST</option>
                    <option value="PREMIUM_PLANT_OWNER">PREMIUM_PLANT_OWNER</option>
                    <option value="STANDARD_PLANT_OWNER">STANDARD_PLANT_OWNER</option>
                    <option value="COMMUNITY_MEMBER">COMMUNITY_MEMBER</option>
                    <option value="GUEST">GUEST</option>
                  </select>
                </td>
                <td>{user.location || 'N/A'}</td>
                <td>{user.gardeningExperience || 'N/A'}</td>
                <td>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <AddUserModal 
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddUser}
        />
      )}
    </div>
  );
};

export default UserManagement;