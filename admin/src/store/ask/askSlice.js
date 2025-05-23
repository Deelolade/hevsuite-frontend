import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import askService from "./askService"
import toast from "react-hot-toast"

const initialState = {
  asks: [],
  reports: [],
  top_asks: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
}

export const getAllAsks = createAsyncThunk("asks/all-asks", async (data, thunkAPI) => {
  try {
    return await askService.getAllAsks(data)
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to fetch asks"
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteAsk = createAsyncThunk("asks/delete-ask", async (data, thunkAPI) => {
  try {
    return await askService.deleteAsk(data)
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to delete ask"
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})

export const getAllReports = createAsyncThunk("asks/all-reports", async (_, thunkAPI) => {
  try {
    return await askService.getAllReports()
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to fetch reports"
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})

export const getTopAsks = createAsyncThunk("asks/top-asks", async (_, thunkAPI) => {
  try {
    return await askService.getTopAsks()
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to fetch top askers"
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteReport = createAsyncThunk("asks/delete-report", async (data, thunkAPI) => {
  try {
    return await askService.deleteReport(data)
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to delete report"
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})

export const promoteAsks = createAsyncThunk("asks/promote-asks", async (data, thunkAPI) => {
  try {
    return await askService.promoteAsks(data)
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to promote user"
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})

export const banAsk = createAsyncThunk("asks/ban-ask", async (data, thunkAPI) => {
  try {
    return await askService.banAsk(data)
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to ban user"
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})

export const askSlice = createSlice({
  name: "ask", // Changed from "asks" to "ask" to match the store configuration
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All Asks
      .addCase(getAllAsks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllAsks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.asks = action.payload
      })
      .addCase(getAllAsks.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })

      // Delete Ask
      .addCase(deleteAsk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteAsk.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.asks = state.asks.filter((ask) => ask._id !== action.payload.id)
        toast.success("Ask deleted successfully")
      })
      .addCase(deleteAsk.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })

      // Get All Reports
      .addCase(getAllReports.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllReports.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.reports = action.payload
      })
      .addCase(getAllReports.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })

      // Get Top Asks
      .addCase(getTopAsks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTopAsks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.top_asks = action.payload
      })
      .addCase(getTopAsks.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })

      // Delete Report
      .addCase(deleteReport.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.reports = state.reports.filter((report) => report._id !== action.payload.id)
        toast.success("Report deleted successfully")
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })

      // Promote Asks
      .addCase(promoteAsks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(promoteAsks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.top_asks = state.top_asks.map((user) =>
          user._id === action.payload.id ? { ...user, memberStatus: action.payload.memberStatus } : user,
        )
        toast.success("User promoted successfully")
      })
      .addCase(promoteAsks.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })

      // Ban Ask
      .addCase(banAsk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(banAsk.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.asks = state.asks.map((ask) => (ask._id === action.payload.id ? { ...ask, isBanned: true } : ask))
        toast.success("User banned successfully")
      })
      .addCase(banAsk.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export default askSlice.reducer
