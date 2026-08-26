import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Bookmark, Heart, Eye, PlusCircle, ArrowRight, Flame, TrendingUp, Sparkles, FileText
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { AccessBadge, CategoryBadge } from '../../components/Badge';
import { ActivityHeatmap } from '../../components/dashboard/ActivityHeatmap';

export const DashboardHome = () => {
  const { user, lessons, favorites } = useAuth();

  // User created lessons
  const myLessons = useMemo(() => {
    return lessons.filter((l) => l.creatorId === user.id || l.creatorName === user.name);
  }, [lessons, user]);

  // Total metrics
  const totalCreated = myLessons.length;
  const totalSaved = favorites.length;
  const totalLikesReceived = myLessons.reduce((acc, l) => acc + (l.likesCount || 0), 0);
  const streakDays = totalCreated > 0 ? Math.min(totalCreated + 1, 30) : 0;

  // Calculate dynamic weekly distribution from lessons
  const weeklyData = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const counts = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
    const views = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };

    lessons.forEach(l => {
      const d = new Date(l.createdAt || Date.now());
      const dayName = days[d.getDay()];
      if (counts[dayName] !== undefined) {
        counts[dayName] += 1;
        views[dayName] += (l.viewsCount || 50);
      }
    });

    return [
      { day: 'Mon', reflections: counts.Mon, views: views.Mon },
      { day: 'Tue', reflections: counts.Tue, views: views.Tue },
      { day: 'Wed', reflections: counts.Wed, views: views.Wed },
      { day: 'Thu', reflections: counts.Thu, views: views.Thu },
      { day: 'Fri', reflections: counts.Fri, views: views.Fri },
      { day: 'Sat', reflections: counts.Sat, views: views.Sat },
      { day: 'Sun', reflections: counts.Sun, views: views.Sun },
    ];
  }, [lessons]);

  return (
    <div className="space-y-8">
      
      {/* Top Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#059669] via-[#0D9488] to-[#0891B2] text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome back, {user.name || "Writer"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to record your latest life lesson?
          </h2>
          <p className="text-sm text-stone-100 mt-2 leading-relaxed opacity-90">
            Documenting reflections transforms experience into wisdom. You have authored {totalCreated} life lessons so far.
          </p>
        </div>

        <div className="relative z-10 flex items-center space-x-3">
          <Link
            to="/dashboard/add-lesson"
            className="px-5 py-3 rounded-xl bg-white text-[#059669] font-extrabold text-sm shadow-md hover:bg-stone-50 transition flex items-center space-x-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Write New Lesson</span>
          </Link>
        </div>
      </div>

      {/* 4-Column Metric Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Stat 1: My Written Lessons */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400">My Lessons</p>
            <h3 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">{totalCreated}</h3>
            <p className="text-[11px] text-stone-500 mt-1">Authored by you</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] dark:bg-[#059669]/20 text-[#059669] flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        {/* Stat 2: Saved Favorites */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400">Saved Favorites</p>
            <h3 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">{totalSaved}</h3>
            <p className="text-[11px] text-stone-500 mt-1">Bookmarked wisdom</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/30 text-rose-500 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
        </div>

        {/* Stat 3: Reactions Received */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400">Reactions Received</p>
            <h3 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">{totalLikesReceived}</h3>
            <p className="text-[11px] text-stone-500 mt-1">Likes on your posts</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-amber-500 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Stat 4: Reflection Streak */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400">Reflection Streak</p>
            <h3 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
              {streakDays} <span className="text-base font-bold text-stone-400">{streakDays === 1 ? 'day' : 'days'}</span>
            </h3>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">Active contributor</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
            <Flame className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Dynamic Activity Heatmap */}
      <ActivityHeatmap />

      {/* Analytics Chart & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Weekly Chart */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-stone-900 dark:text-stone-100">
                Weekday Reflection Activity
              </h3>
              <p className="text-xs text-stone-400">Weekly publication and view volume</p>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="flex items-center space-x-1 font-semibold text-stone-600 dark:text-stone-300">
                <span className="w-2.5 h-2.5 rounded-full bg-[#059669]" />
                <span>Views</span>
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#A8A29E" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#A8A29E" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1C1917',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#FAFAF9',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="views" stroke="#059669" strokeWidth={2.5} fillOpacity={1} fill="url(#colorViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Author Shortcuts & Recent Wisdom */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-lg font-extrabold text-stone-900 dark:text-stone-100 mb-1">
              Your Recent Wisdom
            </h3>
            <p className="text-xs text-stone-400 mb-4">Latest reflections published by you</p>

            <div className="space-y-3">
              {myLessons.length > 0 ? (
                myLessons.slice(0, 3).map((lesson) => (
                  <Link
                    key={lesson.id}
                    to={`/lessons/${lesson.id}`}
                    className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition flex items-center justify-between group"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate group-hover:text-[#059669]">
                        {lesson.title}
                      </p>
                      <p className="text-[10px] text-stone-400 mt-0.5">
                        {lesson.category} • {lesson.likesCount || 0} Likes
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#059669] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </Link>
                ))
              ) : (
                <div className="py-8 text-center bg-stone-50 dark:bg-stone-800/40 rounded-2xl border border-dashed border-stone-200 dark:border-stone-700">
                  <FileText className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                  <p className="text-xs font-bold text-stone-600 dark:text-stone-300">No lessons written yet</p>
                  <p className="text-[10px] text-stone-400 mt-0.5 max-w-[180px] mx-auto">Publish your first life lesson to start tracking your statistics.</p>
                </div>
              )}
            </div>
          </div>

          <Link
            to="/dashboard/add-lesson"
            className="w-full py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-extrabold text-xs flex items-center justify-center space-x-2 shadow-md transition cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Write New Life Lesson</span>
          </Link>
        </div>

      </div>

    </div>
  );
};
