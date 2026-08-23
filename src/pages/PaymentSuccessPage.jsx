import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Star } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAuth } from "../context/AuthContext";

export const PaymentSuccessPage = () => {
  const { user, upgradeToPremium } = useAuth();

  useEffect(() => {
    if (user && !user.isPremium) {
      upgradeToPremium();
    }
  }, [user]);

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
          {/* Animated Success Check Icon */}
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#059669] flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-[#FFFBEB] text-[#B45309] border border-[#FCD34D] mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Lifetime Premium Activated</span>
          </span>

          <h1 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 mb-2">
            Payment Successful!
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 mb-8 leading-relaxed">
            Thank you for upgrading to Digital Life Lessons Premium. Your account now has unrestricted lifetime access to all paid wisdom entries, author tools, and your verified Premium ⭐ badge!
          </p>

          <div className="space-y-3">
            <Link
              to="/dashboard"
              className="w-full py-3.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-sm shadow-md flex items-center justify-center space-x-2 transition"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/lessons"
              className="w-full py-3 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-semibold text-sm hover:bg-stone-100 dark:hover:bg-stone-800 transition block text-center"
            >
              Explore Public Wisdom
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};
