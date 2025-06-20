import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";
import userService from "../../services/userService";
import toast from "react-hot-toast";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isError: false,
  message: "",
};

// // Login thunk
// export const login = createAsyncThunk(
//   'auth/login',
//   async (userData, thunkAPI) => {
//     try {
//       const response = await authService.loginUser(userData);
//       return response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || 'Login failed'
//       );
//     }
//   }
// );

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const response = await authService.register(data);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Login failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.loginUser(userData);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Login failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Fetch profile thunk
export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const response = await userService.getUserProfile();
      return response.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);
// update user profile
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async ({ userData, confirmPassword }, thunkAPI) => {
    try {
      const updatedUser = await authService.updateProfile(
        userData,
        confirmPassword
      );
      return updatedUser;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to update profile"
      );
    }
  }
);

export const setup2FA = createAsyncThunk(
  "auth/setup2FA",
  async (data, thunkAPI) => {
    try {
      const response = await authService.setup2FA(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Two factor authentication setup failed"
      );
    }
  }
);

export const disable2FA = createAsyncThunk(
  "auth/disable2FA",
  async (data, thunkAPI) => {
    try {
      const response = await authService.disable2FA(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Two factor authentication disable failed"
      );
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await authService.logout(); // backend clears cookie
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Logout failed"
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
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
        toast.error(state.message);
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
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
        state.isAuthenticated = false;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // Update the user in state
        toast.success("Profile updated successfully!");
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(setup2FA.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(setup2FA.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = { ...state.user, ...action.payload.user };
      })
      .addCase(setup2FA.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(disable2FA.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(disable2FA.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(disable2FA.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = { ...state.user, ...action.payload.user };
      });
  },
});

export default authSlice.reducer;
