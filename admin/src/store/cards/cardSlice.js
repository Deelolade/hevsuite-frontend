import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import cardService from "./cardService"

const initialState = {
  new_members: [],
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

// Get new members
export const getNewMembers = createAsyncThunk("cards/getNewMembers", async (filters, thunkAPI) => {
  try {
    return await cardService.getNewMembers(filters)
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Get users for card issuance
export const getAllUsers = createAsyncThunk("cards/getAllUsers", async (_, thunkAPI) => {
  try {
    const response = await cardService.getUsers()
    return response
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Get user details including address
export const getUserDetails = createAsyncThunk("cards/getUserDetails", async (userId, thunkAPI) => {
  try {
    const response = await cardService.getUserDetails(userId)
    return response
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Post cards
export const postCards = createAsyncThunk("cards/postCards", async (data, thunkAPI) => {
  try {
    return await cardService.postCards(data)
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Issue new card
export const issueNewCard = createAsyncThunk("cards/issueNewCard", async (data, thunkAPI) => {
  try {
    return await cardService.issueCard(data)
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Cancel card
export const cancelCard = createAsyncThunk("cards/cancelCard", async (data, thunkAPI) => {
  try {
    return await cardService.cancelCard(data)
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Bulk cancel cards
export const bulkCancelCards = createAsyncThunk("cards/bulkCancelCards", async (data, thunkAPI) => {
  try {
    return await cardService.bulkCancelCards(data)
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Approve card
export const approveCard = createAsyncThunk("cards/approveCard", async (cardId, thunkAPI) => {
  try {
    return await cardService.approveCard(cardId)
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Get card QR code
export const getCardQRCode = createAsyncThunk("cards/getCardQRCode", async (cardId, thunkAPI) => {
  try {
    return await cardService.getCardQRCode(cardId)
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Regenerate QR code
export const regenerateQRCode = createAsyncThunk("cards/regenerateQRCode", async (cardId, thunkAPI) => {
  try {
    return await cardService.regenerateQRCode(cardId)
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNewMembers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getNewMembers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.new_members = action.payload.new_members
      })
      .addCase(getNewMembers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.users = action.payload.users
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getUserDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(postCards.pending, (state) => {
        state.isLoading = true
      })
      .addCase(postCards.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload.message
      })
      .addCase(postCards.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(issueNewCard.pending, (state) => {
        state.isLoading = true
      })
      .addCase(issueNewCard.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload.message
        // Add the newly issued card to the state
        if (action.payload.card) {
          state.new_members.push(action.payload.card)
        }
      })
      .addCase(issueNewCard.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(cancelCard.pending, (state) => {
        state.isLoading = true
      })
      .addCase(cancelCard.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload.message
        // Update the card in the state
        if (action.payload.card) {
          state.new_members = state.new_members.map((card) =>
            card._id === action.payload.card._id ? action.payload.card : card,
          )
        }
      })
      .addCase(cancelCard.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(bulkCancelCards.pending, (state) => {
        state.isLoading = true
      })
      .addCase(bulkCancelCards.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload.message
      })
      .addCase(bulkCancelCards.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(approveCard.pending, (state) => {
        state.isLoading = true
      })
      .addCase(approveCard.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload.message
        // Update the card in the state
        if (action.payload.card) {
          state.new_members = state.new_members.map((card) =>
            card._id === action.payload.card._id ? action.payload.card : card,
          )
        }
      })
      .addCase(approveCard.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = cardSlice.actions
export default cardSlice.reducer
