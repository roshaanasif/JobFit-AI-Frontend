"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../../Redux/auth/authThunk";
import AuthLoadingScreen from "./authLoadingScreen";

export default function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  const { initialized, initialLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (!initialized || initialLoading) {
    return <AuthLoadingScreen />;
  }

  return children;
}