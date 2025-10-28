import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";

// Auth
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";

// Plants
import PlantList from "./components/plants/PlantList";

// Care Tasks
import CareTasks from "./components/care/CareTasks";

// Environment
import EnvironmentDashboard from "./components/environment/EnvironmentDashboard";

// Health
import HealthMonitor from "./components/health/HealthMonitor";
import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";
import Dashboard from "./components/Dashboard";

// Landing
import LandingPage from "./components/landing/LandingPage";
import Contact from "./components/Contact";
import Features from "./components/Features";
import About from "./components/About";
import NotificationSystem from "./components/NotificationSystem";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLogin from "./components/admin/AdminLogin";
import AdminGuide from "./components/admin/AdminGuide";

// Simple protected route wrapper
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  return token ? children : <Navigate to="/login" />;
};

// Wrapper components for dynamic routes
const EnvironmentWrapper = () => {
  const { plantId } = useParams();
  return <EnvironmentDashboard plantId={plantId} />;
};

const HealthWrapper = () => {
  const { plantId } = useParams();
  return <HealthMonitor plantId={plantId} />;
};

const App = () => {
  return (
    <Router>
      <NotificationSystem />
      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        
        {/* Auth */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Dashboard → allow demo access */}
        <Route
          path="/dashboard"
          element={<Dashboard/>}
        />

        {/* Admin Routes */}
        <Route path="/admin-guide" element={<AdminGuide />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* Plants */}
        <Route
          path="/plants"
          element={
            <PrivateRoute>
              <PlantList />
            </PrivateRoute>
          }
        />

        {/* Care Tasks */}
        <Route
          path="/care-tasks"
          element={
            <PrivateRoute>
              <CareTasks />
            </PrivateRoute>
          }
        />

        {/* Environment */}
        <Route
          path="/environment/:plantId"
          element={
            <PrivateRoute>
              <EnvironmentWrapper />
            </PrivateRoute>
          }
        />

        {/* Health Records */}
        <Route
          path="/health/:plantId"
          element={
            <PrivateRoute>
              <HealthWrapper />
            </PrivateRoute>
          }
        />

        {/* Default → redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
