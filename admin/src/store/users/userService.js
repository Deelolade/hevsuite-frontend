import axios from 'axios';
import { base_url } from '../../constants/axiosConfig';
const getAuthToken = () => {
  const adminData = localStorage.getItem('admin');
  const admin = adminData ? JSON.parse(adminData) : null;
  return admin?.token || '';
};

const pendingUsers = async ({ page, limit, search, sortBy, filter }) => {
  const token = getAuthToken();
  const response = await axios.get(
    `${base_url}/admin/pending?page=${page}&limit=${limit}&sortBy=${sortBy}&filter=${filter}&search=${search}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export const memberUsers = async (page = 1, search = '', role = '') => {
  const response = await axios.get(`${base_url}/api/user/users`, {
    params: { page, limit: 6, search, role },
  });
  return response.data;
};

const inviteUser = async (data) => {
  const token = getAuthToken();
  const response = await axios.post(`${base_url}/admin/invite-users`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const editUser = async (data) => {
  const token = getAuthToken();
  const response = await axios.post(`${base_url}/admin/edit-user`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const userService = {
  pendingUsers,
  inviteUser,
  memberUsers,
  editUser,
};

export default userService;
