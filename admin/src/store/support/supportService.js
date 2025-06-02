import axios from "axios";
import { base_url } from "../../constants/axiosConfig";
import { getAuthToken } from "../users/userService";

const getSupportRequests = async ({ page, limit, search, sortBy, filter, assignedTo }) => {
  const token = getAuthToken();
  const response = await axios.get(
    `${base_url}/api/support-requests?page=${page}&limit=${limit}&sortBy=${sortBy}&filter=${filter}&search=${search}&assignedTo=${assignedTo}`,
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
    `${base_url}/api/support-requests/${id}`,
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
    `${base_url}/api/support-requests/${data._id}`,
    {
      status: data.status,
      notes: data.notes,
      assignedTo: data.assignedTo
    },
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
    `${base_url}/api/support-requests/${id}`,
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