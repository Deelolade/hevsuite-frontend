import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as clubCardService from "../services/clubCardService";

// Async thunks
export const requestClubCard = createAsyncThunk(
  "clubCard/request",
  async ({ userId, isReplacement = false }, { rejectWithValue }) => {
    try {
      const response = await clubCardService.requestClubCard({
        userId,
        isReplacement,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to request club card");
    }
  }
);

export const getCardByUserId = createAsyncThunk(
  "clubCard/getByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await clubCardService.getCardByUserId(userId);
      if (!response.success) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to get user card");
    }
  }
);

export const activateCard = createAsyncThunk(
  "clubCard/activate",
  async ({ cardId, userId }, { rejectWithValue }) => {
    try {
      const response = await clubCardService.activateCard(cardId, userId);
      if (!response.success) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to activate card");
    }
  }
);

export const deactivateCard = createAsyncThunk(
  "clubCard/deactivate",
  async ({ cardId, userId }, { rejectWithValue }) => {
    try {
      const response = await clubCardService.deactivateCard(cardId, userId);
      if (!response.success) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to deactivate card");
    }
  }
);

// Helper function to normalize card data
const normalizeCardData = (cardData) => {
  return {
    cardId: cardData._id || cardData.id || cardData.cardId,
    cardType: cardData.cardType,
    paymentStatus: cardData.paymentStatus,
    approved: cardData.approvedByAdmin ?? cardData.approved,
    qrCode: cardData.qrCode,
    expiryDate: cardData.expiryDate,
    isActive: cardData.isActive,
    isBanned: cardData.isBanned,
  };
};

// Initial state
const initialState = {
  // Card data
  cardId: null,
  cardType: null,
  paymentStatus: null,
  approved: false,
  qrCode: null,
  expiryDate: null,
  isActive: false,
  isBanned: false,

  // Loading states
  loading: false,
  activating: false,
  deactivating: false,

  // Error handling
  error: null,

  // Token-based override
  tokenActivated: false,
};

const clubCardSlice = createSlice({
  name: "clubCard",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetClubCard: () => initialState,
    setTokenActivated: (state, action) => {
      state.tokenActivated = action.payload;
      // Only override isActive if we're setting tokenActivated to true
      // and the card is not banned
      if (action.payload && !state.isBanned) {
        state.isActive = true;
      }
    },
    updateCardStatus: (state, action) => {
      const { paymentStatus, approved, isActive, isBanned } = action.payload;
      if (paymentStatus !== undefined) state.paymentStatus = paymentStatus;
      if (approved !== undefined) state.approved = approved;
      if (isBanned !== undefined) state.isBanned = isBanned;
      if (isActive !== undefined) {
        // Respect token activation, but allow deactivation if not token-activated
        // or if the card is banned
        if (state.tokenActivated && !isBanned) {
          state.isActive = true;
        } else {
          state.isActive = isActive;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Request card
      .addCase(requestClubCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestClubCard.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.cardId) {
          state.cardId = action.payload.cardId;
        }
        if (action.payload.paymentStatus) {
          state.paymentStatus = action.payload.paymentStatus;
        }
      })
      .addCase(requestClubCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get card by user
      .addCase(getCardByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCardByUserId.fulfilled, (state, action) => {
        state.loading = false;
        const normalizedData = normalizeCardData(action.payload);

        // Update all card fields
        Object.keys(normalizedData).forEach((key) => {
          if (normalizedData[key] !== undefined) {
            if (key === "isActive") {
              // Apply token activation logic
              state[key] =
                state.tokenActivated && !normalizedData.isBanned
                  ? true
                  : normalizedData[key];
            } else {
              state[key] = normalizedData[key];
            }
          }
        });
      })
      .addCase(getCardByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Activate card
      .addCase(activateCard.pending, (state) => {
        state.activating = true;
        state.error = null;
      })
      .addCase(activateCard.fulfilled, (state, action) => {
        state.activating = false;

        // Handle different possible response structures
        const cardData = action.payload.card || action.payload;
        const normalizedData = normalizeCardData(cardData);

        // Update relevant fields from the response
        if (normalizedData.cardId) {
          state.cardId = normalizedData.cardId;
        }

        // Set isActive to true on successful activation
        state.isActive = true;

        // Update other fields if they're included in the response
        if (normalizedData.paymentStatus !== undefined) {
          state.paymentStatus = normalizedData.paymentStatus;
        }
        if (normalizedData.approved !== undefined) {
          state.approved = normalizedData.approved;
        }
        if (normalizedData.isBanned !== undefined) {
          state.isBanned = normalizedData.isBanned;
        }
      })
      .addCase(activateCard.rejected, (state, action) => {
        state.activating = false;
        state.error = action.payload;
      })

      // Deactivate card - ADDED MISSING HANDLERS
      .addCase(deactivateCard.pending, (state) => {
        state.deactivating = true;
        state.error = null;
      })
      .addCase(deactivateCard.fulfilled, (state, action) => {
        state.deactivating = false;

        // Handle different possible response structures
        const cardData = action.payload.card || action.payload;
        const normalizedData = normalizeCardData(cardData);

        // Update relevant fields from the response
        if (normalizedData.cardId) {
          state.cardId = normalizedData.cardId;
        }

        // Set isActive based on token activation and ban status
        if (state.tokenActivated && !state.isBanned) {
          // Keep active if token-activated and not banned
          state.isActive = true;
        } else {
          // Otherwise, deactivate
          state.isActive = false;
        }

        // Update other fields if they're included in the response
        if (normalizedData.paymentStatus !== undefined) {
          state.paymentStatus = normalizedData.paymentStatus;
        }
        if (normalizedData.approved !== undefined) {
          state.approved = normalizedData.approved;
        }
        if (normalizedData.isBanned !== undefined) {
          state.isBanned = normalizedData.isBanned;
        }
      })
      .addCase(deactivateCard.rejected, (state, action) => {
        state.deactivating = false;
        state.error = action.payload;
      });
  },
});

// Actions
export const {
  clearError,
  resetClubCard,
  updateCardStatus,
  setTokenActivated,
} = clubCardSlice.actions;

// Selectors
export const selectClubCard = (state) => state.clubCard;
export const selectCardStatus = (state) => ({
  paymentStatus: state.clubCard.paymentStatus,
  approved: state.clubCard.approved,
  isActive: state.clubCard.isActive,
  isBanned: state.clubCard.isBanned,
  cardType: state.clubCard.cardType,
});

export const selectLoadingStates = (state) => ({
  loading: state.clubCard.loading,
  activating: state.clubCard.activating,
  deactivating: state.clubCard.deactivating,
});

export const selectIsCardValid = (state) => {
  const { paymentStatus, approved, isActive, isBanned, expiryDate } =
    state.clubCard;
  const isNotExpired = !expiryDate || new Date(expiryDate) > new Date();
  return (
    paymentStatus === "paid" &&
    approved &&
    isActive &&
    !isBanned &&
    isNotExpired
  );
};

export default clubCardSlice.reducer;
