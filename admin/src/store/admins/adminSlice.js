import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";

// Async Thunks
export const getAllAdmins = createAsyncThunk(
  "admins/getAllAdmins",
  async (_, thunkAPI) => {
    try {
      const data = await adminService.getAllAdmins();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createAdmin = createAsyncThunk(
  "admins/createAdmin",
  async (data, thunkAPI) => {
    try {
      const response = await adminService.createAdmin(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateAdmin = createAsyncThunk(
  "admins/updateAdmin",
  async (data, thunkAPI) => {
    try {
      const response = await adminService.updateAdmin(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteAdmin = createAsyncThunk(
  "admins/deleteAdmin",
  async (id, thunkAPI) => {
    try {
      const response = await adminService.deleteAdmin(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Initial State
const initialState = {
  admins: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Admin Slice
const adminSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAdmins.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAdmins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admins = action.payload;
      })
      .addCase(getAllAdmins.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admins.push(action.payload);
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.admins.findIndex(
          (admin) => admin.id === action.payload.id
        );
        if (index !== -1) {
          state.admins[index] = action.payload;
        }
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admins = state.admins.filter(
          (admin) => admin.id !== action.payload.id
        );
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;
