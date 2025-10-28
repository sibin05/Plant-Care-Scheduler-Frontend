import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar({ onGetStarted }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('accessToken');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    
    // Listen for storage changes
    window.addEventListener('storage', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleHome = () => {
    navigate('/dashboard');
  };

  const handleContact = () => {
    navigate('/contact');
  };

  const handleFeatures = () => {
    navigate('/features');
  };

  const handleAbout = () => {
    navigate('/about');
  };

  return (
    <nav className="landing-navbar">
      <div className="navbar-logo">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#abc689ff" style={{marginRight: '8px'}}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
        <span style={{color: '#4aae4aff', fontSize: '1em'}}>PLANTA</span>      
        <small>Plant Care Scheduler</small>
      </div>
      <ul className="navbar-links">
        <li><button className="nav-link" onClick={handleHome}>Home</button></li>
        <li><button className="nav-link" onClick={handleFeatures}>Features</button></li>
        <li><button className="nav-link" onClick={handleAbout}>About</button></li>
        <li><button className="nav-link" onClick={handleContact}>Contact</button></li>
      </ul>
      <div className="navbar-actions">
        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
        <button className="signup-btn" onClick={onGetStarted}>
          REGISTER
        </button>
        {isLoggedIn && (
          <button className="dashboard-btn" onClick={handleDashboard}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}>
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            Dashboard
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;