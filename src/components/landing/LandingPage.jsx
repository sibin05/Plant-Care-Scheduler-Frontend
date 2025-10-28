import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import Footer from './Footer';
import { startDemoSession } from '../../services/demoService';
import '../../styles/landing.css';

function LandingPage() {
  const navigate = useNavigate();

  // Removed automatic redirect - users should see landing page first

  const handleGetStarted = () => {
    navigate('/register');
  };

  const handleTryDemo = () => {
    startDemoSession();
    navigate('/dashboard');
  };

  return (
    <div className="landing-page-container">
      <Navbar onGetStarted={handleGetStarted} />
      <HeroSection onGetStarted={handleGetStarted} onTryDemo={handleTryDemo} />
      
      <section className="usage-section">
        <div className="usage-container">
          <div className="usage-header">
            <h2>Application Usage & Impact</h2>
            <p>See how PLANTA transforms plant care routines worldwide</p>
          </div>
          
          <div className="usage-stats">
            <div className="stat-card">
              <div className="stat-chart">
                <div className="chart-bar" style={{height: '80%'}}></div>
                <div className="chart-bar" style={{height: '65%'}}></div>
                <div className="chart-bar" style={{height: '90%'}}></div>
                <div className="chart-bar" style={{height: '75%'}}></div>
              </div>
              <div className="stat-info">
                <h3>95%</h3>
                <p>Plant Survival Rate</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-chart">
                <div className="progress-ring">
                  <svg width="80" height="80">
                    <circle cx="40" cy="40" r="30" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
                    <circle cx="40" cy="40" r="30" fill="none" stroke="#10b981" strokeWidth="8" 
                            strokeDasharray="188" strokeDashoffset="47" transform="rotate(-90 40 40)"/>
                  </svg>
                  <span className="progress-text">75%</span>
                </div>
              </div>
              <div className="stat-info">
                <h3>10K+</h3>
                <p>Active Users</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-chart">
                <div className="line-chart">
                  <svg width="100" height="60" viewBox="0 0 100 60">
                    <polyline points="10,50 25,35 40,40 55,25 70,30 85,15" 
                              fill="none" stroke="#10b981" strokeWidth="3"/>
                    <circle cx="10" cy="50" r="3" fill="#10b981"/>
                    <circle cx="25" cy="35" r="3" fill="#10b981"/>
                    <circle cx="40" cy="40" r="3" fill="#10b981"/>
                    <circle cx="55" cy="25" r="3" fill="#10b981"/>
                    <circle cx="70" cy="30" r="3" fill="#10b981"/>
                    <circle cx="85" cy="15" r="3" fill="#10b981"/>
                  </svg>
                </div>
              </div>
              <div className="stat-info">
                <h3>2.5M</h3>
                <p>Care Tasks Completed</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-chart">
                <div className="donut-chart">
                  <svg width="80" height="80">
                    <circle cx="40" cy="40" r="25" fill="none" stroke="#e5e7eb" strokeWidth="12"/>
                    <circle cx="40" cy="40" r="25" fill="none" stroke="#10b981" strokeWidth="12" 
                            strokeDasharray="157" strokeDashoffset="39" transform="rotate(-90 40 40)"/>
                  </svg>
                </div>
              </div>
              <div className="stat-info">
                <h3>88%</h3>
                <p>User Satisfaction</p>
              </div>
            </div>
          </div>
          
          <div className="usage-features">
            <div className="feature-graph">
              <h4>Most Used Features</h4>
              <div className="feature-bars">
                <div className="feature-bar">
                  <span>Plant Monitoring</span>
                  <div className="bar-container">
                    <div className="bar-fill" style={{width: '92%'}}></div>
                  </div>
                  <span>92%</span>
                </div>
                <div className="feature-bar">
                  <span>Care Scheduling</span>
                  <div className="bar-container">
                    <div className="bar-fill" style={{width: '87%'}}></div>
                  </div>
                  <span>87%</span>
                </div>
                <div className="feature-bar">
                  <span>Health Tracking</span>
                  <div className="bar-container">
                    <div className="bar-fill" style={{width: '78%'}}></div>
                  </div>
                  <span>78%</span>
                </div>
                <div className="feature-bar">
                  <span>Environment Data</span>
                  <div className="bar-container">
                    <div className="bar-fill" style={{width: '65%'}}></div>
                  </div>
                  <span>65%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export default LandingPage;