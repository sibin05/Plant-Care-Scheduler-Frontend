import axios from "axios";
import { authHeader } from './axiosConfig'; // Assuming you have a helper for auth headers

const API_URL = "http://localhost:8080/api/species"; // Adjust the URL if necessary

export const getSpecies = (params) => {
  return axios.get(API_URL, { params, headers: authHeader() });
};

export const getSpeciesById = (id) => {
  return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
};

export const searchSpecies = (query) => {
  return axios.get(`${API_URL}/search`, { params: { q: query }, headers: authHeader() });
};
