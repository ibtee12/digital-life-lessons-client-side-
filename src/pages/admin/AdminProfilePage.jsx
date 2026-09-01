import React, { useState, useRef } from 'react';
import { ShieldCheck, User, Save, Award, Upload, Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminProfilePage = () => {
  const { user, setUser, showToast } = useAuth();
  const [name, setName] = useState(user.name);
  const [photo, setPhoto] = useState(user.photo);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

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
      showToast('Photo uploaded! Click "Save Admin Settings" to apply.', 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
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
      console.warn("Admin profile sync:", err.message);
    }

    setIsSaving(false);
    showToast('Admin profile updated successfully!', 'success');
  };

  return (
    <div className="max-w-3xl space-y-8">
      
      <div className="pb-4 border-b border-stone-200 dark:border-stone-800">
        <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 flex items-center space-x-2">
          <span>Admin Profile Settings</span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300">
            Administrator 🛡️
          </span>
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
          Manage system administrative profile details and view moderation statistics.
        </p>
      </div>

      <div className="bg-white dark:bg-[#292524] rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-700/80 shadow-sm space-y-6">
        
        {/* Admin Avatar with Upload */}
        <div className="flex items-center space-x-4 pb-6 border-b border-stone-100 dark:border-stone-800">
          <div className="relative group flex-shrink-0">
            <img 
              src={photo || user.photo} 
              alt={name} 
              referrerPolicy="no-referrer" 
              onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"; }} 
              className="w-20 h-20 rounded-full object-cover ring-4 ring-teal-500/30" 
            />
            {/* Upload Overlay */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all duration-200 cursor-pointer"
            >
              <Camera className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">{user.name}</h3>
            <p className="text-xs text-stone-500">{user.email}</p>
            <p className="text-[11px] font-semibold text-[#059669] mt-1">Platform Moderator Access Active</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1">
              Admin Display Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 text-sm font-semibold focus:outline-none focus:border-[#059669]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1.5">
              Profile Photo
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              {/* File Upload Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-[#1C1917] hover:border-teal-500 hover:bg-teal-50/50 dark:hover:bg-teal-950/20 transition-all text-xs font-semibold text-stone-600 dark:text-stone-400 cursor-pointer"
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
                  className="w-full h-11 px-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 text-sm font-semibold focus:outline-none focus:border-[#059669]"
                />
              </div>
            </div>
            <p className="text-[10px] text-stone-400 mt-1.5">Supported: PNG, JPG, GIF, WebP. Max 2MB.</p>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs shadow-md flex items-center space-x-1.5 disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Admin Settings'}</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};
