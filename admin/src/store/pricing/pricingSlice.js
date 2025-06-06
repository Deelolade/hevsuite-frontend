import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

// Get pricing settings
export const getPricingSettings = createAsyncThunk(
  'pricing/getSettings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/pricing-settings`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update pricing setting
export const updatePricingSetting = createAsyncThunk(
  'pricing/updateSetting',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/pricing-settings/${id}`,
        data,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  settings: [
    {
      id: 1,
      name: 'Membership Fee',
      price: 120,
      isEnabled: true,
      currency: 'GBP'
    },
    {
      id: 2,
      name: 'Non-Engagement Fee',
      price: 50,
      isEnabled: false,
      currency: 'GBP'
    },
    {
      id: 3,
      name: 'New Club Card Fee',
      price: 50,
      isEnabled: false,
      currency: 'GBP'
    }
  ],
  loading: false,
  error: null
};

const pricingSlice = createSlice({
  name: 'pricing',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get pricing settings
      .addCase(getPricingSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPricingSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(getPricingSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update pricing setting
      .addCase(updatePricingSetting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePricingSetting.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.settings.findIndex(setting => setting.id === action.payload.id);
        if (index !== -1) {
          state.settings[index] = action.payload;
        }
      })
      .addCase(updatePricingSetting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = pricingSlice.actions;
export default pricingSlice.reducer; 