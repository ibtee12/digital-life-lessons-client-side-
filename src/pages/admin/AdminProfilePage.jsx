import React, { useState } from 'react';
import { ShieldCheck, User, Save, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminProfilePage = () => {
  const { user, setUser, showToast } = useAuth();
  const [name, setName] = useState(user.name);
  const [photo, setPhoto] = useState(user.photo);

  const handleSave = (e) => {
    e.preventDefault();
    setUser({ ...user, name, photo });
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
        
        <div className="flex items-center space-x-4 pb-6 border-b border-stone-100 dark:border-stone-800">
          <img src={photo || user.photo} alt={name} className="w-20 h-20 rounded-full object-cover ring-4 ring-teal-500/30" />
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
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1">
              Avatar Image URL
            </label>
            <input
              type="url"
              required
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 text-sm font-semibold focus:outline-none focus:border-[#059669]"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs shadow-md flex items-center space-x-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Admin Settings</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};
