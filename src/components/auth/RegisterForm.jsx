import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../../services/authService";
import "../../styles/auth.css";

const RegisterForm = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: "STANDARD_PLANT_OWNER",
    gardeningExperience: "BEGINNER",
    location: "",
    timezone: "",
  });

  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);


  const roles = [
    "ADMIN",
    "PLANT_CARE_SPECIALIST",
    "PREMIUM_PLANT_OWNER",
    "STANDARD_PLANT_OWNER",
    "COMMUNITY_MEMBER",
    "GUEST",
  ];

  const experiences = ["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"];

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation - simplified
    if (userData.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await register(userData);
      setSuccess("Registration successful! Please login.");
      setErrors({});
    } catch (err) {
      console.error('Registration error:', err);
      setSuccess("Registration failed: " + (err.message || 'Unknown error'));
      setErrors({});
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // TODO: Implement social login
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card register-only">
        {/* Register form only */}
        <div className="auth-form">
          <div className="register-header">
            <h2>Join PLANTA</h2>
            <p className="register-subtitle">Start your plant care journey today</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={userData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={userData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={userData.password}
                  onChange={handleChange}
                  required
                />
                <span 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </span>
              </div>
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={userData.location}
                onChange={handleChange}
                placeholder="Location (e.g., Chennai, India)"
              />
            </div>

            <div className="form-group">
              <label>Timezone</label>
              <input
                type="text"
                name="timezone"
                value={userData.timezone}
                onChange={handleChange}
                placeholder="Timezone (e.g., IST)"
              />
            </div>

            <div className="form-group">
              <label>Role</label>
              <select
                name="role"
                value={userData.role}
                onChange={handleChange}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Gardening Experience</label>
              <select
                name="gardeningExperience"
                value={userData.gardeningExperience}
                onChange={handleChange}
              >
                {experiences.map((exp) => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit">Register</button>
          </form>

          {success && <p className="success-message">{success}</p>}
          <p className="auth-switch">
            Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
          </p>
          
          <div className="divider">
            <span>or sign in with</span>
          </div>
          
          <div className="social-login-section">
            <button type="button" className="social-btn google-btn" onClick={() => handleSocialLogin('google')}>
              <span className="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </span>
              Continue with Google
            </button>
            <button type="button" className="social-btn microsoft-btn" onClick={() => handleSocialLogin('microsoft')}>
              <span className="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" fill="#00BCF2"/>
                </svg>
              </span>
              Continue with Microsoft
            </button>
            <button type="button" className="social-btn github-btn" onClick={() => handleSocialLogin('github')}>
              <span className="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </span>
              Continue with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
