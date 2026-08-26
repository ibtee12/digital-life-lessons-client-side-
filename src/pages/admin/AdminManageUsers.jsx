import React from 'react';
import { ShieldCheck, User, Trash2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminManageUsers = () => {
  const { allUsers, lessons, toggleUserRole, deletePlatformUser } = useAuth();

  const usersList = allUsers || [];

  // Helper to compute EXACT real lessons authored by each user
  const getUserLessonCount = (userObj) => {
    return lessons.filter((l) => 
      l.creatorId === userObj.id || 
      l.creatorName?.toLowerCase() === userObj.name?.toLowerCase() ||
      (l.creatorId && userObj.uid && l.creatorId === userObj.uid)
    ).length;
  };

  return (
    <div className="space-y-6">
      
      <div className="pb-4 border-b border-stone-200 dark:border-stone-800">
        <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">
          Manage Users ({usersList.length})
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
          Real-time member registry. Promote community members to platform administrators or delete accounts.
        </p>
      </div>

      <div className="bg-white dark:bg-[#292524] rounded-3xl border border-stone-200 dark:border-stone-700/80 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-100 dark:bg-stone-800/80 text-[11px] font-extrabold uppercase tracking-wider text-stone-600 dark:text-stone-400 border-b border-stone-200 dark:border-stone-700">
                <th className="py-4 px-6">User Details</th>
                <th className="py-4 px-4">Role</th>
                <th className="py-4 px-4">Subscription</th>
                <th className="py-4 px-4">Authored Lessons</th>
                <th className="py-4 px-6 text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-sm">
              {usersList.map((u) => {
                const count = getUserLessonCount(u);
                return (
                  <tr key={u.id || u.email} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/40 transition">
                    
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={u.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"} 
                          alt={u.name} 
                          className="w-9 h-9 rounded-full object-cover border border-stone-200 dark:border-stone-700" 
                        />
                        <div>
                          <p className="font-bold text-stone-900 dark:text-stone-100">{u.name || "User"}</p>
                          <p className="text-xs text-stone-400">{u.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        u.role === 'admin' ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300' : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
                      }`}>
                        {u.role === 'admin' ? 'Admin 🛡️' : 'User'}
                      </span>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        u.isPremium ? 'bg-[#FFFBEB] text-[#B45309] border border-[#FCD34D]' : 'bg-stone-100 text-stone-500'
                      }`}>
                        {u.isPremium ? 'Premium ⭐' : 'Free'}
                      </span>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap font-bold text-stone-800 dark:text-stone-200">
                      {count} {count === 1 ? 'lesson' : 'lessons'}
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap text-right space-x-2">
                      <button
                        onClick={() => toggleUserRole(u.id)}
                        className="px-3 py-1 rounded-lg border border-stone-300 dark:border-stone-700 font-semibold text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
                      >
                        {u.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
                      </button>
                      <button
                        onClick={() => deletePlatformUser(u.id)}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition inline-block cursor-pointer"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
