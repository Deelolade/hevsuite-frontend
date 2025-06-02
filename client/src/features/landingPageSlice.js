// landingPageSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// services/activityService.js
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${baseUrl}/api/cms/landing-pages`;

export const fetchLandingPageData = createAsyncThunk(
  'landingPage/fetchData',
  async () => {
    const response = await axios.get(`${API_URL}`);
    console.log('Landing Page Data:', response);
    return response.data;
  }
);

const landingPageSlice = createSlice({
  name: 'landingPage',
  initialState: {
    landingPages: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLandingPageData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLandingPageData.fulfilled, (state, action) => {
        state.landingPages = action.payload;
        state.loading = false;
      })
      .addCase(fetchLandingPageData.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
  }
});

export default landingPageSlice.reducer;