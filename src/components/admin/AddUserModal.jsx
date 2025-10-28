import React, { useState } from 'react';

const AddUserModal = ({ onClose, onSubmit }) => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'STANDARD_PLANT_OWNER',
    gardeningExperience: 'BEGINNER',
    location: '',
    timezone: ''
  });

  const roles = [
    'ADMIN',
    'PLANT_CARE_SPECIALIST',
    'PREMIUM_PLANT_OWNER',
    'STANDARD_PLANT_OWNER',
    'COMMUNITY_MEMBER',
    'GUEST'
  ];

  const experiences = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'];

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add New User</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select name="role" value={userData.role} onChange={handleChange}>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Experience</label>
            <select name="gardeningExperience" value={userData.gardeningExperience} onChange={handleChange}>
              {experiences.map(exp => (
                <option key={exp} value={exp}>{exp}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={userData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Timezone</label>
            <input
              type="text"
              name="timezone"
              value={userData.timezone}
              onChange={handleChange}
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Add User</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;