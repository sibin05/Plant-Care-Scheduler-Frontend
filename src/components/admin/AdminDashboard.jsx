import React, { useState, useEffect } from 'react';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import UserManagement from './UserManagement';
import AdminStats from './AdminStats';
import '../../styles/admin.css';

const AdminDashboard = () => {
  const { user, loadingUser } = useCurrentUser();
  const [activeTab, setActiveTab] = useState('users');

  if (loadingUser) {
    return <div className="loading">Loading...</div>;
  }

  if (!user || user.role !== 'ADMIN') {
    return <div className="access-denied">Access Denied. Admin privileges required.</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user.username}</p>
      </div>

      <div className="admin-nav">
        <button 
          className={activeTab === 'stats' ? 'active' : ''}
          onClick={() => setActiveTab('stats')}
        >
          Statistics
        </button>
        <button 
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          User Management
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'stats' && <AdminStats />}
        {activeTab === 'users' && <UserManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;