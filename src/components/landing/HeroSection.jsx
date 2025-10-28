import React from 'react';

function HeroSection({ onGetStarted, onTryDemo }) {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <span className="hero-badge">#TakeCareOfPlants</span>
          <h1>Welcome to <span className="highlight">PLANTA</span></h1>
          <p className="hero-description">
            Transform your plant care routine with intelligent scheduling, real-time monitoring, 
            and expert guidance. Join thousands of plant enthusiasts who trust PLANTA to keep 
            their green companions thriving.
          </p>

          <div className="hero-buttons">
            <button className="cta-btn" onClick={onGetStarted}>
              REGISTER
            </button>
            <button className="demo-btn" onClick={onTryDemo}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px'}}>
                <path d="M8 5v14l11-7z"/>
              </svg>
              Try Demo
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="plant-showcase">
            <div className="plant-card-demo">
              <div className="plant-image">
                <img 
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop&q=80" 
                  alt="Monstera Deliciosa" 
                  style={{width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px'}}
                />
              </div>
              <h4>Monstera Deliciosa</h4>
              <div className="status-good">Healthy</div>
              <div className="next-care">Next watering: Tomorrow</div>
            </div>
            <div className="floating-elements">
              <div className="floating-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2C20 10.48 17.33 6.55 12 2z"/>
                </svg>
              </div>
              <div className="floating-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/>
                </svg>
              </div>
              <div className="floating-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;