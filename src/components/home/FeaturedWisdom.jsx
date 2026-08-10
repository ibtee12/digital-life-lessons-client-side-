import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LessonCard } from '../LessonCard';
import { useAuth } from '../../context/AuthContext';

export const FeaturedWisdom = () => {
  const { lessons } = useAuth();
  
  // Filter featured lessons
  const featuredLessons = lessons.filter((l) => l.isFeatured).slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <section className="py-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <div className="flex items-center space-x-2 text-[#059669] dark:text-[#34D399] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Editor's Selection</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
            Featured Wisdom
          </h2>
          {/* Required Emerald Accent Line (40px wide, 4px height) */}
          <div className="w-[40px] h-[4px] bg-[#059669] rounded-full mt-2.5" />
        </div>

        <Link
          to="/lessons"
          className="inline-flex items-center space-x-1.5 font-semibold text-sm text-[#059669] hover:text-[#047857] mt-4 md:mt-0 transition group"
        >
          <span>Explore All Lessons</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Featured Cards 3-Column Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 equal-card-grid"
      >
        {featuredLessons.map((lesson) => (
          <motion.div key={lesson.id} variants={cardVariants} className="h-full">
            <LessonCard lesson={lesson} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
