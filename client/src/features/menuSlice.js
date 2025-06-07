
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${baseUrl}/api/cms/menus`;

export const fetchMenusData = createAsyncThunk(
  'menus/fetchData',
  async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  }
);

const menusSlice = createSlice({
  name: 'menus',
  initialState: {
    menus: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenusData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMenusData.fulfilled, (state, action) => {
        state.menus = action.payload;
        state.loading = false;
      })
      .addCase(fetchMenusData.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
  }
});

export default menusSlice.reducer;