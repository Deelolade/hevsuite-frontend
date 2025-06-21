import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/user`;

// Function to get the token from localStorage
const getAuthToken = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  return admin?.token;
};

// Get admin profile
export const getAdminProfile = createAsyncThunk(
  "adminProfile/getAdminProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue("No token found");
      }
      const response = await axios.get(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Error fetching profile";
      toast.error(message);
      return rejectWithValue(error.response?.data || message);
    }
  }
);

// Update admin profile
export const updateAdminProfile = createAsyncThunk(
  "adminProfile/updateAdminProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue("No token found");
      }
      const response = await axios.put(`${API_URL}/profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Profile updated successfully");
      return response.data.admin;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating profile");
      return rejectWithValue(error.response?.data || "Error updating profile");
    }
  }
);

// Change admin password
export const changeAdminPassword = createAsyncThunk(
  "adminProfile/changeAdminPassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue("No token found");
      }
      const response = await axios.put(`${API_URL}/change-password`, passwordData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Password changed successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error changing password");
      return rejectWithValue(error.response?.data || "Error changing password");
    }
  }
);

const initialState = {
  admin: null,
  loading: false,
  error: null
};

const adminProfileSlice = createSlice({
  name: "adminProfile",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get profile
      .addCase(getAdminProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(getAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update profile
      .addCase(updateAdminProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(updateAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Change password
      .addCase(changeAdminPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeAdminPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changeAdminPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = adminProfileSlice.actions;
export default adminProfileSlice.reducer; 