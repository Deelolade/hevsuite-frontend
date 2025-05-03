import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDashboardStats as getDashboardStatsService } from './statisticsService';
import toast from 'react-hot-toast';

const initialState = {
  dashboardStats: {
    totalMembers: 0,
    pendingRegistrations: 0,
    nonEngagedUsers: 0,
    totalEvents: 0,
    monthlyUsers: [],
    eventTypeDistribution: [],
    monthlyRevenue: []
  },
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: ''
};

// Get dashboard statistics
export const getDashboardStats = createAsyncThunk(
  'statistics/get-dashboard-stats',
  async (_, thunkAPI) => {
    try {
      return await getDashboardStatsService();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = 'success';
        state.dashboardStats = action.payload;
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      });
  }
});

export const { reset } = statisticsSlice.actions;
export default statisticsSlice.reducer; 