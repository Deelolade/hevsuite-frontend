import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import financeService from "./financeService"
import toast from "react-hot-toast"
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_BASE_URL

const initialState = {
  paymentMethods: [],
  transactions: {
    data: [],
    totalPages: 0,
    currentPage: 1,
    totalItems: 0,
  },
  transactionDetails: null,
  pricingFees: [],
  financialSummary: {
    revenue: 0,
    expenses: 0,
    profit: 0,
    membershipRevenue: 0,
    eventRevenue: 0,
    monthlyData: [],
  },
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
}

// Payment Methods
export const getPaymentMethods = createAsyncThunk("finance/get-payment-methods", async (_, thunkAPI) => {
  try {
    return await financeService.getPaymentMethods()
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to fetch payment methods"
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})

export const addPaymentMethod = createAsyncThunk("finance/add-payment-method", async (data, thunkAPI) => {
  try {
    return await financeService.addPaymentMethod(data)
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to add payment method"
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})

export const updatePaymentMethod = createAsyncThunk(
  "finance/update-payment-method",
  async ({ provider, formData }, thunkAPI) => {
    try {
      return await financeService.updatePaymentMethod(provider, formData)
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to update payment method"
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const removePaymentMethod = createAsyncThunk("finance/remove-payment-method", async (provider, thunkAPI) => {
  try {
    return await financeService.removePaymentMethod(provider)
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to remove payment method"
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})

// Transactions
export const getTransactions = createAsyncThunk("finance/get-transactions", async (params, thunkAPI) => {
  try {
    return await financeService.getTransactions(params)
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to fetch transactions"
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})

export const getTransactionDetails = createAsyncThunk("finance/get-transaction-details", async (id, thunkAPI) => {
  try {
    return await financeService.getTransactionDetails(id)
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to fetch transaction details"
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})

export const updateTransactionStatus = createAsyncThunk("finance/update-transaction-status", async (data, thunkAPI) => {
  try {
    return await financeService.updateTransactionStatus(data)
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to update transaction status"
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})

// Pricing
export const getPricingFees = createAsyncThunk(
  'finance/getPricingFees',
  async (_, { rejectWithValue }) => {
  try {
      const response = await axios.get(`${API_URL}/api/pricing`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch pricing fees')
    }
  }
)

export const updatePricingFee = createAsyncThunk(
  'finance/updatePricingFee',
  async ({ id, feeData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/api/pricing/${id}`, feeData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update pricing fee')
    }
  }
)

export const addPricingFee = createAsyncThunk(
  'finance/addPricingFee',
  async (feeData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/pricing`, feeData)
      return response.data
  } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add pricing fee')
    }
  }
)

export const deletePricingFee = createAsyncThunk(
  'finance/deletePricingFee',
  async (id, { rejectWithValue }) => {
  try {
      await axios.delete(`${API_URL}/api/pricing/${id}`)
      return id
  } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete pricing fee')
    }
  }
)

// Financial Summary
export const getFinancialSummary = createAsyncThunk("finance/get-financial-summary", async (period, thunkAPI) => {
  try {
    return await financeService.getFinancialSummary(period)
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to fetch financial summary"
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})

export const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Payment Methods
      .addCase(getPaymentMethods.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPaymentMethods.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.paymentMethods = action.payload
      })
      .addCase(getPaymentMethods.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addPaymentMethod.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addPaymentMethod.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.paymentMethods.push(action.payload)
        toast.success("Payment method added successfully")
      })
      .addCase(addPaymentMethod.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updatePaymentMethod.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatePaymentMethod.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.paymentMethods = state.paymentMethods.map((method) =>
          method._id === action.payload._id ? action.payload : method,
        )
        toast.success("Payment method updated successfully")
      })
      .addCase(updatePaymentMethod.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(removePaymentMethod.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removePaymentMethod.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.paymentMethods = state.paymentMethods.filter((method) => method.provider !== action.meta.arg)
        toast.success("Payment method removed successfully")
      })
      .addCase(removePaymentMethod.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // Transactions
      .addCase(getTransactions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.transactions = action.payload
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getTransactionDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTransactionDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.transactionDetails = action.payload
      })
      .addCase(getTransactionDetails.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateTransactionStatus.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateTransactionStatus.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.transactions.data = state.transactions.data.map((transaction) =>
          transaction._id === action.payload._id ? action.payload : transaction,
        )
        toast.success("Transaction status updated successfully")
      })
      .addCase(updateTransactionStatus.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // Pricing
      .addCase(getPricingFees.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getPricingFees.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.pricingFees = action.payload
      })
      .addCase(getPricingFees.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(updatePricingFee.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updatePricingFee.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        const index = state.pricingFees.findIndex(fee => fee._id === action.payload._id)
        if (index !== -1) {
          state.pricingFees[index] = action.payload
        }
      })
      .addCase(updatePricingFee.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(addPricingFee.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(addPricingFee.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.pricingFees.push(action.payload)
        toast.success("Pricing fee added successfully")
      })
      .addCase(addPricingFee.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(deletePricingFee.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deletePricingFee.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.pricingFees = state.pricingFees.filter(fee => fee._id !== action.payload)
        toast.success("Pricing fee deleted successfully")
      })
      .addCase(deletePricingFee.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Financial Summary
      .addCase(getFinancialSummary.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getFinancialSummary.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.financialSummary = action.payload
      })
      .addCase(getFinancialSummary.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { clearError } = financeSlice.actions
export default financeSlice.reducer
