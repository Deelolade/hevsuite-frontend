import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import settingService from "./settingService"
import { toast } from "react-toastify"

// Get all settings
export const getSettings = createAsyncThunk("settings/getSettings", async (_, { rejectWithValue }) => {
  try {
    return await settingService.getSettings()
  } catch (error) {
    return rejectWithValue(error)
  }
})

// Update general settings
export const updateGeneralSettings = createAsyncThunk(
  "settings/updateGeneralSettings",
  async (data, { rejectWithValue }) => {
    try {
      return await settingService.updateGeneralSettings(data)
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

const initialState = {
  settings: {
    general: null,
  },
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
}

const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    resetSettingsState: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder
      // Get settings
      .addCase(getSettings.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSettings.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // Store the API response directly in settings.general
        state.settings = {
          general: action.payload,
        }
      })
      .addCase(getSettings.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      // Update general settings
      .addCase(updateGeneralSettings.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateGeneralSettings.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // Store the API response directly in settings.general
        state.settings.general = action.payload
      })
      .addCase(updateGeneralSettings.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
  },
})

export const { resetSettingsState } = settingSlice.actions
export default settingSlice.reducer
