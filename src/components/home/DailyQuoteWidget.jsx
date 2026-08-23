import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Copy, Check, Sparkles } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const CURATED_QUOTES = [
  {
    quote: "Care about what other people think and you will always be their prisoner.",
    author: "Lao Tzu",
    source: "Tao Te Ching"
  },
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
    if (showToast) showToast("Quote copied to clipboard!", "info");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#FBFBFB] dark:bg-[#181615] border border-stone-200/90 dark:border-stone-800/90 p-5 sm:p-8 md:p-9 shadow-2xs transition-colors">
      
      {/* Background Decorative Large Quote Mark Watermark (Positioned lower to prevent overlap with top buttons) */}
      <div className="absolute right-6 sm:right-10 top-20 sm:top-24 text-stone-200/40 dark:text-stone-800/25 text-8xl sm:text-9xl font-serif pointer-events-none select-none font-extrabold leading-none z-0">
        ”
      </div>

      <div className="relative z-10 w-full space-y-5">
        
        {/* Top Header: Badge on Left, Copy & Restart Buttons Lifted at Top Right */}
        <div className="flex items-center justify-between gap-4 w-full pt-0.5">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#E6F4EA] dark:bg-[#059669]/20 text-[#059669] dark:text-[#34D399] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Daily Reflection Mental Model</span>
          </div>

          {/* Copy & Refresh Buttons at Far Top-Right (Lifted higher) */}
          <div className="flex items-center space-x-2 flex-shrink-0 z-20">
            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#292524] text-stone-600 dark:text-stone-300 hover:text-[#059669] dark:hover:text-[#34D399] hover:border-[#059669]/50 transition-all flex items-center justify-center cursor-pointer shadow-2xs active:scale-95"
              title="Copy quote text"
              aria-label="Copy quote text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#059669] dark:text-[#34D399]" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            {/* Restart / Refresh Next Quote Button */}
            <button
              onClick={handleNext}
              className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#292524] text-stone-600 dark:text-stone-300 hover:text-[#059669] dark:hover:text-[#34D399] hover:border-[#059669]/50 transition-all flex items-center justify-center cursor-pointer shadow-2xs active:scale-95"
              title="Shuffle next insight"
              aria-label="Shuffle next insight"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Animated Quote Body */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-4 pt-1 max-w-3xl"
          >
            <p className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100 italic leading-snug tracking-tight">
              "{current.quote}"
            </p>

            <div className="flex items-center space-x-2 text-sm pt-1">
              <span className="font-extrabold text-[#059669] dark:text-[#34D399]">
                {current.author}
              </span>
              <span className="text-stone-300 dark:text-stone-600">•</span>
              <span className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-medium">
                {current.source}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
