import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const API_URL = baseUrl + "/api/pricing";

export const getPricingFees = async () => {
  try {
    const response = await axios.get(`${API_URL}/`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch pricing fees";
  }
};
