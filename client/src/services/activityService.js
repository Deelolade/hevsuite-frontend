// services/activityService.js
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${baseUrl}/api/useractivities`;

const getUserActivities = async () => {
  try {
    const response = await axios.get(`${API_URL}/`, {
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


const clearUserActivities = async () => {
  try {
    const response = await axios.delete(`${API_URL}/`, {
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

const deleteActivity = async (activityId) => {
  try {
    const response = await axios.delete(`${API_URL}/${activityId}`, {
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

const activityService = {
  getUserActivities,
  clearUserActivities,
  deleteActivity,
};

export default activityService;