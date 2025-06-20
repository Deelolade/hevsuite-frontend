import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supportRequestService from "../services/supportRequestService";

export const createSupportRequest = createAsyncThunk(
  "supportRequest/create",
  async (formData, { rejectWithValue }) => {
    try {
      return await supportRequestService.createSupportRequest(formData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create support request"
      );
    }
  }
);

export const getSupportRequests = createAsyncThunk(
  "supportRequest/getAll",
  async (_, { rejectWithValue }) => {
    try {
      return await supportRequestService.getSupportRequests();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch support requests"
      );
    }
  }
);

export const deleteSupportRequest = createAsyncThunk(
  "supportRequest/delete",
  async (id, { rejectWithValue }) => {
    try {
      const result = await supportRequestService.deleteSupportRequest(id);
      if (result.success) {
        return { id, data: result.data };
      } else {
        return rejectWithValue(result.error);
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete support request"
      );
    }
  }
);

const initialState = {
  requests: [],
  isLoading: false,
  isCreating: false,
  isDeleting: false,
  error: null,
  message: null,
};

const supportRequestSlice = createSlice({
  name: "supportRequest",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isCreating = false;
      state.isDeleting = false;
      state.error = null;
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create support request
      .addCase(createSupportRequest.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createSupportRequest.fulfilled, (state, action) => {
        state.isCreating = false;
        state.requests.unshift(action.payload); // Add new request to beginning
        state.message = "Support request created successfully";
      })
      .addCase(createSupportRequest.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload;
      })

      // Get support requests
      .addCase(getSupportRequests.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSupportRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.requests = action.payload;
      })
      .addCase(getSupportRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete support request
      .addCase(deleteSupportRequest.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteSupportRequest.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.requests = state.requests.filter(
          (request) => request.id !== action.payload.id
        );
        state.message = "Support request deleted successfully";
      })
      .addCase(deleteSupportRequest.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload;
      });
  },
});

export const { reset, clearError, clearMessage } = supportRequestSlice.actions;
export default supportRequestSlice.reducer;
