import { axiosConfig } from './axiosConfig';

const API_URL = 'http://localhost:8080/api/admin';

export const getAllUsers = async () => {
  try {
    const response = await axiosConfig.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch users');
  }
};

export const createUser = async (userData) => {
  try {
    // Map frontend field names to backend field names
    const backendUserData = {
      username: userData.username,
      email: userData.email,
      password: userData.password, // Use password field for register endpoint
      role: userData.role,
      gardeningExperience: userData.gardeningExperience,
      location: userData.location,
      timezone: userData.timezone
    };
    const response = await axiosConfig.post(`http://localhost:8080/api/auth/register`, backendUserData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    let errorMessage = error.response?.data?.message || error.response?.data || 'Failed to create user';
    if (typeof errorMessage === 'string') {
      errorMessage = errorMessage.replace(/[{}"]/g, '');
    } else {
      errorMessage = JSON.stringify(errorMessage).replace(/[{}"]/g, '');
    }
    throw new Error(errorMessage);
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axiosConfig.put(`${API_URL}/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update user');
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axiosConfig.delete(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete user');
  }
};

export const getAdminStats = async () => {
  try {
    const response = await axiosConfig.get(`${API_URL}/stats`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch statistics');
  }
};