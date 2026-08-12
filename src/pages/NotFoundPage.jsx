import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookX, ArrowLeft, Home } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen w-full bg-[#FAFAF9] dark:bg-[#0C0A09] text-[#1C1917] dark:text-[#FAFAF9] flex flex-col items-center justify-center p-6 text-center select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full flex flex-col items-center"
      >
        {/* Large 120px 404 Heading */}
        <h1 className="text-[120px] font-black leading-none tracking-tighter text-[#E7E5E4] dark:text-[#292524]">
          404
        </h1>

        {/* Broken Book / Pencil Illustration */}
        <div className="-mt-14 mb-6 w-20 h-20 rounded-3xl bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center shadow-lg border border-stone-200 dark:border-stone-700">
          <BookX className="w-10 h-10 text-[#059669]" />
        </div>

        <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 mb-2">
          This lesson hasn't been written yet
        </h2>

        <p className="text-sm text-stone-500 dark:text-stone-400 mb-8 leading-relaxed">
          The route or wisdom page you are trying to access does not exist or may have been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-extrabold text-sm shadow-xl shadow-[#059669]/20 transition"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home Page</span>
        </Link>
      </motion.div>
    </div>
  );
};
