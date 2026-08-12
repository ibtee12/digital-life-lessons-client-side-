import React from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, Flag, Award, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { CategoryBadge, AccessBadge } from '../../components/Badge';

const PLATFORM_GROWTH = [
  { month: 'Jan', users: 120, lessons: 340 },
  { month: 'Feb', users: 210, lessons: 520 },
  { month: 'Mar', users: 340, lessons: 810 },
  { month: 'Apr', users: 510, lessons: 1200 },
  { month: 'May', users: 780, lessons: 1890 },
  { month: 'Jun', users: 1050, lessons: 2450 },
  { month: 'Jul', users: 1420, lessons: 3100 },
];

export const AdminDashboardHome = () => {
  const { lessons, reports } = useAuth();

  const totalPublicLessons = lessons.filter((l) => l.visibility === 'Public').length;
  const totalReported = reports.length;

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1C1917] via-[#292524] to-[#44403C] text-white shadow-xl flex items-center justify-between">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#059669] text-white mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Platform Admin Panel</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            System Overview & Moderation
          </h2>
          <p className="text-sm text-stone-300 mt-1">
            Monitor user growth, review reported content, and feature top wisdom entries.
          </p>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="p-6 rounded-2xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400">Total Users</p>
            <h3 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">1,420</h3>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">+18% this month</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400">Public Lessons</p>
            <h3 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">{totalPublicLessons}</h3>
            <p className="text-[11px] text-stone-500 mt-1">Platform wide entries</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] dark:bg-[#059669]/20 text-[#059669] flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400">Reported Content</p>
            <h3 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">{totalReported}</h3>
            <p className="text-[11px] text-red-500 font-semibold mt-1">Needs review</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/30 text-red-500 flex items-center justify-center">
            <Flag className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400">New Today</p>
            <h3 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">14</h3>
            <p className="text-[11px] text-stone-500 mt-1">Submitted lessons</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-amber-500 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Platform Growth Bar Chart */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Platform Content & User Growth
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Monthly breakdown of published life lessons across all categories.
            </p>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={PLATFORM_GROWTH}>
              <XAxis dataKey="month" stroke="#A8A29E" fontSize={12} tickLine={false} />
              <YAxis stroke="#A8A29E" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1C1917',
                  borderColor: '#44403C',
                  borderRadius: '12px',
                  color: '#FAFAF9',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="lessons" fill="#059669" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Admin Quick Action Shortcuts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/dashboard/admin/manage-users"
          className="p-6 rounded-2xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 hover:border-[#059669] shadow-sm transition group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center mb-4">
            <Users className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base mb-1 group-hover:text-[#059669] transition">
            Manage Platform Users
          </h4>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Promote user roles to admin or manage user accounts.
          </p>
        </Link>

        <Link
          to="/dashboard/admin/manage-lessons"
          className="p-6 rounded-2xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 hover:border-[#059669] shadow-sm transition group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] dark:bg-[#059669]/20 text-[#059669] flex items-center justify-center mb-4">
            <BookOpen className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base mb-1 group-hover:text-[#059669] transition">
            Manage All Lessons
          </h4>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Mark lessons as featured, review content, or delete entries.
          </p>
        </Link>

        <Link
          to="/dashboard/admin/reported-lessons"
          className="p-6 rounded-2xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 hover:border-[#059669] shadow-sm transition group"
        >
          <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-500 flex items-center justify-center mb-4">
            <Flag className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base mb-1 group-hover:text-[#059669] transition">
            Reported Content ({totalReported})
          </h4>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            View user flag reasons and take moderation action.
          </p>
        </Link>
      </div>

    </div>
  );
};
