import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pageService from "./pageService";
import toast from "react-hot-toast";

const initialState = {
  pages: [],
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    pages: 0
  },
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const createPage = createAsyncThunk(
  "pages/create",
  async (data) => {
    const response = await pageService.createPage(data);
    return response.data;
  }
);

export const getPages = createAsyncThunk(
  "pages/getAll",
  async (data) => {
    const response = await pageService.getPages(data);
    return response.data;
  }
);

export const getPageById = createAsyncThunk(
  "pages/getById",
  async (id) => {
    const response = await pageService.getPageById(id);
    return response.data;
  }
);

export const updatePage = createAsyncThunk(
  "pages/update",
  async ({ id, data }) => {
    const response = await pageService.updatePage(id, data);
    return response.data;
  }
);

export const deletePage = createAsyncThunk(
  "pages/delete",
  async (id) => {
    const response = await pageService.deletePage(id);
    return response.data;
  }
);

const pageSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Page
      .addCase(createPage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pages.push(action.payload);
        toast.success("Page created successfully");
      })
      .addCase(createPage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      // Get All Pages
      .addCase(getPages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pages = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getPages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      // Get Page By Id
      .addCase(getPageById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPageById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.pages.findIndex(page => page._id === action.payload._id);
        if (index !== -1) {
          state.pages[index] = action.payload;
        } else {
          state.pages.push(action.payload);
        }
      })
      .addCase(getPageById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      // Update Page
      .addCase(updatePage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.pages.findIndex(page => page._id === action.payload._id);
        if (index !== -1) {
          state.pages[index] = action.payload;
        }
        toast.success("Page updated successfully");
      })
      .addCase(updatePage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      // Delete Page
      .addCase(deletePage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pages = state.pages.filter(page => page._id !== action.payload._id);
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