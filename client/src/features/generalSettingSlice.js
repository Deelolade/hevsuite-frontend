// features/generalSettingsSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Settings from '../views/account/settings/Settings';

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${baseUrl}/api/general-settings`;
export const fetchGeneralSettings = createAsyncThunk(
  'generalSettings/fetch',
  async () => {
  const response = await axios.get(`${API_URL}`);
    return response.data;
  }
);

const generalSettingsSlice = createSlice({
  name: 'generalSettings',
  initialState: {
    Settings: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeneralSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGeneralSettings.fulfilled, (state, action) => {
        state.Settings = action.payload;
        state.loading = false;
      })
      .addCase(fetchGeneralSettings.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  }
});

export default generalSettingsSlice.reducer;