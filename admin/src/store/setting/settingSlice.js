import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import settingService from "./settingService";
import toast from "react-hot-toast";

const initialState = {
  settings: {
    general: {},
    email: {},
    payment: {},
  },
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const getSettings = createAsyncThunk(
  "settings/get-settings",
  async (_, thunkAPI) => {
    try {
      return await settingService.getSettings();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateGeneralSettings = createAsyncThunk(
  "settings/update-general",
  async (data, thunkAPI) => {
    try {
      return await settingService.updateGeneralSettings(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateEmailSettings = createAsyncThunk(
  "settings/update-email",
  async (data, thunkAPI) => {
    try {
      return await settingService.updateEmailSettings(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updatePaymentSettings = createAsyncThunk(
  "settings/update-payment",
  async (data, thunkAPI) => {
    try {
      return await settingService.updatePaymentSettings(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        state.settings = action.payload;
      })
      .addCase(getSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateGeneralSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGeneralSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "General settings updated successfully";
        state.settings.general = action.payload.general;
        toast.success(state.message);
      })
      .addCase(updateGeneralSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      .addCase(updateEmailSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEmailSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Email settings updated successfully";
        state.settings.email = action.payload.email;
        toast.success(state.message);
      })
      .addCase(updateEmailSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      .addCase(updatePaymentSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePaymentSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Payment settings updated successfully";
        state.settings.payment = action.payload.payment;
        toast.success(state.message);
      })
      .addCase(updatePaymentSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      });
  },
});

export default settingSlice.reducer;