import axios from "axios";
import { base_url } from "../../constants/axiosConfig";
const getAuthToken = () => {
  const adminData = localStorage.getItem("admin");
  const admin = adminData ? JSON.parse(adminData) : null;
  return admin?.token || "";
};

const getNewMembers = async ({ search, status, filter }) => {
  const token = getAuthToken();
  const response = await axios.get(
    `${base_url}/admin/new-members?status=${status}&filter=${filter}&search=${search}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const postCards = async (data) => {
  const token = getAuthToken();
  const response = await axios.post(`${base_url}/admin/post-cards`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const issueCard = async (data) => {
  const token = getAuthToken();
  const response = await axios.post(`${base_url}/admin/issue-cards`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const cancelCard = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/admin/cancel-card/${data.id}`,
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

const cardService = {
  getNewMembers,
  postCards,
  issueCard,
  cancelCard,
};

export default cardService;
