import axios from "axios";
import { base_url } from "../../constants/axiosConfig";

const getAuthToken = () => {
  const adminData = localStorage.getItem("admin");
  const admin = adminData ? JSON.parse(adminData) : null;
  return admin?.token || "";
};

const getAllAdmins = async () => {
  const token = getAuthToken();
  const response = await axios.get(
    `${base_url}/api/user/all-admins`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const createAdmin = async (data) => {
  const token = getAuthToken();
  const response = await axios.post(`${base_url}/api/admin/create-admin`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const updateAdmin = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/api/admin/update-admin/${data.id}`,
    data.adminData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const deleteAdmin = async (id) => {
  const token = getAuthToken();
  const response = await axios.delete(`${base_url}/api/admin/delete-admin/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const adminService = {
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};

export default adminService;