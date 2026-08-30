import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // If initial load in progress and no user in memory, check localStorage cache
  const hasCachedUser = (() => {
    try {
      const cached = JSON.parse(localStorage.getItem("dll_user"));
      return !!(cached && cached.isLoggedIn);
    } catch (e) {
      return false;
    }
  })();

  if (loading && !user?.isLoggedIn && !hasCachedUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9] dark:bg-[#0C0A09]">
        <div className="w-8 h-8 border-4 border-[#059669] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user?.isLoggedIn && !hasCachedUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
