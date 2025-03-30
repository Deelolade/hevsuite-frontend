import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const API_URL = baseUrl + '/api/user/';

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);
  return response.data;
};

const authService = {
  register,
};

export default authService;
