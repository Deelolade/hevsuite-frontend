import axios from "axios";
import { base_url } from "../../constants/axiosConfig";

const getAuthToken = () => {
  const adminData = localStorage.getItem("admin");
  const admin = adminData ? JSON.parse(adminData) : null;
  return admin?.token || "";
};

const getSupportRequests = async ({ page, limit, search, sortBy, filter }) => {
  const token = getAuthToken();
  const response = await axios.get(
    `${base_url}/api/admin/support-requests?page=${page}&limit=${limit}&sortBy=${sortBy}&filter=${filter}&search=${search}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const getSupportRequestDetails = async (id) => {
  const token = getAuthToken();
  const response = await axios.get(
    `${base_url}/api/admin/support-requests/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const updateSupportRequest = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/api/admin/support-requests/${data.id}`,
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

const deleteSupportRequest = async (id) => {
  const token = getAuthToken();
  const response = await axios.delete(
    `${base_url}/api/admin/support-requests/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const supportService = {
  getSupportRequests,
  getSupportRequestDetails,
  updateSupportRequest,
  deleteSupportRequest,
};

export default supportService;