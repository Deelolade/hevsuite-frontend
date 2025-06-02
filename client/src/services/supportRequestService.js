import axios from 'axios';
const baseUrl = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${baseUrl}/api/support-requests`;

// Create support request
const createSupportRequest = async (formData) => {

  console.log(formData)
    const response = await axios.post(API_URL, formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  };

// Get user support requests
const getSupportRequests = async () => {
    const response = await axios.get(API_URL, {
      withCredentials: true,
    });
    return response.data;
  };

// Delete support request
const deleteSupportRequest = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`, {
        withCredentials: true,
      });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to delete request'
      };
    }
  };

const supportRequestService = {
  createSupportRequest,
  getSupportRequests,
  deleteSupportRequest,
};

export default supportRequestService;