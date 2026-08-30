import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sun, Moon, Menu, X, Star, User, LayoutDashboard, LogOut, ShieldCheck, 
  ChevronDown, Bell, Settings
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { NotificationDrawer } from "./NotificationDrawer";

const UserAvatar = ({ user, className = "w-9 h-9" }) => {
  const [imgError, setImgError] = useState(false);
  const isAdmin = user?.role === "admin";
  const isPremium = user?.isPremium && !isAdmin;

  const getInitial = () => {
    if (user?.name && user?.name.trim()) {
      return user?.name.trim().charAt(0).toUpperCase();
    }
    if (user?.email && user?.email.trim()) {
      return user?.email.trim().charAt(0).toUpperCase();
    }
    return "U";
  };

  // Distinct glowing rings: Light Rose/Crimson for Admin, Golden for Premium, Subtle for Standard
  let glowClasses = "border border-stone-200 dark:border-stone-700 shadow-2xs";
  if (isAdmin) {
    glowClasses = "ring-2 ring-rose-500/70 shadow-[0_0_14px_rgba(244,63,94,0.45)] dark:shadow-[0_0_18px_rgba(244,63,94,0.55)]";
  } else if (isPremium) {
    glowClasses = "ring-2 ring-[#F59E0B] shadow-[0_0_15px_rgba(245,158,11,0.55)] dark:shadow-[0_0_20px_rgba(245,158,11,0.7)]";
  }

  return (
    <div className="relative inline-block flex-shrink-0">
      {user?.photo && !imgError ? (
        <img
          src={user.photo}
          alt={user?.name || "User Profile"}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className={`${className} rounded-full object-cover ${glowClasses}`}
        />
      ) : (
        <div className={`${className} rounded-full ${isAdmin ? 'bg-gradient-to-tr from-rose-600 to-red-500' : 'bg-gradient-to-tr from-[#059669] to-[#0D9488]'} text-white flex items-center justify-center font-extrabold text-sm select-none ${glowClasses}`}>
          {getInitial()}
        </div>
      )}

      {/* Floating Badge: Shield for Admin, Star for Premium */}
      {isAdmin ? (
        <span 
          className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-red-400 text-white flex items-center justify-center text-[8px] font-black shadow-md border-2 border-white dark:border-[#1C1917]"
          title="Platform Administrator 🛡️"
        >
          🛡️
        </span>
      ) : isPremium ? (
        <span 
          className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-stone-900 flex items-center justify-center text-[8px] font-black shadow-md border-2 border-white dark:border-[#1C1917]"
          title="Premium VIP Member ⭐"
        >
          ⭐
        </span>
      ) : null}
    </div>
  );
};

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logoutUser } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    if (userDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [userDropdownOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location]);

  const handleLogout = async (e) => {
    if (e) e.preventDefault();
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    await logoutUser();
  };

  // Clean, consistent public navigation links
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Public Lessons", path: "/lessons" },
    { label: "Pricing", path: "/pricing" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] h-[72px] transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAFAF9]/80 dark:bg-[#0C0A09]/80 glass-nav border-b border-[#E7E5E4] dark:border-[#44403C] shadow-xs"
          : "bg-[#FAFAF9] dark:bg-[#0C0A09] border-b border-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <Link to="/" className="flex items-center space-x-2.5 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#059669] to-[#0D9488] p-2 flex items-center justify-center text-white shadow-md shadow-[#059669]/20 group-hover:scale-105 transition-transform">
            <svg className="w-full h-full fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
            </svg>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-[#1C1917] dark:text-[#FAFAF9] group-hover:text-[#059669] transition-colors">
            Digital Life Lessons
          </span>
        </Link>

        {/* Desktop Nav Links: Clean Home, Public Lessons, Pricing */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative py-1 font-medium text-sm transition-colors duration-200 ${
                    isActive
                      ? "text-[#059669] dark:text-[#34D399] font-bold"
                      : "text-[#57534E] dark:text-[#A8A29E] hover:text-[#059669] dark:hover:text-[#34D399]"
                  }`
                }
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-dot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#059669]"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
              </NavLink>
            );
          })}

          {/* Member Status Badge: Admin 🛡️ or Premium ⭐ */}
          {user?.isLoggedIn && user?.role === "admin" ? (
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/50 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span>Admin 🛡️</span>
            </span>
          ) : user?.isLoggedIn && user?.isPremium ? (
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-[#FFFBEB] dark:bg-[#F59E0B]/20 text-[#B45309] dark:text-[#FBBF24] border border-[#FCD34D] dark:border-[#F59E0B]/40 shadow-2xs">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Premium ⭐</span>
            </span>
          ) : null}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          
          {/* Notification Center Bell */}
          <button
            onClick={() => setNotificationsOpen(true)}
            className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition relative cursor-pointer"
            aria-label="Open notifications"
            title="Notifications"
          >
            <Bell className="w-5 h-5 text-stone-600 dark:text-stone-300" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#059669] ring-2 ring-white dark:ring-[#0C0A09]" />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
            aria-label="Toggle Theme"
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-stone-600" />}
          </button>

          {/* User Auth Controls */}
          {user?.isLoggedIn ? (
            <div className="relative flex items-center space-x-2.5" ref={dropdownRef}>
              
              {/* Dedicated Dashboard Button */}
              <Link
                to={user?.role === "admin" ? "/dashboard/admin" : "/dashboard"}
                className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#ECFDF5] dark:bg-[#059669]/15 text-[#059669] dark:text-[#34D399] border border-emerald-500/20 font-bold text-xs hover:bg-[#059669] hover:text-white transition shadow-2xs cursor-pointer"
              >
                {user?.role === "admin" ? <ShieldCheck className="w-3.5 h-3.5" /> : <LayoutDashboard className="w-3.5 h-3.5" />}
                <span>{user?.role === "admin" ? "Admin Panel" : "Dashboard"}</span>
              </Link>

              {/* Avatar Dropdown Trigger */}
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center p-0.5 rounded-full border border-stone-200 dark:border-stone-700 hover:ring-2 hover:ring-[#059669]/30 transition cursor-pointer"
                title="User Profile Menu"
              >
                <UserAvatar user={user} className="w-9 h-9" />
              </button>

              {/* Clean, Minimal Profile Dropdown */}
              {userDropdownOpen && (
                <div className="absolute right-0 top-12 mt-1 w-56 rounded-2xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700 shadow-2xl p-2 z-50 text-sm">
                  
                  {/* User Profile Header */}
                  <div className="px-3 py-2.5 border-b border-stone-100 dark:border-stone-800 mb-1 flex items-center space-x-2.5">
                    <UserAvatar user={user} className="w-8 h-8 flex-shrink-0" />
                    <div className="overflow-hidden">
                      <div className="flex items-center space-x-1.5">
                        <p className="font-bold text-xs text-stone-900 dark:text-stone-100 truncate">{user?.name || "User"}</p>
                        {user?.role === "admin" && (
                          <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300">
                            Admin
                          </span>
                        )}
                        {user?.isPremium && user.role !== "admin" && (
                          <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
                            ⭐
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-400 truncate">{user?.email}</p>
                    </div>
                  </div>

                  {/* Profile Link */}
                  <Link
                    to={user?.role === "admin" ? "/dashboard/admin/profile" : "/dashboard/profile"}
                    className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 font-medium text-xs transition"
                  >
                    <User className="w-4 h-4 text-[#059669]" />
                    <span>My Profile</span>
                  </Link>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 font-semibold text-xs transition cursor-pointer mt-0.5 border-t border-stone-100 dark:border-stone-800/80 pt-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center space-x-3">
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg text-sm font-semibold text-[#1C1917] dark:text-[#FAFAF9] hover:text-[#059669] transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-sm font-semibold shadow-md shadow-[#059669]/20 transition"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-[#1C1917] z-[1001] shadow-2xl p-6 flex flex-col justify-between md:hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200 dark:border-stone-800">
                <span className="font-extrabold text-lg text-stone-900 dark:text-stone-100">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block text-base font-semibold text-stone-700 dark:text-stone-300 hover:text-[#059669]"
                  >
                    {link.label}
                  </Link>
                ))}

                {user?.isLoggedIn && (
                  <Link
                    to={user?.role === "admin" ? "/dashboard/admin" : "/dashboard"}
                    className="block text-base font-bold text-[#059669]"
                  >
                    {user?.role === "admin" ? "Admin Panel" : "Dashboard"}
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile Footer Auth Actions */}
            <div className="pt-6 border-t border-stone-200 dark:border-stone-800">
              {user?.isLoggedIn ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <UserAvatar user={user} className="w-10 h-10 flex-shrink-0" />
                    <div className="overflow-hidden">
                      <p className="font-bold text-sm text-stone-900 dark:text-stone-100 truncate">{user?.name || "User"}</p>
                      <p className="text-xs text-stone-500 truncate">{user?.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full py-2.5 rounded-lg border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 font-semibold text-sm cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    className="py-2.5 text-center rounded-lg border border-stone-300 dark:border-stone-700 font-semibold text-sm"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="py-2.5 text-center rounded-lg bg-[#059669] text-white font-semibold text-sm shadow-md"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Notification Drawer */}
      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
    </header>
  );
};
