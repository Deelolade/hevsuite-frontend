import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paymentMethodService from "../services/paymentMethodService";

// Initial state
const initialState = {
  methods: [],
  selectedMethod: null,
  isLoading: false,
  error: null,
  lastFetch: null,
};

// Async thunks
export const fetchPaymentMethods = createAsyncThunk(
  "paymentMethods/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await paymentMethodService.getPaymentMethods();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const paymentMethodSlice = createSlice({
  name: "paymentMethods",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedMethod: (state) => {
      state.selectedMethod = null;
    },
    setSelectedMethod: (state, action) => {
      state.selectedMethod = action.payload;
    },
    resetPaymentMethodState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all payment methods
      .addCase(fetchPaymentMethods.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
        state.isLoading = false;
        state.methods = action.payload.methods || [];
      })
      .addCase(fetchPaymentMethods.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Actions
export const {
  clearError,
  clearSelectedMethod,
  setSelectedMethod,
  resetPaymentMethodState,
} = paymentMethodSlice.actions;

// Selectors
export const selectAllPaymentMethods = (state) => state.paymentMethods.methods;
export const selectSelectedPaymentMethod = (state) =>
  state.paymentMethods.selectedMethod;
export const selectPaymentMethodsLoading = (state) =>
  state.paymentMethods.isLoading;
export const selectPaymentMethodsError = (state) => state.paymentMethods.error;

export default paymentMethodSlice.reducer;
