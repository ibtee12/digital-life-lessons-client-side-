import React, { useState, useEffect } from 'react';
import { ShieldCheck, User, Trash2, CheckCircle2, RefreshCw, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminManageUsers = () => {
  const { allUsers, lessons, toggleUserRole, deletePlatformUser, showToast } = useAuth();
  const [usersList, setUsersList] = useState(allUsers || []);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDatabaseUsers = async () => {
    setIsLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${apiUrl}/admin/users`, {
        headers: {
          "x-admin-email": "admin@digitallife.com"
        }
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.users) && data.users.length > 0) {
        // Map MongoDB format to client format
        const formatted = data.users.map(u => ({
          id: u._id || u.uid || u.id,
          uid: u.uid || u._id,
          name: u.name || (u.email ? u.email.split("@")[0] : "Member"),
          email: u.email,
          photo: u.photo || u.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
          role: u.role || (u.email?.toLowerCase() === "admin@digitallife.com" ? "admin" : "user"),
          isPremium: u.isPremium || false
        }));
        setUsersList(formatted);
      }
    } catch (err) {
      console.warn("Using local context users:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDatabaseUsers();
  }, []);

  // Helper to compute EXACT real lessons authored by each user
  const getUserLessonCount = (userObj) => {
    if (!lessons || !Array.isArray(lessons)) return 0;
    return lessons.filter((l) => 
      (l.creatorId && userObj.id && l.creatorId === userObj.id) || 
      (l.creatorId && userObj.uid && l.creatorId === userObj.uid) ||
      (l.creatorEmail && userObj.email && l.creatorEmail.toLowerCase() === userObj.email.toLowerCase()) ||
      (l.creatorName && userObj.name && l.creatorName.toLowerCase() === userObj.name.toLowerCase())
    ).length;
  };

  const handleToggleRole = async (targetUser) => {
    if (targetUser.email?.toLowerCase().trim() === "admin@digitallife.com") {
      showToast("Primary Platform Administrator role is permanent.", "info");
      return;
    }

    const newRole = targetUser.role === "admin" ? "user" : "admin";

    // Optimistic UI update
    setUsersList(prev => prev.map(u => (u.id === targetUser.id || u.email === targetUser.email) ? { ...u, role: newRole } : u));
    toggleUserRole(targetUser.id);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      await fetch(`${apiUrl}/admin/users/${targetUser.id}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-email": "admin@digitallife.com"
        },
        body: JSON.stringify({ role: newRole })
      });
    } catch (e) {}
  };

  const handleDeleteUser = async (targetUser) => {
    if (targetUser.email?.toLowerCase().trim() === "admin@digitallife.com") {
      showToast("Cannot delete the Primary Administrator account.", "error");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete user account "${targetUser.name || targetUser.email}"?`)) {
      return;
    }

    setUsersList(prev => prev.filter(u => u.id !== targetUser.id && u.email !== targetUser.email));
    deletePlatformUser(targetUser.id);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      await fetch(`${apiUrl}/admin/users/${targetUser.id}`, {
        method: "DELETE",
        headers: {
          "x-admin-email": "admin@digitallife.com"
        }
      });
    } catch (e) {}
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">
            Manage Users ({usersList.length})
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Real-time database member registry. Manage roles, subscriptions, and access permissions.
          </p>
        </div>

        <button
          onClick={fetchDatabaseUsers}
          disabled={isLoading}
          className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 text-xs font-bold transition cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-[#059669]" : ""}`} />
          <span>{isLoading ? "Syncing..." : "Sync Database"}</span>
        </button>
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
                const isSuperAdmin = u.email?.toLowerCase().trim() === "admin@digitallife.com";

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
                          <p className="font-bold text-stone-900 dark:text-stone-100 flex items-center space-x-1.5">
                            <span>{u.name || "User"}</span>
                            {isSuperAdmin && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 font-extrabold">
                                Primary Admin 🛡️
                              </span>
                            )}
                          </p>
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
                      <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        u.isPremium ? 'bg-[#FFFBEB] text-[#B45309] border border-[#FCD34D]' : 'bg-stone-100 text-stone-500'
                      }`}>
                        {u.isPremium && <Star className="w-3 h-3 fill-amber-500 text-amber-500" />}
                        <span>{u.isPremium ? 'Premium VIP ⭐' : 'Free Plan'}</span>
                      </span>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap font-bold text-stone-800 dark:text-stone-200">
                      {count} {count === 1 ? 'lesson' : 'lessons'}
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap text-right space-x-2">
                      {!isSuperAdmin ? (
                        <>
                          <button
                            onClick={() => handleToggleRole(u)}
                            className="px-3 py-1 rounded-lg border border-stone-300 dark:border-stone-700 font-semibold text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
                          >
                            {u.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(u)}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition inline-block cursor-pointer"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-stone-400 italic">Protected Account</span>
                      )}
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
