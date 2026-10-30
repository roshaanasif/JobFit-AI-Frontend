
import { createAsyncThunk } from "@reduxjs/toolkit";
import {generatingAiResponseApi,singleReportApi } from "./analyzeServices";

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

export const singleReport = createAsyncThunk(
  "analyze/single report",
  async ({ id }, thunkAPI) => {
    try {
       return await singleReportApi({ id });
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "report fetching failed"
      );
    }
  }
);