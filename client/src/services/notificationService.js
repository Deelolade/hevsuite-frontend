// services/notificationService.js
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${baseUrl}/api/notifications`;

const fetchNotifications = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}`, {
      params: { userId },
      withCredentials: true
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};

const markAsRead = async (notificationId) => {
  try {
    const response = await axios.patch(
      `${API_URL}/${notificationId}/read`,
      { withCredentials: true }
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};

const markAllAsRead = async (userId) => {
  try {
    const response = await axios.patch(
      `${API_URL}/mark-all-read`,
      { withCredentials: true }
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};

const deleteNotification = async (notificationId) => {
  try {
    const response = await axios.delete(`${API_URL}/${notificationId}`, {
      withCredentials: true
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};

const clearAllNotifications = async () => {
  try {
    const response = await axios.delete(`${API_URL}/clear-all`, {
      withCredentials: true
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};

export default {
  fetchNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications
};