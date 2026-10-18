"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  const { isAuthenticated,initialized,initialLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (initialized && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated,initialized, router]);

  // useEffect(() => {
  //   if (initialized && isAuthenticated) {
  //     router.replace("/home");
  //   }
  // }, [initialized, isAuthenticated, router]);

  if (!initialized || initialLoading) {
    return(
        <div><h1>loading ....</h1></div>
    )
  }
  

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute;