import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/features.css';

const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
      title: "Smart Plant Management",
      description: "Add, organize, and track your plants with species-specific care profiles and visual health indicators.",
      benefits: ["Species database", "Health tracking", "Visual plant cards", "Care history"]
    },
    {
      icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M15 13V5c0-1.66-1.34-3-3-3S9 3.34 9 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-4-2V5c0-.55.45-1 1-1s1 .45 1 1v6h-2z"/></svg>,
      title: "IoT Environmental Monitoring",
      description: "Real-time sensor data collection for temperature, humidity, light, soil moisture, and pH levels.",
      benefits: ["Real-time monitoring", "Historical data", "Environmental alerts", "Optimal conditions tracking"]
    },
    {
      icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>,
      title: "Intelligent Care Scheduling",
      description: "Automated care task generation based on plant species requirements and environmental conditions.",
      benefits: ["Automated scheduling", "Custom reminders", "Task tracking", "Care optimization"]
    },
    {
      icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>,
      title: "Health Record Management",
      description: "Comprehensive health tracking with visual indicators, treatment history, and recovery monitoring.",
      benefits: ["Health status tracking", "Treatment records", "Recovery monitoring", "Health alerts"]
    },
    {
      icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>,
      title: "Advanced Analytics",
      description: "Comprehensive usage analytics with interactive charts showing plant health trends and care patterns.",
      benefits: ["Usage insights", "Health trends", "Care patterns", "Performance metrics"]
    },
    {
      icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>,
      title: "Secure User Management",
      description: "JWT-based authentication with secure user profiles, password reset, and data protection.",
      benefits: ["Secure authentication", "User profiles", "Password recovery", "Data encryption"]
    }
  ];

  return (
    <div className="features-page">
      <nav className="features-navbar">
        <div className="navbar-logo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span>PLANTA</span>
        </div>
        <a href="/" className="back-btn">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
  </svg>
  Back to Home
</a>
      </nav>

      <div className="features-container">
        <div className="features-header">
          <h1>Powerful Features for Plant Care</h1>
          <p>Discover how PLANTA revolutionizes plant care with intelligent monitoring and automated scheduling</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <ul className="feature-benefits">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="features-cta">
          <h2>Ready to Transform Your Plant Care?</h2>
          <p>Join thousands of users who have improved their plant care with PLANTA</p>
          <div className="cta-buttons">
            <button className="primary-btn" onClick={() => navigate('/register')}>
              Get Started Free
            </button>
            <button className="secondary-btn" onClick={() => navigate('/dashboard')}>
              Try Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;