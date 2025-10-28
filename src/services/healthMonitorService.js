import { axiosConfig } from './axiosConfig';
import { canUpdate, canDelete } from '../utils/permissions';

export const getHealthRecords = (plantId) => {
  const url = plantId ? `/health-records?plantId=${plantId}` : '/health-records';
  return axiosConfig.get(url);
};

export const createHealthRecord = (data, userRole) => {
  if (!canUpdate(userRole)) {
    throw new Error('Insufficient permissions to create health records');
  }
  return axiosConfig.post('/health-records', data);
};

export const updateHealthRecord = (id, data, userRole) => {
  if (!canUpdate(userRole)) {
    throw new Error('Insufficient permissions to update health records');
  }
  return axiosConfig.put(`/health-records/${id}`, data);
};

export const deleteHealthRecord = (id, userRole) => {
  if (!canDelete(userRole)) {
    throw new Error('Insufficient permissions to delete health records');
  }
  return axiosConfig.delete(`/health-records/${id}`);
};

export const getAllHealthRecords = () => {
  return axiosConfig.get('/health-records');
};
