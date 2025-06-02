// features/cms/pageSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pageService from "./pageService";
import toast from "react-hot-toast";

const initialState = {
  pages: [],
  currentPage: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Thunks
export const getAllPages = createAsyncThunk("cms/get-all-pages", async (_, thunkAPI) => {
  try {
    return await pageService.getAllPages();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getPageById = createAsyncThunk("cms/get-page-by-id", async (id, thunkAPI) => {
  try {
    return await pageService.getPageById(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createPage = createAsyncThunk("cms/create-page", async (data, thunkAPI) => {
  try {
    return await pageService.createPage(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updatePage = createAsyncThunk("cms/update-page", async (data, thunkAPI) => {
  try {
    return await pageService.updatePage(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deletePage = createAsyncThunk("cms/delete-page", async (id, thunkAPI) => {
  try {
    return await pageService.deletePage(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// Slice
export const pageSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all
      .addCase(getAllPages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pages = action.payload;
        state.isSuccess = true;
      })
      .addCase(getAllPages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })

      // Get by ID
      .addCase(getPageById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPageById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPage = action.payload;
        state.isSuccess = true;
      })
      .addCase(getPageById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })

      // Create
      .addCase(createPage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pages.push(action.payload);
        state.isSuccess = true;
        toast.success("Page created successfully");
      })
      .addCase(createPage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })

      // Update
      .addCase(updatePage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pages = state.pages.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );
        state.isSuccess = true;
        toast.success("Page updated successfully");
      })
      .addCase(updatePage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })

      // Delete
      .addCase(deletePage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pages = state.pages.filter((p) => p._id !== action.payload.id);
        state.isSuccess = true;
        toast.success("Page deleted successfully");
      })
      .addCase(deletePage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      });
  },
});

export default pageSlice.reducer;
