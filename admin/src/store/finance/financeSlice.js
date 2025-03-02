import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import financeService from "./financeService";
import toast from "react-hot-toast";

const initialState = {
  transactions: [],
  transactionDetails: null,
  financialSummary: {
    revenue: 0,
    expenses: 0,
    profit: 0,
    membershipRevenue: 0,
    eventRevenue: 0,
    monthlyData: [],
  },
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const getTransactions = createAsyncThunk(
  "finance/get-transactions",
  async (data, thunkAPI) => {
    try {
      return await financeService.getTransactions(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTransactionDetails = createAsyncThunk(
  "finance/get-transaction-details",
  async (id, thunkAPI) => {
    try {
      return await financeService.getTransactionDetails(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateTransactionStatus = createAsyncThunk(
  "finance/update-transaction-status",
  async (data, thunkAPI) => {
    try {
      return await financeService.updateTransactionStatus(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getFinancialSummary = createAsyncThunk(
  "finance/get-financial-summary",
  async (period, thunkAPI) => {
    try {
      return await financeService.getFinancialSummary(period);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        state.transactions = action.payload;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getTransactionDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransactionDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        state.transactionDetails = action.payload;
      })
      .addCase(getTransactionDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateTransactionStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTransactionStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Transaction status updated successfully";
        state.transactions = state.transactions.map((transaction) =>
          transaction._id === action.payload._id ? action.payload : transaction
        );
        if (state.transactionDetails && state.transactionDetails._id === action.payload._id) {
          state.transactionDetails = action.payload;
        }
        toast.success(state.message);
      })
      .addCase(updateTransactionStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      .addCase(getFinancialSummary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFinancialSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        state.financialSummary = action.payload;
      })
      .addCase(getFinancialSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default financeSlice.reducer;