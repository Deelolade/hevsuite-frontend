import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cmsService from "./cmsService";
import toast from "react-hot-toast";

const initialState = {
  cms: [],
  menus: [],
  footers: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const getAllCMS = createAsyncThunk(
  "cms/get-all-cms",
  async (data, thunkAPI) => {
    try {
      return await cmsService.getAllCMS(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editCMS = createAsyncThunk(
  "cms/edit-cms",
  async (data, thunkAPI) => {
    try {
      return await cmsService.editCMS(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeCMS = createAsyncThunk(
  "cms/remove-cms",
  async (data, thunkAPI) => {
    try {
      return await cmsService.removeCMS(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const changeVisiblity = createAsyncThunk(
  "cms/change-visiblity",
  async (data, thunkAPI) => {
    try {
      return await cmsService.changeVisiblity(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllMenus = createAsyncThunk(
  "cms/get-all-menus",
  async (data, thunkAPI) => {
    try {
      return await cmsService.getAllMenus(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editMenus = createAsyncThunk(
  "cms/edit-menus",
  async (data, thunkAPI) => {
    try {
      return await cmsService.editMenus(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeMenus = createAsyncThunk(
  "cms/remove-menus",
  async (data, thunkAPI) => {
    try {
      return await cmsService.removeMenus(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const changeMenuVisiblity = createAsyncThunk(
  "cms/change-menu-visiblity",
  async (data, thunkAPI) => {
    try {
      return await cmsService.changeMenuVisiblity(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addNewMenu = createAsyncThunk(
  "cms/add-new-menu",
  async (data, thunkAPI) => {
    try {
      return await cmsService.addNewMenu(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllFooters = createAsyncThunk(
  "cms/get-all-footers",
  async (data, thunkAPI) => {
    try {
      return await cmsService.getAllFooters(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editFooter = createAsyncThunk(
  "cms/edit-footer",
  async (data, thunkAPI) => {
    try {
      return await cmsService.editFooter(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeFooter = createAsyncThunk(
  "cms/remove-footer",
  async (data, thunkAPI) => {
    try {
      return await cmsService.removeFooter(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const changeFooterVisiblity = createAsyncThunk(
  "cms/change-footer-visiblity",
  async (data, thunkAPI) => {
    try {
      return await cmsService.changeFooterVisiblity(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addNewFooter = createAsyncThunk(
  "cms/add-new-footer",
  async (data, thunkAPI) => {
    try {
      return await cmsService.addNewFooter(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const uploadWebsiteLogo = createAsyncThunk(
  "cms/upload-website-logo",
  async (data, thunkAPI) => {
    try {
      return await cmsService.uploadWebsiteLogo(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const uploadAdminLogo = createAsyncThunk(
  "cms/upload-admin-logo",
  async (data, thunkAPI) => {
    try {
      return await cmsService.uploadAdminLogo(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const uploadFavIcon = createAsyncThunk(
  "cms/upload-fav-icon",
  async (data, thunkAPI) => {
    try {
      return await cmsService.uploadFavIcon(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const uploadFooterIcon = createAsyncThunk(
  "cms/upload-footer-icon",
  async (data, thunkAPI) => {
    try {
      return await cmsService.uploadFooterIcon(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const cmsSlice = createSlice({
  name: "cms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getAllCMS
      .addCase(getAllCMS.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCMS.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        state.cms = action.payload;
      })
      .addCase(getAllCMS.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      // editCMS
      .addCase(editCMS.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCMS.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "CMS updated successfully";
        state.cms = state.cms.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        toast.success(state.message);
      })
      .addCase(editCMS.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      // removeCMS
      .addCase(removeCMS.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCMS.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "CMS removed successfully";
        state.cms = state.cms.filter((item) => item._id !== action.payload.id);
        toast.success(state.message);
      })
      .addCase(removeCMS.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      // changeVisiblity
      .addCase(changeVisiblity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeVisiblity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Visibility changed successfully";
        state.cms = state.cms.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        toast.success(state.message);
      })
      .addCase(changeVisiblity.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      // getAllMenus
      .addCase(getAllMenus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMenus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        state.menus = action.payload;
      })
      .addCase(getAllMenus.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      // editMenus
      .addCase(editMenus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editMenus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Menu updated successfully";
        state.menus = state.menus.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        toast.success(state.message);
      })
      .addCase(editMenus.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      // removeMenus
      .addCase(removeMenus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeMenus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Menu removed successfully";
        state.menus = state.menus.filter(
          (item) => item._id !== action.payload.id
        );
        toast.success(state.message);
      })
      .addCase(removeMenus.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      // changeMenuVisiblity
      .addCase(changeMenuVisiblity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeMenuVisiblity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Menu visibility changed successfully";
        state.menus = state.menus.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        toast.success(state.message);
      })
      .addCase(changeMenuVisiblity.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      // addNewMenu
      .addCase(addNewMenu.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "New menu added successfully";
        state.menus = [...state.menus, action.payload];
        toast.success(state.message);
      })
      .addCase(addNewMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      // getAllFooters
      .addCase(getAllFooters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFooters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        state.footers = action.payload;
      })
      .addCase(getAllFooters.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      // editFooter
      .addCase(editFooter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editFooter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Footer updated successfully";
        state.footers = state.footers.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        toast.success(state.message);
      })
      .addCase(editFooter.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      // removeFooter
      .addCase(removeFooter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFooter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Footer removed successfully";
        state.footers = state.footers.filter(
          (item) => item._id !== action.payload.id
        );
        toast.success(state.message);
      })
      .addCase(removeFooter.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      // changeFooterVisiblity
      .addCase(changeFooterVisiblity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeFooterVisiblity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Footer visibility changed successfully";
        state.footers = state.footers.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        toast.success(state.message);
      })
      .addCase(changeFooterVisiblity.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      // addNewFooter
      .addCase(addNewFooter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewFooter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "New footer added successfully";
        state.footers = [...state.footers, action.payload];
        toast.success(state.message);
      })
      .addCase(addNewFooter.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      // uploadWebsiteLogo
      .addCase(uploadWebsiteLogo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadWebsiteLogo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Website logo uploaded successfully";
        toast.success(state.message);
      })
      .addCase(uploadWebsiteLogo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      // uploadAdminLogo
      .addCase(uploadAdminLogo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadAdminLogo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Admin logo uploaded successfully";
        toast.success(state.message);
      })
      .addCase(uploadAdminLogo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      // uploadFavIcon
      .addCase(uploadFavIcon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadFavIcon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Favicon uploaded successfully";
        toast.success(state.message);
      })
      .addCase(uploadFavIcon.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      // uploadFooterIcon
      .addCase(uploadFooterIcon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadFooterIcon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Footer icon uploaded successfully";
        toast.success(state.message);
      })
      .addCase(uploadFooterIcon.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      });
  },
});

export default cmsSlice.reducer;
