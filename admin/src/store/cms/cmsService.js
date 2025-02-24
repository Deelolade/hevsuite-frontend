import axios from "axios";
import { base_url } from "../../constants/axiosConfig";
const getAuthToken = () => {
  const adminData = localStorage.getItem("admin");
  const admin = adminData ? JSON.parse(adminData) : null;
  return admin?.token || "";
};

const getAllCMS = async ({ status }) => {
  const token = getAuthToken();
  const response = await axios.get(
    `${base_url}/admin/all-cms?status=${status}`,
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
    `${base_url}/admin/edit-cms/${data.id}`,
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
  const response = await axios.delete(
    `${base_url}/admin/remove-cms/${data.id}`,
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
    `${base_url}/admin/change-visiblity/${data.id}`,
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

const getAllMenus = async ({ status }) => {
  const token = getAuthToken();
  const response = await axios.get(
    `${base_url}/admin/all-menus?status=${status}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const editMenus = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/admin/edit-menus/${data.id}`,
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
    `${base_url}/admin/remove-menus/${data.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const changeMenuVisiblity = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/admin/menu-visiblity/${data.id}`,
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
  const response = await axios.post(`${base_url}/admin/add-menus`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const getAllFooters = async ({ status }) => {
  const token = getAuthToken();
  const response = await axios.get(
    `${base_url}/admin/all-footers?status=${status}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const editFooter = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/admin/edit-footer/${data.id}`,
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
    `${base_url}/admin/remove-footer/${data.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};
const changeFooterVisiblity = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/admin/footer-visiblity/${data.id}`,
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
const addNewFooter = async (data) => {
  const token = getAuthToken();
  const response = await axios.post(`${base_url}/admin/add-footer`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const uploadWebsiteLogo = async (data) => {
  const token = getAuthToken();
  const response = await axios.post(`${base_url}/admin/website-logo`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const uploadAdminLogo = async (data) => {
  const token = getAuthToken();
  const response = await axios.post(`${base_url}/admin/admin-logo`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const uploadFavIcon = async (data) => {
  const token = getAuthToken();
  const response = await axios.post(`${base_url}/admin/fav-icon`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const uploadFooterIcon = async (data) => {
  const token = getAuthToken();
  const response = await axios.post(`${base_url}/admin/footer-icon`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const cmsService = {
  getAllCMS,
  editCMS,
  removeCMS,
  changeVisiblity,
  getAllMenus,
  editMenus,
  removeMenus,
  changeMenuVisiblity,
  addNewMenu,
  getAllFooters,
  editFooter,
  removeFooter,
  changeFooterVisiblity,
  addNewFooter,
  uploadWebsiteLogo,
  uploadAdminLogo,
  uploadFavIcon,
  uploadFooterIcon,
};

export default cmsService;
