import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/user`;

// Get all admin users
export const getAllAdmins = createAsyncThunk(
  "admins/getAllAdmins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/admin-users`, {
        withCredentials: true
      });
      
      // Transform the response data to match the required format
      const formattedData = response.data.map(admin => ({
        _id: admin._id,
        title: admin.title || 'Mr',
        forename: admin.forename || '',
        surname: admin.surname || '',
        primaryEmail: admin.primaryEmail,
        profilePhoto: admin.profilePhoto,
        role: admin.role || 'admin',
        roleName: admin.roleName || 'Administrator',
        membershipStatus: admin.membershipStatus || 'active',
        isRestricted: admin.isRestricted || false,
        isBanned: admin.isBanned || false,
        isDeactivated: admin.isDeactivated || false,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt
      }));

      return formattedData;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching admin users");
    }
  }
);

// Create new admin user
export const createAdmin = createAsyncThunk(
  "admins/createAdmin",
  async (adminData, { rejectWithValue }) => {
    try {
      const dataToSend = {
        fullName: `${adminData.forename} ${adminData.surname}`,
        email: adminData.primaryEmail,
        role: adminData.role || 'admin',
        roleName: adminData.role === 'admin' ? 'Administrator' : 'Super Administrator',
        password: adminData.password,
        permissions: adminData.permissions || []
      };
      
      const response = await axios.post(`${API_URL}/admin-users`, dataToSend, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      // Extract the error message from the response
      const errorMessage = error.response?.data?.message || "Error creating admin user";
      // Return the error message directly
      return rejectWithValue(errorMessage);
    }
  }
);

// Update admin user
export const updateAdmin = createAsyncThunk(
  "admins/updateAdmin",
  async ({ id, adminData }, { rejectWithValue }) => {
    try {
      const dataToSend = {
        fullName: `${adminData.forename} ${adminData.surname}`,
        email: adminData.primaryEmail,
        role: adminData.role || 'admin',
        roleName: adminData.role === 'admin' ? 'Administrator' : 'Super Administrator',
        password: adminData.password
      };
      
      const response = await axios.put(`${API_URL}/admin-users/${id}`, dataToSend, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error updating admin user");
    }
  }
);

// Delete admin user
export const deleteAdmin = createAsyncThunk(
  "admins/deleteAdmin",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/admin-users/${id}`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error deleting admin user");
    }
  }
);

// Initial State
const initialState = {
  admins: [],
  loading: false,
  error: null,
};

// Admin Slice
const adminSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all admins
      .addCase(getAllAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload;
      })
      .addCase(getAllAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create admin
      .addCase(createAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admins.push(action.payload);
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update admin
      .addCase(updateAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.admins.findIndex((admin) => admin._id === action.payload._id);
        if (index !== -1) {
          state.admins[index] = action.payload;
        }
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete admin
      .addCase(deleteAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = state.admins.filter((admin) => admin._id !== action.payload._id);
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;
