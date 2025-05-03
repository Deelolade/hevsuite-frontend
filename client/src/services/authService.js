import axios from 'axios';
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const API_URL = baseUrl + '/api/user/';

// Register user
const register = async (userData) => {
  try{
  const response = await axios.post(API_URL + 'register', userData );
  return response.data;
}catch (error) {

  throw new Error(
    error.response?.data?.message || 
    error.message || 
    'Registration failed'
  );
}
};

// Login user
const loginUser = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  return response.data;
};

const setup2FA = async (data) => {
  const response = await axios.post(API_URL + 'setup-2fa', data);
  return response.data;
};

const verify2FA = async (data) => {
  const response = await axios.post(API_URL + 'verify-2fa', data);
  return response.data;
};

const logout = async () => {
  const response = await axios.post(API_URL + 'logout');
  return response.data;
};

const authService = {
  register,
  loginUser,
  setup2FA,
  logout,
  verify2FA,
};

export default authService;
