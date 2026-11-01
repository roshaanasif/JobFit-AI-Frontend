import { createSlice } from "@reduxjs/toolkit";

import {recentUserReport,KpiUser} from "./dashboardThunk";

const initialState = {
  kpi:[],
  recentReports:[],
  dashboardLoading: false,
  error: null,
  pagination:{
    currentPage:1,
    pageLimit:10,
    totalPages:0,
    totalReports:0,
    hasNextPage:false,
    hasPrevPage:false,
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },


  extraReducers: (builder) => {
    builder
      .addCase(KpiUser.pending, (state) => {
        state.dashboardLoading = true;
        state.error = null;
      })

      .addCase(KpiUser.fulfilled, (state, action) => {
        state.dashboardLoading = false;
        state.error = null;
        state.kpi = action.payload;
      })

      .addCase(KpiUser.rejected, (state, action) => {
        state.dashboardLoading = false;
        state.error = action.payload;
      })

    
      
      .addCase(recentUserReport.pending, (state) => {
        state.dashboardLoading = true;
        state.error = null;
      })

      .addCase(recentUserReport.fulfilled, (state, action) => {
        state.dashboardLoading = false;
        state.error = null;
        state.recentReports = action.payload.reports;
        state.pagination = action.payload.pagination;
      })

      .addCase(recentUserReport.rejected, (state, action) => {
        state.dashboardLoading = false;
        state.error = action.payload;
        state.pagination = { ...initialState.pagination };
      })
    }
});

export const {
  clearError,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;