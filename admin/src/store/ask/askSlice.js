import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import askService from "./askService";
import toast from "react-hot-toast";
const initialState = {
  asks: [],
  reports: [],
  top_asks: [],
  //   member_users: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const getAllAsks = createAsyncThunk(
  "asks/all-asks",
  async (data, thunkAPI) => {
    try {
      return await askService.getAllAsks(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllReports = createAsyncThunk(
  "asks/all-reports",
  async (thunkAPI) => {
    try {
      return await askService.getAllReports();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTopAsks = createAsyncThunk(
  "asks/top-asks",
  async (thunkAPI) => {
    try {
      return await askService.getTopAsks();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editReport = createAsyncThunk(
  "asks/edit-report",
  async (data, thunkAPI) => {
    try {
      return await askService.editReport(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteReport = createAsyncThunk(
  "asks/delete-report",
  async (data, thunkAPI) => {
    try {
      return await askService.deleteReport(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const promoteAsks = createAsyncThunk(
  "asks/promote-asks",
  async (data, thunkAPI) => {
    try {
      return await askService.promoteAsks(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const banAsk = createAsyncThunk(
  "asks/ban-ask",
  async (data, thunkAPI) => {
    try {
      return await askService.banAsk(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const askSlice = createSlice({
  name: "asks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAsks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAsks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        state.asks = action.payload.asks;
      })
      .addCase(getAllAsks.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAllReports.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        state.reports = action.payload;
      })
      .addCase(getAllReports.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getTopAsks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTopAsks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        state.top_asks = action.payload;
      })
      .addCase(getTopAsks.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(editReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        // state.reports = [...state.reports, action.payload];
      })
      .addCase(editReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        state.reports = state.reports.map((report) =>
          report._id === action.payload.id
            ? { ...report, ...action.payload.data }
            : report
        );
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(promoteAsks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(promoteAsks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        // state.asks = [...state.asks, action.payload];
      })
      .addCase(promoteAsks.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(banAsk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(banAsk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "user updated successfully";
        state.asks = state.asks.map((ask) =>
          ask._id === action.payload.id
            ? { ...ask, ...action.payload.data }
            : ask
        );
        toast.success(state.message);
      })
      .addCase(banAsk.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      });
  },
});

export default askSlice.reducer;
