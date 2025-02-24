import axios from "axios";
import { base_url } from "../../constants/axiosConfig";
const getAuthToken = () => {
  const adminData = localStorage.getItem("admin");
  const admin = adminData ? JSON.parse(adminData) : null;
  return admin?.token || "";
};

const getAllAsks = async ({ filter }) => {
  const token = getAuthToken();
  const response = await axios.get(
    `${base_url}/admin/all-asks?filter=${filter}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const getAllReports = async () => {
  const token = getAuthToken();
  const response = await axios.get(`${base_url}/admin/all-reports`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const getTopAsks = async ({ filter }) => {
  const token = getAuthToken();
  const response = await axios.get(`${base_url}/admin/top-asks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const editReport = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/admin/edit-report/${data.id}`,
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

const deleteReport = async (data) => {
  const token = getAuthToken();
  const response = await axios.delete(
    `${base_url}/admin/delete-report/${data.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const promoteAsks = async (data) => {
  const token = getAuthToken();
  const response = await axios.post(
    `${base_url}/admin/promote-asks/${data.id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const banAsk = async (data) => {
  const token = getAuthToken();
  const response = await axios.post(
    `${base_url}/admin/ban-asks/${data.id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const askService = {
  getAllAsks,
  getAllReports,
  getTopAsks,
  editReport,
  deleteReport,
  promoteAsks,
  banAsk,
};

export default askService;
