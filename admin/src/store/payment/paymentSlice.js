import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPaymentMethods, updatePaymentMethod, addPaymentMethod, removePaymentMethod } from './paymentService';

const initialState = {
  processors: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get payment processors
export const getProcessors = createAsyncThunk(
  'payment/getProcessors',
  async (_, thunkAPI) => {
    try {
      return await getPaymentMethods();
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update payment processor
export const updateProcessor = createAsyncThunk(
  'payment/updateProcessor',
  async (formData, thunkAPI) => {
    try {
      return await updatePaymentMethod(formData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add new payment processor
export const addProcessor = createAsyncThunk(
  'payment/addProcessor',
  async (formData, thunkAPI) => {
    try {
      return await addPaymentMethod(formData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Remove payment processor
export const removeProcessor = createAsyncThunk(
  'payment/removeProcessor',
  async (processorId, thunkAPI) => {
    try {
      return await removePaymentMethod(processorId);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Reorder payment processors
export const reorderProcessors = createAsyncThunk(
  'payment/reorderProcessors',
  async (processors, thunkAPI) => {
    try {
      // Update the order in the backend
      await Promise.all(
        processors.map((processor, index) =>
          updatePaymentMethod({ ...processor, order: index })
        )
      );
      return processors;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const paymentSlice = createSlice({
  name: 'payment',
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
      .addCase(getProcessors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProcessors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.processors = action.payload;
      })
      .addCase(getProcessors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateProcessor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProcessor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.processors = state.processors.map((processor) =>
          processor.provider === action.payload.provider ? action.payload : processor
        );
      })
      .addCase(updateProcessor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addProcessor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProcessor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.processors.push(action.payload);
      })
      .addCase(addProcessor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeProcessor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeProcessor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.processors = state.processors.filter(
          (processor) => processor.id !== action.payload
        );
      })
      .addCase(removeProcessor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(reorderProcessors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reorderProcessors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.processors = action.payload;
      })
      .addCase(reorderProcessors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = paymentSlice.actions;
export default paymentSlice.reducer; 