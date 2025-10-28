import React, { useState, useEffect } from 'react';
import * as plantService from '../../services/plantService';
import { canUpdate } from '../../utils/permissions';
import '../../styles/modal.css';

const EditPlantModal = ({ isOpen, onClose, onPlantUpdated, plant, userRole }) => {
  const [formData, setFormData] = useState({
    nickname: '',
    location: '',
    acquisitionDate: '',
    currentHeightCm: '',
    currentWidthCm: '',
    potSize: '',
    soilType: '',
    healthStatus: 'GOOD',
    notes: ''
  });

  useEffect(() => {
    if (plant) {
      setFormData({
        nickname: plant.nickname || '',
        location: plant.location || '',
        acquisitionDate: plant.acquisitionDate || '',
        currentHeightCm: plant.currentHeightCm || '',
        currentWidthCm: plant.currentWidthCm || '',
        potSize: plant.potSize || '',
        soilType: plant.soilType || '',
        healthStatus: plant.healthStatus || 'GOOD',
        notes: plant.notes || ''
      });
    }
  }, [plant]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await plantService.updatePlant(plant.id, formData, userRole);
      alert('Plant updated successfully!');
      onPlantUpdated();
      onClose();
    } catch (error) {
      alert('Failed to update plant');
    }
  };

  if (!isOpen) return null;
  
  if (!canUpdate(userRole)) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Access Denied</h2>
          <p>You don't have permission to edit plants. Contact an administrator for access.</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Plant</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nickname"
            placeholder="Plant Nickname *"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />
          <input
            type="date"
            name="acquisitionDate"
            placeholder="Acquisition Date"
            value={formData.acquisitionDate}
            onChange={handleChange}
          />
          <input
            type="number"
            name="currentHeightCm"
            placeholder="Height (cm)"
            value={formData.currentHeightCm}
            onChange={handleChange}
            step="0.1"
          />
          <input
            type="number"
            name="currentWidthCm"
            placeholder="Width (cm)"
            value={formData.currentWidthCm}
            onChange={handleChange}
            step="0.1"
          />
          <input
            type="text"
            name="potSize"
            placeholder="Pot Size"
            value={formData.potSize}
            onChange={handleChange}
          />
          <input
            type="text"
            name="soilType"
            placeholder="Soil Type"
            value={formData.soilType}
            onChange={handleChange}
          />
          <select
            name="healthStatus"
            value={formData.healthStatus}
            onChange={handleChange}
            required
          >
            <option value="EXCELLENT">Excellent</option>
            <option value="GOOD">Good</option>
            <option value="FAIR">Fair</option>
            <option value="POOR">Poor</option>
            <option value="CRITICAL">Critical</option>
          </select>
          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
          />
          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Update Plant</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlantModal;