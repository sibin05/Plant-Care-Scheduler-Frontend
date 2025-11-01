import axios from 'axios';

const API_URL = 'https://plant-care-scheduler-backend.onrender.com/api/';

export const axiosConfig = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authHeader = () => {
  const token = localStorage.getItem('accessToken');
  return {
    Authorization: token ? `Bearer ${token}` : '',
  };
};

axiosConfig.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});