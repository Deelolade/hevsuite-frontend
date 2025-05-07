import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/events`;

// Existing fetchEvents thunk
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/user`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch events');
    }
  }
);

// New thunk for fetching attending members
export const fetchAttendingMembers = createAsyncThunk(
  'events/fetchAttendingMembers',
  async (eventId, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/attending-members`,
        { eventId }, // Send eventId in the request body
        { withCredentials: true }
      );
      return {
        eventId,
        members: response.data
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch attending members');
    }
  }
);

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    attendingMembers: {}, // Object to store members by event ID
    loading: false,
    membersLoading: false, // Separate loading state for members
    error: null,
    membersError: null, // Separate error state for members
  },
  reducers: {
    // Optional: Add a reducer to clear members when needed
    clearAttendingMembers: (state) => {
      state.attendingMembers = {};
    }
  },
  extraReducers: (builder) => {
    builder
      // Existing event reducers
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload;
        state.loading = false;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // New attending members reducers
      .addCase(fetchAttendingMembers.pending, (state) => {
        state.membersLoading = true;
        state.membersError = null;
      })
      .addCase(fetchAttendingMembers.fulfilled, (state, action) => {
        state.attendingMembers[action.payload.eventId] = action.payload.members;
        state.membersLoading = false;
      })
      .addCase(fetchAttendingMembers.rejected, (state, action) => {
        state.membersLoading = false;
        state.membersError = action.payload;
      });
  },
});

export const { clearAttendingMembers } = eventSlice.actions;
export default eventSlice.reducer;