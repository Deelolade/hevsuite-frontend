
  // services/userService.js
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL; 
const API_URL = `${baseUrl}/api/`;

const fetchVisibleTopics = async () => {
  try {
    const response = await axios.get(`${API_URL}topics/visible`);
    console.log(response); // Log the response data for debugging
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
const fetchFAQs= async () => {
    try {
      const response = await axios.get(`${API_URL}faqs/visible`);
      console.log(response); // Log the response data for debugging
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
  

const topicsService= {
    fetchVisibleTopics,
    fetchFAQs
};

export default topicsService;
