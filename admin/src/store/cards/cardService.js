import axios from "axios"
import { base_url } from "../../constants/axiosConfig"

const getAuthToken = () => {
  const adminData = localStorage.getItem("admin")
  const admin = adminData ? JSON.parse(adminData) : null
  return admin?.token || ""
}

const getNewMembers = async ({ search = "", status = "all", filter = "all" }) => {
  const token = getAuthToken()
  const response = await axios.get(`${base_url}/admin/new-members?status=${status}&filter=${filter}&search=${search}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })
  return response.data
}

const getUsers = async (search = "") => {
  const token = getAuthToken()
  const response = await axios.get(`${base_url}/admin/users?search=${search}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })
  return response.data
}

const getUserDetails = async (userId) => {
  const token = getAuthToken()
  const response = await axios.get(`${base_url}/admin/users/${userId}/details`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })
  return response.data
}


// Post cards
const postCards = async (data) => {
  const token = getAuthToken()
  const response = await axios.post(
    `${base_url}/admin/post-cards`,
    data, // Send the FormData object directly
    {
      headers: {
        Authorization: `Bearer ${token}`,
        // The 'Content-Type' header is automatically set to 'multipart/form-data' when using FormData
      },
      withCredentials: true,
    },
  )
  return response.data
}

// Activate card
const activateCard = async (data) => {
  const response = await axios.post(API_URL + "/activate", data)
  return response.data
}

// Deactivate card
const deactivateCard = async (data) => {
  const response = await axios.post(API_URL + "/deactivate", data)
  return response.data
}

// Log suspicious activity
const logSuspiciousActivity = async (data) => {
  const response = await axios.post(API_URL + "/log-suspicious", data)
  return response.data
}

const issueCard = async (data) => {
  const token = getAuthToken()
  const response = await axios.post(`${base_url}/admin/issue-cards`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })
  return response.data
}

const cancelCard = async (data) => {
  const token = getAuthToken()
  const response = await axios.put(
    `${base_url}/admin/cancel-card/${data.id}`,
    { reason: data.reason },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    },
  )
  return response.data
}

const bulkCancelCards = async (data) => {
  const token = getAuthToken()
  const response = await axios.post(
    `${base_url}/admin/bulk-cancel`,
    { 
      cardIds: data.cardIds, 
      reason: data.reason,
      password: data.password 
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    },
  )
  return response.data
}

const approveCard = async (cardId) => {
  const token = getAuthToken()
  const response = await axios.put(
    `${base_url}/admin/approve/${cardId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    },
  )
  return response.data
}

const getCardStatus = async (cardId) => {
  const response = await axios.get(`${base_url}/card-status/${cardId}`)
  return response.data
}

const getCardQRCode = async (cardId) => {
  const token = getAuthToken()
  const response = await axios.get(`${base_url}/admin/qr-code/${cardId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })
  return response.data
}

const regenerateQRCode = async (cardId) => {
  const token = getAuthToken()
  const response = await axios.post(
    `${base_url}/admin/regenerate-qr/${cardId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    },
  )
  return response.data
}

const verifyQRCode = async (qrData) => {
  const response = await axios.post(`${base_url}/verify-qr`, { qrData })
  return response.data
}

const cardService = {
  getNewMembers,
  getUsers,
  getUserDetails,
  postCards,
  activateCard,
  deactivateCard,
  logSuspiciousActivity,
  issueCard,
  cancelCard,
  bulkCancelCards,
  approveCard,
  getCardStatus,
  getCardQRCode,
  regenerateQRCode,
  verifyQRCode,
}

export default cardService
