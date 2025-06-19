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
  stats: {
    totalRequests: 0,
    pendingRequests: 0,
    completedRequests: 0,
    assignedRequests: 0
  }
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

export const getSupportRequestStats = createAsyncThunk(
  "support/get-stats",
  async (_, thunkAPI) => {
    try {
      return await supportService.getSupportRequestStats();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addMessageToSupportRequest = createAsyncThunk(
  "support/add-message",
  async ({ requestId, messageData }, thunkAPI) => {
    try {
      return await supportService.addMessageToSupportRequest(requestId, messageData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const supportSlice = createSlice({
  name: "support",
  initialState,
  reducers: {},
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
        state.supportRequests = action.payload;
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
          request._id === action.payload.id
            ? { ...request, ...action.payload.data }
            : request
        );
        toast.success(state.message);
      })
      .addCase(updateSupportRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
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
      })
      .addCase(getSupportRequestStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSupportRequestStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        if (action.payload && action.payload.data) {
          state.stats = {
            totalRequests: action.payload.data.totalRequests || 0,
            pendingRequests: action.payload.data.pendingRequests || 0,
            completedRequests: action.payload.data.completedRequests || 0,
            assignedRequests: action.payload.data.assignedRequests || 0
          };
        }
      })
      .addCase(getSupportRequestStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(addMessageToSupportRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMessageToSupportRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Message added successfully";
        // Update the specific request in the list with the new message
        const index = state.supportRequests.findIndex(
          (request) => request._id === action.payload._id
        );
        if (index !== -1) {
          state.supportRequests[index] = action.payload;
        }
        toast.success(state.message);
      })
      .addCase(addMessageToSupportRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      });
  },
});

export default supportSlice.reducer;