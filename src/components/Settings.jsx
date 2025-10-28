import React, { useState, useEffect } from 'react';
import { axiosConfig } from '../services/axiosConfig';
import { canUpdate, isAdmin } from '../utils/permissions';
import '../styles/modal.css';
import '../styles/settings.css';

const Settings = ({ isOpen, onClose, userRole }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isOpen) {
      fetchUserData();
    }
  }, [isOpen]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axiosConfig.get('/auth/me');
      setUser(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      const updateData = { ...formData };
      // Only include password if it's not empty
      if (!updateData.password || updateData.password.trim() === '') {
        delete updateData.password;
      }
      
      await axiosConfig.put('/auth/me', updateData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setUser({ ...formData, password: '' }); // Clear password from display
      setFormData({ ...formData, password: '' }); // Clear password from form
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Profile update error:', error);
      alert('Failed to update profile: ' + (error.response?.data?.message || error.message));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Settings</h2>
        {loading ? (
          <p>Loading user data...</p>
        ) : (
          <div>
            {editing ? (
              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username || ''}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email || ''}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="New Password"
                  value={formData.password || ''}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location || ''}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="gardeningExp"
                  placeholder="Gardening Experience"
                  value={formData.gardeningExp || ''}
                  onChange={handleChange}
                />
                <div className="modal-actions">
                  <button type="button" onClick={() => setEditing(false)}>Cancel</button>
                  <button type="submit">Save</button>
                </div>
              </form>
            ) : (
              <div>
                <p><strong>Username:</strong> {user?.username}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Location:</strong> {user?.location || 'Not specified'}</p>
                <p><strong>Gardening Experience:</strong> {user?.gardeningExp || 'Not specified'}</p>
                <p><strong>Role:</strong> {user?.role}</p>
                <p><strong>Created:</strong> {user?.createdDate ? new Date(user.createdDate).toLocaleDateString() : 'N/A'}</p>
                {!canUpdate(userRole) && (
                  <div className="read-only-notice" style={{margin: '10px 0', padding: '8px', backgroundColor: '#f3f4f6', borderRadius: '4px'}}>
                    📖 You have read-only access. Contact an administrator to modify your profile.
                  </div>
                )}
                <div className="modal-actions">
                  <button type="button" onClick={onClose}>Close</button>
                  {canUpdate(userRole) && (
                    <button type="button" onClick={() => setEditing(true)}>Edit Profile</button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;