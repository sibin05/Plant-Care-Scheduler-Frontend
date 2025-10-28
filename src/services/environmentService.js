import { axiosConfig } from './axiosConfig';
import { canUpdate, canDelete } from '../utils/permissions';

export const getEnvironmentData = (plantId) => {
  const url = plantId ? `/environment?plantId=${plantId}` : '/environment';
  return axiosConfig.get(url);
};

export const createEnvironmentData = (data, userRole) => {
  if (!canUpdate(userRole)) {
    throw new Error('Insufficient permissions to create environment data');
  }
  return axiosConfig.post('/environment/', data);
};

export const updateEnvironmentData = (id, data, userRole) => {
  if (!canUpdate(userRole)) {
    throw new Error('Insufficient permissions to update environment data');
  }
  return axiosConfig.put(`/environment/${id}`, data);
};

export const deleteEnvironmentData = (id, userRole) => {
  if (!canDelete(userRole)) {
    throw new Error('Insufficient permissions to delete environment data');
  }
  return axiosConfig.delete(`/environment/${id}`);
};
