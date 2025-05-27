import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supportService from "./supportService";
import toast from "react-hot-toast";

const initialState = {
  supportRequests: [],
  supportRequestDetails: null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const getSupportRequests = createAsyncThunk(
  "support/get-requests",
  async (data, thunkAPI) => {
    try {
      return await supportService.getSupportRequests(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSupportRequestDetails = createAsyncThunk(
  "support/get-request-details",
  async (id, thunkAPI) => {
    try {
      return await supportService.getSupportRequestDetails(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateSupportRequest = createAsyncThunk(
  "support/update-request",
  async (data, thunkAPI) => {
    try {
      return await supportService.updateSupportRequest(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteSupportRequest = createAsyncThunk(
  "support/delete-request",
  async (id, thunkAPI) => {
    try {
      return await supportService.deleteSupportRequest(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const supportSlice = createSlice({
  name: "support",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSupportRequests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSupportRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        state.supportRequests = action.payload.supportRequests;
      })
      .addCase(getSupportRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getSupportRequestDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSupportRequestDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        state.supportRequestDetails = action.payload;
      })
      .addCase(getSupportRequestDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateSupportRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSupportRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Support request updated successfully";
        state.supportRequests = state.supportRequests.map((request) =>
          request._id === action.payload._id ? action.payload : request
        );
        toast.success(state.message);
      })
      .addCase(updateSupportRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error(action.error);
      })
      .addCase(deleteSupportRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSupportRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Support request deleted successfully";
        state.supportRequests = state.supportRequests.filter(
          (request) => request._id !== action.payload.id
        );
        toast.success(state.message);
      })
      .addCase(deleteSupportRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      });
  },
});

export const { reset } = supportSlice.actions;
export default supportSlice.reducer;