import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, RefreshCw, Copy, Check, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const CURATED_QUOTES = [
  {
    quote: "You have power over your mind - not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius",
    source: "Meditations"
  },
  {
    quote: "We suffer more often in imagination than in reality.",
    author: "Seneca",
    source: "Letters from a Stoic"
  },
  {
    quote: "Care about what other people think and you will always be their prisoner.",
    author: "Lao Tzu",
    source: "Tao Te Ching"
  },
  {
    quote: "A fit body, a calm mind, a house full of love. These things cannot be bought - they must be earned.",
    author: "Naval Ravikant",
    source: "The Almanack of Naval Ravikant"
  },
  {
    quote: "You do not rise to the level of your goals. You fall to the level of your systems.",
    author: "James Clear",
    source: "Atomic Habits"
  }
];

export const DailyQuoteWidget = () => {
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const { showToast } = useAuth();

  const current = CURATED_QUOTES[index];

  const handleNext = () => {
    setIsRotating(true);
    setIndex((prev) => (prev + 1) % CURATED_QUOTES.length);
    setTimeout(() => setIsRotating(false), 500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${current.quote}" — ${current.author} (${current.source})`);
    setCopied(true);
    showToast('Quote copied to clipboard!', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-stone-50 dark:from-[#1C1917] dark:to-[#0C0A09] border border-stone-200 dark:border-stone-800 p-8 sm:p-10 shadow-sm">
      
      {/* Background Decorative Icon */}
      <div className="absolute -top-6 -right-6 text-stone-100 dark:text-stone-800/40 pointer-events-none">
        <Quote className="w-40 h-40 opacity-40" />
      </div>

      <div className="relative z-10 max-w-3xl space-y-6">
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#ECFDF5] dark:bg-[#059669]/20 text-[#059669] dark:text-[#34D399]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Daily Reflection Mental Model</span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#292524] text-stone-600 dark:text-stone-300 hover:text-[#059669] transition"
              title="Copy quote text"
            >
              {copied ? <Check className="w-4 h-4 text-[#059669]" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Refresh / Next Quote */}
            <button
              onClick={handleNext}
              className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#292524] text-stone-600 dark:text-stone-300 hover:text-[#059669] transition"
              title="Shuffle next insight"
            >
              <RefreshCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Animated Quote Body */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <p className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 leading-relaxed italic">
              "{current.quote}"
            </p>

            <div className="flex items-center space-x-2 text-sm">
              <span className="font-extrabold text-[#059669] dark:text-[#34D399]">
                {current.author}
              </span>
              <span className="text-stone-400">•</span>
              <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                {current.source}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
