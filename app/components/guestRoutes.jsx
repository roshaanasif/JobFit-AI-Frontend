"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function GuestRoute({ children }) {
  const router = useRouter();

  const {
    isAuthenticated,
    initialized,
    initialLoading,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (initialized && isAuthenticated) {
      router.replace("/home");
    }
  }, [initialized, isAuthenticated, router]);

  if (!initialized || initialLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return null;
  }

  return children;
}