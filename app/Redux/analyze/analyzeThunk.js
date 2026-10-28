
import { createAsyncThunk } from "@reduxjs/toolkit";
import {generatingAiResponseApi } from "./analyzeServices";

export const generatingAiResponse = createAsyncThunk(
  "analyze/report generation",
  async (formData, thunkAPI) => {
    try {
      return await generatingAiResponseApi(formData);
      
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "report generation failed"
      );
    }
  }
);