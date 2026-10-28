import { createSlice } from "@reduxjs/toolkit";

import {generatingAiResponse} from "./analyzeThunk";

const initialState = {
  generatedReport:null,
  analyzeLoading: false,
  analyzeError: null,
};

const analyzeSlice = createSlice({
  name: "analyze",

  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },


  extraReducers: (builder) => {
    builder
      .addCase(generatingAiResponse.pending, (state) => {
        state.analyzeLoading = true;
        state.error = null;
      })

      .addCase(generatingAiResponse.fulfilled, (state, action) => {
        state.analyzeLoading = false;
        state.error = null;
        state.generatedReport= action.payload;
      })

      .addCase(generatingAiResponse.rejected, (state, action) => {
        state.analyzeLoading = false;
        state.error = action.payload;
      })
    
    }

})


export const {
  clearError,
} = analyzeSlice.actions;

export default analyzeSlice.reducer;