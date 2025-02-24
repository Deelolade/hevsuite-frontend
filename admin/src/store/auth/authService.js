import axios from "axios";
import { base_url } from "../../constants/axiosConfig";
const getAuthToken = () => {
  const adminData = localStorage.getItem("admin");
  const admin = adminData ? JSON.parse(adminData) : null;
  return admin?.token || "";
};

const login = async (data) => {
  const response = await axios.post(`${base_url}/admin/login`, data);
  if (response.data) {
    localStorage.setItem("admin", JSON.stringify(response.data));
  }
  return response.data;
};

const emailVerify = async (data) => {
  const response = await axios.post(`${base_url}/admin/email-verify`, data);
  return response.data;
};

const phoneVerify = async (data) => {
  const response = await axios.post(`${base_url}/admin/phone-verify`, data);
  return response.data;
};

const codeVerify = async (data) => {
  const response = await axios.post(`${base_url}/admin/code-verify`, data);
  return response.data;
};

const authService = {
  login,
  emailVerify,
  phoneVerify,
  codeVerify,
};

export default authService;
