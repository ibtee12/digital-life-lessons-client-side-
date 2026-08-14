import React from 'react';

export const CardSkeleton = () => {
  return (
    <div className="flex flex-col justify-between h-full rounded-2xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 p-6 overflow-hidden animate-pulse">
      <div>
        {/* Aspect 16/9 Thumbnail skeleton */}
        <div className="w-full aspect-video rounded-xl bg-stone-200 dark:bg-stone-700 mb-4" />
        
        {/* Badges Skeleton */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-20 h-5 rounded-full bg-stone-200 dark:bg-stone-700" />
          <div className="w-16 h-5 rounded bg-stone-200 dark:bg-stone-700" />
        </div>

        {/* Title Skeleton */}
        <div className="w-3/4 h-6 rounded bg-stone-200 dark:bg-stone-700 mb-2" />
        <div className="w-1/2 h-6 rounded bg-stone-200 dark:bg-stone-700 mb-4" />

        {/* Description Skeleton */}
        <div className="w-full h-4 rounded bg-stone-100 dark:bg-stone-800 mb-1.5" />
        <div className="w-5/6 h-4 rounded bg-stone-100 dark:bg-stone-800 mb-4" />
      </div>

      {/* Footer Meta Skeleton */}
      <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-stone-200 dark:bg-stone-700" />
          <div className="space-y-1">
            <div className="w-20 h-3.5 rounded bg-stone-200 dark:bg-stone-700" />
            <div className="w-12 h-2.5 rounded bg-stone-100 dark:bg-stone-800" />
          </div>
        </div>
        <div className="w-12 h-6 rounded-lg bg-stone-200 dark:bg-stone-700" />
      </div>
    </div>
  );
};

export const LessonGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 equal-card-grid">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="h-full">
          <CardSkeleton />
        </div>
      ))}
    </div>
  );
};
