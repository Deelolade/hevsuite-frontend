import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';
import userService from '../../services/userService';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isError: false,
  message: '',
};

// Login thunk
export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await authService.loginUser(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
);

// Fetch profile thunk
export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, thunkAPI) => {
    try {
      const response = await userService.getUserProfile();
      return response.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch profile'
      );
    }
  }
);


export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await authService.logout(); // backend clears cookie
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Logout failed'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
