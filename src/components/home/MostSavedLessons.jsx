import React from 'react';
import { Bookmark, Sparkles } from 'lucide-react';
import { LessonCard } from '../LessonCard';
import { useAuth } from '../../context/AuthContext';

export const MostSavedLessons = () => {
  const { lessons } = useAuth();

  // Sort by highest favoritesCount
  const sortedBySaved = [...lessons].sort((a, b) => (b.favoritesCount || 0) - (a.favoritesCount || 0)).slice(0, 3);

  return (
    <section className="py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center space-x-2 text-[#0D9488] dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Bookmark className="w-4 h-4" />
            <span>Community Bookmarks</span>
          </div>
          <h2 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
            Most Saved Life Lessons
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 equal-card-grid">
        {sortedBySaved.map((lesson) => (
          <div key={lesson.id} className="relative h-full">
            {/* Top Saved Badge Overlay */}
            <div className="absolute top-3 left-3 z-30 bg-[#1C1917]/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md flex items-center space-x-1 shadow-md border border-stone-700">
              <Bookmark className="w-3 h-3 fill-emerald-400 text-emerald-400" />
              <span>{lesson.favoritesCount || 0} Saves</span>
            </div>

            <LessonCard lesson={lesson} />
          </div>
        ))}
      </div>
    </section>
  );
};
