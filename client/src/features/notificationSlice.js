import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import notificationService from '../services/notificationService';

const initialState = {
  notifications: [],
  unreadCount: 0,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filter: 'all' // 'all' | 'unread' | 'read' | 'events'
};

// Async Thunks
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (userId) => {
    const response = await notificationService.fetchNotifications(userId);
    return response.data.notifications
  }
);

export const markAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (notificationId) => {
    await notificationService.markAsRead(notificationId);
    return notificationId;
  }
);

export const markAllAsRead = createAsyncThunk(
  'notifications/markAllAsRead',
  async (userId) => {
    await notificationService.markAllAsRead(userId);
  }
);

export const deleteNotification = createAsyncThunk(
  'notifications/deleteNotification',
  async (notificationId) => {
    await notificationService.deleteNotification(notificationId);
    return notificationId;
  }
);

export const clearAllNotifications = createAsyncThunk(
  'notifications/clearAll',
  async (userId) => {
    await notificationService.clearAllNotifications(userId);
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notifications = action.payload;
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter(n => !n.read).length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch notifications';
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        const notification = state.notifications.find(n => n.id === action.payload);
        if (notification) {
          notification.read = true;
          state.unreadCount -= 1;
        }
      })
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.notifications.forEach(n => n.read = true);
        state.unreadCount = 0;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.notifications = state.notifications.filter(n => n.id !== action.payload);
        state.unreadCount = state.notifications.filter(n => !n.read).length;
      })
      .addCase(clearAllNotifications.fulfilled, (state) => {
        state.notifications = [];
        state.unreadCount = 0;
      });
  }
});

export const { setFilter } = notificationSlice.actions;

export const selectFilteredNotifications = (state) => {
  const { notifications, filter } = state.notifications;
  
  switch (filter) {
    case 'unread':
      return notifications.filter(n => !n.read);
    case 'read':
      return notifications.filter(n => n.read);
    case 'events':
      return notifications.filter(n => n.type === 'event');
    default:
      return notifications;
  }
};

export default notificationSlice.reducer;