// features/ask/askSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import askService from "../services/askService";
import toast from "react-hot-toast";
const initialState = {
  asks: [],
  currentAsks: [], // For active asks (not archived)
  acceptedAsks: [], // For archived asks
  currentAsk: null,
  loading: false,
  error: null,
  message: null,
};
// async Thunks for fetching all OpenAsks
export const fetchOpenAsks = createAsyncThunk(
  "ask/fetchOpenAsks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await askService.fetchOpenAsks();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
// Async Thunks using createAsyncThunk
export const createAsk = createAsyncThunk(
  "ask/createAsk",
  async (askData, { rejectWithValue }) => {
    try {
      const response = await askService.createAsk(askData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const claimAsk = createAsyncThunk(
  "ask/claimAsk",
  async (askId, { rejectWithValue }) => {
    try {
      const response = await askService.claimAsk(askId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const abandonAsk = createAsyncThunk(
  "ask/abandonAsk",
  async (askId, { rejectWithValue }) => {
    try {
      const response = await askService.abandonAsk(askId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deliverAsk = createAsyncThunk(
  "ask/deliverAsk",
  async (askId, { rejectWithValue }) => {
    try {
      const response = await askService.deliverAsk(askId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const deleteAsk = createAsyncThunk(
  "ask/deleteAsk",
  async (askId, { rejectWithValue }) => {
    try {
      const response = await askService.deleteAsk(askId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const reportAsk = createAsyncThunk(
  "ask/reportAsk",
  async ({ askId, reason }, { rejectWithValue }) => {
    try {
      const response = await askService.reportAsk({ askId, reason });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const chat = createAsyncThunk(
  "ask/chat",
  async ({ askId, message }, { rejectWithValue }) => {
    try {
      const response = await askService.chat({ askId, message });
      return {
        askId,
        ...response.message, // Spread the message object
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
// Add these to your existing async thunks in askSlice.js
export const fetchCurrentUserAsks = createAsyncThunk(
  "ask/fetchCurrentUserAsks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await askService.fetchCurrentUserAsks();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchAcceptedAsks = createAsyncThunk(
  "ask/fetchAcceptedAsks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await askService.fetchAcceptedAsks();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchUserAsks = createAsyncThunk(
  "ask/fetchUserAsks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await askService.fetchUserAsks();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const askSlice = createSlice({
  name: "ask",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
    setCurrentAsk: (state, action) => {
      state.currentAsk = action.payload;
    },
    addMessage: (state, action) => {
      if (state.currentAsk) {
        if (!state.currentAsk.messages) {
          state.currentAsk.messages = [];
        }
        state.currentAsk.messages.push(action.payload);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch Open Asks
      .addCase(fetchOpenAsks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOpenAsks.fulfilled, (state, action) => {
        state.loading = false;

        state.asks = action.payload;
        state.message = "Asks fetched successfully";
      })
      .addCase(fetchOpenAsks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Ask
      .addCase(createAsk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAsk.fulfilled, (state, action) => {
        state.loading = false;
        state.asks.push(action.payload);
        state.message = "Ask created successfully";
      })
      .addCase(createAsk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(state.error);
      })

      // Claim Ask
      .addCase(claimAsk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(claimAsk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAsk = action.payload;
        state.message = "Ask claimed successfully";
      })
      .addCase(claimAsk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(state.error);
      })

      // Abandon Ask
      .addCase(abandonAsk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(abandonAsk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAsk = null;
        state.message = "Ask abandoned successfully";
      })
      .addCase(abandonAsk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(state.error);
      })

      // Deliver Ask
      .addCase(deliverAsk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deliverAsk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAsk = action.payload;
        state.message = "Ask delivered successfully";
      })
      .addCase(deliverAsk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(state.error);
      })

      // Report Ask
      .addCase(reportAsk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reportAsk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Ask reported successfully";
      })
      .addCase(reportAsk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(state.error);
      })

      // Chat
      .addCase(chat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(chat.fulfilled, (state, action) => {
        state.loading = false;
        const { askId, ...message } = action.payload;

        // Update the specific ask's chat messages
        state.asks = state.asks.map((ask) => {
          if (ask._id === askId) {
            return {
              ...ask,
              chat: [...(ask.chat || []), message],
            };
          }
          return ask;
        });

        // Also update currentAsk if it's the same one
        if (state.currentAsk?._id === askId) {
          state.currentAsk.chat = [...(state.currentAsk.chat || []), message];
        }
      })
      // Fetch Current User Asks
      .addCase(fetchCurrentUserAsks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUserAsks.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAsks = action.payload;
        state.message = "Current user asks fetched successfully";
      })
      .addCase(fetchCurrentUserAsks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Accepted Asks
      .addCase(fetchAcceptedAsks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAcceptedAsks.fulfilled, (state, action) => {
        state.loading = false;
        state.acceptedAsks = action.payload;
        state.message = "Accepted asks fetched successfully";
      })
      .addCase(fetchAcceptedAsks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Ask
      .addCase(deleteAsk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAsk.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted ask from all relevant state arrays
        state.asks = state.asks.filter((ask) => ask._id !== action.payload._id);
        state.currentAsks = state.currentAsks.filter(
          (ask) => ask._id !== action.payload._id
        );
        state.acceptedAsks = state.acceptedAsks.filter(
          (ask) => ask._id !== action.payload._id
        );

        // Clear currentAsk if it's the deleted one
        if (state.currentAsk?._id === action.payload._id) {
          state.currentAsk = null;
        }

        state.message = "Ask deleted successfully";
        toast.success("Ask deleted successfully");
      })
      .addCase(deleteAsk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to delete ask");
      })

      // all user asks
      .addCase(fetchUserAsks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAsks.fulfilled, (state, action) => {
        state.loading = false;
        state.asks = action.payload;
        state.message = "User asks fetched successfully";
      })
      .addCase(fetchUserAsks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reset, setCurrentAsk, addMessage } = askSlice.actions;
export default askSlice.reducer;
