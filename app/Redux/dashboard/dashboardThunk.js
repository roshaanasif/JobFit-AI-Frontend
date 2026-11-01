
import { createAsyncThunk } from "@reduxjs/toolkit";
import {recentUserReportApi,KpiUserApi } from "./dashboardServices";

export const KpiUser = createAsyncThunk(
  "dashboard/KpiUser",
  async (_, thunkAPI) => {
    try {
      return await KpiUserApi();
      
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "UserKPI failed"
      );
    }
  }
);

export const recentUserReport  = createAsyncThunk(
  "dashboard/recentUserReport",
  async ({id ,recent,page,limit}, thunkAPI) => {
    try {
      return await recentUserReportApi({ id, recent ,page ,limit });

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Fetching Recent Reports failed"
      );
    }
  }
);

