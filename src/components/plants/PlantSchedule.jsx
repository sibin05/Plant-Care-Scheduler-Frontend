import React, { useState, useEffect } from 'react';
import { axiosConfig } from '../../services/axiosConfig';
import '../../styles/modal.css';

const PlantSchedule = ({ plantId, isOpen, onClose }) => {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && plantId) {
      fetchSchedule();
    }
  }, [isOpen, plantId]);

  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const response = await axiosConfig.get(`/plants/${plantId}/schedule`);
      setSchedule(response.data);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysText = (days) => {
    if (days < 0) return `${Math.abs(days)} days overdue`;
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `In ${days} days`;
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '600px', maxHeight: '80vh', overflow: 'auto' }}>
        <h2>🌿 Smart Plant Care Schedule</h2>
        {loading ? (
          <p>Loading intelligent schedule...</p>
        ) : schedule ? (
          <div style={{ display: 'grid', gap: '16px' }}>
            {/* Care Schedule Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              <div style={{ 
                padding: '12px', 
                backgroundColor: '#e6f3ff', 
                borderRadius: '8px',
                border: '1px solid #b3d9ff'
              }}>
                <h4 style={{ margin: '0 0 6px 0', color: '#0066cc', fontSize: '14px' }}>
                  💧 Next Watering
                </h4>
                <p style={{ margin: '2px 0', fontSize: '13px', fontWeight: 'bold' }}>
                  {formatDate(schedule.nextWatering)}
                </p>
                <p style={{ 
                  margin: '2px 0', 
                  fontSize: '11px', 
                  color: schedule.wateringDaysLeft < 0 ? '#cc0000' : '#666'
                }}>
                  {getDaysText(schedule.wateringDaysLeft)}
                </p>
              </div>

              <div style={{ 
                padding: '12px', 
                backgroundColor: '#f0f8e6', 
                borderRadius: '8px',
                border: '1px solid #c3e6a3'
              }}>
                <h4 style={{ margin: '0 0 6px 0', color: '#4d7c0f', fontSize: '14px' }}>
                  🌱 Next Fertilizer
                </h4>
                <p style={{ margin: '2px 0', fontSize: '13px', fontWeight: 'bold' }}>
                  {formatDate(schedule.nextFertilizer)}
                </p>
                <p style={{ 
                  margin: '2px 0', 
                  fontSize: '11px', 
                  color: schedule.fertilizerDaysLeft < 0 ? '#cc0000' : '#666'
                }}>
                  {getDaysText(schedule.fertilizerDaysLeft)}
                </p>
              </div>

              {schedule.nextPruning && (
                <div style={{ 
                  padding: '12px', 
                  backgroundColor: '#fef3e2', 
                  borderRadius: '8px',
                  border: '1px solid #f59e0b'
                }}>
                  <h4 style={{ margin: '0 0 6px 0', color: '#d97706', fontSize: '14px' }}>
                    ✂️ Next Pruning
                  </h4>
                  <p style={{ margin: '2px 0', fontSize: '13px', fontWeight: 'bold' }}>
                    {formatDate(schedule.nextPruning)}
                  </p>
                  <p style={{ 
                    margin: '2px 0', 
                    fontSize: '11px', 
                    color: schedule.pruningDaysLeft < 0 ? '#cc0000' : '#666'
                  }}>
                    {getDaysText(schedule.pruningDaysLeft)}
                  </p>
                </div>
              )}
            </div>

            {/* Optimal Care Times */}
            <div style={{ 
              padding: '12px', 
              backgroundColor: '#f8fafc', 
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#374151', fontSize: '14px' }}>⏰ Optimal Care Times</h4>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>
                <p style={{ margin: '2px 0' }}>💧 Watering: {schedule.optimalWateringTime}</p>
                <p style={{ margin: '2px 0' }}>🌱 Fertilizing: {schedule.optimalFertilizerTime}</p>
              </div>
            </div>

            {/* Smart Recommendations */}
            {schedule.recommendations && schedule.recommendations.length > 0 && (
              <div style={{ 
                padding: '12px', 
                backgroundColor: '#fefce8', 
                borderRadius: '8px',
                border: '1px solid #facc15'
              }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#a16207', fontSize: '14px' }}>🤖 Smart Recommendations</h4>
                <div style={{ fontSize: '12px' }}>
                  {schedule.recommendations.map((rec, index) => (
                    <p key={index} style={{ 
                      margin: '4px 0', 
                      padding: '4px 8px', 
                      backgroundColor: 'white', 
                      borderRadius: '4px',
                      color: '#374151'
                    }}>
                      {rec}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
              gap: '8px',
              marginTop: '8px'
            }}>
              <button 
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
                onClick={() => alert('Watering logged! Next watering updated.')}
              >
                💧 Mark Watered
              </button>
              <button 
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
                onClick={() => alert('Fertilizing logged! Next fertilizer updated.')}
              >
                🌱 Mark Fertilized
              </button>
            </div>
          </div>
        ) : (
          <p>No schedule data available</p>
        )}
        <div className="modal-actions" style={{ marginTop: '16px' }}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default PlantSchedule;