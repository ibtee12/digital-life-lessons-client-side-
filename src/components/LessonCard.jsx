import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Heart, Bookmark, Calendar, ArrowRight, Star } from 'lucide-react';
import { CategoryBadge, EmotionalToneBadge, AccessBadge } from './Badge';
import { useAuth } from '../context/AuthContext';

export const LessonCard = ({ lesson }) => {
  const { user, toggleLike, toggleFavorite, favorites } = useAuth();
  const navigate = useNavigate();

  const isLocked = lesson.accessLevel === 'Premium' && (!user.isLoggedIn || !user.isPremium);
  const isLiked = lesson.likes?.includes(user?.id);
  const isSaved = favorites?.includes(lesson.id);

  const formattedDate = new Date(lesson.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const handleCardClick = (e) => {
    if (isLocked) {
      e.preventDefault();
      navigate('/pricing');
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`group relative flex flex-col justify-between h-full rounded-2xl bg-white dark:bg-[#292524] border ${
        isLocked ? 'border-amber-300 dark:border-amber-500/50 shadow-md' : 'border-[#E7E5E4] dark:border-[#44403C]'
      } overflow-hidden card-hover-effect transition-all duration-300`}
    >
      {/* Featured Ribbon */}
      {lesson.isFeatured && (
        <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-[#059669] to-[#0D9488] text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg flex items-center space-x-1">
          <Star className="w-3 h-3 fill-white text-white" />
          <span>Featured</span>
        </div>
      )}

      {/* Top Image Section */}
      <div className="relative aspect-video w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
        {lesson.image ? (
          <img
            src={lesson.image}
            alt={lesson.title}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              isLocked ? 'filter blur-[3px] brightness-90' : ''
            }`}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#059669]/20 to-[#0D9488]/30 flex items-center justify-center text-stone-400">
            <span className="font-bold text-2xl tracking-widest uppercase">DLL</span>
          </div>
        )}

        {/* Access Level Badge (Overlay) */}
        <div className="absolute bottom-3 left-3 z-10">
          <AccessBadge level={lesson.accessLevel} />
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 flex flex-col justify-between p-6 relative">
        {/* Blurred Premium Locked Overlay */}
        {isLocked && (
          <div className="absolute inset-0 z-20 bg-white/75 dark:bg-[#292524]/80 backdrop-blur-sm p-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-1">
              Premium Lesson
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-4 max-w-[200px]">
              Upgrade to Premium to unlock full wisdom and insights.
            </p>
            <Link
              to="/pricing"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-xs shadow-md shadow-amber-500/20 transition flex items-center space-x-1.5"
            >
              <span>Upgrade to View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Normal Content Flow */}
        <div>
          {/* Category & Tone Badges */}
          <div className="flex items-center space-x-2 mb-3">
            <CategoryBadge category={lesson.category} />
            <EmotionalToneBadge tone={lesson.emotionalTone} />
          </div>

          {/* Title */}
          <Link
            to={isLocked ? '/pricing' : `/lessons/${lesson.id}`}
            className="block mb-2 group-hover:text-[#059669] transition-colors"
          >
            <h3 className="text-lg font-bold leading-snug text-[#1C1917] dark:text-[#FAFAF9] line-clamp-2">
              {lesson.title}
            </h3>
          </Link>

          {/* Description Preview */}
          <p className="text-sm text-[#78716C] dark:text-[#A8A29E] line-clamp-2 mb-4 leading-relaxed">
            {lesson.description}
          </p>
        </div>

        {/* Footer Meta & Actions */}
        <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between mt-auto">
          {/* Creator Info */}
          <div className="flex items-center space-x-2.5 min-w-0">
            <img
              src={lesson.creatorPhoto}
              alt={lesson.creatorName}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-stone-200 dark:ring-stone-700 flex-shrink-0"
            />
            <div className="truncate text-xs">
              <p className="font-semibold text-stone-900 dark:text-stone-200 truncate">
                {lesson.creatorName}
              </p>
              <p className="text-stone-400 dark:text-stone-500 flex items-center space-x-1">
                <Calendar className="w-3 h-3 inline" />
                <span>{formattedDate}</span>
              </p>
            </div>
          </div>

          {/* Quick Actions (Like & Bookmark) */}
          <div className="flex items-center space-x-1.5 flex-shrink-0">
            <button
              onClick={() => toggleLike(lesson.id)}
              className={`p-1.5 rounded-lg text-xs flex items-center space-x-1 transition ${
                isLiked
                  ? 'text-red-500 bg-red-50 dark:bg-red-950/40'
                  : 'text-stone-400 hover:text-red-500 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
              title="Like lesson"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500' : ''}`} />
              <span className="font-medium text-[11px]">{lesson.likesCount || 0}</span>
            </button>

            <button
              onClick={() => toggleFavorite(lesson.id)}
              className={`p-1.5 rounded-lg transition ${
                isSaved
                  ? 'text-[#059669] bg-emerald-50 dark:bg-emerald-950/40'
                  : 'text-stone-400 hover:text-[#059669] hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
              title="Save to Favorites"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#059669]' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
