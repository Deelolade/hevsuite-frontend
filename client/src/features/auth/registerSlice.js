import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

const initialState = {
  currentStep: 1,
  totalSteps: 7,
  formData: {
    step2: {
      title: '',
      forename: '',
      surname: '',
      gender: '',
      dob: '',
      nationality: '',
      additionalNationality: '',
      relationshipStatus: '',
    },
    step3: {
      addressLine1: '',
      city: '',
      country: '',
      postcode: '',
      primaryEmail: '',
      secondaryEmail: '',
      state: '',
      primaryPhone: '',
      primaryPhoneCode: '',
      secondaryPhone: '',
      secondaryPhoneCode: '',
    },
    step4: {
      employmentStatus: '',
      interests: [],
      otherClubMembership: '',
      preferredSocialMedia: '',
      marketingConsent: false,
    },
    step5: {
      proofOfId: null,
      picture: null,
      password: '',
      confirmPassword: '',
    },
  },
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.currentStep < state.totalSteps) {
        state.currentStep += 1;
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    updateStepData: (state, action) => {
      const { step, data } = action.payload;
      state.formData[step] = { ...state.formData[step], ...data };
    },
    reset: () => initialState,
  },
});

export const { nextStep, prevStep, updateStepData, reset } =
  registerSlice.actions;
export default registerSlice.reducer;
