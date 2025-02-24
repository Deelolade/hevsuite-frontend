import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cardService from "./cardService";
import toast from "react-hot-toast";
const initialState = {
  new_members: [],
  //   member_users: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const getNewMembers = createAsyncThunk(
  "cards/new-users",
  async (data, thunkAPI) => {
    try {
      return await cardService.getNewMembers(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postCards = createAsyncThunk(
  "cards/post-cards",
  async (data, thunkAPI) => {
    try {
      return await cardService.postCards(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const issueCard = createAsyncThunk(
  "cards/issue-cards",
  async (data, thunkAPI) => {
    try {
      return await cardService.issueCard(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const cancelCard = createAsyncThunk(
  "cards/cancel-card",
  async (data, thunkAPI) => {
    try {
      return await cardService.cancelCard(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNewMembers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNewMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        state.new_members = action.payload.new_members;
      })
      .addCase(getNewMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(postCards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        state.post_cards = action.payload;
      })
      .addCase(postCards.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(issueCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(issueCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        state.new_members = [...state.new_members, action.payload];
      })
      .addCase(issueCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(cancelCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "user updated successfully";
        // state.member_users = state.member_users.map((member) =>
        //   member._id === action.payload.id
        //     ? { ...member, ...action.payload.data }
        //     : member
        // );
        toast.success(state.message);
      })
      .addCase(cancelCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      });
  },
});

export default cardSlice.reducer;
