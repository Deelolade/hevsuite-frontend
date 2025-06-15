// services/userService.js
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${baseUrl}/api/`;

const fetchVisibleTopics = async () => {
  try {
    const response = await axios.get(`${API_URL}topic/visible`);
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
const fetchVisibleTopicById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}topics/visible/${id}`);
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
const fetchFAQs = async () => {
  try {
    const response = await axios.get(`${API_URL}faq/visible`);
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

const topicsService = {
  fetchVisibleTopics,
  fetchVisibleTopicById,
  fetchFAQs,
};

export default topicsService;
