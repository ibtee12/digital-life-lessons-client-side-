import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, X, Check, Copy } from 'lucide-react';

export const ShareModal = ({ isOpen, onClose, title, url }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = url || window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank');
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
            <div className="w-10 h-10 rounded-full bg-[#ECFDF5] dark:bg-[#059669]/20 text-[#059669] flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Share Wisdom</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 truncate max-w-[260px]">{title}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            <button
              onClick={shareFacebook}
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 transition group"
            >
              <span className="font-bold text-lg mb-1">f</span>
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-400 group-hover:text-blue-600">Facebook</span>
            </button>

            <button
              onClick={shareTwitter}
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-900 dark:text-stone-100 transition group"
            >
              {/* New X Logo */}
              <svg className="w-5 h-5 mb-1 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-400 group-hover:text-stone-900 dark:group-hover:text-stone-100">X (Twitter)</span>
            </button>

            <button
              onClick={shareLinkedIn}
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sky-600 transition group"
            >
              <span className="font-bold text-lg mb-1">in</span>
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-400 group-hover:text-sky-600">LinkedIn</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1.5">
              Direct Link
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 h-10 px-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1917] text-stone-700 dark:text-stone-300 text-xs truncate focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="h-10 px-4 rounded-lg bg-[#059669] hover:bg-[#047857] text-white font-semibold text-xs flex items-center space-x-1.5 transition"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
