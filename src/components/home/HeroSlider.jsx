import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, Compass, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    title: 'Preserve Your Life Wisdom Before Time Fades It',
    subtitle: 'A dedicated editorial space to capture, organize, and reflect on the defining insights of your personal journey.',
    image: 'https://images.unsplash.com/photo-1499209974431-9dac3ada00d7?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Explore Public Wisdom',
    ctaLink: '/lessons',
    badge: 'Wisdom Archive'
  },
  {
    id: 2,
    title: 'Accelerate Growth Through Shared Real-World Insights',
    subtitle: 'Learn from curated, high-value career frameworks, personal breakthroughs, and honest mistakes shared by top thinkers.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Join the Community',
    ctaLink: '/register',
    badge: 'Curated Reflection'
  },
  {
    id: 3,
    title: 'Unlock Premium Life Lessons & Deep Frameworks',
    subtitle: 'Gain lifetime access to exclusive premium wisdom entries, actionable mental models, and structured reflections.',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Upgrade to Premium',
    ctaLink: '/pricing',
    badge: 'Lifetime Access'
  }
];

export const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
      
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image */}
          <img
            src={SLIDES[current].image}
            alt={SLIDES[current].title}
            className="w-full h-full object-cover object-center"
          />

          {/* Left Gradient Overlay (Black 65% to Transparent) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />

          {/* Slide Text Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-16 max-w-2xl text-white z-10">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#059669] text-white w-fit mb-4 shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{SLIDES[current].badge}</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-white"
            >
              {SLIDES[current].title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="text-sm sm:text-base md:text-lg text-stone-200 line-clamp-2 mb-6 font-normal leading-relaxed"
            >
              {SLIDES[current].subtitle}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <Link
                to={SLIDES[current].ctaLink}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm sm:text-base shadow-lg shadow-[#059669]/30 hover:scale-[1.02] active:scale-[0.98] transition"
              >
                <span>{SLIDES[current].ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Arrow Nav Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition opacity-0 group-hover:opacity-100"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition opacity-0 group-hover:opacity-100"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Custom Dots Indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2.5">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              current === idx
                ? 'w-8 bg-[#059669] shadow-md shadow-[#059669]/50'
                : 'w-2.5 bg-white/60 hover:bg-white'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
