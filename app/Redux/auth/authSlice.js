import { createSlice } from "@reduxjs/toolkit";

import {loginUser,registerUser,checkAuth,logoutUser} from "./authThunk";
import {updateProfile,addProfilePicture,deleteProfilePicture} from "../profile/profileThunk";

const initialState = {
  user: null,
  isAuthenticated: false,
  accessToken:null,  
  initialized:false,
  initialLoading:false,
  initialError:false,
  loading: false,
  error: null,
};

const getUpdatedProfile = (payload) =>
  payload?.user || payload?.updatedProfile || payload;

const normalizeUser = (user) =>
  user
    ? {
        ...user,
        _id: user._id || user.id,
        name: user.name || user.username,
      }
    : user;

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setAccessToken: (state, action) => {
    state.accessToken = action.payload;
  },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.initialized = false;
      state.accessToken = null;
      state.loading = false;
      state.error = null;
    },

    clearError: (state) => {
      state.error = null;
    },
  },


  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.accessToken = action.payload.token;
        state.user = normalizeUser(action.payload.user);
        state.isAuthenticated = true;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    
      
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = normalizeUser(action.payload.user);
        state.isAuthenticated = true;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(checkAuth.pending, (state) => {
        state.initialLoading = true;
        state.initialError = null;
      })

      .addCase(checkAuth.fulfilled, (state, action) => {
        state.initialError = null;
        state.user = normalizeUser(action.payload.user);
        state.isAuthenticated = true;
        state.initialized = true;
        state.initialLoading = false;
      })

      .addCase(checkAuth.rejected, (state, action) => {
        state.initialLoading = false;
        state.initialError = action.payload;
        state.initialized=true
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = normalizeUser(getUpdatedProfile(action.payload));
      })
      .addCase(addProfilePicture.fulfilled, (state, action) => {
        state.user = normalizeUser(getUpdatedProfile(action.payload));
      })
      .addCase(deleteProfilePicture.fulfilled, (state, action) => {
        state.user = normalizeUser(getUpdatedProfile(action.payload));
      });
  },
});

export const {
  logout,
  clearError,
  setAccessToken,
} = authSlice.actions;

export default authSlice.reducer;