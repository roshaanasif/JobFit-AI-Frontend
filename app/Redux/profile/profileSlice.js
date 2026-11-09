import { createSlice } from "@reduxjs/toolkit";

import {updateProfile,addProfilePicture,deleteProfilePicture} from "./profileThunk";

const initialState = {
  profile:null,
  profileLoading: false,
  profilePictureLoading: false,
  deleteProfilePictureLoading: false,
  deleteProfilePictureError: null,
  profileError: null,
};

const getUpdatedProfile = (payload) =>
  payload?.user || payload?.updatedProfile || payload;

const profileSlice = createSlice({
  name: "profile",

  initialState,

  reducers: {
    clearError: (state) => {
      state.profileError = null;
    },
  },


  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profileError = null;
        state.profile = getUpdatedProfile(action.payload);
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload || action.error.message;
      })
      .addCase(addProfilePicture.pending, (state) => {
        state.profilePictureLoading = true;
        state.profilePictureError = null;
      })

      .addCase(addProfilePicture.fulfilled, (state, action) => {
        state.profilePictureLoading = false;
        state.profilePictureError = null;
        state.profile = getUpdatedProfile(action.payload);
      })

      .addCase(addProfilePicture.rejected, (state, action) => {
        state.profilePictureLoading = false;
        state.profilePictureError = action.payload || action.error.message;
      })
      .addCase(deleteProfilePicture.pending, (state) => {
        state.deleteProfilePictureLoading = true;
        state.deleteProfilePictureError = null;
      })

      .addCase(deleteProfilePicture.fulfilled, (state, action) => {
        state.deleteProfilePictureLoading = false;
        state.deleteProfilePictureError = null;
        state.profile = getUpdatedProfile(action.payload);
      })

      .addCase(deleteProfilePicture.rejected, (state, action) => {
        state.deleteProfilePictureLoading = false;
        state.deleteProfilePictureError = action.payload || action.error.message;
      })
      
    }
});

export const {
  clearError,
} = profileSlice.actions;

export default profileSlice.reducer;
