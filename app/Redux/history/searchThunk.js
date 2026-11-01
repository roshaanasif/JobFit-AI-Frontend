
import { createAsyncThunk } from "@reduxjs/toolkit";
import {searchOnHistoryApi } from "./searchServices";

export const searchOnHistory = createAsyncThunk(
  "history/searchOnHistory",
  async ({ search, page, limit, filter }, thunkAPI) => {
    try {
      return await searchOnHistoryApi({ search, page, limit, filter });

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Search history failed"
      );
    }
  }
);