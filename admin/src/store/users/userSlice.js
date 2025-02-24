import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";
import toast from "react-hot-toast";
const initialState = {
  pending_users: [],
  member_users: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const pendingUsers = createAsyncThunk(
  "users/pending-users",
  async (data, thunkAPI) => {
    try {
      return await userService.pendingUsers(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const memberUsers = createAsyncThunk(
  "users/member-users",
  async (data, thunkAPI) => {
    try {
      return await userService.memberUsers(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const inviteUser = createAsyncThunk(
  "users/invite-user",
  async (data, thunkAPI) => {
    try {
      return await userService.inviteUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editUser = createAsyncThunk(
  "users/edit-user",
  async (data, thunkAPI) => {
    try {
      return await userService.editUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(pendingUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(pendingUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        state.pending_users = action.payload.pending_users;
      })
      .addCase(pendingUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(memberUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(memberUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        state.member_users = action.payload.member_users;
      })
      .addCase(memberUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(inviteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(inviteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        state.member_users = [...state.member_users, action.payload];
      })
      .addCase(inviteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "user updated successfully";
        state.member_users = state.member_users.map((member) =>
          member._id === action.payload.id
            ? { ...member, ...action.payload.data }
            : member
        );
        toast.success(state.message);
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      });
  },
});

export default userSlice.reducer;
