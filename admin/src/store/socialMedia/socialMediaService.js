import axios from "axios"
import { base_url } from "../../constants/axiosConfig"

const getAuthToken = () => {
  const adminData = localStorage.getItem("admin")
  const admin = adminData ? JSON.parse(adminData) : null
  return admin?.token || ""
}

// const getAllSocialMedia = async () => {
//     const token = getAuthToken();
//     const response = await axios.get(
//       `${base_url}/api/settings/admin`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       }
//     );
// }

// Get all social media links for admin
const getAllSocialMedia = async () => {
  try {
    const token = getAuthToken()

    const response = await axios.get(`${base_url}/api/social-media/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })

    console.log("Social media response:", response.data)
    return response.data
  } catch (error) {
    console.error("Error fetching social media:", error)
    throw error.response?.data?.message || "Error fetching social media links"
  }
}

// Create new social media link
const createSocialMedia = async (formData) => {
  try {
    const token = getAuthToken()

    const response = await axios.post(`${base_url}/api/social-media`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    })

    return response.data
  } catch (error) {
    console.error("Error creating social media:", error)
    throw error.response?.data?.message || "Error creating social media link"
  }
}

// Update social media link
const updateSocialMedia = async (id, formData) => {
  try {
    const token = getAuthToken()

    const response = await axios.put(`${base_url}/api/social-media/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    })

    return response.data
  } catch (error) {
    console.error("Error updating social media:", error)
    throw error.response?.data?.message || "Error updating social media link"
  }
}

// Delete social media link
const deleteSocialMedia = async (id) => {
  try {
    const token = getAuthToken()

    const response = await axios.delete(`${base_url}/api/social-media/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })

    return response.data
  } catch (error) {
    console.error("Error deleting social media:", error)
    throw error.response?.data?.message || "Error deleting social media link"
  }
}

// Reorder social media links
const reorderSocialMedia = async (orderedIds) => {
  try {
    const token = getAuthToken()

    const response = await axios.post(
      `${base_url}/api/social-media/reorder`,
      { orderedIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      },
    )

    return response.data
  } catch (error) {
    console.error("Error reordering social media:", error)
    throw error.response?.data?.message || "Error reordering social media links"
  }
}

const socialMediaService = {
  getAllSocialMedia,
  createSocialMedia,
  updateSocialMedia,
  deleteSocialMedia,
  reorderSocialMedia,
}

export default socialMediaService