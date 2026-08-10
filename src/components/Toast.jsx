import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Toast = () => {
  const { toastMessage } = useAuth();

  if (!toastMessage) return null;

  const { message, type } = toastMessage;

  const borderClass =
    type === 'error'
      ? 'border-l-4 border-red-500 bg-white dark:bg-dark-bgCard text-red-700 dark:text-red-400'
      : type === 'info'
      ? 'border-l-4 border-teal-500 bg-white dark:bg-dark-bgCard text-teal-800 dark:text-teal-300'
      : 'border-l-4 border-[#059669] bg-white dark:bg-dark-bgCard text-emerald-800 dark:text-emerald-300';

  const Icon =
    type === 'error' ? AlertCircle : type === 'info' ? Info : CheckCircle2;

  return (
    <div className="fixed top-5 right-5 z-[9999] pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`pointer-events-auto p-4 rounded-xl shadow-xl border border-stone-200 dark:border-stone-800 flex items-start space-x-3 ${borderClass}`}
        >
          <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="flex-1 text-sm font-medium leading-snug">
            {message}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
