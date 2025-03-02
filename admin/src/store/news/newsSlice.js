import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import newsService from "./newsService";
import toast from "react-hot-toast";

const initialState = {
  news: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const getAllNews = createAsyncThunk(
  "news/get-all-news",
  async (data, thunkAPI) => {
    try {
      return await newsService.getAllNews(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createNews = createAsyncThunk(
  "news/create-news",
  async (data, thunkAPI) => {
    try {
      return await newsService.createNews(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editNews = createAsyncThunk(
  "news/edit-news",
  async (data, thunkAPI) => {
    try {
      return await newsService.editNews(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteNews = createAsyncThunk(
  "news/delete-news",
  async (id, thunkAPI) => {
    try {
      return await newsService.deleteNews(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        state.news = action.payload;
      })
      .addCase(getAllNews.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "News created successfully";
        state.news = [...state.news, action.payload];
        toast.success(state.message);
      })
      .addCase(createNews.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      .addCase(editNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "News updated successfully";
        state.news = state.news.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        toast.success(state.message);
      })
      .addCase(editNews.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      .addCase(deleteNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "News deleted successfully";
        state.news = state.news.filter((item) => item._id !== action.payload.id);
        toast.success(state.message);
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      });
  },
});

export default newsSlice.reducer;