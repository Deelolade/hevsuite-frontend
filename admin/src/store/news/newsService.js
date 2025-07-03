import axios from "axios";
import { base_url } from '../../constants/axiosConfig';
// const base_url = import.meta.env.VITE_base_url;

// Get auth token
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token;
};

// Get all news
const getAllNews = async (params = {}) => {
  // Build query string from params
  const query = new URLSearchParams();
  if (params.filter) query.append('filter', params.filter);
  if (params.sort) query.append('sort', params.sort);
  // You can add pagination/search here if backend supports it
  const url = `${base_url}/api/newsroom/admin${query.toString() ? `?${query.toString()}` : ''}`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  return response.data;
};

// Create news
const createNews = async (formData) => {
  const response = await axios.post(`${base_url}/api/newsroom`, formData, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Update news
const updateNews = async (id, newsData) => {
  const response = await axios.put(`${base_url}/api/newsroom/${id}`, newsData, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Delete news
const deleteNews = async (id) => {
  const response = await axios.delete(`${base_url}/api/newsroom/${id}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  return { id }; // Return the ID of the deleted news
};

// Restore news
const restoreNews = async (id) => {
  const response = await axios.put(`${base_url}/api/newsroom/${id}/restore`, {}, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  return response.data;
};

// Post news via email
const postNewsViaEmail = async (data) => {
  const response = await axios.post(`${base_url}/api/newsroom/post-email`, data, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  return response.data;
};

const newsService = {
  getAllNews,
  createNews,
  updateNews,
  deleteNews,
  restoreNews,
  postNewsViaEmail,
};

export default newsService;
