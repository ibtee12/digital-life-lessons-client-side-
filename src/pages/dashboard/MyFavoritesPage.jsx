import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Bookmark, Eye, Trash2, Filter, Heart, ArrowRight, Sparkles, BookOpen } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { CategoryBadge, EmotionalToneBadge, AccessBadge } from "../../components/Badge";

export const MyFavoritesPage = () => {
  const { lessons, favorites, toggleFavorite } = useAuth();
  const [filterCategory, setFilterCategory] = useState("All");

  // Filter saved lessons
  const savedLessons = useMemo(() => {
    return lessons.filter((l) => favorites.includes(l.id));
  }, [lessons, favorites]);

  const filteredSaved = useMemo(() => {
    if (filterCategory === "All") return savedLessons;
    return savedLessons.filter((l) => l.category === filterCategory);
  }, [savedLessons, filterCategory]);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 flex items-center space-x-2">
            <span>Saved Favorites</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-[#059669] dark:text-[#34D399] border border-emerald-200 dark:border-emerald-800">
              {savedLessons.length}
            </span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Personal archive of bookmarked wisdom and inspiring mental models.
          </p>
        </div>

        {/* Filter Dropdown (Only show if there are favorites) */}
        {savedLessons.length > 0 && (
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-stone-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="h-10 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#292524] text-stone-900 dark:text-stone-100 text-xs font-semibold focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Personal Growth">Personal Growth</option>
              <option value="Career">Career</option>
              <option value="Relationships">Relationships</option>
              <option value="Mindset">Mindset</option>
              <option value="Mistakes Learned">Mistakes Learned</option>
            </select>
          </div>
        )}
      </div>

      {/* Content Area */}
      {savedLessons.length === 0 ? (
        /* Clean Empty State */
        <div className="bg-white dark:bg-[#292524] rounded-3xl border border-stone-200 dark:border-stone-700/80 p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-[#059669] dark:text-[#34D399] flex items-center justify-center mx-auto mb-5 shadow-xs">
            <Heart className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 mb-2">
            No saved favorites yet
          </h3>

          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mb-8 max-w-md mx-auto leading-relaxed">
            You haven't bookmarked any life lessons yet. Browse community reflections and click the bookmark icon to save them to your personal archive.
          </p>

          <Link
            to="/lessons"
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs sm:text-sm shadow-md transition"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore Public Wisdom</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* Table Card when Favorites Exist */
        <div className="bg-white dark:bg-[#292524] rounded-3xl border border-stone-200 dark:border-stone-700/80 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-100 dark:bg-stone-800/80 text-[11px] font-extrabold uppercase tracking-wider text-stone-600 dark:text-stone-400 border-b border-stone-200 dark:border-stone-700">
                  <th className="py-4 px-6">Lesson Title</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Author</th>
                  <th className="py-4 px-4">Access Level</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-sm">
                {filteredSaved.length > 0 ? (
                  filteredSaved.map((lesson) => (
                    <tr key={lesson.id} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/40 transition">
                      
                      <td className="py-4 px-6 max-w-xs">
                        <p className="font-bold text-stone-900 dark:text-stone-100 truncate">
                          {lesson.title}
                        </p>
                        <p className="text-xs text-stone-400 mt-0.5">
                          {lesson.emotionalTone}
                        </p>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <CategoryBadge category={lesson.category} />
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                          {lesson.creatorName}
                        </span>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <AccessBadge level={lesson.accessLevel} />
                      </td>

                      <td className="py-4 px-6 whitespace-nowrap text-right space-x-2">
                        <Link
                          to={`/lessons/${lesson.id}`}
                          className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:text-[#059669] font-semibold text-xs transition inline-flex items-center space-x-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </Link>

                        <button
                          onClick={() => toggleFavorite(lesson.id)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition inline-block cursor-pointer"
                          title="Remove from Favorites"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-10 text-center text-stone-400 text-sm">
                      No saved lessons match your active filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
