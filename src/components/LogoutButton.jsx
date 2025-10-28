import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

const LogoutButton = ({ className = '' }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <button 
      onClick={handleLogout}
      className={`logout-btn ${className}`}
      style={{
        background: 'linear-gradient(45deg, #f44336, #d32f2f)',
        border: '1px solid rgba(255,255,255,0.3)',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'all 0.3s ease'
      }}
    >
      🚪 Logout
    </button>
  );
};

export default LogoutButton;