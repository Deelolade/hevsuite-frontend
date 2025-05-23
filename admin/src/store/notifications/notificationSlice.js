import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import notificationService from './notificationService';
import { toast } from 'react-toastify';

const initialState = {
  notifications: [],
  unreadCount: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get notifications
export const getNotifications = createAsyncThunk(
  'notifications/getAll',
  async (_, thunkAPI) => {
    try {
      return await notificationService.getNotifications();
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch notifications';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Mark notification as read
export const markNotificationAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (notificationId, thunkAPI) => {
    try {
      return await notificationService.markAsRead(notificationId);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to mark notification as read';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Clear all notifications
export const clearAllNotifications = createAsyncThunk(
  'notifications/clearAll',
  async (_, thunkAPI) => {
    try {
      return await notificationService.clearNotifications();
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to clear notifications';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      state.unreadCount += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter(notif => !notif.isRead).length;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const index = state.notifications.findIndex(
          (notif) => notif._id === action.payload._id
        );
        if (index !== -1) {
          state.notifications[index] = action.payload;
          state.unreadCount = state.notifications.filter(notif => !notif.isRead).length;
        }
      })
      .addCase(clearAllNotifications.fulfilled, (state) => {
        state.notifications = [];
        state.unreadCount = 0;
      });
  },
});

export const { reset, addNotification } = notificationSlice.actions;
export default notificationSlice.reducer; 