import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPricingFees } from "../services/pricingFeesService";

export const fetchPricingFees = createAsyncThunk(
  "pricingFees/fetchPricingFees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPricingFees();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Initial state
const initialState = {
  pricingFees: null,
  isLoading: false,
  error: null,
  lastFetch: null,
};

// Slice
const pricingFeesSlice = createSlice({
  name: "pricingFees",
  initialState,
  reducers: {
    clearPricingFeesError: (state) => {
      state.error = null;
    },
    resetPricingFees: (state) => {
      state.pricingFees = null;
      state.error = null;
      state.lastFetch = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch pricing fees
      .addCase(fetchPricingFees.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPricingFees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pricingFees = action.payload;
        state.error = null;
        state.lastFetch = new Date().toISOString();
      })
      .addCase(fetchPricingFees.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch pricing fees";
      });
  },
});

// Actions
export const { clearPricingFeesError, resetPricingFees } =
  pricingFeesSlice.actions;

// Selectors
export const selectPricingFees = (state) => state.pricingFees.pricingFees;
export const selectPricingFeesLoading = (state) => state.pricingFees.isLoading;
export const selectPricingFeesError = (state) => state.pricingFees.error;
export const selectPricingFeesLastFetch = (state) =>
  state.pricingFees.lastFetch;

// Reducer
export default pricingFeesSlice.reducer;
