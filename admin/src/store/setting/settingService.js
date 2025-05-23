import axios from "axios";
import { base_url } from "../../constants/axiosConfig";

const getAuthToken = () => {
  const adminData = localStorage.getItem("admin");
  const admin = adminData ? JSON.parse(adminData) : null;
  return admin?.token || "";
};

const getSettings = async () => {
  const token = getAuthToken();
  const response = await axios.get(
    `${base_url}/api/settings`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );

  
  return response.data;
};

const updateGeneralSettings = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/api/settings`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const updateEmailSettings = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/admin/settings/email`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const updatePaymentSettings = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/admin/settings/payment`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const settingService = {
  getSettings,
  updateGeneralSettings,
  updateEmailSettings,
  updatePaymentSettings,
};

export default settingService;