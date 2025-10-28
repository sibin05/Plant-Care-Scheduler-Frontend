import { axiosConfig } from './axiosConfig';
import { canUpdate, canDelete } from '../utils/permissions';

export const getTasks = (plantId) => {
  const url = plantId ? `/care-tasks?plantId=${plantId}` : '/care-tasks';
  return axiosConfig.get(url);
};

export const createTask = (taskData, userRole) => {
  if (!canUpdate(userRole)) {
    throw new Error('Insufficient permissions to create care tasks');
  }
  return axiosConfig.post('/care-tasks', taskData);
};

export const updateTask = (id, data, userRole) => {
  if (!canUpdate(userRole)) {
    throw new Error('Insufficient permissions to update care tasks');
  }
  return axiosConfig.put(`/care-tasks/${id}`, data);
};

export const deleteTask = (id, userRole) => {
  if (!canDelete(userRole)) {
    throw new Error('Insufficient permissions to delete care tasks');
  }
  return axiosConfig.delete(`/care-tasks/${id}`);
};

export const getAllTasks = () => {
  return axiosConfig.get('/care-tasks');
};