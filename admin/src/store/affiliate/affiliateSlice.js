import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import affiliateService from './affiliateService';

const initialState = {
  affiliates: [],
  affiliate: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  affiliateStatistics: {}, // { [affiliateId]: { data, isLoading, isError, message } }
};

// Get all affiliates
export const getAffiliates = createAsyncThunk(
  'affiliate/getAll',
  async (_, thunkAPI) => {
    try {
      return await affiliateService.getAffiliates();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get affiliate by ID
export const getAffiliateById = createAsyncThunk(
  'affiliate/getById',
  async (id, thunkAPI) => {
    try {
      return await affiliateService.getAffiliateById(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new affiliate
export const createAffiliate = createAsyncThunk(
  'affiliate/create',
  async (data, thunkAPI) => {
    try {
      return await affiliateService.createAffiliate(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update affiliate
export const updateAffiliate = createAsyncThunk(
  'affiliate/update',
  async ({ id, data }, thunkAPI) => {
    try {
      return await affiliateService.updateAffiliate({ id, data });
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update affiliate status
export const updateAffiliateStatus = createAsyncThunk(
  'affiliate/updateStatus',
  async ({ id, status }, thunkAPI) => {
    try {
      return await affiliateService.updateAffiliateStatus({ id, status });
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete affiliate
export const deleteAffiliate = createAsyncThunk(
  'affiliate/delete',
  async (id, thunkAPI) => {
    try {
      return await affiliateService.deleteAffiliate(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get affiliate statistics
export const getAffiliateStatistics = createAsyncThunk(
  'affiliate/getStatistics',
  async (id, thunkAPI) => {
    try {
      return { id, data: await affiliateService.getAffiliateStatistics(id) };
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue({ id, message });
    }
  }
);

export const affiliateSlice = createSlice({
  name: 'affiliate',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all affiliates
      .addCase(getAffiliates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAffiliates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.affiliates = action.payload;
      })
      .addCase(getAffiliates.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get affiliate by ID
      .addCase(getAffiliateById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAffiliateById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.affiliate = action.payload;
      })
      .addCase(getAffiliateById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Create affiliate
      .addCase(createAffiliate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAffiliate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.affiliate = action.payload;
      })
      .addCase(createAffiliate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update affiliate
      .addCase(updateAffiliate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAffiliate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.affiliate = action.payload;
        // Update the affiliate in the affiliates list if it exists
        const index = state.affiliates.findIndex(aff => aff._id === action.payload._id);
        if (index !== -1) {
          state.affiliates[index] = action.payload;
        }
      })
      .addCase(updateAffiliate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update affiliate status
      .addCase(updateAffiliateStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAffiliateStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.affiliate = action.payload;
        // Update the affiliate in the affiliates list if it exists
        const index = state.affiliates.findIndex(aff => aff._id === action.payload._id);
        if (index !== -1) {
          state.affiliates[index] = action.payload;
        }
      })
      .addCase(updateAffiliateStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete affiliate
      .addCase(deleteAffiliate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAffiliate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.affiliates = state.affiliates.filter(
          (affiliate) => affiliate._id !== action.payload.id
        );
      })
      .addCase(deleteAffiliate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get affiliate statistics
      .addCase(getAffiliateStatistics.pending, (state, action) => {
        const id = action.meta.arg;
        state.affiliateStatistics[id] = {
          ...(state.affiliateStatistics[id] || {}),
          isLoading: true,
          isError: false,
          message: '',
        };
      })
      .addCase(getAffiliateStatistics.fulfilled, (state, action) => {
        const { id, data } = action.payload;
        state.affiliateStatistics[id] = {
          data,
          isLoading: false,
          isError: false,
          message: '',
        };
      })
      .addCase(getAffiliateStatistics.rejected, (state, action) => {
        const { id, message } = action.payload || {};
        state.affiliateStatistics[id] = {
          ...(state.affiliateStatistics[id] || {}),
          isLoading: false,
          isError: true,
          message: message || 'Failed to fetch statistics',
        };
      });
  },
});

export const { reset } = affiliateSlice.actions;
export default affiliateSlice.reducer; 