import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import newsService from "./newsService";
import { toast } from "react-toastify";

const initialState = {
  news: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

// Get all news
export const getAllNews = createAsyncThunk(
  "news/getAll",
  async (params = {}, thunkAPI) => {
    try {
      return await newsService.getAllNews(params);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create news
export const createNews = createAsyncThunk(
  "news/create",
  async (formData, thunkAPI) => {
    try {
      return await newsService.createNews(formData);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update news
export const updateNews = createAsyncThunk(
  "news/update",
  async ({ id, newsData }, thunkAPI) => {
    try {
      return await newsService.updateNews(id, newsData);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete news
export const deleteNews = createAsyncThunk(
  "news/delete",
  async (id, thunkAPI) => {
    try {
      return await newsService.deleteNews(id);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Restore news
export const restoreNews = createAsyncThunk(
  "news/restore",
  async (id, thunkAPI) => {
    try {
      return await newsService.restoreNews(id);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Post news via email
export const postNewsViaEmail = createAsyncThunk(
  "news/postViaEmail",
  async (data, thunkAPI) => {
    try {
      return await newsService.postNewsViaEmail(data);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const newsSlice = createSlice({
  name: "news",
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
      // Get all news
      .addCase(getAllNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.news = action.payload;
      })
      .addCase(getAllNews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Create news
      .addCase(createNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.news.push(action.payload);
        toast.success("News created successfully");
      })
      .addCase(createNews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // Update news
      .addCase(updateNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.news = state.news.map((news) =>
          news._id === action.payload._id ? action.payload : news
        );
        toast.success("News updated successfully");
      })
      .addCase(updateNews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // Delete news
      .addCase(deleteNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.news = state.news.filter((news) => news._id !== action.payload.id);
        toast.success("News deleted successfully");
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // Restore news
      .addCase(restoreNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(restoreNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.news.push(action.payload);
        toast.success("News restored successfully");
      })
      .addCase(restoreNews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // Post news via email
      .addCase(postNewsViaEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postNewsViaEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(postNewsViaEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }, 
});

export const { reset } = newsSlice.actions;
export default newsSlice.reducer;