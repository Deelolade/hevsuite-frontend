// services/supportRequestService.js
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${baseUrl}/api/support-join-requests`;

const createSupportRequest = async (supportingMemberIds) => {
  try {
    const response = await axios.post(`${API_URL}/`, {supportingMemberIds},{
        withCredentials: true,
      });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};
const deleteSupportRequest = async (supportingMemberId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete-supporting-member/${supportingMemberId}`, {
        withCredentials: true,
      });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};
const fetchMySupportRequest = async () => {
  try {
    const response = await axios.get(`${API_URL}/check-request`,{
        withCredentials: true,
      });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};

const fetchSupportRequestsForDecision = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-support-request`,{
        withCredentials: true,
      });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};

const processSupportDecision = async ({requestId, decision}) => {
  try {
    const response = await axios.patch(`${API_URL}/decision`, {requestId,decision},{
        withCredentials: true,
      });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};
const processMultipleSupportDecision = async ({referredUserIds, decision}) => {
  try {
    console.log(referredUserIds,decision)
    const response = await axios.patch(`${API_URL}/multiple-decision`, {referredUserIds,decision},{
        withCredentials: true,
      });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
}
const supportRequestService = {
  deleteSupportRequest,
  createSupportRequest,
  fetchMySupportRequest,
  fetchSupportRequestsForDecision,
  processSupportDecision,
  processMultipleSupportDecision
};

export default supportRequestService;
