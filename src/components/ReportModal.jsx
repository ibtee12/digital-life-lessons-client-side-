import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flag, X, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ReportModal = ({ isOpen, onClose, lessonId, lessonTitle }) => {
  const { reportLesson } = useAuth();
  const [reason, setReason] = useState('Inappropriate Content');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    reportLesson(lessonId, reason);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-[#292524] rounded-2xl p-6 max-w-md w-full border border-stone-200 dark:border-stone-700 shadow-2xl relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center">
              <Flag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Report Lesson</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 truncate max-w-[260px]">{lessonTitle}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1.5">
                Reason for Reporting
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#059669] focus:ring-2 focus:ring-[#D1FAE5] dark:focus:ring-[#059669]/30 text-sm font-medium"
              >
                <option value="Inappropriate Content">Inappropriate Content</option>
                <option value="Spam / Misleading">Spam / Misleading</option>
                <option value="Hate Speech or Harassment">Hate Speech or Harassment</option>
                <option value="Copyright Violation">Copyright Violation</option>
                <option value="Other Issue">Other Issue</option>
              </select>
            </div>

            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              Reports are confidentially sent to moderators. Misuse of reporting may impact your account status.
            </p>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-semibold text-sm hover:bg-stone-100 dark:hover:bg-stone-800 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-md transition"
              >
                Submit Report
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
