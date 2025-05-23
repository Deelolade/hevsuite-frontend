import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";
import toast from "react-hot-toast";

const initialState = {
  pending_users: [],
  member_users: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
  pendingRegistrations: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10
  },
  userEvents: [],
  userActivity: [],
  eventsPagination: null,
  activityPagination: null,
};


// Get member users
export const memberUsers = createAsyncThunk(
  "users/member-users",
  async ({ page, search, role }, thunkAPI) => {
    try {
      return await userService.memberUsers({ page, search, role });
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch users';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get pending users
export const pendingUsers = createAsyncThunk(
  "users/pending-users",
  async (data, thunkAPI) => {
    try {
      return await userService.getPendingUsers(data);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch pending users';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Invite user
export const inviteUser = createAsyncThunk(
  "users/invite-user",
  async (email, thunkAPI) => {
    try {
      return await userService.inviteUser(email);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to invite user';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Edit user
export const editUser = createAsyncThunk(
  "users/edit-user",
  async ({ id, data }, thunkAPI) => {
    try {
      return await userService.editUser({ id, data });
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to update user';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Reset user password
export const resetUserPassword = createAsyncThunk(
  "users/reset-password",
  async (userId, thunkAPI) => {
    try {
      return await userService.resetUserPassword(userId);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to reset password';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Request new verification
export const requestNewVerification = createAsyncThunk(
  "users/request-verification",
  async (userId, thunkAPI) => {
    try {
      return await userService.requestNewVerification(userId);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to request verification';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update user status (restrict/ban)
export const updateUserStatus = createAsyncThunk(
  "users/update-status",
  async ({ userId, status }, thunkAPI) => {
    try {
      return await userService.updateUserStatus(userId, status);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to update user status';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get pending registrations
export const fetchPendingRegistrations = createAsyncThunk(
  'users/get-pending-registrations',
  async ({ page = 1, limit = '', filter = '', sortBy = '' } = {}, thunkAPI) => {
    try {
      return await userService.getPendingRegistrations({ page, limit, filter, sortBy });
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch pending registrations';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update membership status
export const updateUserMembershipStatus = createAsyncThunk(
  'user/update-membership-status',
  async ({ userId, status }, thunkAPI) => {
    try {
      const response = await userService.updateMembershipStatus(userId, status);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to update membership status';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user events
export const getUserEvents = createAsyncThunk(
  'users/events',
  async ({ userId, page }, thunkAPI) => {
    try {
      return await userService.getUserEvents(userId, page);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch user events';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user activity
export const getUserActivity = createAsyncThunk(
  'users/activity',
  async ({ userId, page }, thunkAPI) => {
    try {
      return await userService.getUserActivity(userId, page);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch user activity';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Thunk action to fetch admin users
export const getAdminUsers = createAsyncThunk(
  'adminUsers/getAdminUsers',
  async (_, thunkAPI) => {
    try {
      return await userService.getAdminUsers();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Assign request to admin
export const assignRequestToAdmin = createAsyncThunk(
  "users/assign-request",
  async ({ requestId, adminId }, thunkAPI) => {
    try {
      return await userService.assignRequestToAdmin(requestId, adminId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Member Users
      .addCase(memberUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(memberUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.member_users = action.payload.users;
        state.pagination = {
          currentPage: action.payload.pagination.page,
          totalPages: action.payload.pagination.pages,
          totalItems: action.payload.pagination.total,
          limit: action.payload.pagination.limit
        };
      })
      .addCase(memberUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Pending Users
      .addCase(pendingUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(pendingUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.pending_users = action.payload.pending_users;
      })
      .addCase(pendingUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Invite User
      .addCase(inviteUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(inviteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "User invited successfully";
        toast.success(state.message);
      })
      .addCase(inviteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Edit User
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "User updated successfully";
        
        // Update the user in member_users if it exists
        if (state.member_users) {
          state.member_users = state.member_users.map((user) =>
            user._id === action.payload._id ? { ...user, ...action.payload } : user
          );
        }
        
        toast.success(state.message);
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Reset User Password
      .addCase(resetUserPassword.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(resetUserPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Password reset link Sent Successful";
        toast.success(state.message);
      })
      .addCase(resetUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Request New Verification
      .addCase(requestNewVerification.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(requestNewVerification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Verification request sent successfully";
        toast.success(state.message);
      })
      .addCase(requestNewVerification.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Update User Status
      .addCase(updateUserStatus.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        
        // Update the user in member_users if it exists
        if (state.member_users) {
          state.member_users = state.member_users.map((user) =>
            user._id === action.payload.user._id ? { ...user, ...action.payload.user } : user
          );
        }
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Fetch Pending Registrations
      .addCase(fetchPendingRegistrations.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(fetchPendingRegistrations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pendingRegistrations = action.payload.data;
        state.pagination = {
          currentPage: action.payload.currentPage || 1,
          totalPages: action.payload.totalPages || 1,
          totalItems: action.payload.totalItems || 0,
          limit: action.payload.limit || 10
        };
      })
      .addCase(fetchPendingRegistrations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Update Membership Status
      .addCase(updateUserMembershipStatus.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(updateUserMembershipStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Update the user in pendingRegistrations if it exists
        if (state.pendingRegistrations) {
          state.pendingRegistrations = state.pendingRegistrations.filter(
            user => user._id !== action.payload.data._id
          );
        }
        toast.success(action.payload.message || 'User status updated successfully');
      })
      .addCase(updateUserMembershipStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Get User Events
      .addCase(getUserEvents.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getUserEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userEvents = action.payload.data;
        state.eventsPagination = action.payload.pagination;
      })
      .addCase(getUserEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Get User Activity
      .addCase(getUserActivity.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getUserActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userActivity = action.payload.data;
        state.activityPagination = action.payload.pagination;
      })
      .addCase(getUserActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Assign Request to Admin
      .addCase(assignRequestToAdmin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(assignRequestToAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Request assigned successfully";
      })
      .addCase(assignRequestToAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Admin users slice
const adminUsersSlice = createSlice({
  name: 'adminUsers',
  initialState: {
    adminUsers: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.adminUsers = action.payload;
      })
      .addCase(getAdminUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset: resetAdminUsers } = adminUsersSlice.actions;

// Combine reducers
const rootReducer = {
  users: userSlice.reducer,
  adminUsers: adminUsersSlice.reducer,
};

export default rootReducer;
