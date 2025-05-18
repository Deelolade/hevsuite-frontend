import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import socialMediaService from "./socialMediaService"
import { toast } from "react-toastify"

// Get all social media links
export const getAllSocialMedia = createAsyncThunk("social-media/getAllSocialMedia", async (_, { rejectWithValue }) => {
  try {
    return await socialMediaService.getAllSocialMedia()
  } catch (error) {
    return rejectWithValue(error)
  }
})

// Create new social media link
export const createSocialMedia = createAsyncThunk("social-media/createSocialMedia", async (formData, { rejectWithValue }) => {
  try {
    return await socialMediaService.createSocialMedia(formData)
  } catch (error) {
    return rejectWithValue(error)
  }
})

// Update social media link
export const updateSocialMedia = createAsyncThunk(
  "social-media/updateSocialMedia",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      return await socialMediaService.updateSocialMedia(id, formData)
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

// Delete social media link
export const deleteSocialMedia = createAsyncThunk("social-media/deleteSocialMedia", async (id, { rejectWithValue }) => {
  try {
    await socialMediaService.deleteSocialMedia(id)
    return id
  } catch (error) {
    return rejectWithValue(error)
  }
})

// Reorder social media links
export const reorderSocialMedia = createAsyncThunk("social-media/reorderSocialMedia", async (orderedIds, { rejectWithValue }) => {
  try {
    await socialMediaService.reorderSocialMedia(orderedIds)
    return orderedIds
  } catch (error) {
    return rejectWithValue(error)
  }
})

const initialState = {
  socialLinks: [],
  loading: false,
  error: null,
}

const socialMediaSlice = createSlice({
  name: "socialMedia",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    toggleVisibility: (state, action) => {
      const index = state.socialLinks.findIndex((link) => link._id === action.payload)
      if (index !== -1) {
        state.socialLinks[index].visibility = !state.socialLinks[index].visibility
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all social media links
      .addCase(getAllSocialMedia.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getAllSocialMedia.fulfilled, (state, action) => {
        state.loading = false
        state.socialLinks = action.payload
      })
      .addCase(getAllSocialMedia.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })
      // Create social media link
      .addCase(createSocialMedia.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createSocialMedia.fulfilled, (state, action) => {
        state.loading = false
        state.socialLinks.push(action.payload)
        toast.success("Social media link added successfully")
      })
      .addCase(createSocialMedia.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })
      // Update social media link
      .addCase(updateSocialMedia.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateSocialMedia.fulfilled, (state, action) => {
        state.loading = false
        const index = state.socialLinks.findIndex((link) => link._id === action.payload._id)
        if (index !== -1) {
          state.socialLinks[index] = action.payload
        }
        toast.success("Social media link updated successfully")
      })
      .addCase(updateSocialMedia.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })
      // Delete social media link
      .addCase(deleteSocialMedia.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteSocialMedia.fulfilled, (state, action) => {
        state.loading = false
        state.socialLinks = state.socialLinks.filter((link) => link._id !== action.payload)
        toast.success("Social media link removed successfully")
      })
      .addCase(deleteSocialMedia.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })
      // Reorder social media links
      .addCase(reorderSocialMedia.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(reorderSocialMedia.fulfilled, (state, action) => {
        state.loading = false
        
        // Create a new array to hold the reordered links
        const orderedLinks = []
        const orderedIds = action.payload
        
        // Reorder the links based on the orderedIds
        orderedIds.forEach(id => {
          const link = state.socialLinks.find(link => link._id === id)
          if (link) {
            // Update the index property to match the new order
            orderedLinks.push({
              ...link,
              index: orderedIds.indexOf(id)
            })
          }
        })
        // Replace the socialLinks array with the reordered array
        state.socialLinks = orderedLinks
        toast.success("Social media links reordered successfully")
      })
      .addCase(reorderSocialMedia.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })
  },
})

export const { clearError, toggleVisibility } = socialMediaSlice.actions
export default socialMediaSlice.reducer