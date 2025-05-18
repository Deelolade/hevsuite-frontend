import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import helpService from "./helpService";
import toast from "react-hot-toast";

const initialState = {
  helps: [],
  faqs: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
  pagination: {},
};

export const getAllHelps = createAsyncThunk(
  "help/get-all-helps",
  async (_, thunkAPI) => {
    try {
      return await helpService.getAllHelps();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createTopic = createAsyncThunk(
  "help/create-topic",
  async (data, thunkAPI) => {
    try {
      return await helpService.createTopic(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editTopic = createAsyncThunk(
  "help/topic",
  async (data, thunkAPI) => {
    try {
      return await helpService.editTopic(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteTopic = createAsyncThunk(
  "help/delete-topic",
  async (id, thunkAPI) => {
    try {
      return await helpService.deleteTopic(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const topicVisibility = createAsyncThunk(
  "help/topic-visibility",
  async (data, thunkAPI) => {
    try {
      return await helpService.topicVisibility(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const archiveTopic = createAsyncThunk(
  "help/archive-topic",
  async (data, thunkAPI) => {
    try {
      return await helpService.archiveTopic(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createQA = createAsyncThunk(
  "help/create-qa",
  async (data, thunkAPI) => {
    try {
      return await helpService.createQA(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editQA = createAsyncThunk(
  "help/edit-qa",
  async (data, thunkAPI) => {
    try {
      return await helpService.editQA(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteQA = createAsyncThunk(
  "help/delete-qa",
  async (data, thunkAPI) => {
    try {
      return await helpService.deleteQA(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const visibilityQA = createAsyncThunk(
  "help/visibility-qa",
  async (data, thunkAPI) => {
    try {
      return await helpService.visibilityQA(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllFAQs = createAsyncThunk(
  "help/get-all-faqs",
  async (data, thunkAPI) => {
    try {
      return await helpService.getAllFAQs(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createFAQs = createAsyncThunk(
  "help/create-faqs",
  async (data, thunkAPI) => {
    try {
      return await helpService.createFAQs(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editFAQs = createAsyncThunk(
  "help/faq",
  async (data, thunkAPI) => {
    try {
      return await helpService.editFAQs(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteFAQs = createAsyncThunk(
  "help/delete-faqs",
  async (id, thunkAPI) => {
    try {
      return await helpService.deleteFAQs(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const visibilityFAQs = createAsyncThunk(
  "help/visibility-faqs",
  async (data, thunkAPI) => {
    try {
      return await helpService.visibilityFAQs(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const helpSlice = createSlice({
  name: "help",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllHelps.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllHelps.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        state.helps = action.payload;
      })
      .addCase(getAllHelps.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createTopic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTopic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Topic created successfully";
        state.helps = [...state.helps, action.payload];
        toast.success(state.message);
      })
      .addCase(createTopic.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      .addCase(editTopic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTopic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Topic updated successfully";
        state.helps = state.helps.map((topic) =>
          topic._id === action.payload._id ? action.payload : topic
        );
        toast.success(state.message);
      })
      .addCase(editTopic.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      .addCase(deleteTopic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTopic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Topic deleted successfully";
        state.helps = state.helps.filter(
          (topic) => topic._id !== action.payload.id
        );
        toast.success(state.message);
      })
      .addCase(deleteTopic.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      .addCase(topicVisibility.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(topicVisibility.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Topic visibility updated successfully";
        state.helps = state.helps.map((topic) =>
          topic._id === action.payload._id ? action.payload : topic
        );
        toast.success(state.message);
      })
      .addCase(topicVisibility.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      .addCase(archiveTopic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(archiveTopic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Topic archived successfully";
        state.helps = state.helps.map((topic) =>
          topic._id === action.payload._id ? action.payload : topic
        );
        toast.success(state.message);
      })
      .addCase(archiveTopic.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      .addCase(createQA.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQA.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Q&A created successfully";
        // Update the topic with the new QA
        state.helps = state.helps.map((topic) =>
          topic._id === action.payload.topicId
            ? { ...topic, qas: [...topic.qas, action.payload] }
            : topic
        );
        toast.success(state.message);
      })
      .addCase(createQA.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      .addCase(editQA.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editQA.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Q&A updated successfully";
        // Update the QA within the topic
        state.helps = state.helps.map((topic) => {
          if (topic._id === action.payload.topicId) {
            return {
              ...topic,
              qas: topic.qas.map((qa) =>
                qa._id === action.payload._id ? action.payload : qa
              ),
            };
          }
          return topic;
        });
        toast.success(state.message);
      })
      .addCase(editQA.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      .addCase(deleteQA.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteQA.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Q&A deleted successfully";
        // Remove the QA from the topic
        state.helps = state.helps.map((topic) => {
          if (topic._id === action.payload.topicId) {
            return {
              ...topic,
              qas: topic.qas.filter((qa) => qa._id !== action.payload.id),
            };
          }
          return topic;
        });
        toast.success(state.message);
      })
      .addCase(deleteQA.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      .addCase(visibilityQA.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(visibilityQA.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Q&A visibility updated successfully";
        // Update the QA visibility within the topic
        state.helps = state.helps.map((topic) => {
          if (topic._id === action.payload.topicId) {
            return {
              ...topic,
              qas: topic.qas.map((qa) =>
                qa._id === action.payload._id ? action.payload : qa
              ),
            };
          }
          return topic;
        });
        toast.success(state.message);
      })
      .addCase(visibilityQA.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      .addCase(getAllFAQs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFAQs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        state.faqs = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllFAQs.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createFAQs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFAQs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "FAQ created successfully";
        state.faqs = [...state.faqs, action.payload];
        toast.success(state.message);
      })
      .addCase(createFAQs.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      .addCase(editFAQs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editFAQs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "FAQ updated successfully";
        state.faqs = state.faqs.map((faq) =>
          faq._id === action.payload._id ? action.payload : faq
        );
        toast.success(state.message);
      })
      .addCase(editFAQs.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      .addCase(deleteFAQs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFAQs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "FAQs deleted successfully";
        state.faqs = state.faqs.filter((faq) => faq._id !== action.payload.id);
        toast.success(state.message);
      })
      .addCase(deleteFAQs.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      .addCase(visibilityFAQs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(visibilityFAQs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "FAQ visibility updated successfully";
        state.faqs = state.faqs.map((faq) =>
          faq._id === action.payload._id ? action.payload : faq
        );
        toast.success(state.message);
      })
      .addCase(visibilityFAQs.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      });
  },
});

export const { reset } = helpSlice.actions;
export default helpSlice.reducer;
