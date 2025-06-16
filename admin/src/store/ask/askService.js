import axios from "axios"
import { base_url } from "../../constants/axiosConfig"

const getAuthToken = () => {
  const adminData = localStorage.getItem("admin")
  const admin = adminData ? JSON.parse(adminData) : null
  return admin?.token || ""
}

const getAllAsks = async ({ filter, search }) => {
  const token = getAuthToken()
  let url = `${base_url}/api/asks/admin`

  // Add query parameters if provided
  const params = new URLSearchParams()
  if (filter && filter !== "all") params.append("filter", filter)
  if (search) params.append("search", search)

  if (params.toString()) {
    url += `?${params.toString()}`
  }

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })
  return response.data
}

const deleteAsk = async (data) => {
  const token = getAuthToken()
  const response = await axios.delete(`${base_url}/api/asks/${data.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })
  return response.data
}

const getAllReports = async () => {
  const token = getAuthToken()
  const response = await axios.get(`${base_url}/api/asks/reports`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })
  return response.data
}

const getTopAsks = async () => {
  const token = getAuthToken()
  const response = await axios.get(`${base_url}/api/asks/top-askers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })
  return response.data
}

const deleteReport = async (data) => {
  const token = getAuthToken()
  const response = await axios.delete(`${base_url}/api/asks/reports/${data.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })
  return response.data
}

const promoteAsks = async (data) => {
  const token = getAuthToken()
  const response = await axios.put(
    `${base_url}/api/user/promote/${data.id}`,
    { membershipType: data.memberStatus },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    },
  )
  return response.data
}

const banAsk = async (data) => {
  const token = getAuthToken()
  const response = await axios.post(
    `${base_url}/api/asks/ban/${data.id}`,
    { reason: data.data.reason },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    },
  )
  return response.data
}

const askService = {
  getAllAsks,
  deleteAsk,
  getAllReports,
  getTopAsks,
  deleteReport,
  promoteAsks,
  banAsk,
}

export default askService
