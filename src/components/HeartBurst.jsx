import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export const HeartBurst = ({ triggerKey }) => {
  if (!triggerKey) return null;

  const particles = [
    { id: 1, x: -20, y: -30, scale: 0.8, rotate: -25 },
    { id: 2, x: 20, y: -32, scale: 0.9, rotate: 20 },
    { id: 3, x: -35, y: -15, scale: 0.6, rotate: -40 },
    { id: 4, x: 35, y: -12, scale: 0.7, rotate: 35 },
    { id: 5, x: 0, y: -45, scale: 1.1, rotate: 0 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={`${triggerKey}-${p.id}`}
            initial={{ opacity: 1, scale: 0, x: 0, y: 0, rotate: 0 }}
            animate={{
              opacity: [1, 1, 0],
              scale: [0, p.scale, 0.4],
              x: p.x,
              y: p.y,
              rotate: p.rotate
            }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute"
          >
            <Heart className="w-4 h-4 fill-red-500 text-red-500 drop-shadow-md" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
