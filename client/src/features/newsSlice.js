// features/news/newsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Update with your actual backend URL
const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/news`;

export const fetchNonExpiredNews = createAsyncThunk(
  'news/fetchNonExpiredNews',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch news');
    }
  }
);
export const fetchNewsById = createAsyncThunk(
  'news/fetchNewsById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch news');
    }
  }
);
const newsSlice = createSlice({
  name: 'news',
  initialState: {
    newsItems: [],
    loading: false,
    error: null,
    selectedNews: null, // ✅ Add this line
  },
  reducers: {
    setSelectedNews: (state, action) => {
      state.selectedNews = action.payload;
    },
    clearSelectedNews: (state) => {
      state.selectedNews = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNonExpiredNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNonExpiredNews.fulfilled, (state, action) => {
        state.newsItems = action.payload;
        state.loading = false;
      })
      .addCase(fetchNonExpiredNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(fetchNewsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsById.fulfilled, (state, action) => {
        state.selectedNews = action.payload;
        state.loading = false;
      })
      .addCase(fetchNewsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
        state.selectedNews = null;
      });
  },
});

export const { setSelectedNews, clearSelectedNews } = newsSlice.actions;
export default newsSlice.reducer;
