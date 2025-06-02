import axios from "axios";
import { base_url } from "../../constants/axiosConfig";
const getAuthToken = () => {
  const adminData = localStorage.getItem("admin");
  const admin = adminData ? JSON.parse(adminData) : null;
  return admin?.token || "";
};

const addNewCMS = async (data) => {
  const token = getAuthToken();
  const response = await axios.post(`${base_url}/api/cms/landing-pages`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data' // Important for file uploads
    },
    withCredentials: true,
  });
  return response.data;
};

const getAllCMS = async ({ status, activeFilter }) => {
  const token = getAuthToken();
  const response = await axios.get(
    `${base_url}/api/cms/landing-pages?status=${status}&activeFilter=${activeFilter}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const editCMS = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/api/cms/landing-pages/${data.id}`,
    data.data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const removeCMS = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/api/cms/landing-pages/${data.id}`,
    { isDeleted: data.isDeleted },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const changeVisiblity = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/api/cms/landing-pages/${data.id}`,
    data.data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

// const getAllMenus = async ({ status }) => {
//   const token = getAuthToken();
//   const response = await axios.get(
//     `${base_url}/api/cms/menus?status=${status}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       withCredentials: true,
//     }
//   );
//   return response.data;
// };

const getAllMenus = async ({ status = "active", search = "", page = 1, limit = 10, sortBy = "order", sortOrder = "asc" }) => {
  const token = getAuthToken()
  
  // Build query string
  const queryParams = new URLSearchParams({
    status,
    page: page.toString(),
    limit: limit.toString(),
    sortBy,
    sortOrder
  })
  
  // Add search if provided
  if (search) {
    queryParams.append("search", search)
  }
  
  const response = await axios.get(`${base_url}/api/cms/menus?${queryParams.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })
  
  return response.data
}

const editMenus = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/api/cms/menus/${data.id}`,
    data.data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const removeMenus = async (data) => {
  const token = getAuthToken();
  const response = await axios.delete(
    `${base_url}/api/cms/menus/${data.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const changeMenuVisibility = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/api/cms/menus/${data.id}`,
    data.data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const addNewMenu = async (data) => {
  const token = getAuthToken();
  const response = await axios.post(`${base_url}/api/cms/menus`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

// Update menu order
const updateMenuOrder = async (data) => {
  try {
    const token = getAuthToken()

    if (!token) {
      throw new Error("Authentication token not found")
    }

    console.log("Updating menu order:", data)
    const response = await axios.put(`${base_url}/api/cms/menus/order`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })

    console.log("Update menu order response:", response.data)
    return response.data
  } catch (error) {
    console.error("Error updating menu order:", error)
    throw error.response?.data?.message || "Error updating menu order"
  }
}

// Footer API calls
// src/store/cms/cmsService.js

// Update the getAllFooters function to handle the new response format
const getAllFooters = async ({ status = "active", search = "", page = 1, limit = 10, sortBy = "order", sortOrder = "asc" }) => {
  const token = getAuthToken()
  
  // Build query string
  const queryParams = new URLSearchParams({
    status,
    page: page.toString(),
    limit: limit.toString(),
    sortBy,
    sortOrder
  })
  
  // Add search if provided
  if (search) {
    queryParams.append("search", search)
  }
  
  const response = await axios.get(`${base_url}/api/cms/footer?${queryParams.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })
  
  return response.data
}

const editFooter = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/api/cms/footer/${data.id}`,
    data.data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const removeFooter = async (data) => {
  const token = getAuthToken();
  const response = await axios.delete(
    `${base_url}/api/cms/footer/${data.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const changeFooterVisibility = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/api/cms/footer/${data.id}`,
    { ...data.data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const addNewFooter = async (data) => {
  const token = getAuthToken();
  const response = await axios.post(`${base_url}/api/cms/footer`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const updateFooterOrder = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/api/cms/footer/order`,
    { orderedIds: data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

// Site Logos API calls
// Site Logos API calls
const getLogos = async () => {
  const token = getAuthToken()
  const response = await axios.get(`${base_url}/api/cms/logos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })
  return response.data
}

const uploadWebsiteLogo = async (data) => {
  const token = getAuthToken()
  const formData = new FormData()
  formData.append("logo", data)

  const response = await axios.post(`${base_url}/api/cms/logos/website-logo`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  })
  return response.data
}

const uploadAdminLogo = async (data) => {
  const token = getAuthToken()
  const formData = new FormData()
  formData.append("logo", data)

  const response = await axios.post(`${base_url}/api/cms/logos/admin-logo`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  })
  return response.data
}

const uploadFavIcon = async (data) => {
  const token = getAuthToken()
  const formData = new FormData()
  formData.append("logo", data)

  const response = await axios.post(`${base_url}/api/cms/logos/fav-icon`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  })
  return response.data
}

const uploadFooterIcon = async (data) => {
  const token = getAuthToken()
  const formData = new FormData()
  formData.append("logo", data)

  const response = await axios.post(`${base_url}/api/cms/logos/footer-icon`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  })
  return response.data
}


// Create a new page
const createPage = async (formData) => {
  const token = getAuthToken();
  const response = await axios.post(`${base_url}/api/cms/pages`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });
  return response.data;
};

const getPages = async (data) => {
  const token = getAuthToken();
  const response = await axios.get(`${base_url}/api/cms/pages`, { 
    params: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const getPageById = async (id) => {
  const token = getAuthToken();
  const response = await axios.get(`${base_url}/api/cms/pages/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const updatePage = async (id, data) => {
  const token = getAuthToken();
  const response = await axios.put(`${base_url}/api/cms/pages/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
  return response.data;
};

const deletePage = async (id) => {
  const token = getAuthToken();
  const response = await axios.delete(`${base_url}/api/cms/pages/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const cmsService = {
  addNewCMS,
  getAllCMS,
  editCMS,
  removeCMS,
  changeVisiblity,
  getAllMenus,
  editMenus,
  removeMenus,
  changeMenuVisibility,
  addNewMenu,
  updateMenuOrder,
  getAllFooters,
  editFooter,
  removeFooter,
  changeFooterVisibility,
  addNewFooter,
  updateFooterOrder,
  getLogos,
  uploadWebsiteLogo,
  uploadAdminLogo,
  uploadFavIcon,
  uploadFooterIcon,
  createPage,
  getPages,
  getPageById,
  updatePage,
  deletePage,
};

export default cmsService;
