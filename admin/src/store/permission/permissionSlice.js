import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/permissions`;

// Get all roles
export const getAllRoles = createAsyncThunk(
  "permissions/getAllRoles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching roles");
      return rejectWithValue(error.response.data);
    }
  }
);

// Create new role
export const createRole = createAsyncThunk(
  "permissions/createRole",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, data, {
        withCredentials: true
      });
      toast.success("Role created successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating role");
      return rejectWithValue(error.response.data);
    }
  }
);

// Update role
export const updateRole = createAsyncThunk(
  "permissions/updateRole",
  async ({ id, data }, { rejectWithValue }) => {  // Changed to expect data object
    try {
      const response = await axios.put(`${API_URL}/${id}`, data, {  // Send data directly
        withCredentials: true
      });
      toast.success("Role updated successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating role");
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete role
export const deleteRole = createAsyncThunk(
  "permissions/deleteRole",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        withCredentials: true
      });
      toast.success("Role deleted successfully");
      return id;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting role");
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  roles: [],
  loading: false,
  error: null,
};

const permissionSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all roles
      .addCase(getAllRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(getAllRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create role
      .addCase(createRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roles.push(action.payload);
      })
      .addCase(createRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update role
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.roles.findIndex((role) => role._id === action.payload._id);
        if (index !== -1) {
          state.roles[index] = action.payload;
        }
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete role
      .addCase(deleteRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = state.roles.filter((role) => role._id !== action.payload);
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = permissionSlice.actions;
export default permissionSlice.reducer; 