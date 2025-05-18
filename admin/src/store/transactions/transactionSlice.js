import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTransactions, updateTransactionStatus } from './transactionService';

// Async thunks
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchAll',
  async ({ page, limit, filters }, { rejectWithValue }) => {
    try {
      return await getTransactions(page, limit, filters);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateStatus = createAsyncThunk(
  'transactions/updateStatus',
  async ({ transactionId, status }, { rejectWithValue }) => {
    try {
      return await updateTransactionStatus(transactionId, status);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  transactions: [],
  currentPage: 1,
  totalPages: 1,
  totalTransactions: 0,
  loading: false,
  error: null,
  statusUpdateLoading: false,
  statusUpdateError: null
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.statusUpdateError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.data; // Changed from action.payload.transactions
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalTransactions = action.payload.totalItems; // Changed from action.payload.totalTransactions
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update status
      .addCase(updateStatus.pending, (state) => {
        state.statusUpdateLoading = true;
        state.statusUpdateError = null;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.statusUpdateLoading = false;
        const index = state.transactions.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.statusUpdateLoading = false;
        state.statusUpdateError = action.payload;
      });
  }
});

export const { clearError } = transactionSlice.actions;
export default transactionSlice.reducer; 