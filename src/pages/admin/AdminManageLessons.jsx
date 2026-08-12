import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Trash2, Eye, CheckCircle, Filter } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { CategoryBadge, AccessBadge } from '../../components/Badge';

export const AdminManageLessons = () => {
  const { lessons, toggleFeatured, deleteLesson } = useAuth();
  const [filterCategory, setFilterCategory] = useState('All');

  const filtered = filterCategory === 'All'
    ? lessons
    : lessons.filter((l) => l.category === filterCategory);

  const publicCount = lessons.filter((l) => l.visibility === 'Public').length;
  const privateCount = lessons.filter((l) => l.visibility === 'Private').length;
  const featuredCount = lessons.filter((l) => l.isFeatured).length;

  return (
    <div className="space-y-6">
      
      {/* Header Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">
            Manage Platform Lessons ({lessons.length})
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Review community wisdom entries, set featured home page items, or delete inappropriate content.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold text-stone-600 dark:text-stone-300">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700">Public: {publicCount}</span>
          <span className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800">Private: {privateCount}</span>
          <span className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-700">Featured: {featuredCount}</span>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center space-x-3">
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

      {/* Table */}
      <div className="bg-white dark:bg-[#292524] rounded-3xl border border-stone-200 dark:border-stone-700/80 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-100 dark:bg-stone-800/80 text-[11px] font-extrabold uppercase tracking-wider text-stone-600 dark:text-stone-400 border-b border-stone-200 dark:border-stone-700">
                <th className="py-4 px-6">Lesson Title</th>
                <th className="py-4 px-4">Author</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Access Level</th>
                <th className="py-4 px-4">Featured Status</th>
                <th className="py-4 px-6 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-sm">
              {filtered.map((lesson) => (
                <tr key={lesson.id} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/40 transition">
                  
                  <td className="py-4 px-6 max-w-xs">
                    <p className="font-bold text-stone-900 dark:text-stone-100 truncate">{lesson.title}</p>
                    <p className="text-xs text-stone-400 mt-0.5">{lesson.visibility}</p>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap text-xs font-semibold text-stone-700 dark:text-stone-300">
                    {lesson.creatorName}
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <CategoryBadge category={lesson.category} />
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <AccessBadge level={lesson.accessLevel} />
                  </td>

                  {/* Toggle Featured */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleFeatured(lesson.id)}
                      className={`px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 transition ${
                        lesson.isFeatured
                          ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-sm'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-amber-500'
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${lesson.isFeatured ? 'fill-white' : ''}`} />
                      <span>{lesson.isFeatured ? 'Featured' : 'Make Featured'}</span>
                    </button>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap text-right space-x-1">
                    <Link
                      to={`/lessons/${lesson.id}`}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition inline-block"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => deleteLesson(lesson.id)}
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition inline-block"
                      title="Delete Permanently"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
