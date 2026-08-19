import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Heart, MessageSquare, Star, ShieldCheck, X, CheckCheck } from 'lucide-react';

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'like',
    title: 'New Reaction',
    message: 'Sarah Jenkins liked your lesson "The Power of Compounding Small Habits".',
    time: '5m ago',
    read: false,
    icon: Heart,
    iconColor: 'text-red-500 bg-red-50 dark:bg-red-950/40'
  },
  {
    id: 2,
    type: 'comment',
    title: 'Discussion Reply',
    message: 'David Kim left a reflection on your mistake learned in leadership.',
    time: '2h ago',
    read: false,
    icon: MessageSquare,
    iconColor: 'text-[#059669] bg-[#ECFDF5] dark:bg-[#059669]/20'
  },
  {
    id: 3,
    type: 'featured',
    title: 'Editorial Highlight',
    message: 'Your lesson was selected for the Weekly Featured Wisdom showcase!',
    time: '1d ago',
    read: true,
    icon: Star,
    iconColor: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20'
  },
  {
    id: 4,
    type: 'security',
    title: 'Profile Verified',
    message: 'Your author contributor status has been verified by platform administrators.',
    time: '3d ago',
    read: true,
    icon: ShieldCheck,
    iconColor: 'text-teal-500 bg-teal-50 dark:bg-teal-900/20'
  }
];

export const NotificationDrawer = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9990] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative z-10 w-full max-w-sm bg-white dark:bg-[#1C1917] h-full shadow-2xl border-l border-stone-200 dark:border-stone-800 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#ECFDF5] dark:bg-[#059669]/20 text-[#059669] flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-stone-900 dark:text-stone-100">
                    Notifications
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    {unreadCount > 0 ? `${unreadCount} unread messages` : 'All caught up'}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Actions Bar */}
            {unreadCount > 0 && (
              <div className="px-6 py-2.5 bg-stone-50 dark:bg-stone-900/60 border-b border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-500">Unread ({unreadCount})</span>
                <button
                  onClick={markAllAsRead}
                  className="text-[#059669] dark:text-[#34D399] font-bold hover:underline flex items-center space-x-1"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Mark all read</span>
                </button>
              </div>
            )}

            {/* List */}
            <div className="flex-1 overflow-y-auto divide-y divide-stone-100 dark:divide-stone-800/60 p-2">
              {notifications.length > 0 ? (
                notifications.map((n) => {
                  const Icon = n.icon;
                  return (
                    <div
                      key={n.id}
                      className={`p-4 rounded-2xl transition relative group ${
                        !n.read ? 'bg-emerald-50/40 dark:bg-emerald-950/10' : 'hover:bg-stone-50 dark:hover:bg-stone-800/40'
                      }`}
                    >
                      <div className="flex items-start space-x-3.5">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${n.iconColor}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0 pr-4">
                          <div className="flex items-center justify-between mb-0.5">
                            <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                              {n.title}
                            </h4>
                            <span className="text-[10px] text-stone-400">{n.time}</span>
                          </div>
                          <p className="text-xs text-stone-600 dark:text-stone-300 leading-snug">
                            {n.message}
                          </p>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeNotification(n.id)}
                        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-1 text-stone-400 hover:text-red-500 transition"
                        title="Dismiss notification"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="py-16 text-center text-stone-400 text-xs">
                  🎉 No notifications to show.
                </div>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
