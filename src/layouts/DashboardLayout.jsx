import React, { useState } from "react";
import { Outlet, NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, BookOpen, PlusCircle, Heart, Star, ShieldAlert, Users, FileText, 
  LogOut, Menu, X, Sun, Moon, Bell, ArrowLeft
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const UserAvatar = ({ user, className = "w-10 h-10" }) => {
  const [imgError, setImgError] = useState(false);

  const getInitial = () => {
    if (user?.name && user.name.trim()) {
      return user.name.trim().charAt(0).toUpperCase();
    }
    if (user?.email && user.email.trim()) {
      return user.email.trim().charAt(0).toUpperCase();
    }
    return "U";
  };

  if (user?.photo && !imgError) {
    return (
      <img
        src={user.photo}
        alt={user.name || "User Profile"}
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        className={`${className} rounded-full object-cover ring-2 ring-stone-200 dark:ring-stone-700 shadow-2xs`}
      />
    );
  }

  return (
    <div className={`${className} rounded-full bg-gradient-to-tr from-[#059669] to-[#0D9488] text-white flex items-center justify-center font-extrabold text-sm ring-2 ring-stone-200 dark:ring-stone-700 shadow-2xs select-none`}>
      {getInitial()}
    </div>
  );
};

export const DashboardLayout = () => {
  const { user, logoutUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
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

  const currentLinks = user.role === "admin" ? adminLinks : userLinks;

  const getPageTitle = () => {
    const current = currentLinks.find((l) => l.path === location.pathname);
    return current ? current.label : "Workspace Dashboard";
  };

  return (
    <div className="min-h-screen flex bg-[#FAFAF9] dark:bg-[#0C0A09] text-[#1C1917] dark:text-[#FAFAF9]">
      
      {/* Desktop Fixed Left Sidebar */}
      <aside className="hidden lg:flex flex-col w-[280px] bg-white dark:bg-[#1C1917] border-r border-[#E7E5E4] dark:border-[#44403C] fixed inset-y-0 left-0 z-40 shadow-sm">
        
        {/* Brand Header */}
        <div className="h-[72px] px-6 border-b border-[#E7E5E4] dark:border-[#44403C] flex items-center">
          <Link to="/" className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#059669] to-[#0D9488] p-1.5 flex items-center justify-center text-white shadow-sm">
              <svg className="w-full h-full fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
              </svg>
            </div>
            <span className="font-extrabold text-base tracking-tight text-stone-900 dark:text-stone-100">
              Digital Life Lessons
            </span>
          </Link>
        </div>

        {/* Sidebar Nav Items */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
            {user.role === "admin" ? "Management Panel" : "Member Workspace"}
          </p>

          {currentLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.path}
                to={link.path}
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

        {/* Back to Public Site Link */}
        <div className="px-4 py-2 border-t border-[#E7E5E4] dark:border-[#44403C]">
          <Link
            to="/"
            className="flex items-center space-x-2 text-xs font-semibold text-stone-500 hover:text-[#059669] py-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Main Website</span>
          </Link>
        </div>

        {/* Bottom User Card */}
        <div className="p-4 border-t border-[#E7E5E4] dark:border-[#44403C] bg-stone-50 dark:bg-[#292524]/60">
          <div className="flex items-center space-x-3">
            <UserAvatar user={user} className="w-10 h-10 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                {user.name || "User"}
              </p>
              <div className="flex items-center space-x-1.5 mt-0.5">
                {user.isPremium ? (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                    <Star className="w-2.5 h-2.5 fill-amber-500 mr-0.5" /> Premium
                  </span>
                ) : (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-400">
                    Free Plan
                  </span>
                )}
                {user.role === "admin" && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300">
                    Admin
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

            {/* Notifications */}
            <button className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 relative transition cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#059669]" />
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

            <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
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

    </div>
  );
};
