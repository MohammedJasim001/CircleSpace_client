// components/ProtectedRoute.tsx
"use client";

import useAuth from "@/hooks/useProtectRoute";
import Loading from "../../app/loading";


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoading = useAuth();

  // If still loading, show the loading spinner
  if (isLoading) {
    return <Loading />;
  }

  // If the user is authenticated, render the children
  return <>{children}</>;
};

export default ProtectedRoute;