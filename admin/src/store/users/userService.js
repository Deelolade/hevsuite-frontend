import axios from 'axios';
import { base_url } from '../../constants/axiosConfig';

export const getAuthToken = () => {
  const adminData = localStorage.getItem('admin');
  const admin = adminData ? JSON.parse(adminData) : null;
  return admin?.token || '';
};

// Get all users with pagination and filtering
export const getAllUsers = async ({ page = 1, limit = 10, search = '', role = '' }) => {
  const token = getAuthToken();
  const response = await axios.get(`${base_url}/user/users`, {
    params: { page, limit, search, role },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};


export const memberUsers = async ({ page = 1, search = '', role = '', limit = 10, membershipStatus = 'accepted' }) => {
  const token = getAuthToken();
  console.log('[memberUsers] Request params:', { page, search, role, limit, membershipStatus });
  const response = await axios.get(`${base_url}/api/user/users`, {
    params: { 
      page, 
      search, 
      role,
      limit,
      membershipStatus: 'accepted'
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  console.log('[memberUsers] Response data:', response.data);
  return response.data;
};

// Get pending users
export const getPendingUsers = async ({ page = 1, limit = '', search = '', sortBy = 'createdAt', filter = 'all' }) => {
  const token = getAuthToken();
  const response = await axios.get(`${base_url}/api/user/pending`, {
    params: { page, limit, search, sortBy, filter },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};



// Create new user
export const createUser = async (userData) => {
  const token = getAuthToken();
  const response = await axios.post(`${base_url}/api/user`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

// Update user
export const updateUser = async (userId, userData) => {
  const token = getAuthToken();
  const response = await axios.put(`${base_url}/api/user/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

// Delete user
export const deleteUser = async (userId) => {
  const token = getAuthToken();
  const response = await axios.delete(`${base_url}/api/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
  });
  return response.data;
};

// Approve user membership (Corrected to match backend route)
export const approveUserMembership = async (userId) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/api/user/approve-membership`,
    { userId }, // Send userId in the request body
    {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
    }
  );
  return response.data;
};

// Search users
export const searchUsers = async (query) => {
  const token = getAuthToken();
  const response = await axios.get(`${base_url}/api/user/search`, {
    params: { query },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

// Get pending registrations
export const getPendingRegistrations = async ({ page = 1, limit = 10, filter = '', sortBy = '' } = {}) => {
  const token = getAuthToken();
  const response = await axios.get(`${base_url}/api/user/pending-registrations`, {
    params: { page, limit, filter, sortBy },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

// Update membership status (Used for declining or other status updates)
export const updateMembershipStatus = async ({ userId, status }) => {
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

// Invite user
export const inviteUser = async (email) => {
  const token = getAuthToken();
  const response = await axios.post(
    `${base_url}/api/user/invite`,
    { email },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

// Edit user
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

// Get admin users
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

// Assign request to admin
export const assignRequestToAdmin = async (requestId, adminId) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/api/support-requests/${requestId}/api/assign`,
    { adminId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const userService = {
  getAllUsers,
  memberUsers,
  getPendingUsers,
  createUser,
  updateUser,
  deleteUser,
  approveUserMembership,
  searchUsers,
  getPendingRegistrations,
  updateMembershipStatus,
  inviteUser,
  editUser,
  resetUserPassword,
  requestNewVerification,
  updateUserStatus,
  getUserEvents,
  getUserActivity,
  getAdminUsers,
  assignRequestToAdmin,
};

export default userService;
