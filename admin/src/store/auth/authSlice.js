import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import toast from "react-hot-toast";

const getTokenFromLocalStorage = localStorage.getItem("admin")
  ? JSON.parse(localStorage.getItem("admin"))
  : null;

const initialState = {
  user: getTokenFromLocalStorage,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/admin-login",
  async (data, thunkAPI) => {
    try {
      return await authService.login(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const emailVerify = createAsyncThunk(
  "auth/email-verify",
  async (data, thunkAPI) => {
    try {
      return await authService.emailVerify(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const phoneVerify = createAsyncThunk(
  "auth/phone-verify",
  async (data, thunkAPI) => {
    try {
      return await authService.phoneVerify(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const codeVerify = createAsyncThunk(
  "auth/code-verify",
  async (data, thunkAPI) => {
    try {
      return await authService.codeVerify(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (data, thunkAPI) => {
    try {
      return await authService.resetPassword(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    messageClear: (state) => {
      state.isSuccess = false;
      state.isError = false;
    },
    user_reset: (state) => {
      state.user = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        // state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(emailVerify.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(emailVerify.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
      })
      .addCase(emailVerify.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(phoneVerify.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(phoneVerify.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
      })
      .addCase(phoneVerify.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(codeVerify.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(codeVerify.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
      })
      .addCase(codeVerify.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export const { messageClear, user_reset } = authSlice.actions;

export default authSlice.reducer;
