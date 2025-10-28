import React from 'react';
import { canUpdate, canDelete } from '../../utils/permissions';
import '../../styles/plant-card.css';

const PlantCard = ({ plant, onEdit, onDelete, onEnvironmentData, onHealthRecord, onCareTasks, onSchedule, userRole }) => {
  const getPlantImage = () => {
    if (plant.imageUrl) return plant.imageUrl;
    
    // Check for specific plant types
    const plantName = (plant.nickname || '').toLowerCase();
    const speciesName = (plant.species?.name || '').toLowerCase();
    
    if (plantName.includes('neem') || speciesName.includes('neem') || plantName.includes('neembu')) {
      return 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop&q=80';
    }
    
    if (plantName.includes('mango') || speciesName.includes('mango')) {
      return 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop&q=80';
    }
    
    if (plantName.includes('aloe') || speciesName.includes('aloe') || plantName.includes('vera')) {
      return 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&h=300&fit=crop&q=80';
    }
    
    if (plantName.includes('rose') || speciesName.includes('rose')) {
      return 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&q=80';
    }
    
    if (plantName.includes('cactus') || speciesName.includes('cactus')) {
      return 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=300&fit=crop&q=80';
    }
    
    if (plantName.includes('fern') || speciesName.includes('fern')) {
      return 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop&q=80';
    }
    
    if (plantName.includes('succulent') || speciesName.includes('succulent')) {
      return 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=300&fit=crop&q=80';
    }
    
    if (plantName.includes('orchid') || speciesName.includes('orchid')) {
      return 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&q=80';
    }
    
    if (plantName.includes('bamboo') || speciesName.includes('bamboo')) {
      return 'https://images.unsplash.com/photo-1550948537-6b5b6c6c2c0d?w=400&h=300&fit=crop&q=80';
    }
    
    if (plantName.includes('tulsi') || speciesName.includes('tulsi') || plantName.includes('basil')) {
      return 'https://images.unsplash.com/photo-1618164435735-413d3b066c9a?w=400&h=300&fit=crop&q=80';
    }
    
    const plantImages = [
      'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400&h=300&fit=crop&q=80', // Monstera
      'https://images.unsplash.com/photo-1509423350716-97f2360af2e4?w=400&h=300&fit=crop&q=80', // Pothos
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80', // Snake Plant
      'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=300&fit=crop&q=80', // Fiddle Leaf Fig
      'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=400&h=300&fit=crop&q=80', // Peace Lily
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop&q=80', // Rubber Plant
      'https://images.unsplash.com/photo-1583160247711-2191776b4b91?w=400&h=300&fit=crop&q=80', // ZZ Plant
      'https://images.unsplash.com/photo-1597149960419-0d902853c6ba?w=400&h=300&fit=crop&q=80', // Spider Plant
      'https://images.unsplash.com/photo-1605020420620-20c943cc4669?w=400&h=300&fit=crop&q=80', // Philodendron
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop&q=80', // Dracaena
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400&h=300&fit=crop&q=80', // Calathea
      'https://images.unsplash.com/photo-1574263867128-a3d5c1b1deaa?w=400&h=300&fit=crop&q=80', // Jade Plant
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop&q=80'  // Boston Fern
    ];
    
    return plantImages[plant.id % plantImages.length];
  };
  
  const getHealthStatusColor = (status) => {
    switch(status?.toUpperCase()) {
      case 'EXCELLENT': return '#10b981';
      case 'GOOD': return '#3b82f6';
      case 'FAIR': return '#f59e0b';
      case 'POOR': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="plant-card">
      <div className="plant-image-container">
        <img src={getPlantImage()} alt={plant.nickname} className="plant-img" />
        <div className="health-badge" style={{ backgroundColor: getHealthStatusColor(plant.healthStatus) }}>
          {plant.healthStatus || 'Unknown'}
        </div>
      </div>
      
      <div className="plant-content">
        <div className="plant-header">
          <h3 className="plant-name">{plant.nickname}</h3>
          <div className="plant-species">{plant.species?.name || 'Unknown Species'}</div>
        </div>
        
        <div className="plant-info">
          <div className="info-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>{plant.location || 'No location'}</span>
          </div>
          
          {plant.notes && (
            <div className="info-item notes">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
              <span>{plant.notes}</span>
            </div>
          )}
        </div>
        
        <div className="plant-actions">
          {canUpdate(userRole) && (
            <button className="action-btn primary" onClick={onEdit}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
              Edit
            </button>
          )}
          
          <div className="action-menu">
            <button className="action-btn secondary" onClick={onCareTasks}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
              Care
            </button>
            
            <button className="action-btn secondary" onClick={onEnvironmentData}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15 13V5c0-1.66-1.34-3-3-3S9 3.34 9 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-4-2V5c0-.55.45-1 1-1s1 .45 1 1v6h-2z"/>
              </svg>
              Environment
            </button>
            
            <button className="action-btn secondary" onClick={onHealthRecord}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/>
              </svg>
              Health
            </button>
            
            <button className="action-btn secondary" onClick={onSchedule}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
              </svg>
              Schedule
            </button>
            
            {canDelete(userRole) && (
              <button className="action-btn danger" onClick={onDelete}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
