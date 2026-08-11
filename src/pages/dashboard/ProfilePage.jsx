import React, { useState } from 'react';
import { Star, User, Mail, Image, Save, BookOpen, Bookmark } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { LessonCard } from '../../components/LessonCard';

export const ProfilePage = () => {
  const { user, setUser, lessons, favorites, showToast } = useAuth();

  const [name, setName] = useState(user.name);
  const [photo, setPhoto] = useState(user.photo);

  // Lessons created by this user
  const userPublicLessons = lessons.filter(
    (l) => (l.creatorId === user.id || l.creatorName === user.name) && l.visibility === 'Public'
  );

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser({ ...user, name, photo });
    showToast('Profile details updated successfully!', 'success');
  };

  return (
    <div className="space-y-10">
      
      {/* Profile Info Header Card */}
      <div className="bg-white dark:bg-[#292524] rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-700/80 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <img
              src={photo || user.photo}
              alt={name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-[#059669]/30 shadow-lg"
            />
            {user.isPremium && (
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-400 to-amber-600 text-white p-1.5 rounded-full shadow-lg">
                <Star className="w-4 h-4 fill-white text-white" />
              </div>
            )}
          </div>

          {/* Details & Form */}
          <div className="flex-1 w-full text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-3 mb-4">
              <div>
                <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 flex items-center justify-center md:justify-start space-x-2">
                  <span>{user.name}</span>
                  {user.isPremium && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFFBEB] text-[#B45309] border border-[#FCD34D]">
                      Premium ⭐
                    </span>
                  )}
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{user.email}</p>
              </div>

              {/* Stats Counters */}
              <div className="flex items-center space-x-4 bg-stone-50 dark:bg-stone-800/80 px-4 py-2 rounded-2xl border border-stone-200/80 dark:border-stone-700">
                <div className="text-center">
                  <p className="text-xs text-stone-400 uppercase tracking-wider font-bold">Created</p>
                  <p className="font-extrabold text-stone-900 dark:text-stone-100 text-base">{userPublicLessons.length}</p>
                </div>
                <div className="w-px h-6 bg-stone-200 dark:bg-stone-700" />
                <div className="text-center">
                  <p className="text-xs text-stone-400 uppercase tracking-wider font-bold">Saved</p>
                  <p className="font-extrabold text-stone-900 dark:text-stone-100 text-base">{favorites.length}</p>
                </div>
              </div>
            </div>

            {/* Form to Update Profile */}
            <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t border-stone-100 dark:border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1 text-left">
                  Display Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 text-xs font-semibold focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1 text-left">
                  Photo URL
                </label>
                <input
                  type="url"
                  required
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 text-xs font-semibold focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div className="sm:col-span-2 flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs shadow-md flex items-center space-x-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Profile</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

      {/* Grid of ALL Public Lessons Created by this User */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-stone-900 dark:text-stone-100">
            Public Wisdom Published by {user.name} ({userPublicLessons.length})
          </h3>
        </div>

        {userPublicLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 equal-card-grid">
            {userPublicLessons.map((lesson) => (
              <div key={lesson.id} className="h-full">
                <LessonCard lesson={lesson} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-[#292524] rounded-3xl border border-stone-200 dark:border-stone-700 text-stone-400 text-sm">
            You haven't published any public life lessons yet.
          </div>
        )}
      </section>

    </div>
  );
};
