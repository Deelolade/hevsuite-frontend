
  // services/userService.js
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL; 
const API_URL = `${baseUrl}/api/user`;

const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return {
      success: true,
      user: response.data.user,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};

const userService = {
  getUserProfile,
};

export default userService;
