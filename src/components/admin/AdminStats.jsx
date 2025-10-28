import React, { useState, useEffect } from 'react';
import { getAdminStats } from '../../services/userService';

const AdminStats = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    usersByRole: {},
    totalPlants: 0,
    activeTasks: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getAdminStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Set default stats on error
      setStats({
        totalUsers: 0,
        usersByRole: {},
        totalPlants: 0,
        activeTasks: 0
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading statistics...</div>;

  return (
    <div className="admin-stats">
      <h2>System Statistics</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <div className="stat-number">{stats.totalUsers}</div>
        </div>
        
        <div className="stat-card">
          <h3>Total Plants</h3>
          <div className="stat-number">{stats.totalPlants}</div>
        </div>
        
        <div className="stat-card">
          <h3>Active Tasks</h3>
          <div className="stat-number">{stats.activeTasks}</div>
        </div>
      </div>

      <div className="role-breakdown">
        <h3>Users by Role</h3>
        <div className="role-stats">
          {Object.entries(stats.usersByRole).map(([role, count]) => (
            <div key={role} className="role-stat">
              <span className="role-name">{role}</span>
              <span className="role-count">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminStats;