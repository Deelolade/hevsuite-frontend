import axios from "axios";
import { base_url } from "../../constants/axiosConfig";
const getAuthToken = () => {
  const adminData = localStorage.getItem("admin");
  const admin = adminData ? JSON.parse(adminData) : null;
  return admin?.token || "";
};

const getAllNews = async ({ status, filter }) => {
  const token = getAuthToken();
  const response = await axios.get(
    `${base_url}/admin/all-news?status=${status}&filter=${filter}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const createNews = async (data) => {
  const token = getAuthToken();
  const response = await axios.post(`${base_url}/admin/create-news`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const editNews = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/admin/edit-news/${data.id}`,
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

const deleteNews = async (id) => {
  const token = getAuthToken();
  const response = await axios.delete(`${base_url}/admin/delete-news/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const newsService = {
  getAllNews,
  createNews,
  editNews,
  deleteNews,
};

export default newsService;
