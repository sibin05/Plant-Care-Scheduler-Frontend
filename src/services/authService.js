import axios from "axios";

const API_URL = "http://localhost:8080/api/auth"; // Spring Boot backend

// Login
export const login = async ({ username, password }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    const { accessToken, refreshToken, user } = response.data;

    // store tokens
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    // optional: keep accessToken in sessionStorage too
    sessionStorage.setItem("accessToken", accessToken);

    return { accessToken, refreshToken, user };
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed.");
  }
};

// Register
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Registration error details:', error.response?.data);
    const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || "Registration failed.";
    throw new Error(errorMessage);
  }
};

// Forgot Password
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password?email=${email}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to send reset link.");
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  sessionStorage.removeItem("accessToken");
};
