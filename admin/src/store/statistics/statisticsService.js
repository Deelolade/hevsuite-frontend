import axios from 'axios';
import { base_url } from '../../constants/axiosConfig';

const getAuthToken = () => {
  const adminData = localStorage.getItem('admin');
  const admin = adminData ? JSON.parse(adminData) : null;
  return admin?.token || '';
};

// Get dashboard statistics
export const getDashboardStats = async () => {
  const token = getAuthToken();
  const response = await axios.get(`${base_url}/api/statistics/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
}; 