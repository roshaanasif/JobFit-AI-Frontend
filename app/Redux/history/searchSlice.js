import { createSlice } from "@reduxjs/toolkit";

import {searchOnHistory} from "./searchThunk";

const initialState = {
  searchReports:[],
  searchLoading: false,
  searchError: null,
  pagination:{
    currentPage:1,
    pageLimit:10,
    totalPages:0,
    totalReports:0,
    hasNextPage:false,
    hasPrevPage:false,
  },
};

const searchSlice = createSlice({
  name: "search",

  initialState,

  reducers: {
    clearError: (state) => {
      state.searchError = null;
    },
  },


  extraReducers: (builder) => {
    builder
      .addCase(searchOnHistory.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })

      .addCase(searchOnHistory.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchError = null;
        state.searchReports = action.payload.reports || [];
        state.pagination = action.payload.pagination;
      })

      .addCase(searchOnHistory.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload || action.error.message;
        state.searchReports = [];
        state.pagination = { ...initialState.pagination };
      })
    }
});

export const {
  clearError,
} = searchSlice.actions;

export default searchSlice.reducer;

