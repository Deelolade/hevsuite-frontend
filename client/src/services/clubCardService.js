// services/clubCardService.js
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${baseUrl}/api/clubcards`;

export const requestClubCard = async ({ userId, isReplacement }) => {
  try {
    const response = await axios.post(
      API_URL,
      { userId, isReplacement },
      {
        withCredentials: true, 
      }
    );
    
    
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error("Failed to request club card:", error);
    throw error.response?.data || { message: 'Request failed' };
  }
};