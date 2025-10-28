import React, { useState, useEffect, useCallback } from 'react';
import { getHealthRecords, createHealthRecord, updateHealthRecord, deleteHealthRecord } from '../../services/healthMonitorService';
import { axiosConfig } from '../../services/axiosConfig';
import { canCreate, canUpdate, canDelete, isReadOnly } from '../../utils/permissions';
import '../../styles/components.css';

const HealthMonitor = ({ plantId, userRole = 'GUEST' }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newRecord, setNewRecord] = useState({
    overallHealth: 'GOOD',
    symptoms: '',
    notes: '',
    recoveryStatus: 'NOT_APPLICABLE'
  });
  const [editingRecord, setEditingRecord] = useState(null);

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      const url = plantId ? `/health-records?plantId=${plantId}` : '/health-records';
      const response = await axiosConfig.get(url);
      console.log('Health records API response:', response.data);
      setRecords(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching records:', error);
      setRecords([]);
    }
    setLoading(false);
  }, [plantId]);

  const createRecord = async (e) => {
    e.preventDefault();
    
    // Use plantId from props or default to first plant
    let targetPlantId = plantId;
    if (!targetPlantId) {
      // If no plantId provided, use plant ID 1 as default
      targetPlantId = 1;
    }
    
    try {
      const recordToSend = {
        plantId: targetPlantId,
        overallHealth: newRecord.overallHealth,
        symptoms: newRecord.symptoms || null,
        notes: newRecord.notes || null,
        recoveryStatus: newRecord.recoveryStatus || 'NOT_APPLICABLE'
      };
      
      console.log('Sending health record:', recordToSend);
      
      if (editingRecord) {
        await axiosConfig.put(`/health-records/${editingRecord.id}`, recordToSend);
        setEditingRecord(null);
        alert('Health record updated successfully!');
      } else {
        await axiosConfig.post('/health-records', recordToSend);
        alert('Health record added successfully!');
      }
      setNewRecord({ overallHealth: 'GOOD', symptoms: '', notes: '', recoveryStatus: 'NOT_APPLICABLE' });
      fetchRecords();
    } catch (error) {
      console.error('Error saving record:', error.response?.data || error.message);
      alert(`Failed to save health record: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleEditRecord = (record) => {
    setEditingRecord(record);
    setNewRecord({
      overallHealth: record.overallHealth || 'GOOD',
      symptoms: record.symptoms || '',
      notes: record.notes || '',
      recoveryStatus: record.recoveryStatus || 'NOT_APPLICABLE'
    });
  };

  const handleDeleteRecord = async (recordId) => {
    if (window.confirm('Are you sure you want to delete this health record?')) {
      try {
        await axiosConfig.delete(`/health-records/${recordId}`);
        fetchRecords();
        alert('Health record deleted successfully!');
      } catch (error) {
        console.error('Error deleting record:', error);
        alert('Failed to delete health record.');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingRecord(null);
    setNewRecord({ overallHealth: 'GOOD', symptoms: '', notes: '', recoveryStatus: 'NOT_APPLICABLE' });
  };

  useEffect(() => {
    console.log('HealthMonitor component mounted, plantId:', plantId);
    fetchRecords();
  }, [fetchRecords]);
  
  useEffect(() => {
    console.log('HealthMonitor: Force initial load');
    fetchRecords();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h3>Health Records {plantId ? `for Plant ID: ${plantId}` : '(All Plants)'}</h3>
      
      <div className="tip-box">
        <p><strong>Tip:</strong> {plantId ? `Managing records for Plant ID: ${plantId}` : 'Managing records for default plant (ID: 1). Click on a plant card to select a specific plant.'}</p>
      </div>
      
      {canCreate(userRole) && (
        <form onSubmit={createRecord} className="form-container">
        <h4>{editingRecord ? 'Edit Health Record' : 'Add Health Record'}</h4>
        <div style={{ marginBottom: '10px' }}>
          <select value={newRecord.overallHealth} onChange={(e) => setNewRecord({...newRecord, overallHealth: e.target.value})}>
            <option value="EXCELLENT">Excellent</option>
            <option value="GOOD">Good</option>
            <option value="FAIR">Fair</option>
            <option value="POOR">Poor</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="text" 
            placeholder="Symptoms" 
            value={newRecord.symptoms} 
            onChange={(e) => setNewRecord({...newRecord, symptoms: e.target.value})} 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <textarea 
            placeholder="Notes" 
            value={newRecord.notes} 
            onChange={(e) => setNewRecord({...newRecord, notes: e.target.value})} 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <select value={newRecord.recoveryStatus} onChange={(e) => setNewRecord({...newRecord, recoveryStatus: e.target.value})}>
            <option value="NOT_APPLICABLE">Not Applicable</option>
            <option value="RECOVERING">Recovering</option>
            <option value="RECOVERED">Recovered</option>
            <option value="WORSENING">Worsening</option>
          </select>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingRecord ? (
              <><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg> Update Record</>
            ) : (
              <><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg> Add Record</>
            )}
          </button>
          {editingRecord && (
            <button type="button" onClick={handleCancelEdit} className="btn btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
              Cancel
            </button>
          )}
        </div>
        </form>
      )}
      
      {isReadOnly(userRole) && (
        <div className="read-only-notice" style={{padding: '15px', background: '#f0f9ff', border: '1px solid #0ea5e9', borderRadius: '8px', marginBottom: '20px'}}>
          <p style={{margin: 0, color: '#0369a1'}}><strong>View Only:</strong> You have read-only access. Contact an administrator for edit permissions.</p>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {records.length === 0 ? (
            <p>No health records found. Add one above!</p>
          ) : (
            records.map(record => (
              <div key={record.id} className="data-card">
                <h4><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}><path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg> Health Status</h4>
                <p><strong>Overall Health:</strong> <span className={`status-badge status-${record.overallHealth?.toLowerCase()}`}>{record.overallHealth}</span></p>
                <p><strong>Symptoms:</strong> <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> {record.symptoms || 'None'}</p>
                <p><strong>Recovery Status:</strong> <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg> {record.recoveryStatus}</p>
                <p><strong>Notes:</strong> <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg> {record.notes || 'No notes'}</p>
                <p><strong>Date:</strong> <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg> {new Date(record.assessmentDate).toLocaleString()}</p>
                <div className="data-actions">
                  {canUpdate(userRole) && (
                    <button onClick={() => handleEditRecord(record)} className="btn btn-primary">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}>
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                      </svg>
                      Edit
                    </button>
                  )}
                  {canDelete(userRole) && (
                    <button onClick={() => handleDeleteRecord(record.id)} className="btn btn-danger">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}>
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                      </svg>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default HealthMonitor;