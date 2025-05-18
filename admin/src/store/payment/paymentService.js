import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/payment-methods`;

// Get auth token from local storage
const getAuthToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

// Get all payment methods
export const getPaymentMethods = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data.methods;
};

// Update payment method
export const updatePaymentMethod = async (processorData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      // Only set Content-Type if not FormData
      ...(!(processorData instanceof FormData) && { 'Content-Type': 'application/json' })
    },
  };

  // Get provider from either FormData or regular object
  const provider = processorData instanceof FormData 
    ? processorData.get('provider')
    : processorData.provider;

  const data = processorData instanceof FormData 
    ? processorData 
    : processorData;

  const response = await axios.patch(
    `${API_URL}/${provider}`,
    data,
    config
  );
  return response.data.method;
};

// Add new payment method
export const addPaymentMethod = async (formData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  // const formData = new FormData();
  // Object.keys(processorData).forEach(key => {
  //   formData.append(key, processorData[key]);
  // });

  const response = await axios.post(API_URL, formData, config);
  return response.data.method;
};

// Remove payment method
export const removePaymentMethod = async (provider) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  };

  await axios.delete(`${API_URL}/${provider}`, config);
  return provider;
}; 