import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, X, Star, ShieldCheck, Sparkles, Zap, ArrowRight, Lock, Loader2 } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const COMPARISON_ROWS = [
  { feature: "Create Public Life Lessons", free: "Unlimited", premium: "Unlimited" },
  { feature: "Create Premium (Paid) Lessons", free: false, premium: true },
  { feature: "Access Premium Wisdom Entries", free: false, premium: true },
  { feature: "Verified \"Premium ⭐\" Badge", free: false, premium: true },
  { feature: "Priority Listing in Public Lessons", free: false, premium: true },
  { feature: "Ad-free Editorial Experience", free: "Standard", premium: "Ad-free ✅" },
  { feature: "PDF Article Export", free: "Standard", premium: "Unlimited ✅" },
  { feature: "Priority 24/7 Support & Moderation", free: "Standard", premium: "Priority ✅" },
];

export const PricingPage = () => {
  const { user, showToast } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpgrade = async () => {
    setIsProcessing(true);
    try {
      const secretKey = import.meta.env.VITE_STRIPE_SECRET_KEY;
      const origin = window.location.origin;

      const params = new URLSearchParams();
      params.append("payment_method_types[]", "card");
      params.append("line_items[0][price_data][currency]", "usd");
      params.append("line_items[0][price_data][product_data][name]", "Digital Life Lessons - Premium Lifetime Pass");
      params.append("line_items[0][price_data][product_data][description]", "Unlimited access to all paid wisdom entries, priority status, and author tools.");
      params.append("line_items[0][price_data][unit_amount]", "1500"); // $15.00
      params.append("line_items[0][quantity]", "1");
      params.append("mode", "payment");
      params.append("success_url", `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`);
      params.append("cancel_url", `${origin}/payment/cancel`);

      const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${secretKey}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
      });

      const data = await response.json();

      if (data.url) {
        // Redirect straight to Stripe real hosted payment page
        window.location.href = data.url;
      } else {
        throw new Error(data.error?.message || "Failed to create Stripe Checkout session");
      }
    } catch (err) {
      console.error("Stripe Checkout Error:", err);
      showToast(err.message || "Failed to redirect to Stripe Checkout.", "error");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] dark:bg-[#0C0A09] text-[#1C1917] dark:text-[#FAFAF9]">
      <Navbar />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-[#FFFBEB] dark:bg-[#F59E0B]/20 text-[#B45309] dark:text-[#FBBF24] border border-[#FCD34D] dark:border-[#F59E0B]/40 mb-4 shadow-2xs">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Lifetime Pass — One Time Payment</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100">
            Invest in Lifelong Wisdom
          </h1>
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 mt-4 leading-relaxed">
            Gain full access to curated mental models, premium reflections, and verified author privileges.
          </p>
        </div>

        {/* 2 Main Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          
          {/* Free Tier Card */}
          <div className="p-8 rounded-3xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-extrabold text-stone-900 dark:text-stone-100">
                  Standard Member
                </h3>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                  Free Forever
                </span>
              </div>
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
                Perfect for readers looking to explore public wisdom entries.
              </p>

              <div className="flex items-baseline mb-8">
                <span className="text-4xl font-extrabold text-stone-900 dark:text-stone-100">$0</span>
                <span className="text-xs font-semibold text-stone-400 ml-2">/ Forever Free</span>
              </div>

              {/* Feature Checklist */}
              <ul className="space-y-3.5 text-sm text-stone-600 dark:text-stone-300 mb-8">
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>Access all public Free lessons</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>Create public Free life lessons</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>Save lessons to personal Favorites</span>
                </li>
                <li className="flex items-center space-x-3 opacity-50">
                  <X className="w-5 h-5 text-stone-400 flex-shrink-0" />
                  <span className="line-through">Create Premium (Paid) lessons</span>
                </li>
                <li className="flex items-center space-x-3 opacity-50">
                  <X className="w-5 h-5 text-stone-400 flex-shrink-0" />
                  <span className="line-through">View locked Premium entries</span>
                </li>
              </ul>
            </div>

            <button
              disabled
              className="w-full py-3 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-400 font-semibold text-sm cursor-not-allowed bg-stone-50 dark:bg-stone-800/40"
            >
              Default Plan
            </button>
          </div>

          {/* Premium Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-8 rounded-3xl bg-white dark:bg-[#292524] border-2 border-amber-400 shadow-2xl flex flex-col justify-between relative overflow-hidden"
          >
            {/* Recommended Ribbon */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-white font-extrabold text-[11px] uppercase tracking-wider px-4 py-1.5 rounded-bl-xl shadow-md">
              ★ Recommended
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-4">
                <h3 className="text-xl font-extrabold text-stone-900 dark:text-stone-100">
                  Premium Lifetime
                </h3>
                <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              </div>
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
                Unlimited access to all paid wisdom entries, priority status, and author tools.
              </p>

              <div className="flex items-baseline mb-8">
                <span className="text-4xl font-extrabold text-stone-900 dark:text-stone-100">$15</span>
                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 ml-2">/ One-Time Lifetime</span>
              </div>

              {/* Feature Checklist */}
              <ul className="space-y-3.5 text-sm text-stone-700 dark:text-stone-200 mb-8">
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="font-semibold">Unlock ALL Premium wisdom entries</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="font-semibold">Create Premium (Paid) life lessons</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>Verified "Premium ⭐" author badge</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>Priority listing in public lessons</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>Ad-free editorial experience</span>
                </li>
              </ul>
            </div>

            {user.isPremium ? (
              <div className="w-full py-3 text-center rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-700 dark:text-emerald-300 font-bold text-sm">
                Active Premium Subscription ⭐
              </div>
            ) : (
              <button
                onClick={handleUpgrade}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-extrabold text-sm shadow-xl shadow-amber-500/30 transition flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Connecting to Stripe...</span>
                  </>
                ) : (
                  <>
                    <span>Upgrade to Premium — $15 Lifetime</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </motion.div>

        </div>

        {/* 8-Row Comparison Table */}
        <section className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">
              Detailed Feature Comparison
            </h2>
          </div>

          <div className="bg-white dark:bg-[#292524] rounded-2xl border border-stone-200 dark:border-stone-700/80 overflow-hidden shadow-sm">
            <div className="grid grid-cols-12 bg-stone-100 dark:bg-stone-800/80 p-4 font-bold text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 border-b border-stone-200 dark:border-stone-700">
              <div className="col-span-6">Platform Feature</div>
              <div className="col-span-3 text-center">Free</div>
              <div className="col-span-3 text-center text-amber-600 dark:text-amber-400">Premium ⭐</div>
            </div>

            <div className="divide-y divide-stone-100 dark:divide-stone-800">
              {COMPARISON_ROWS.map((row, idx) => (
                <div key={idx} className="grid grid-cols-12 p-4 text-sm items-center hover:bg-stone-50/50 dark:hover:bg-stone-800/40 transition">
                  <div className="col-span-6 font-semibold text-stone-800 dark:text-stone-200">
                    {row.feature}
                  </div>
                  <div className="col-span-3 text-center text-stone-500 dark:text-stone-400">
                    {typeof row.free === "boolean" ? (
                      row.free ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-5 h-5 text-stone-300 dark:text-stone-600 mx-auto" />
                    ) : (
                      row.free
                    )}
                  </div>
                  <div className="col-span-3 text-center font-bold text-stone-900 dark:text-stone-100">
                    {typeof row.premium === "boolean" ? (
                      row.premium ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-5 h-5 text-stone-300 mx-auto" />
                    ) : (
                      row.premium
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
