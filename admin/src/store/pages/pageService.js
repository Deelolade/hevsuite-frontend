import axios from "axios";
import { base_url } from "../../constants/axiosConfig";

const getAuthToken = () => {
  const adminData = localStorage.getItem("admin");
  const admin = adminData ? JSON.parse(adminData) : null;
  return admin?.token || "";
};

// Create new page
const createPage = async (formData) => {
  const token = getAuthToken();
  const response = await axios.post(`${base_url}/api/cms/pages`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });
  return response.data;
};

// Get all pages with filtering and pagination
const getPages = async (data) => {
  const token = getAuthToken();
  const response = await axios.get(`${base_url}/api/cms/pages`, { 
    params: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

// Get page by ID
const getPageById = async (id) => {
  const token = getAuthToken();
  const response = await axios.get(`${base_url}/api/cms/pages/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

// Update page
const updatePage = async (id, data) => {
  const token = getAuthToken();
  const response = await axios.put(`${base_url}/api/cms/pages/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });
  return response.data;
};

// Delete page
const deletePage = async (id) => {
  const token = getAuthToken();
  const response = await axios.delete(`${base_url}/api/cms/pages/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

// Change page visibility
const changePageVisibility = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/api/cms/pages/${data.id}`,
    data.data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const pageService = {
  createPage,
  getPages,
  getPageById,
  updatePage,
  deletePage,
  changePageVisibility,
};

export default pageService; 