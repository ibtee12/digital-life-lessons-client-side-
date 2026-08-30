import React, { useState } from "react";
import { Outlet, NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, BookOpen, PlusCircle, Heart, Star, ShieldAlert, Users, FileText, 
  LogOut, Menu, X, Sun, Moon, Bell, ArrowRight, Home, ShieldCheck
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { NotificationDrawer } from "../components/NotificationDrawer";

const UserAvatar = ({ user, className = "w-10 h-10" }) => {
  const [imgError, setImgError] = useState(false);
  const isAdmin = user?.role === "admin";
  const isPremium = user?.isPremium && !isAdmin;

  const getInitial = () => {
    if (user?.name && user.name.trim()) {
      return user.name.trim().charAt(0).toUpperCase();
    }
    if (user?.email && user.email.trim()) {
      return user.email.trim().charAt(0).toUpperCase();
    }
    return "U";
  };

  let glowClasses = "ring-2 ring-stone-200 dark:ring-stone-700 shadow-2xs";
  if (isAdmin) {
    glowClasses = "ring-2 ring-rose-500/70 shadow-[0_0_14px_rgba(244,63,94,0.45)] dark:shadow-[0_0_18px_rgba(244,63,94,0.55)]";
  } else if (isPremium) {
    glowClasses = "ring-2 ring-[#F59E0B] shadow-[0_0_16px_rgba(245,158,11,0.55)] dark:shadow-[0_0_22px_rgba(245,158,11,0.7)]";
  }

  return (
    <div className="relative inline-block flex-shrink-0">
      {user?.photo && !imgError ? (
        <img
          src={user.photo}
          alt={user.name || "User Profile"}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className={`${className} rounded-full object-cover ${glowClasses}`}
        />
      ) : (
        <div className={`${className} rounded-full ${isAdmin ? 'bg-gradient-to-tr from-rose-600 to-red-500' : 'bg-gradient-to-tr from-[#059669] to-[#0D9488]'} text-white flex items-center justify-center font-extrabold text-sm select-none ${glowClasses}`}>
          {getInitial()}
        </div>
      )}

      {isAdmin ? (
        <span 
          className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-red-400 text-white flex items-center justify-center text-[9px] font-black shadow-md border-2 border-white dark:border-[#1C1917]"
          title="Platform Administrator 🛡️"
        >
          🛡️
        </span>
      ) : isPremium ? (
        <span 
          className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-stone-900 flex items-center justify-center text-[9px] font-black shadow-md border-2 border-white dark:border-[#1C1917]"
          title="Premium VIP Member ⭐"
        >
          ⭐
        </span>
      ) : null}
    </div>
  );
};

export const DashboardLayout = () => {
  const { user, logoutUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setMobileDrawerOpen(false);
    await logoutUser();
    navigate("/login");
  };

  const userLinks = [
    { label: "Dashboard Home", path: "/dashboard", icon: LayoutDashboard },
    { label: "My Lessons", path: "/dashboard/my-lessons", icon: BookOpen },
    { label: "Add New Lesson", path: "/dashboard/add-lesson", icon: PlusCircle },
    { label: "Saved Favorites", path: "/dashboard/favorites", icon: Heart },
    { label: "My Profile Settings", path: "/dashboard/profile", icon: FileText },
  ];

  const adminLinks = [
    { label: "Admin Overview", path: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Manage All Lessons", path: "/dashboard/admin/lessons", icon: BookOpen },
    { label: "Manage Users", path: "/dashboard/admin/users", icon: Users },
    { label: "Reported Lessons", path: "/dashboard/admin/reports", icon: ShieldAlert },
    { label: "Admin Profile", path: "/dashboard/admin/profile", icon: FileText },
  ];

  const currentLinks = user?.role === "admin" ? adminLinks : userLinks;

  const getPageTitle = () => {
    const current = currentLinks.find((l) => l.path === location.pathname);
    return current ? current.label : "Workspace Dashboard";
  };

  return (
    <div className="min-h-screen flex bg-[#FAFAF9] dark:bg-[#0C0A09] text-[#1C1917] dark:text-[#FAFAF9]">
      
      {/* Desktop Fixed Left Sidebar */}
      <aside className="hidden lg:flex flex-col w-[280px] bg-white dark:bg-[#1C1917] border-r border-[#E7E5E4] dark:border-[#44403C] fixed inset-y-0 left-0 z-40 shadow-sm">
        
        {/* Brand Header — Fully Clickable to Home Page */}
        <div className="h-[72px] px-6 border-b border-[#E7E5E4] dark:border-[#44403C] flex items-center">
          <Link 
            to="/" 
            className="flex items-center space-x-2.5 group cursor-pointer w-full"
            title="Go to Home Page"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#059669] to-[#0D9488] p-2 flex items-center justify-center text-white shadow-md shadow-[#059669]/20 group-hover:scale-105 transition-transform flex-shrink-0">
              <svg className="w-full h-full fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
              </svg>
            </div>
            <span className="font-extrabold text-base tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-[#059669] dark:group-hover:text-[#34D399] transition-colors">
              Digital Life Lessons
            </span>
          </Link>
        </div>

        {/* Sidebar Nav Items */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
            {user?.role === "admin" ? "Management Panel" : "Member Workspace"}
          </p>

          {currentLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                end
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2.5 rounded-xl font-medium text-sm transition ${
                    isActive
                      ? "bg-[#ECFDF5] dark:bg-[#059669]/15 text-[#059669] dark:text-[#34D399] border-l-4 border-l-[#059669] font-bold"
                      : "text-[#57534E] dark:text-[#A8A29E] hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-100"
                  }`
                }
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#059669]" : "text-stone-400"}`} />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Beautiful "Back to Home Page" Button at Left Bottom */}
        <div className="p-3 border-t border-[#E7E5E4] dark:border-[#44403C]">
          <Link
            to="/"
            className="w-full p-2.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 dark:from-emerald-950/40 dark:via-teal-950/40 dark:to-emerald-950/40 border border-emerald-500/20 dark:border-emerald-500/30 text-stone-800 dark:text-stone-200 hover:border-emerald-500/50 hover:bg-emerald-500/15 transition-all group flex items-center justify-between shadow-2xs cursor-pointer"
            title="Return to main home page"
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-white dark:bg-[#1C1917] flex items-center justify-center text-[#059669] dark:text-[#34D399] shadow-xs group-hover:-translate-x-0.5 transition-transform">
                <Home className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-extrabold text-stone-900 dark:text-stone-100 group-hover:text-[#059669] dark:group-hover:text-[#34D399] transition-colors">
                  Back to Home Page
                </p>
                <p className="text-[10px] text-stone-400 font-medium">
                  Return to main website
                </p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 group-hover:text-[#059669] transition-all" />
          </Link>
        </div>

        {/* Bottom User Card */}
        <div className="p-4 border-t border-[#E7E5E4] dark:border-[#44403C] bg-stone-50 dark:bg-[#292524]/60">
          <div className="flex items-center space-x-3">
            <UserAvatar user={user} className="w-10 h-10 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                {user?.name || "User"}
              </p>
              <div className="flex items-center space-x-1.5 mt-0.5">
                {user?.isPremium ? (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                    <Star className="w-2.5 h-2.5 fill-amber-500 mr-0.5" /> Premium
                  </span>
                ) : (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-400">
                    Free Plan
                  </span>
                )}
                {user?.role === "admin" && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300">
                    Admin 🛡️
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg transition cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-1 lg:ml-[280px] flex flex-col min-w-0">
        
        {/* Dashboard Header */}
        <header className="h-[72px] bg-white dark:bg-[#1C1917] border-b border-[#E7E5E4] dark:border-[#44403C] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-extrabold text-stone-900 dark:text-stone-100">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notifications Button with Active Drawer */}
            <button 
              onClick={() => setNotificationsOpen(true)}
              className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 relative transition cursor-pointer"
              title="View Notifications"
              aria-label="Open notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#059669] ring-2 ring-white dark:ring-[#1C1917]" />
            </button>

            {/* Avatar */}
            <UserAvatar user={user} className="w-9 h-9 flex-shrink-0" />
          </div>
        </header>

        {/* Dashboard Body Outlet */}
        <main className="flex-1 p-4 sm:p-8 bg-[#FAFAF9] dark:bg-[#0C0A09]">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            onClick={() => setMobileDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="relative flex flex-col w-72 bg-white dark:bg-[#1C1917] h-full shadow-2xl p-6 z-10">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-200 dark:border-stone-800">
              <span className="font-extrabold text-base text-stone-900 dark:text-stone-100">
                Dashboard Menu
              </span>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1 flex-1 overflow-y-auto">
              {currentLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end
                    onClick={() => setMobileDrawerOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-3 py-2.5 rounded-xl font-medium text-sm transition ${
                        isActive
                          ? "bg-[#ECFDF5] dark:bg-[#059669]/20 text-[#059669] font-bold"
                          : "text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* Mobile Back to Home */}
            <div className="py-3 border-t border-stone-200 dark:border-stone-800">
              <Link
                to="/"
                onClick={() => setMobileDrawerOpen(false)}
                className="w-full p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-[#059669] dark:text-[#34D399] font-bold text-xs flex items-center justify-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>Back to Home Page</span>
              </Link>
            </div>

            <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 font-semibold text-xs cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Notification Drawer */}
      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

    </div>
  );
};
