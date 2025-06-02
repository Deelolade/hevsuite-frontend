import axios from 'axios';
import { base_url } from '../../constants/axiosConfig';

const login = async (data) => {
  const response = await axios.post(`${base_url}/api/user/adminlogin`, data);
  if (response.data) {
    localStorage.setItem('admin', JSON.stringify(response.data));
    console.log(response.data)
  }
  return response.data;
};

const emailVerify = async (data) => {
  const response = await axios.post(`${base_url}/admin/email-verify`, data);
  return response.data;
};

const phoneVerify = async (data) => {
  const response = await axios.post(`${base_url}/admin/phone-verify`, data);
  return response.data;
};

const codeVerify = async (data) => {
  const response = await axios.post(`${base_url}/api/user/verify-2fa`, data);
  return response.data;
};

const forgotPassword = async (data) => {
  const response = await axios.post(
    `${base_url}/api/user/forgot-password`,
    data
  );
  return response.data;
};

const resetPassword = async (data) => {
  const response = await axios.post(
    `${base_url}/api/user/reset-password`,
    data
  );
  return response.data;
};

const logout = async () => {
  const response = await axios.post(`${base_url}/api/user/logout`);
  return response.data;
};

const getProfile = async () => {
  const response = await axios.get(`${base_url}/api/user/profile`);
  return response.data;
};

const updateProfile = async (data) => {
  const response = await axios.put(`${base_url}/api/user/update`, data);
  return response.data;
};

const setup2FA = async (data) => {
  const response = await axios.post(`${base_url}/api/user/setup-2fa`, data);
  return response.data;
};

const authService = {
  login,
  emailVerify,
  phoneVerify,
  codeVerify,
  forgotPassword,
  resetPassword,
  logout,
  getProfile,
  updateProfile,
  setup2FA,
  
};

export default authService;
