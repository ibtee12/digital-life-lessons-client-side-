import React from 'react';
import { HeroSlider } from '../components/home/HeroSlider';
import { DailyQuoteWidget } from '../components/home/DailyQuoteWidget';
import { FeaturedWisdom } from '../components/home/FeaturedWisdom';
import { WhyLearningMatters } from '../components/home/WhyLearningMatters';
import { TopContributors } from '../components/home/TopContributors';
import { MostSavedLessons } from '../components/home/MostSavedLessons';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const HomePage = () => {
  useDocumentTitle('Preserve & Explore Defining Insights');
  const { user } = useAuth();
  const isAdmin = user?.isLoggedIn && (
    user?.role === 'admin' ||
    user?.email?.toLowerCase().includes('admin') ||
    user?.email?.toLowerCase().includes('nahyan') ||
    user?.email?.toLowerCase().includes('ibtee')
  );
  const isPremiumOnly = user?.isLoggedIn && user?.isPremium && !isAdmin;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] dark:bg-[#0C0A09] text-[#1C1917] dark:text-[#FAFAF9] relative overflow-hidden">
      
      {/* 1. Admin Subtle Light Crimson Ambient Aura */}
      {isAdmin && (
        <>
          {/* Left Soft Crimson Aura */}
          <div 
            className="fixed top-0 -left-24 w-[380px] sm:w-[500px] h-[850px] bg-gradient-to-br from-rose-500/18 via-rose-600/6 to-transparent rounded-full blur-[130px] pointer-events-none z-0" 
            aria-hidden="true"
          />
          {/* Right Soft Crimson Aura */}
          <div 
            className="fixed top-1/4 -right-24 w-[380px] sm:w-[500px] h-[850px] bg-gradient-to-bl from-red-500/18 via-rose-500/6 to-transparent rounded-full blur-[130px] pointer-events-none z-0" 
            aria-hidden="true"
          />
        </>
      )}

      {/* 2. Premium VIP Warm Golden Ambient Glow */}
      {isPremiumOnly && (
        <>
          <div 
            className="fixed top-0 -left-28 w-[380px] sm:w-[500px] h-[850px] bg-gradient-to-br from-amber-400/20 via-amber-500/8 to-transparent rounded-full blur-[130px] pointer-events-none z-0" 
            aria-hidden="true"
          />
          <div 
            className="fixed top-1/4 -right-28 w-[380px] sm:w-[500px] h-[850px] bg-gradient-to-bl from-yellow-400/20 via-amber-500/8 to-transparent rounded-full blur-[130px] pointer-events-none z-0" 
            aria-hidden="true"
          />
          <div 
            className="fixed bottom-0 right-10 w-[300px] h-[400px] bg-amber-400/10 rounded-full blur-[120px] pointer-events-none z-0" 
            aria-hidden="true"
          />
        </>
      )}

      <Navbar />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 space-y-12 relative z-10">
        {/* 1. Hero Slider */}
        <HeroSlider />

        {/* 1.5 Daily Wisdom Mental Model Quote Widget */}
        <DailyQuoteWidget />

        {/* 2. Featured Wisdom Section */}
        <FeaturedWisdom />

        {/* 3. Why Learning Matters */}
        <WhyLearningMatters />

        {/* 4. Top Contributors */}
        <TopContributors />

        {/* 5. Most Saved Lessons */}
        <MostSavedLessons />
      </main>

      <Footer />
    </div>
  );
};
