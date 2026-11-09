import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/auth/authSlice";
import dashboardReducer from "../Redux/dashboard/dashboardSlice";
import analyzeReducer from "../Redux/analyze/analyzeSlice";
import searchReducer from "../Redux/history/searchSlice";
import profileReducer from "../Redux/profile/profileSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard:dashboardReducer,
    analyze: analyzeReducer,
    search: searchReducer,
    profile: profileReducer,
  },
});