import React from 'react';

const AdminGuide = () => {
  return (
    <div className="admin-guide">
      <h2>Admin Access Guide</h2>
      <div className="guide-content">
        <h3>Default Admin Credentials</h3>
        <div className="credentials">
          <p><strong>Username:</strong> admin</p>
          <p><strong>Password:</strong> password</p>
        </div>
        
        <h3>How to Access Admin Dashboard</h3>
        <ol>
          <li>Login with the admin credentials above</li>
          <li>Navigate to the Dashboard</li>
          <li>Look for "Admin Dashboard" in the sidebar (only visible to admin users)</li>
          <li>Click on "Admin Dashboard" to access user management</li>
        </ol>
        
        <h3>Admin Features</h3>
        <ul>
          <li>View system statistics</li>
          <li>Manage all users</li>
          <li>Create new users with any role</li>
          <li>Update user roles</li>
          <li>Delete users</li>
        </ul>
        
        <div className="note">
          <strong>Note:</strong> Make sure the backend server is running on http://localhost:8080
        </div>
      </div>
    </div>
  );
};

export default AdminGuide;