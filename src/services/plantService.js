import { axiosConfig } from './axiosConfig';
import { canCreate, canUpdate, canDelete } from '../utils/permissions';

const API_URL = "/plants";

export const getPlants = (params) => {
  return axiosConfig.get(API_URL, { params });
};

export const getPlantById = (id) => {
  return axiosConfig.get(`${API_URL}/${id}`);
};

export const addPlant = (plant, userRole) => {
  if (!canCreate(userRole)) {
    throw new Error('Insufficient permissions to create plants');
  }
  return axiosConfig.post(API_URL, plant);
};

export const createPlant = (plant, userRole) => {
  if (!canCreate(userRole)) {
    throw new Error('Insufficient permissions to create plants');
  }
  return axiosConfig.post(API_URL, plant);
};

export const updatePlant = (id, plant, userRole) => {
  if (!canUpdate(userRole)) {
    throw new Error('Insufficient permissions to update plants');
  }
  return axiosConfig.put(`${API_URL}/${id}`, plant);
};

export const deletePlant = (id, userRole) => {
  if (!canDelete(userRole)) {
    throw new Error('Insufficient permissions to delete plants');
  }
  return axiosConfig.delete(`${API_URL}/${id}`);
};
