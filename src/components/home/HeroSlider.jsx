import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    title: "Preserve Your Life Wisdom Before Time Fades It",
    subtitle: "A dedicated editorial space to capture, organize, and reflect on the defining insights of your personal journey.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=80",
    fallbackGradient: "from-emerald-900 via-stone-900 to-stone-950",
    glowColor: "rgba(5, 150, 105, 0.35)",
    ctaText: "Explore Public Wisdom",
    ctaLink: "/lessons",
    badge: "Wisdom Archive",
    highlightStat: "1,400+ Insights"
  },
  {
    id: 2,
    title: "Accelerate Growth Through Shared Real-World Insights",
    subtitle: "Learn from curated, high-value career frameworks, personal breakthroughs, and honest mistakes shared by top thinkers.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80",
    fallbackGradient: "from-teal-900 via-stone-900 to-stone-950",
    glowColor: "rgba(13, 148, 136, 0.35)",
    ctaText: "Join the Community",
    ctaLink: "/register",
    badge: "Curated Reflection",
    highlightStat: "850+ Thinkers"
  },
  {
    id: 3,
    title: "Unlock Premium Life Lessons & Deep Frameworks",
    subtitle: "Gain lifetime access to exclusive premium wisdom entries, actionable mental models, and structured reflections.",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1600&q=80",
    fallbackGradient: "from-amber-900 via-stone-900 to-stone-950",
    glowColor: "rgba(245, 158, 11, 0.35)",
    ctaText: "Upgrade to Premium",
    ctaLink: "/pricing",
    badge: "Lifetime Access",
    highlightStat: "৳1500 Lifetime"
  }
];

export const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [imgError, setImgError] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  const activeSlide = SLIDES[current];

  return (
    <div className="relative w-full h-[460px] sm:h-[500px] md:h-[520px] rounded-3xl overflow-hidden shadow-2xl bg-stone-900 border border-stone-800/80 group select-none">
      
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image Container with Gradient Fallback */}
          <div className={`absolute inset-0 bg-gradient-to-br ${activeSlide.fallbackGradient}`}>
            {!imgError[activeSlide.id] && (
              <img
                src={activeSlide.image}
                alt=""
                onError={() => setImgError((prev) => ({ ...prev, [activeSlide.id]: true }))}
                className="w-full h-full object-cover object-center opacity-65 transition-transform duration-1000 scale-105"
              />
            )}
          </div>

          {/* Smooth Soft Gradient Overlays (Replaced heavy pitch black overlay) */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/60 to-transparent md:w-4/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/30" />
          
          {/* Vibrant Glow Effect */}
          <div
            className="absolute -top-20 -left-20 w-[450px] h-[450px] rounded-full blur-3xl opacity-30 pointer-events-none transition-all duration-700"
            style={{ backgroundColor: activeSlide.glowColor }}
          />

          {/* Slide Content Layout */}
          <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-16 max-w-2xl text-white z-10">
            
            {/* Top Badge & Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="flex items-center space-x-2.5 mb-5"
            >
              <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#059669] text-white shadow-lg shadow-[#059669]/30 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activeSlide.badge}</span>
              </span>

              <span className="hidden sm:inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-stone-200 border border-white/20 backdrop-blur-md">
                <span>{activeSlide.highlightStat}</span>
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] mb-4 text-white drop-shadow-md"
            >
              {activeSlide.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="text-sm sm:text-base md:text-lg text-stone-200 max-w-xl mb-8 font-normal leading-relaxed drop-shadow-sm"
            >
              {activeSlide.subtitle}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="flex items-center space-x-4"
            >
              <Link
                to={activeSlide.ctaLink}
                className="inline-flex items-center space-x-2 px-6.5 py-3.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-[#059669]/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>{activeSlide.ctaText}</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </Link>
            </motion.div>

          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Arrow Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-stone-900/60 hover:bg-stone-900/90 text-white border border-white/15 backdrop-blur-md transition opacity-80 hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-stone-900/60 hover:bg-stone-900/90 text-white border border-white/15 backdrop-blur-md transition opacity-80 hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Custom Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2.5 p-1.5 rounded-full bg-stone-900/60 border border-white/15 backdrop-blur-md">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              current === idx
                ? "w-7 bg-[#059669] shadow-md shadow-[#059669]/50"
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
