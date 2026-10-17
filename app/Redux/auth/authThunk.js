
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserApi,registerUserApi } from "./authService";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      return await loginUserApi({ email, password });
      
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password,name}, thunkAPI) => {
    try {
      return await registerUserApi({ email, password,name });

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);