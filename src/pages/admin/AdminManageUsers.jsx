import React, { useState } from 'react';
import { ShieldCheck, User, Trash2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const MOCK_USERS = [
  { id: 'u-1', name: 'Marcus Vance', email: 'marcus@example.com', role: 'user', isPremium: false, lessonsCount: 14, photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
  { id: 'u-2', name: 'Elena Rostova', email: 'elena@example.com', role: 'admin', isPremium: true, lessonsCount: 22, photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
  { id: 'u-3', name: 'Julian Hayes', email: 'julian@example.com', role: 'user', isPremium: false, lessonsCount: 8, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
  { id: 'u-4', name: 'Aria Chen', email: 'aria@example.com', role: 'user', isPremium: true, lessonsCount: 19, photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80' },
  { id: 'u-5', name: 'Nahyan Ahmed', email: 'nahyan@example.com', role: 'admin', isPremium: true, lessonsCount: 12, photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80' }
];

export const AdminManageUsers = () => {
  const { showToast } = useAuth();
  const [usersList, setUsersList] = useState(MOCK_USERS);

  const toggleRole = (userId) => {
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newRole = u.role === 'admin' ? 'user' : 'admin';
          showToast(`User role updated to ${newRole.toUpperCase()}`, 'success');
          return { ...u, role: newRole };
        }
        return u;
      })
    );
  };

  const deleteUser = (userId) => {
    setUsersList((prev) => prev.filter((u) => u.id !== userId));
    showToast('User account deleted', 'info');
  };

  return (
    <div className="space-y-6">
      
      <div className="pb-4 border-b border-stone-200 dark:border-stone-800">
        <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">
          Manage Users ({usersList.length})
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
          Promote community members to platform administrators or delete accounts.
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
                <th className="py-4 px-4">Total Lessons</th>
                <th className="py-4 px-6 text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-sm">
              {usersList.map((u) => (
                <tr key={u.id} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/40 transition">
                  
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <img src={u.photo} alt={u.name} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <p className="font-bold text-stone-900 dark:text-stone-100">{u.name}</p>
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
                    {u.lessonsCount} lessons
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap text-right space-x-2">
                    <button
                      onClick={() => toggleRole(u.id)}
                      className="px-3 py-1 rounded-lg border border-stone-300 dark:border-stone-700 font-semibold text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                    >
                      {u.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
                    </button>
                    <button
                      onClick={() => deleteUser(u.id)}
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition inline-block"
                      title="Delete User"
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
