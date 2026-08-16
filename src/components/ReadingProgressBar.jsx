import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ReadingProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-[72px] left-0 right-0 h-[3px] bg-stone-200/50 dark:bg-stone-800/50 z-40">
      <motion.div
        className="h-full bg-gradient-to-r from-[#059669] via-[#0D9488] to-[#0891B2] origin-left shadow-sm shadow-[#059669]/50"
        style={{ scaleX }}
      />
    </div>
  );
};
