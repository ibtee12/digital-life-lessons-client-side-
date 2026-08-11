import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Eye, Heart, Bookmark, PlusCircle, AlertTriangle, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AccessBadge, CategoryBadge } from '../../components/Badge';

export const MyLessonsPage = () => {
  const { user, lessons, updateLesson, deleteLesson } = useAuth();
  const [deleteModalId, setDeleteModalId] = useState(null);

  // User's own lessons
  const myLessons = lessons.filter((l) => l.creatorId === user.id || l.creatorName === user.name);

  const handleToggleVisibility = (lesson) => {
    const newVisibility = lesson.visibility === 'Public' ? 'Private' : 'Public';
    updateLesson(lesson.id, { visibility: newVisibility });
  };

  const handleToggleAccess = (lesson) => {
    if (!user.isPremium) return;
    const newAccess = lesson.accessLevel === 'Premium' ? 'Free' : 'Premium';
    updateLesson(lesson.id, { accessLevel: newAccess });
  };

  const confirmDelete = () => {
    if (deleteModalId) {
      deleteLesson(deleteModalId);
      setDeleteModalId(null);
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">
            My Published Lessons ({myLessons.length})
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Manage, edit, or toggle visibility for your submitted insights.
          </p>
        </div>

        <Link
          to="/dashboard/add-lesson"
          className="px-4 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs shadow-md flex items-center space-x-2 w-fit"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Lesson</span>
        </Link>
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-[#292524] rounded-3xl border border-stone-200 dark:border-stone-700/80 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-100 dark:bg-stone-800/80 text-[11px] font-extrabold uppercase tracking-wider text-stone-600 dark:text-stone-400 border-b border-stone-200 dark:border-stone-700">
                <th className="py-4 px-6">Lesson</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Access Level</th>
                <th className="py-4 px-4">Visibility Switch</th>
                <th className="py-4 px-4">Stats</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-sm">
              {myLessons.length > 0 ? (
                myLessons.map((lesson) => (
                  <tr key={lesson.id} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/40 transition">
                    
                    {/* Title & Date */}
                    <td className="py-4 px-6 max-w-xs">
                      <p className="font-bold text-stone-900 dark:text-stone-100 truncate">
                        {lesson.title}
                      </p>
                      <p className="text-xs text-stone-400 mt-0.5">
                        Created: {new Date(lesson.createdAt).toLocaleDateString()}
                      </p>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <CategoryBadge category={lesson.category} />
                    </td>

                    {/* Access Level Toggle */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleAccess(lesson)}
                        disabled={!user.isPremium}
                        title={!user.isPremium ? "Upgrade to Premium to switch access level" : "Click to toggle Free/Premium"}
                        className={`${!user.isPremium ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <AccessBadge level={lesson.accessLevel} />
                      </button>
                    </td>

                    {/* Custom Emerald Switch Toggle */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleVisibility(lesson)}
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            lesson.visibility === 'Public' ? 'bg-[#059669]' : 'bg-stone-300 dark:bg-stone-700'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              lesson.visibility === 'Public' ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                        <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">
                          {lesson.visibility}
                        </span>
                      </div>
                    </td>

                    {/* Stats */}
                    <td className="py-4 px-4 whitespace-nowrap text-xs text-stone-500">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center space-x-1">
                          <Heart className="w-3.5 h-3.5 text-red-500" />
                          <span>{lesson.likesCount || 0}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Bookmark className="w-3.5 h-3.5 text-[#059669]" />
                          <span>{lesson.favoritesCount || 0}</span>
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 whitespace-nowrap text-right space-x-1">
                      <Link
                        to={`/lessons/${lesson.id}`}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition inline-block"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        to={`/dashboard/edit-lesson/${lesson.id}`}
                        className="p-1.5 rounded-lg text-[#0D9488] hover:bg-teal-50 dark:hover:bg-teal-950/30 transition inline-block"
                        title="Edit Lesson"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteModalId(lesson.id)}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition inline-block"
                        title="Delete Permanently"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-stone-400 text-sm">
                    No published lessons found. Create your first entry!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal Popup */}
      {deleteModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#292524] rounded-2xl p-6 max-w-sm w-full border border-stone-200 dark:border-stone-700 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-1">
              Delete Lesson Permanently?
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              This action cannot be undone. All comments and statistics for this entry will be removed.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteModalId(null)}
                className="flex-1 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 font-semibold text-xs text-stone-700 dark:text-stone-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs shadow-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
