import React from "react";
import { Navigate, Link } from "react-router-dom";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading && !user.isLoggedIn) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin = 
    user.role === "admin" || 
    (user.email && user.email.toLowerCase().trim() === "admin@digitallife.com");

  if (!isAdmin) {
    return (
      <div className="p-8 max-w-lg mx-auto my-12 rounded-3xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700 text-center space-y-4 shadow-xl">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-600 flex items-center justify-center">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">Administrator Access Required</h3>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          This area is strictly restricted to platform administrators ({user.email}).
        </p>
        <div className="pt-2 flex justify-center space-x-3">
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-200 transition"
          >
            Return to User Workspace
          </Link>
          <Link
            to="/"
            className="px-4 py-2 rounded-xl bg-[#059669] text-white text-xs font-bold shadow-md hover:bg-[#047857] transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return children;
};
