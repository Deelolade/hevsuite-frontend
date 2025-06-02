import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import eventService  from '../services/eventService'

// Original fetchEvents thunk (kept for backward compatibility)
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, thunkAPI) => {
    try {
      const response = await eventService.getVisibleEvents();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch events');
    }
  }
);

// Extended fetch for all event types
export const fetchAllEventTypes = createAsyncThunk(
  'events/fetchAll',
  async (_, thunkAPI) => {
    try {
      const [visible, attending, invited, past, saved] = await Promise.all([
        eventService.getVisibleEvents(),
        eventService.getAttendingEvents(),
        eventService.getInvitedEvents(),
        eventService.getPastEvents(),
        eventService.getSavedEvents()
      ]);
      return { visible, attending, invited, past , saved};
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk for fetching attending members
export const fetchAttendingMembers = createAsyncThunk(
  'events/fetchAttendingMembers',
  async (eventId, thunkAPI) => {
    try {
      const members = await eventService.getAttendingMembers(eventId);
      return { eventId, members };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk for updating invite status
export const updateInviteStatus = createAsyncThunk(
  'events/updateInviteStatus',
  async ({ eventId, status }, thunkAPI) => {
    try {
      const response = await eventService.updateInviteStatus({ eventId, status });
      return { 
        eventId, 
        status, 
        updatedEvent: response.event 
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// cancelEventAttendance.js
export const cancelEventAttendance = createAsyncThunk(
  "event/cancelEventAttendance",
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await eventService.cancelEventAttendance(eventId);
      return { eventId, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
//save event
export const saveEvent = createAsyncThunk(
  'events/saveEvent',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await eventService.saveEvent(eventId);
      return { eventId, ...response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//remove saved event
export const removeSavedEvent = createAsyncThunk(
  'events/removeSavedEvent',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await eventService.removeSavedEvent(eventId);
      return { eventId, ...response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



const eventSlice = createSlice({
  name: 'events',
  initialState: {
    // Original state structure
    events: [], // Maintained for components using fetchEvents
    // New state structure
    visibleEvents: [], // From getVisibleEvents
    attendingEvents: [],
    invitedEvents: [],
    pastEvents: [],
    savedEvents: [],
    attendingMembers: {},
    loading: false,
    membersLoading: false,
    error: null,
    membersError: null,
    updateStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    saveEventLoading: false,
  saveEventError: null,
  removeSavedEventLoading: false,
  removeSavedEventError: null
  },
  reducers: {
    clearAttendingMembers: (state) => {
      state.attendingMembers = {};
    },
    resetUpdateStatus: (state) => {
      state.updateStatus = 'idle';
    },
    // Optional: Add a reducer to sync state if needed
    syncEvents: (state, action) => {
      state.events = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Original fetchEvents reducers (for backward compatibility)
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload;
        state.visibleEvents = action.payload; // Sync with new structure
        state.loading = false;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch all event types
      .addCase(fetchAllEventTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEventTypes.fulfilled, (state, action) => {
        state.visibleEvents = action.payload.visible;
        state.events = action.payload.visible; // Sync with old structure
        state.attendingEvents = action.payload.attending;
        state.invitedEvents = action.payload.invited;
        state.pastEvents = action.payload.past;
        state.savedEvents = action.payload.saved;
        state.loading = false;
      })
      .addCase(fetchAllEventTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Attending members
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
      })
      
      // Update invite status
      .addCase(updateInviteStatus.pending, (state) => {
        state.updateStatus = 'loading';
      })
    .addCase(updateInviteStatus.fulfilled, (state, action) => {
      const { eventId, status, updatedEvent } = action.payload;
      
      // Remove from invitedEvents regardless of status
      state.invitedEvents = state.invitedEvents.filter(event => event._id !== eventId);
      
      // // If accepted, add to attendingEvents
      // if (status === 'accepted') {
      //   state.attendingEvents = [updatedEvent, ...state.attendingEvents];
      // }
      
      // // Update visibleEvents if needed
      // state.visibleEvents = state.visibleEvents.map(event => 
      //   event._id === eventId ? updatedEvent : event
      // );
      
      // Update any other relevant state
      state.updateStatus = 'succeeded';
    })
    .addCase(updateInviteStatus.rejected, (state, action) => {
      state.updateStatus = 'failed';
      state.error = action.payload;
    })
     .addCase(cancelEventAttendance.pending, (state) => {
    state.cancelAttendanceLoading = true;
    state.cancelAttendanceError = null;
  })
  .addCase(cancelEventAttendance.fulfilled, (state, action) => {
    state.cancelAttendanceLoading = false;

    // Update the attendance lists
    const eventId = action.payload.eventId;
    state.attendingEvents = state.attendingEvents.filter(
      (event) => event._id !== eventId
    );
  })
  .addCase(cancelEventAttendance.rejected, (state, action) => {
    state.cancelAttendanceLoading = false;
    state.cancelAttendanceError = action.payload;
  })
  // Add these to your extraReducers
.addCase(saveEvent.pending, (state) => {
  state.saveEventLoading = true;
  state.saveEventError = null;
})
.addCase(saveEvent.fulfilled, (state, action) => {
  state.saveEventLoading = false;
  // Update based on the actual response structure
  if (action.payload.savedEvent && 
      !state.savedEvents.some(e => e._id === action.payload.eventId)) {
    state.savedEvents.push(action.payload.savedEvent);
  }
})
.addCase(saveEvent.rejected, (state, action) => {
  state.saveEventLoading = false;
  // Use the error message from backend if available
  state.saveEventError = action.payload || 'Failed to save event';
})

.addCase(removeSavedEvent.pending, (state) => {
  state.removeSavedEventLoading = true;
  state.removeSavedEventError = null;
})
.addCase(removeSavedEvent.fulfilled, (state, action) => {
  state.removeSavedEventLoading = false;
  state.savedEvents = state.savedEvents.filter(
    event => event._id !== action.payload.eventId
  );
})
.addCase(removeSavedEvent.rejected, (state, action) => {
  state.removeSavedEventLoading = false;
  state.removeSavedEventError = action.payload;
})

  },
});

export const { 
  clearAttendingMembers, 
  resetUpdateStatus,
  syncEvents 
} = eventSlice.actions;

export default eventSlice.reducer;