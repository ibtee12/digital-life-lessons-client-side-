import React from 'react';
import { Star, Lock } from 'lucide-react';

export const CategoryBadge = ({ category }) => {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#F5F5F4] dark:bg-[#292524] text-[#57534E] dark:text-[#A8A29E] border border-stone-200/60 dark:border-stone-700/60">
      {category}
    </span>
  );
};

export const EmotionalToneBadge = ({ tone }) => {
  let styleClasses = 'border-l-4 border-l-[#059669] bg-[#ECFDF5] text-[#047857] dark:bg-[#059669]/15 dark:text-[#34D399]';

  switch (tone) {
    case 'Sad':
      styleClasses = 'border-l-4 border-l-[#6366F1] bg-[#EEF2FF] text-[#4338CA] dark:bg-[#6366F1]/15 dark:text-[#A5B4FC]';
      break;
    case 'Realization':
      styleClasses = 'border-l-4 border-l-[#F59E0B] bg-[#FFFBEB] text-[#B45309] dark:bg-[#F59E0B]/15 dark:text-[#FBBF24]';
      break;
    case 'Gratitude':
      styleClasses = 'border-l-4 border-l-[#EC4899] bg-[#FDF2F8] text-[#BE185D] dark:bg-[#EC4899]/15 dark:text-[#F472B6]';
      break;
    default:
      // Motivational
      styleClasses = 'border-l-4 border-l-[#059669] bg-[#ECFDF5] text-[#047857] dark:bg-[#059669]/15 dark:text-[#34D399]';
      break;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-r-md text-xs font-semibold ${styleClasses}`}>
      {tone}
    </span>
  );
};

export const AccessBadge = ({ level }) => {
  if (level === 'Premium') {
    return (
      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FFFBEB] dark:bg-[#F59E0B]/15 text-[#B45309] dark:text-[#FBBF24] border border-[#FCD34D] dark:border-[#F59E0B]/40 shadow-sm">
        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
        <span>Premium</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#ECFDF5] dark:bg-[#059669]/15 text-[#047857] dark:text-[#34D399] border border-emerald-200 dark:border-emerald-800/40">
      Free
    </span>
  );
};
