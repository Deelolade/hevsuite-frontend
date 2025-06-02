import axios from "axios"
import { base_url } from "../../constants/axiosConfig"

const getAuthToken = () => {
  const adminData = localStorage.getItem("admin")
  const admin = adminData ? JSON.parse(adminData) : null
  return admin?.token || ""
}

// Payment Methods
const getPaymentMethods = async () => {
  const token = getAuthToken()
  const response = await axios.get(`${base_url}/api/payment-methods`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })
  return response.data.methods
}

const addPaymentMethod = async (formData) => {
  const token = getAuthToken()
  const response = await axios.post(`${base_url}/api/payment-methods`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  })
  return response.data.method
}

const updatePaymentMethod = async (provider, formData) => {
  const token = getAuthToken()
  const response = await axios.patch(`${base_url}/api/payment-methods/${provider}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  })
  return response.data.method
}

const removePaymentMethod = async (provider) => {
  const token = getAuthToken()
  const response = await axios.delete(`${base_url}/api/payment-methods/${provider}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })
  return response.data
}

// Transactions
const getTransactions = async ({ page = 1, limit = 10, search = "", sortBy = "date", filter = "" }) => {
  const token = getAuthToken()
  const response = await axios.get(
    `${base_url}/api/transactions?page=${page}&limit=${limit}&sortBy=${sortBy}&filter=${filter}&search=${search}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    },
  )
  return response.data
}

const getTransactionDetails = async (id) => {
  const token = getAuthToken()
  const response = await axios.get(`${base_url}/api/transactions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })
  return response.data
}

const updateTransactionStatus = async (data) => {
  const token = getAuthToken()
  const response = await axios.put(
    `${base_url}/api/transactions/${data.id}/status`,
    { status: data.status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    },
  )
  return response.data
}

// Pricing
const getPricingFees = async () => {
  const token = getAuthToken()
  const response = await axios.get(`${base_url}/api/pricing`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })
  return response.data.fees
}

const updatePricingFee = async (data) => {
  const token = getAuthToken()
  const response = await axios.put(`${base_url}/api/pricing/${data.id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })
  return response.data.fee
}

// Financial Summary
const getFinancialSummary = async (period = "month") => {
  const token = getAuthToken()
  const response = await axios.get(`${base_url}/api/financial-summary?period=${period}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })
  return response.data
}

const financeService = {
  getPaymentMethods,
  addPaymentMethod,
  updatePaymentMethod,
  removePaymentMethod,
  getTransactions,
  getTransactionDetails,
  updateTransactionStatus,
  getPricingFees,
  updatePricingFee,
  getFinancialSummary,
}

export default financeService
