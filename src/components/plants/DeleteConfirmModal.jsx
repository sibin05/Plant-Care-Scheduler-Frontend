import React from 'react';
import '../../styles/modal.css';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, plantName }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Delete Plant</h2>
        <p>Are you sure you want to delete "{plantName}"?</p>
        <p>This action cannot be undone.</p>
        <div className="modal-actions">
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="button" onClick={onConfirm} className="delete-confirm-btn">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;