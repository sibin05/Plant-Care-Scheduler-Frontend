import axios from "axios";
import { authHeader } from "./axiosConfig";

const API_URL = "http://localhost:8080/api/care-tasks";

export const getCareTasks = () => {
  return axios.get(API_URL, authHeader());
};

export const createCareTask = (task) => {
  return axios.post(API_URL, task, authHeader());
};

export const updateCareTask = (id, task) => {
  return axios.put(`${API_URL}/${id}`, task, authHeader());
};

export const deleteCareTask = (id) => {
  return axios.delete(`${API_URL}/${id}`, authHeader());
};
