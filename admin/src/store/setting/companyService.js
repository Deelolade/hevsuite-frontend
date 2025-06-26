import axios from "axios";
import { base_url } from "../../constants/axiosConfig";

const getAuthToken = () => {
  const adminData = localStorage.getItem("admin");
  const admin = adminData ? JSON.parse(adminData) : null;
  return admin?.token || "";
};

const getCompanyInfo = async () => {
  const token = getAuthToken();
  const response = await axios.get(
    `${base_url}/api/company`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const updateCompanyInfo = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/api/company`,
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

const companyService = {
  getCompanyInfo,
  updateCompanyInfo,
};

export default companyService; 