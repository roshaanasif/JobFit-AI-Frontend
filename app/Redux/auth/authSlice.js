import { createSlice } from "@reduxjs/toolkit";

import {loginUser,registerUser,checkAuth} from "./authThunk";

const initialState = {
  user: null,
  isAuthenticated: false,
  initialized:false,
  initialLoading:false,
  initialError:false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.initialized = false;
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

        state.user = action.payload.user;
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
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(checkAuth.pending, (state) => {
        state.initialLoading = true;
        state.initialError = null;
      })

      .addCase(checkAuth.fulfilled, (state, action) => {
        state.initialError = null;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.initialized = true;
        state.initialLoading = false;
      })

      .addCase(checkAuth.rejected, (state, action) => {
        state.initialLoading = false;
        state.initialError = action.payload;
        state.initialized=true
      });
  },
});

export const {
  logout,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;