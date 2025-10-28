import React, { useState, useEffect, useCallback } from 'react';
import { axiosConfig } from '../../services/axiosConfig';
import { canUpdate, canDelete } from '../../utils/permissions';
import '../../styles/components.css';

const EnvironmentDashboard = ({ plantId, userRole }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Safe ranges for plant environment
  const safeRanges = {
    temperature: { min: 15, max: 30 }, // 15-30°C
    humidity: { min: 40, max: 70 },    // 40-70%
    lightLevel: { min: 1000, max: 50000 }, // 1000-50000 lux
    soilMoisture: { min: 30, max: 80 }  // 30-80%
  };
  const [newData, setNewData] = useState({
    locationId: '',
    temperatureCelsius: '',
    humidityPercentage: '',
    lightLevelLux: '',
    soilMoisturePercentage: ''
  });
  const [editingData, setEditingData] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const url = plantId ? `/environment?plantId=${plantId}` : '/environment';
      const response = await axiosConfig.get(url);
      setData(response.data.content || response.data || []);
    } catch (error) {
      console.error('Error:', error);
      setData([]);
    }
    setLoading(false);
  }, [plantId]);

  const createData = async (e) => {
    e.preventDefault();
    if (!plantId) {
      alert('Please select a plant first to add environment data.');
      return;
    }
    try {
      const dataToSend = {
        ...newData,
        plantId: plantId,
        temperatureCelsius: newData.temperatureCelsius ? parseFloat(newData.temperatureCelsius) : null,
        humidityPercentage: newData.humidityPercentage ? parseFloat(newData.humidityPercentage) : null,
        lightLevelLux: newData.lightLevelLux ? parseInt(newData.lightLevelLux) : null,
        soilMoisturePercentage: newData.soilMoisturePercentage ? parseFloat(newData.soilMoisturePercentage) : null
      };
      
      if (editingData) {
        await axiosConfig.put(`/environment/${editingData.id}`, dataToSend);
        setEditingData(null);
        alert('Environment data updated successfully!');
      } else {
        await axiosConfig.post('/environment/manual-entry', dataToSend);
        alert('Environment data added successfully!');
      }
      setNewData({ locationId: '', temperatureCelsius: '', humidityPercentage: '', lightLevelLux: '', soilMoisturePercentage: '' });
      fetchData();
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save environment data. Please try again.');
    }
  };

  const handleEditData = (item) => {
    setEditingData(item);
    setNewData({
      locationId: item.locationId || '',
      temperatureCelsius: item.temperatureCelsius || '',
      humidityPercentage: item.humidityPercentage || '',
      lightLevelLux: item.lightLevelLux || '',
      soilMoisturePercentage: item.soilMoisturePercentage || ''
    });
  };

  const handleDeleteData = async (dataId) => {
    if (window.confirm('Are you sure you want to delete this environment data?')) {
      try {
        await axiosConfig.delete(`/environment/${dataId}`);
        fetchData();
        alert('Environment data deleted successfully!');
      } catch (error) {
        console.error('Error deleting data:', error);
        alert('Failed to delete environment data.');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingData(null);
    setNewData({ locationId: '', temperatureCelsius: '', humidityPercentage: '', lightLevelLux: '', soilMoisturePercentage: '' });
  };

  const getWarningStatus = (value, type) => {
    if (!value) return null;
    const range = safeRanges[type];
    if (value < range.min) return { type: 'low', message: `Too low (min: ${range.min})` };
    if (value > range.max) return { type: 'high', message: `Too high (max: ${range.max})` };
    return null;
  };

  const renderValueWithWarning = (value, unit, type, label) => {
    const warning = getWarningStatus(value, type);
    const getIcon = (type) => {
      switch(type) {
        case 'temperature': return <path d="M15 13V5c0-1.66-1.34-3-3-3S9 3.34 9 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-4-2V5c0-.55.45-1 1-1s1 .45 1 1v6h-2z"/>;
        case 'humidity': return <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2C20 10.48 17.33 6.55 12 2z"/>;
        case 'lightLevel': return <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/>;
        case 'soilMoisture': return <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>;
        default: return null;
      }
    };
    
    return (
      <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}>
          {getIcon(type)}
        </svg>
        <strong>{label}:</strong> 
        <span style={{ color: warning ? '#dc2626' : 'inherit' }}>
          {value}{unit}
        </span>
        {warning && (
          <span style={{ 
            backgroundColor: warning.type === 'high' ? '#fee2e2' : '#dbeafe',
            color: warning.type === 'high' ? '#dc2626' : '#2563eb',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            ⚠️ {warning.message}
          </span>
        )}
      </p>
    );
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div style={{ padding: '20px' }}>
      <h3>Environment Data {plantId ? `for Plant ID: ${plantId}` : '(All Plants)'}</h3>
      
      {!plantId && (
        <div className="tip-box">
          <p><strong>Tip:</strong> Click on a plant card and select "Environment Data" to add data for a specific plant, or view all data below.</p>
        </div>
      )}
      
      {canUpdate(userRole) ? (
        <form onSubmit={createData} className="form-container">
          <h4>{editingData ? 'Edit Environment Data' : 'Add Environment Data'}</h4>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="text" 
            placeholder="Location ID" 
            value={newData.locationId} 
            onChange={(e) => setNewData({...newData, locationId: e.target.value})} 
            required 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="number" 
            placeholder="Temperature (°C)" 
            value={newData.temperatureCelsius} 
            onChange={(e) => setNewData({...newData, temperatureCelsius: e.target.value})} 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="number" 
            placeholder="Humidity (%)" 
            value={newData.humidityPercentage} 
            onChange={(e) => setNewData({...newData, humidityPercentage: e.target.value})} 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="number" 
            placeholder="Light Level (lux)" 
            value={newData.lightLevelLux} 
            onChange={(e) => setNewData({...newData, lightLevelLux: e.target.value})} 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="number" 
            placeholder="Soil Moisture (%)" 
            value={newData.soilMoisturePercentage} 
            onChange={(e) => setNewData({...newData, soilMoisturePercentage: e.target.value})} 
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingData ? (
              <><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg> Update Data</>
            ) : (
              <><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg> Add Data</>
            )}
          </button>
          {editingData && (
            <button type="button" onClick={handleCancelEdit} className="btn btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
              Cancel
            </button>
          )}
        </div>
        </form>
      ) : (
        <div className="read-only-notice">
          <p>📖 You have read-only access to environment data. Contact an administrator for modification permissions.</p>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {data.length === 0 ? (
            <p>No environment data found. Add some above!</p>
          ) : (
            data.map(item => {
              const hasWarnings = [
                getWarningStatus(item.temperatureCelsius, 'temperature'),
                getWarningStatus(item.humidityPercentage, 'humidity'),
                getWarningStatus(item.lightLevelLux, 'lightLevel'),
                getWarningStatus(item.soilMoisturePercentage, 'soilMoisture')
              ].some(warning => warning !== null);
              
              return (
              <div key={item.id} className="data-card" style={{
                border: hasWarnings ? '2px solid #dc2626' : '1px solid #e5e7eb',
                backgroundColor: hasWarnings ? '#fef2f2' : 'white'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <h4 style={{ margin: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg> 
                    Location: {item.locationId}
                  </h4>
                  {hasWarnings && (
                    <span style={{
                      backgroundColor: '#dc2626',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      ⚠️ WARNING
                    </span>
                  )}
                </div>
                
                {renderValueWithWarning(item.temperatureCelsius, '°C', 'temperature', 'Temperature')}
                {renderValueWithWarning(item.humidityPercentage, '%', 'humidity', 'Humidity')}
                {renderValueWithWarning(item.lightLevelLux, ' lux', 'lightLevel', 'Light')}
                {renderValueWithWarning(item.soilMoisturePercentage, '%', 'soilMoisture', 'Soil Moisture')}
                <p style={{ marginTop: '12px', paddingTop: '8px', borderTop: '1px solid #e5e7eb' }}>
                  <strong>Recorded:</strong> 
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}>
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                  </svg> 
                  {new Date(item.recordedDate).toLocaleString()}
                </p>
                {(canUpdate(userRole) || canDelete(userRole)) && (
                  <div className="data-actions">
                    {canUpdate(userRole) && (
                      <button onClick={() => handleEditData(item)} className="btn btn-primary">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}>
                          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                        </svg>
                        Edit
                      </button>
                    )}
                    {canDelete(userRole) && (
                      <button onClick={() => handleDeleteData(item.id)} className="btn btn-danger">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}>
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                        Delete
                      </button>
                    )}
                  </div>
                )}
              </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default EnvironmentDashboard;