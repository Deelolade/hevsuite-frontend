// services/clubCardService.js
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${baseUrl}/api/clubcards`;

export const requestClubCard = async ({ userId, isReplacement }) => {
  try {
    const response = await axios.post(
      `${API_URL}`,
      { userId, isReplacement },
      {
        withCredentials: true,
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Failed to request club card:", error);
    throw error.response?.data || { message: "Request failed" };
  }
};

export const getCardStatus = async (cardId) => {
  try {
    const response = await axios.get(`${API_URL}/card-status/${cardId}`, {
      withCredentials: true,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Failed to get card status:", error);
    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Failed to get card status",
    };
  }
};

export const getCardByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/card/${userId}`, {
      withCredentials: true,
    });
    console.log("getCardByUserId response:", response.data);

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    console.error("Failed to get card by user ID:", error);
    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Failed to get user card",
    };
  }
};

export const activateCard = async (cardId, userId) => {
  try {
    const response = await axios.post(
      `${API_URL}/activate`,
      {
        cardId,
        userId,
      },
      {
        withCredentials: true,
      }
    );
    console.log(response);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Failed to activate card:", error);
    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Failed to activate card",
    };
  }
};

export const deactivateCard = async (cardId, userId) => {
  try {
    const response = await axios.post(
      `${API_URL}/deactivate`,
      {
        cardId,
        userId,
      },
      {
        withCredentials: true,
      }
    );
    console.log(response);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Failed to deactivate card:", error);
    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Failed to deactivate card",
    };
  }
};
