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
    `${base_url}/api/admin/pending?page=${page}&limit=${limit}&sortBy=${sortBy}&filter=${filter}&search=${search}`,
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
  const response = await axios.post(`${base_url}/api/admin/invite-users`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

export const editUser = async ({ id, data }) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/api/user/${id}`,
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

const userSearch = async (query) => {
  const response = await axios.get(
    `${base_url}/api/user/users/search?q=${encodeURIComponent(query)}`
  );
  return response.data;
};

export const getPendingRegistrations = async ({ page = 1, limit = 10 } = {}) => {
  const token = getAuthToken();
  const response = await axios.get(`${base_url}/api/user/pending-registrations`, {
    params: { page, limit },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

// Update membership status
export const updateMembershipStatus = async (userId, status) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/api/user/update-membership-status`,
    { userId, status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

// Get user events
export const getUserEvents = async (userId, page = 1) => {
  const token = getAuthToken();
  const response = await axios.get(
    `${base_url}/api/user/${userId}/events?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

// Get user activity
export const getUserActivity = async (userId, page = 1) => {
  const token = getAuthToken();
  const response = await axios.get(
    `${base_url}/api/user/${userId}/activity?page=${page}`,
    {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
    }
  );
  return response.data;
};

// Update user status (restrict/ban)
export const updateUserStatus = async (userId, status) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/api/user/status/${userId}`,
    { status }, // status can be 'restrict', 'unrestrict', 'ban', or 'unban'
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

// Reset user password
export const resetUserPassword = async (userId) => {
  const token = getAuthToken();
  const response = await axios.post(
    `${base_url}/api/user/reset-password/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

// Request new verification
export const requestNewVerification = async (userId) => {
  const token = getAuthToken();
  const response = await axios.post(
    `${base_url}/api/user/request-verification/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};


export const getAdminUsers = async () => {
  const token = getAuthToken();
  const response = await axios.get(`${base_url}/api/user/admin-users`, {
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
  userSearch,
  getPendingRegistrations,
  updateMembershipStatus,
  getUserEvents,
  getUserActivity,
  updateUserStatus,
  resetUserPassword,
  requestNewVerification,
  getAdminUsers,
};

export default userService;
