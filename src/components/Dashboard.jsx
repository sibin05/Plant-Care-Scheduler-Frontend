import React, { useState, useEffect } from 'react';
import "../styles/styles.css";
import PlantCard from './plants/PlantCard';
import * as plantService from '../services/plantService';
import { axiosConfig } from '../services/axiosConfig';
import EnvironmentDashboard from './environment/EnvironmentDashboard';
import HealthMonitor from './health/HealthMonitor';
import AddPlantModal from './plants/AddPlantModal';
import EditPlantModal from './plants/EditPlantModal';
import DeleteConfirmModal from './plants/DeleteConfirmModal';
import PlantSchedule from './plants/PlantSchedule';
import CareTasks from './care/CareTasks';
import Settings from './Settings';
import LogoutButton from './LogoutButton';
import AdminDashboard from './admin/AdminDashboard';

import { canCreate, canUpdate, canDelete, isReadOnly } from '../utils/permissions';
import UsageAnalytics from './UsageAnalytics';
import { checkDemoExpiry, clearDemoSession, isDemoMode } from '../services/demoService';

const Dashboard = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSidebar, setSelectedSidebar] = useState('Plants');
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState('GUEST');
  const [selectedPlantId, setSelectedPlantId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleePlantId, setSchedulePlantId] = useState(null);

  const fetchPlants = () => {
    setLoading(true);
    plantService.getPlants()
      .then(res => {
        const fetchedPlants = Array.isArray(res.data) ? res.data : res.data.content || [];
        setPlants(fetchedPlants);
        setLoading(false);
      })
      .catch(() => {
        setPlants([]);
        setLoading(false);
      });
  };

  const fetchUser = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setUser({ username: 'Demo User', role: 'GUEST' });
      return;
    }
    
    axiosConfig.get('/auth/me')
    .then(res => {
      setUser(res.data);
      setUserRole(res.data.role || 'GUEST');
    })
    .catch(() => {
      setUser({ username: 'Demo User', role: 'GUEST' });
      setUserRole('GUEST');
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      // Allow demo access without authentication
      console.log('Demo mode - no authentication required');
    }
    
    // Check demo expiry
    if (isDemoMode() && checkDemoExpiry()) {
      alert('Demo session expired! Redirecting to home page.');
      clearDemoSession();
      window.location.href = '/';
      return;
    }
    
    fetchPlants();
    fetchUser();
    
    // Set up demo expiry check interval
    const demoCheckInterval = setInterval(() => {
      if (isDemoMode() && checkDemoExpiry()) {
        alert('Demo session expired! Redirecting to home page.');
        clearDemoSession();
        window.location.href = '/';
      }
    }, 30000); // Check every 30 seconds
    
    return () => clearInterval(demoCheckInterval);
  }, []);

  const handleEdit = (plant) => {
    setSelectedPlant(plant);
    setShowEditModal(true);
  };

  const handleDeleteClick = (plant) => {
    setSelectedPlant(plant);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await plantService.deletePlant(selectedPlant.id, userRole);
      alert('Plant deleted successfully');
      fetchPlants();
      setShowDeleteModal(false);
      setSelectedPlant(null);
    } catch (error) {
      alert('Failed to delete plant');
    }
  };

  const sidebarItems = [
    { name: 'Plants', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> },
    { name: 'Care Tasks', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg> },
    { name: 'Environment Data', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15 13V5c0-1.66-1.34-3-3-3S9 3.34 9 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-4-2V5c0-.55.45-1 1-1s1 .45 1 1v6h-2z"/></svg> },
    { name: 'Health Records', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg> },
    { name: 'Analytics', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg> }
  ];

  // Add admin dashboard for admin users
  if (user?.role === 'ADMIN') {
    sidebarItems.push({
      name: 'Admin Dashboard',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
    });
  }

  const handleEnvironmentData = (plantId) => {
    setSelectedPlantId(plantId);
    setSelectedSidebar('Environment Data');
  };

  const handleHealthRecord = (plantId) => {
    setSelectedPlantId(plantId);
    setSelectedSidebar('Health Records');
  };

  const handleCareTasks = (plantId) => {
    setSelectedPlantId(plantId);
    setSelectedSidebar('Care Tasks');
  };

  const handleSchedule = (plantId) => {
    setSchedulePlantId(plantId);
    setShowSchedule(true);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <strong>PLANTA</strong>
          <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '4px' }}>Plant Care Scheduler</div>
        </div>
        <nav className="sidebar-menu">
          {sidebarItems.map(item => (
            <div
              key={item.name}
              className={`sidebar-item ${selectedSidebar === item.name ? 'selected' : ''}`}
              onClick={() => setSelectedSidebar(item.name)}
            >
              <span>{item.icon}</span>
              {item.name}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="user-name">{user ? user.username : 'Guest'}</div>
          <button className="settings-btn" onClick={() => setShowSettings(true)}>
           <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}>
             <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
           </svg>
           Settings 
          </button>
          <LogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <div className="content-header">
          <h2 className="section-title">
            {sidebarItems.find(item => item.name === selectedSidebar)?.icon} 
            <span>{selectedSidebar}</span>
          </h2>
        </div>

        {/* Render Plant Cards */}
        {selectedSidebar === 'Plants' ? (
          <div className="plants-section">
            <div className="plants-header">
              <div className="plants-stats">
                <div className="stat-item">
                  <span className="stat-number">{plants.length}</span>
                  <span className="stat-label">Total Plants</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{plants.filter(p => p.healthStatus === 'EXCELLENT').length}</span>
                  <span className="stat-label">Healthy</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{plants.filter(p => p.healthStatus === 'POOR').length}</span>
                  <span className="stat-label">Need Care</span>
                </div>
              </div>
              {canCreate(userRole) && (
                <button
                  className="add-plant-btn"
                  onClick={() => setShowAddModal(true)}
                  aria-label="Add new plant"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                  Add Plant
                </button>
              )}
              {isReadOnly(userRole) && (
                <div className="read-only-notice" style={{marginLeft: '20px', padding: '8px 12px', backgroundColor: '#f3f4f6', borderRadius: '6px', fontSize: '0.9rem'}}>
                  📖 Read-only access - Contact admin for plant management permissions
                </div>
              )}
            </div>
            
            {loading ? (
              <div className="loading-state">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="loading-spinner">
                  <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/>
                  <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"/>
                </svg>
                <p>Loading your plants...</p>
              </div>
            ) : plants.length === 0 ? (
              <div className="empty-state">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" className="empty-icon">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <h3>No plants yet</h3>
                <p>Start your plant care journey by adding your first plant!</p>
                <button className="cta-btn" onClick={() => setShowAddModal(true)}>
                  Add Your First Plant
                </button>
              </div>
            ) : (
              <div className="plants-grid">
                {plants.map(plant => (
                  <PlantCard
                    key={plant.id}
                    plant={plant}
                    onDelete={() => handleDeleteClick(plant)}
                    onEdit={() => handleEdit(plant)}
                    onCareTasks={() => handleCareTasks(plant.id)}
                    onEnvironmentData={() => handleEnvironmentData(plant.id)}
                    onHealthRecord={() => handleHealthRecord(plant.id)}
                    onSchedule={() => handleSchedule(plant.id)}
                    userRole={userRole}
                  />
                ))}
              </div>
            )}
          </div>
        ) : selectedSidebar === 'Care Tasks' ? (
          <CareTasks plantId={selectedPlantId} userRole={userRole} />
        ) : selectedSidebar === 'Environment Data' ? (
          <EnvironmentDashboard plantId={selectedPlantId} userRole={userRole} />
        ) : selectedSidebar === 'Health Records' ? (
          <HealthMonitor plantId={selectedPlantId} userRole={userRole} />
        ) : selectedSidebar === 'Analytics' ? (
          <UsageAnalytics />
        ) : selectedSidebar === 'Admin Dashboard' ? (
          <AdminDashboard />
        ) : (
          <p>Data for "{selectedSidebar}" will be shown here.</p>
        )}
      </main>
      
      <AddPlantModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onPlantAdded={fetchPlants}
        userRole={userRole}
      />
      
      <EditPlantModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onPlantUpdated={fetchPlants}
        plant={selectedPlant}
        userRole={userRole}
      />
      
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        plantName={selectedPlant?.nickname}
      />
      
      <Settings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        userRole={userRole}
      />
      
      <PlantSchedule
        plantId={scheduleePlantId}
        isOpen={showSchedule}
        onClose={() => setShowSchedule(false)}
      />
    </div>
  );
};

export default Dashboard;


