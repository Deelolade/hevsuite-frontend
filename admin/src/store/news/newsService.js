import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Get auth token
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token;
};

// Get all news
const getAllNews = async () => {
  const response = await axios.get(`${API_URL}/newsroom/admin`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  return response.data;
};

// Create news
const createNews = async (formData) => {
  const response = await axios.post(`${API_URL}/newsroom`, formData, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Update news
const updateNews = async (id, formData) => {
  const response = await axios.put(`${API_URL}/newsroom/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Delete news
const deleteNews = async (id) => {
  const response = await axios.delete(`${API_URL}/newsroom/${id}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  return { id }; // Return the ID of the deleted news
};

const newsService = {
  getAllNews,
  createNews,
  updateNews,
  deleteNews,
};

export default newsService;
