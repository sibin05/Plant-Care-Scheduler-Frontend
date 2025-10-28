import React, { useState } from 'react';
import * as plantService from '../../services/plantService';
import { canCreate } from '../../utils/permissions';
import '../../styles/modal.css';

const AddPlantModal = ({ isOpen, onClose, onPlantAdded, userRole }) => {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await plantService.createPlant(formData, userRole);
      alert('Plant added successfully!');
      onPlantAdded();
      onClose();
      setFormData({
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
    } catch (error) {
      alert('Failed to add plant');
    }
  };

  if (!isOpen) return null;
  
  if (!canCreate(userRole)) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Access Denied</h2>
          <p>You don't have permission to add plants. Contact an administrator for access.</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Plant</h2>
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
            <button type="submit">Add Plant</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlantModal;