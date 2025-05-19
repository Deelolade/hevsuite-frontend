// features/footerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const fetchFooterData = createAsyncThunk(
  'footer/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const [footerRes, socialMediaRes] = await Promise.all([
        axios.get(`${baseUrl}/api/cms/footer`),
        axios.get(`${baseUrl}/api/social-media`)
      ]);
      return {
        footerData: footerRes.data,
        socialMedia: socialMediaRes.data
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  footerData: [],
  socialMedia: [],
  loading: false,
  error: null
};

const footerSlice = createSlice({
  name: 'footer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFooterData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFooterData.fulfilled, (state, action) => {
        state.footerData = action.payload.footerData;
        state.socialMedia = action.payload.socialMedia;
        state.loading = false;
      })
      .addCase(fetchFooterData.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export default footerSlice.reducer;