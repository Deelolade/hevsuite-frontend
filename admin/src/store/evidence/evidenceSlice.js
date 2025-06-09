import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import evidenceService from "./evidenceService";
import { toast } from "react-toastify";

const initialState = {
  evidenceRequests: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Get all evidence requests
export const getEvidenceRequests = createAsyncThunk(
  "evidence/getAll",
  async (params, thunkAPI) => {
    try {
      return await evidenceService.getEvidenceRequests(params);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch requests';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update evidence status
export const updateEvidenceStatus = createAsyncThunk(
  "evidence/updateStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      return await evidenceService.updateEvidenceStatus(id, status);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to update status';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Assign request to admin
export const assignRequestToAdmin = createAsyncThunk(
  "evidence/assignAdmin",
  async ({ requestId, adminId }, thunkAPI) => {
    try {
      return await evidenceService.assignRequestToAdmin(requestId, adminId);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to assign request';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const evidenceSlice = createSlice({
  name: "evidence",
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
      .addCase(getEvidenceRequests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEvidenceRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.evidenceRequests = action.payload;
      })
      .addCase(getEvidenceRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateEvidenceStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.evidenceRequests.findIndex(
          (request) => request._id === action.payload._id
        );
        if (index !== -1) {
          state.evidenceRequests[index] = action.payload;
        }
      })
      .addCase(assignRequestToAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.evidenceRequests.findIndex(
          (request) => request._id === action.payload._id
        );
        if (index !== -1) {
          state.evidenceRequests[index] = action.payload;
        }
      });
  },
});

export const { reset } = evidenceSlice.actions;
export default evidenceSlice.reducer; 