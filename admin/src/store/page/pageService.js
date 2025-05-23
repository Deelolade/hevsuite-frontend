// services/pageService.ts
import axios from "axios";
import { base_url } from "../../constants/axiosConfig";

const getAuthToken = () => {
  const adminData = localStorage.getItem("admin");
  const admin = adminData ? JSON.parse(adminData) : null;
  return admin?.token || "";
};

const getAllPages = async () => {
  const token = getAuthToken();
  const response = await axios.get(`${base_url}/api/cms/pages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

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

const createPage = async (data) => {
  const token = getAuthToken();
  const response = await axios.post(`${base_url}/api/cms/pages`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const updatePage = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(`${base_url}/api/cms/pages/${data.id}`, data.data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

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

const pageService = {
  getAllPages,
  getPageById,
  createPage,
  updatePage,
  deletePage,
};

export default pageService;
