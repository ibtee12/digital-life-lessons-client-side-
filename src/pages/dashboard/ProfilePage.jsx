import React, { useState, useRef } from 'react';
import { Star, User, Mail, Image, Save, BookOpen, Bookmark, Upload, Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { LessonCard } from '../../components/LessonCard';

export const ProfilePage = () => {
  const { user, setUser, lessons, favorites, showToast } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [photo, setPhoto] = useState(user?.photo || '');
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

  // Lessons created by this user
  const userPublicLessons = (lessons || []).filter(
    (l) => ((user?.id && l.creatorId === user.id) || (user?.name && l.creatorName === user.name)) && l.visibility === 'Public'
  );

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, GIF, WebP).', 'error');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      showToast('Image too large. Maximum file size is 2MB.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setPhoto(event.target.result);
      showToast('Photo uploaded! Click "Update Profile" to save.', 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const updatedUser = { ...user, name, photo };
    setUser(updatedUser);

    try {
      localStorage.setItem("dll_user", JSON.stringify(updatedUser));
    } catch (e) {}

    // Sync to MongoDB Atlas
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      await fetch(`${apiUrl}/auth/sync-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.id,
          email: user.email,
          name: name,
          photo: photo,
          role: user.role,
          isPremium: user.isPremium
        })
      });
    } catch (err) {
      console.warn("Profile sync to database:", err.message);
    }

    setIsSaving(false);
    showToast('Profile updated successfully!', 'success');
  };

  return (
    <div className="space-y-10">
      
      {/* Profile Info Header Card */}
      <div className="bg-white dark:bg-[#292524] rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-700/80 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          
          {/* Avatar with Upload */}
          <div className="relative flex-shrink-0 group">
            <img
              src={photo || user?.photo || ''}
              alt={name}
              referrerPolicy="no-referrer"
              onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"; }}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-[#059669]/30 shadow-lg"
            />
            {user?.isPremium && (
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-400 to-amber-600 text-white p-1.5 rounded-full shadow-lg">
                <Star className="w-4 h-4 fill-white text-white" />
              </div>
            )}
            {/* Upload Overlay */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all duration-200 cursor-pointer"
            >
              <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* Details & Form */}
          <div className="flex-1 w-full text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-3 mb-4">
              <div>
                <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 flex items-center justify-center md:justify-start space-x-2">
                  <span>{user.name}</span>
                  {user?.isPremium && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFFBEB] text-[#B45309] border border-[#FCD34D]">
                      Premium ⭐
                    </span>
                  )}
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{user?.email}</p>
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
            <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t border-stone-100 dark:border-stone-800 space-y-4">
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
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5 text-left">
                  Profile Photo
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* File Upload Button */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-[#1C1917] hover:border-[#059669] hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-all text-xs font-semibold text-stone-600 dark:text-stone-400 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload from Device</span>
                  </button>
                  {/* Or URL input */}
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Or paste image URL here..."
                      value={photo?.startsWith('data:') ? '' : photo}
                      onChange={(e) => setPhoto(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 text-xs font-semibold focus:outline-none focus:border-[#059669]"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-stone-400 mt-1.5">Supported: PNG, JPG, GIF, WebP. Max 2MB.</p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs shadow-md flex items-center space-x-1.5 disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? 'Saving...' : 'Update Profile'}</span>
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
