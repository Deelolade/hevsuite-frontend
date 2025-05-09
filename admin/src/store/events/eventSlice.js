import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllEvents, createEvent, updateEvent, deleteEvent } from './eventService';
import toast from 'react-hot-toast';

const initialState = {
  events: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: ''
};

// Get all events
export const getEvents = createAsyncThunk(
  'events/get-all',
  async (filters = { status: 'all', filter: 'all' }, thunkAPI) => {
    try {
      return await getAllEvents(filters);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create event
export const createNewEvent = createAsyncThunk(
  'events/create',
  async (eventData, thunkAPI) => {
    try {
      return await createEvent(eventData);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to create event';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update event
export const updateExistingEvent = createAsyncThunk(
  'events/update',
  async ({ id, eventData }, thunkAPI) => {
    try {
      return await updateEvent(id, eventData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete event
export const deleteExistingEvent = createAsyncThunk(
  'events/delete',
  async (id, thunkAPI) => {
    try {
      return await deleteEvent(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = 'success';
        state.events = action.payload;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.response?.data?.message || action.payload?.message || 'Failed to fetch events';
        state.events = [];
        toast.error(state.message);
      })
      .addCase(createNewEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = 'success';
        state.events = [action.payload, ...state.events];
        toast.success('Event created successfully');
      })
      .addCase(createNewEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.response?.data?.message || action.payload?.message || 'Failed to create event';
        toast.error(state.message);
      })
      .addCase(updateExistingEvent.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(updateExistingEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = 'Event updated successfully';
        const index = state.events.findIndex(event => event._id === action.payload._id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
        toast.success(state.message);
      })
      .addCase(updateExistingEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.response?.data?.message || action.payload?.message || 'Failed to update event';
        toast.error(state.message);
      })
      .addCase(deleteExistingEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteExistingEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = 'success';
        state.events = state.events.filter(event => event._id !== action.payload.id);
        toast.success('Event deleted successfully');
      })
      .addCase(deleteExistingEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      });
  }
});

export const { reset } = eventSlice.actions;
export default eventSlice.reducer;
