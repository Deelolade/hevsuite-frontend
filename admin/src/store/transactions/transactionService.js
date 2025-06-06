import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_URL = `${import.meta.env.VITE_API_BASE_URL}`;

// Get all transactions with pagination and filters
export const getTransactions = async (page = 1, limit = 10, filters = {}) => {
  try {
    const response = await axios.get(`${API_URL}/api/transactions`, {
      params: {
        page,
        limit,
        ...filters
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching transactions' };
  }
};

// Update transaction status
export const updateTransactionStatus = async (transactionId, status) => {
  try {
    const response = await axios.patch(
      `${API_URL}/api/transactions/${transactionId}/status`,
      { status },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error updating transaction status' };
  }
}; 