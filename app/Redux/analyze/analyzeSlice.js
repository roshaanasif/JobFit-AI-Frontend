import { createSlice } from "@reduxjs/toolkit";

import {generatingAiResponse,singleReport} from "./analyzeThunk";

const initialState = {
  generatedReport:[],
  Reportsingle: [],
  analyzeLoading: false,
  analyzeError: null,
  singleReportLoading: false,
  singleReportError: null,
};

const analyzeSlice = createSlice({
  name: "analyze",

  initialState,

  reducers: {
    clearError: (state) => {
      state.analyzeError = null;
    },
  },


  extraReducers: (builder) => {
    builder
      .addCase(generatingAiResponse.pending, (state) => {
        state.analyzeLoading = true;
        state.analyzeError = null;
      })

      .addCase(generatingAiResponse.fulfilled, (state, action) => {
        state.analyzeLoading = false;
        state.analyzeError = null;
        state.generatedReport= action.payload;
      })

      .addCase(generatingAiResponse.rejected, (state, action) => {
        state.analyzeLoading = false;
        state.analyzeError = action.payload;
      })
      .addCase(singleReport.pending, (state) => {
        state.singleReportLoading = true;
        state.singleReportError = null;
      })

      .addCase(singleReport.fulfilled, (state, action) => {
        state.singleReportLoading = false;
        state.singleReportError = null;
        state.Reportsingle= action.payload?.report || [];
      })

      .addCase(singleReport.rejected, (state, action) => {
        state.singleReportLoading = false;
        state.singleReportError = action.payload || action.error.message;
      })
    
    }

})


export const {
  clearError,
} = analyzeSlice.actions;

export default analyzeSlice.reducer;