import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/about.css';

const About = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: "Plant Care AI",
      role: "Smart Scheduling Engine",
      description: "Advanced algorithms that learn your plants' needs and optimize care schedules.",
icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
    },
    {
      name: "IoT Integration",
      role: "Environmental Monitoring",
      description: "Real-time sensor data collection for precise plant health tracking.",
icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
    },
    {
      name: "Species Database",
      role: "Plant Intelligence",
      description: "Comprehensive database of 10,000+ plant species with specific care requirements.",
icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
    }
  ];

  const achievements = [
    { number: "50K+", label: "Plants Saved", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> },
    { number: "95%", label: "Success Rate", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg> },
    { number: "25K+", label: "Happy Users", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> },
    { number: "150+", label: "Countries", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg> }
  ];

  return (
    <div className="about-page">
      <nav className="about-navbar">
        <div className="navbar-logo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span>PLANTA</span>
        </div>
        <button className="back-btn" onClick={() => navigate('/')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          Back to Home
        </button>
      </nav>

      <div className="about-container">
        {/* Hero Section */}
        <section className="about-hero">
          <h1>About PLANTA</h1>
          <p className="hero-subtitle">Revolutionizing plant care through intelligent technology and data-driven insights</p>
          <div className="hero-stats">
            {achievements.map((achievement, index) => (
              <div key={index} className="stat-item">
                <div className="stat-icon">{achievement.icon}</div>
                <div className="stat-number">{achievement.number}</div>
                <div className="stat-label">{achievement.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="mission-section">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                At PLANTA, we believe that everyone deserves to experience the joy of successful plant care. 
                Our mission is to bridge the gap between plant enthusiasts and botanical expertise through 
                cutting-edge technology, making plant care accessible, enjoyable, and successful for everyone.
              </p>
              <div className="mission-points">
                <div className="point">
                  <span className="point-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </span>
                  <div>
                    <h4>Precision Care</h4>
                    <p>Species-specific recommendations based on scientific research</p>
                  </div>
                </div>
                <div className="point">
                  <span className="point-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16 6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5z"/>
                    </svg>
                  </span>
                  <div>
                    <h4>Data-Driven</h4>
                    <p>IoT sensors and AI algorithms for optimal plant health</p>
                  </div>
                </div>
                <div className="point">
                  <span className="point-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  </span>
                  <div>
                    <h4>Sustainable Future</h4>
                    <p>Promoting green living and environmental consciousness</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mission-visual">
              <div className="plant-animation">
                <div className="plant-pot"></div>
                <div className="plant-stem"></div>
                <div className="plant-leaves">
                  <div className="leaf leaf-1">🍃</div>
                  <div className="leaf leaf-2">🍃</div>
                  <div className="leaf leaf-3">🍃</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="technology-section">
          <h2>Powered by Innovation</h2>
          <div className="tech-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="tech-card">
                <div className="tech-icon">{member.icon}</div>
                <h3>{member.name}</h3>
                <h4>{member.role}</h4>
                <p>{member.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Growth Mindset
              </h3>
              <p>We believe in continuous learning and improvement, just like the plants we care for.</p>
            </div>
            <div className="value-card">
              <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1-.9-2-2-2s-2 .9-2 2V18H4zm9-2c0 1.66 1.34 3 3 3s3-1.34 3-3V8h-2v8c0 .55-.45 1-1 1s-1-.45-1-1V8h-2v8z"/>
                </svg>
                Community First
              </h3>
              <p>Building a supportive community of plant lovers who share knowledge and experiences.</p>
            </div>
            <div className="value-card">
              <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                  <path d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16 6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5z"/>
                </svg>
                Scientific Approach
              </h3>
              <p>Every recommendation is backed by botanical research and real-world data.</p>
            </div>
            <div className="value-card">
              <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                Environmental Impact
              </h3>
              <p>Promoting sustainable practices and contributing to a greener planet.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2>Join the PLANTA Community</h2>
          <p>Start your journey to becoming a plant care expert today</p>
          <div className="cta-buttons">
            <button className="primary-btn" onClick={() => navigate('/register')}>
              Get Started Free
            </button>
            <button className="secondary-btn" onClick={() => navigate('/features')}>
              Explore Features
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;