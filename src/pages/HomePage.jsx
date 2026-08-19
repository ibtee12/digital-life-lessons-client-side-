import React from 'react';
import { HeroSlider } from '../components/home/HeroSlider';
import { DailyQuoteWidget } from '../components/home/DailyQuoteWidget';
import { FeaturedWisdom } from '../components/home/FeaturedWisdom';
import { WhyLearningMatters } from '../components/home/WhyLearningMatters';
import { TopContributors } from '../components/home/TopContributors';
import { MostSavedLessons } from '../components/home/MostSavedLessons';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const HomePage = () => {
  useDocumentTitle('Preserve & Explore Defining Insights');
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] dark:bg-[#0C0A09] text-[#1C1917] dark:text-[#FAFAF9]">
      <Navbar />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 space-y-12">
        {/* 1. Hero Slider */}
        <HeroSlider />

        {/* 1.5 Daily Wisdom Mental Model Quote Widget */}
        <DailyQuoteWidget />

        {/* 2. Featured Wisdom Section (Dynamic + Framer Motion) */}
        <FeaturedWisdom />

        {/* 3. Why Learning Matters (Static 4 cards) */}
        <WhyLearningMatters />

        {/* 4. Dynamic Extra 1: Top Contributors */}
        <TopContributors />

        {/* 5. Dynamic Extra 2: Most Saved Lessons */}
        <MostSavedLessons />
      </main>

      <Footer />
    </div>
  );
};
