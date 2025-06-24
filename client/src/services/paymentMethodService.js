import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/payment-methods`;

const paymentMethodService = {
  getPaymentMethods: async () => {
    try {
      const response = await axios.get(`${API_URL}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch payment methods";
    }
  },
};

export default paymentMethodService;
