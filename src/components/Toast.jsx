import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const Toast = () => {
  const { toastMessage } = useAuth();

  if (!toastMessage) return null;

  const { message, type } = toastMessage;

  const typeStyles = {
    error: {
      bg: "bg-white dark:bg-[#1C1917]",
      border: "border-red-500/30 dark:border-red-500/40",
      text: "text-red-800 dark:text-red-300",
      iconColor: "text-red-500",
      pill: "bg-red-50 dark:bg-red-950/40"
    },
    info: {
      bg: "bg-white dark:bg-[#1C1917]",
      border: "border-teal-500/30 dark:border-teal-500/40",
      text: "text-teal-800 dark:text-teal-300",
      iconColor: "text-teal-500",
      pill: "bg-teal-50 dark:bg-teal-950/40"
    },
    success: {
      bg: "bg-white dark:bg-[#1C1917]",
      border: "border-emerald-500/30 dark:border-emerald-500/40",
      text: "text-emerald-900 dark:text-emerald-200",
      iconColor: "text-[#059669] dark:text-[#34D399]",
      pill: "bg-emerald-50 dark:bg-emerald-950/40"
    }
  };

  const currentStyle = typeStyles[type] || typeStyles.success;
  const Icon = type === "error" ? AlertCircle : type === "info" ? Info : CheckCircle2;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none w-full max-w-md px-4 flex justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={toastMessage.id || message}
          initial={{ opacity: 0, y: -24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.94 }}
          transition={{ type: "spring", stiffness: 450, damping: 28 }}
          className={`pointer-events-auto px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-xl border ${currentStyle.border} ${currentStyle.bg} ${currentStyle.text} flex items-center space-x-3 max-w-sm sm:max-w-md w-auto`}
        >
          <div className={`p-1.5 rounded-xl ${currentStyle.pill} ${currentStyle.iconColor} flex-shrink-0`}>
            <Icon className="w-4 h-4" />
          </div>
          <div className="text-xs sm:text-sm font-semibold tracking-tight leading-snug pr-1">
            {message}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
