import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, RefreshCcw } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const PaymentCancelPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] dark:bg-[#0C0A09] text-[#1C1917] dark:text-[#FAFAF9]">
      <Navbar />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 pt-32 pb-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-[#292524] rounded-3xl p-8 sm:p-12 max-w-lg w-full border border-stone-200 dark:border-stone-700/80 shadow-2xl text-center"
        >
          <div className="w-20 h-20 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10" />
          </div>

          <h1 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 mb-2">
            Payment Canceled
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 mb-8 leading-relaxed">
            The checkout session was canceled or could not be completed. No charges were made to your account.
          </p>

          <div className="space-y-3">
            <Link
              to="/pricing"
              className="w-full py-3.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-sm shadow-md flex items-center justify-center space-x-2 transition"
            >
              <RefreshCcw className="w-4 h-4" />
              <span>Return to Pricing & Try Again</span>
            </Link>

            <Link
              to="/"
              className="w-full py-3 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-semibold text-sm hover:bg-stone-100 dark:hover:bg-stone-800 transition block text-center"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};
