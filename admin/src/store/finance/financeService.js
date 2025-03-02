import axios from "axios";
import { base_url } from "../../constants/axiosConfig";

const getAuthToken = () => {
  const adminData = localStorage.getItem("admin");
  const admin = adminData ? JSON.parse(adminData) : null;
  return admin?.token || "";
};

const getTransactions = async ({ page, limit, search, sortBy, filter }) => {
  const token = getAuthToken();
  const response = await axios.get(
    `${base_url}/admin/transactions?page=${page}&limit=${limit}&sortBy=${sortBy}&filter=${filter}&search=${search}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const getTransactionDetails = async (id) => {
  const token = getAuthToken();
  const response = await axios.get(
    `${base_url}/admin/transactions/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const updateTransactionStatus = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/admin/transactions/${data.id}/status`,
    { status: data.status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const getFinancialSummary = async (period) => {
  const token = getAuthToken();
  const response = await axios.get(
    `${base_url}/admin/financial-summary?period=${period}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const financeService = {
  getTransactions,
  getTransactionDetails,
  updateTransactionStatus,
  getFinancialSummary,
};

export default financeService;