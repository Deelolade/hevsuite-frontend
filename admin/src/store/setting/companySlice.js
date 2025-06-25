import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import companyService from "./companyService";
import { toast } from "react-toastify";

export const getCompanyInfo = createAsyncThunk("company/getCompanyInfo", async (_, { rejectWithValue }) => {
  try {
    return await companyService.getCompanyInfo();
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const updateCompanyInfo = createAsyncThunk(
  "company/updateCompanyInfo",
  async (data, { rejectWithValue }) => {
    try {
      return await companyService.updateCompanyInfo(data);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  company: {
    name: "",
    addressLine1: "",
    city: "",
    country: "",
    countryId: "",
    state: "",
    stateId: "",
    postcode: "",
    email: "",
    phone: "",
    phoneCode: "",
    website: "",
  },
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    resetCompanyState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCompanyInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompanyInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.company = action.payload;
      })
      .addCase(getCompanyInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateCompanyInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCompanyInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.company = action.payload;
        toast.success("Company info updated successfully");
      })
      .addCase(updateCompanyInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { resetCompanyState } = companySlice.actions;
export default companySlice.reducer; 