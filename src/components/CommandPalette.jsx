import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Compass, ArrowRight, LayoutDashboard, PlusCircle, User, Star, X, Tag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { lessons, user } = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Global Keyboard Shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const quickNav = [
    { title: 'Explore Public Wisdom', path: '/lessons', icon: Compass, category: 'Navigation' },
    { title: 'Create Life Lesson Entry', path: '/dashboard/add-lesson', icon: PlusCircle, category: 'Actions' },
    { title: 'User Dashboard', path: '/dashboard', icon: LayoutDashboard, category: 'Navigation' },
    { title: 'Pricing & Membership', path: '/pricing', icon: Star, category: 'Navigation' },
    { title: 'My Profile Settings', path: '/dashboard/profile', icon: User, category: 'Navigation' },
  ];

  const filteredNav = quickNav.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const filteredLessons = lessons.filter((l) =>
    l.title.toLowerCase().includes(query.toLowerCase()) ||
    l.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* Floating Shortcut Trigger Pill (Visible on Desktop) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-40 hidden md:flex items-center space-x-2 px-3.5 py-2 rounded-2xl bg-white/90 dark:bg-[#292524]/90 border border-stone-200 dark:border-stone-700/80 shadow-xl backdrop-blur-md text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-[#059669] hover:border-[#059669] transition"
      >
        <Search className="w-3.5 h-3.5" />
        <span>Quick Jump</span>
        <kbd className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-[10px] text-stone-400 font-mono border border-stone-200 dark:border-stone-700">
          ⌘K
        </kbd>
      </button>

      {/* Modal Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9995] flex items-start justify-center pt-20 sm:pt-28 p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-[#1C1917] rounded-3xl border border-stone-200 dark:border-stone-700 shadow-2xl max-w-xl w-full overflow-hidden"
            >
              {/* Search Bar Input */}
              <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center space-x-3">
                <Search className="w-5 h-5 text-[#059669] flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search lessons, wisdom domains, or jump to page..."
                  className="flex-1 bg-transparent text-sm sm:text-base font-medium text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Results List */}
              <div className="max-h-80 overflow-y-auto p-3 space-y-4">
                
                {/* Navigation Matches */}
                {filteredNav.length > 0 && (
                  <div>
                    <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                      Quick Links
                    </p>
                    <div className="space-y-1">
                      {filteredNav.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelect(item.path)}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-stone-100 dark:hover:bg-stone-800/80 transition group"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 group-hover:text-[#059669] group-hover:bg-[#ECFDF5] dark:group-hover:bg-[#059669]/20 transition">
                                <Icon className="w-4 h-4" />
                              </div>
                              <span className="text-sm font-semibold text-stone-800 dark:text-stone-200 group-hover:text-[#059669]">
                                {item.title}
                              </span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Lesson Matches */}
                {filteredLessons.length > 0 && (
                  <div>
                    <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                      Life Lessons ({filteredLessons.length})
                    </p>
                    <div className="space-y-1">
                      {filteredLessons.slice(0, 5).map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => handleSelect(`/lessons/${lesson.id}`)}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-stone-100 dark:hover:bg-stone-800/80 transition group"
                        >
                          <div className="flex items-center space-x-3 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] dark:bg-[#059669]/20 flex items-center justify-center text-[#059669] flex-shrink-0">
                              <BookOpen className="w-4 h-4" />
                            </div>
                            <div className="truncate">
                              <p className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate group-hover:text-[#059669]">
                                {lesson.title}
                              </p>
                              <p className="text-xs text-stone-400">
                                {lesson.category} • {lesson.creatorName}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-stone-400 flex-shrink-0 ml-2">
                            {lesson.accessLevel}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {filteredNav.length === 0 && filteredLessons.length === 0 && (
                  <div className="py-8 text-center text-stone-400 text-xs">
                    No results found for "{query}".
                  </div>
                )}

              </div>

              {/* Bottom Footer Hint */}
              <div className="p-3 bg-stone-50 dark:bg-stone-900/60 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
                <span>Navigation shortcut</span>
                <span className="font-mono">Press <kbd className="px-1 py-0.5 rounded bg-stone-200 dark:bg-stone-800">ESC</kbd> to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
