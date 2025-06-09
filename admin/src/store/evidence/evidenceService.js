import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/support-requests`;

// Get auth token from localStorage
const getAuthToken = () => {
  const adminData = localStorage.getItem("admin");
  const admin = adminData ? JSON.parse(adminData) : null;
  return admin?.token || "";
};

// Get all evidence requests
const getEvidenceRequests = async (params = {}) => {
  try {
    const response = await axios.get(API_URL, {
      params: params,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update evidence status
const updateEvidenceStatus = async (id, status) => {
  try {
    const response = await axios.put(
      `${API_URL}/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Assign request to admin
const assignRequestToAdmin = async (requestId, adminId) => {
  try {
    const response = await axios.put(
      `${API_URL}/${requestId}`,
      { adminId },
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const evidenceService = {
  getEvidenceRequests,
  updateEvidenceStatus,
  assignRequestToAdmin,
};

export default evidenceService; 