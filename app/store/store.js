import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/auth/authSlice";
import dashboardReducer from "../Redux/dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard:dashboardReducer,
  },
});