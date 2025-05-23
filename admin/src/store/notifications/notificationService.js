import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/user`;

// Get all notifications
const getNotifications = async () => {
  const response = await axios.get(`${API_URL}/notifications`);
  return response.data;
};

// Mark notification as read
const markAsRead = async (notificationId) => {
  const response = await axios.put(`${API_URL}/notifications/${notificationId}/read`);
  return response.data;
};

// Clear all notifications
const clearNotifications = async () => {
  const response = await axios.delete(`${API_URL}/notifications`);
  return response.data;
};

const notificationService = {
  getNotifications,
  markAsRead,
  clearNotifications,
};

export default notificationService; 