import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/activities`;

// Fetch all activities
// Get all activities
export const getAllActivities = createAsyncThunk(
    "activities/getAll",
    async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
        return response.data;
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch activities");
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );
  
  const initialState = {
    activities: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  };
  
  const activitySlice = createSlice({
    name: "activities",
    initialState,
    reducers: {
      clearError: (state) => {
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        // Get all activities
        .addCase(getAllActivities.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getAllActivities.fulfilled, (state, action) => {
          state.loading = false;
          state.activities = action.payload.data || [];
          state.currentPage = action.payload.currentPage;
          state.totalPages = action.payload.totalPages;
          state.totalItems = action.payload.totalItems;
        })
        .addCase(getAllActivities.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export const { clearError } = activitySlice.actions;
  export default activitySlice.reducer; 