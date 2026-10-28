import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/auth/authSlice";
import dashboardReducer from "../Redux/dashboard/dashboardSlice";
import analyzeReducer from "../Redux/analyze/analyzeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard:dashboardReducer,
    analyze: analyzeReducer,
  },
});