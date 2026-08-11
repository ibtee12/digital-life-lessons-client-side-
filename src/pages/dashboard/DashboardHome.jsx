import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Bookmark, Heart, Eye, PlusCircle, ArrowRight, Flame, TrendingUp, Sparkles 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { AccessBadge, CategoryBadge } from '../../components/Badge';

const WEEKLY_DATA = [
  { day: 'Mon', reflections: 2, views: 120 },
  { day: 'Tue', reflections: 4, views: 340 },
  { day: 'Wed', reflections: 1, views: 220 },
  { day: 'Thu', reflections: 5, views: 480 },
  { day: 'Fri', reflections: 3, views: 390 },
  { day: 'Sat', reflections: 7, views: 650 },
  { day: 'Sun', reflections: 6, views: 580 },
];

export const DashboardHome = () => {
  const { user, lessons, favorites } = useAuth();

  // User created lessons
  const myLessons = lessons.filter((l) => l.creatorId === user.id || l.creatorName === user.name);

  // Total metrics
  const totalCreated = myLessons.length;
  const totalSaved = favorites.length;
  const totalLikesReceived = myLessons.reduce((acc, l) => acc + (l.likesCount || 0), 0);

  return (
    <div className="space-y-8">
      
      {/* Top Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#059669] via-[#0D9488] to-[#0891B2] text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome back, {user.name}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to record your latest life lesson?
          </h2>
          <p className="text-sm text-stone-100 mt-2 leading-relaxed opacity-90">
            Documenting reflections transforms experience into wisdom. You have published {totalCreated} lessons so far.
          </p>
        </div>

        <div className="relative z-10 flex items-center space-x-3">
          <Link
            to="/dashboard/add-lesson"
            className="px-5 py-3 rounded-xl bg-white text-[#059669] font-extrabold text-sm shadow-md hover:bg-stone-50 transition flex items-center space-x-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Lesson</span>
          </Link>
        </div>
      </div>

      {/* 4-Column Metric Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Stat 1 */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400">Total Lessons</p>
            <h3 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">{totalCreated}</h3>
            <p className="text-[11px] text-stone-500 mt-1">Created entries</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] dark:bg-[#059669]/20 text-[#059669] flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        {/* Stat 2 */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400">Saved Favorites</p>
            <h3 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">{totalSaved}</h3>
            <p className="text-[11px] text-stone-500 mt-1">Bookmarked entries</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-900/20 text-[#0D9488] flex items-center justify-center">
            <Bookmark className="w-6 h-6" />
          </div>
        </div>

        {/* Stat 3 */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400">Reactions</p>
            <h3 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">{totalLikesReceived}</h3>
            <p className="text-[11px] text-stone-500 mt-1">Community likes</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/30 text-red-500 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
        </div>

        {/* Stat 4: Activity Streak */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400">Reflection Streak</p>
            <h3 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">12 Days</h3>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">🔥 Active streak</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-amber-500 flex items-center justify-center">
            <Flame className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Analytics Reflection Chart */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Weekly Reflection Activity
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Views and community engagement on your shared insights.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#059669]">
            <TrendingUp className="w-4 h-4" />
            <span>+24% vs last week</span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={WEEKLY_DATA}>
              <defs>
                <linearGradient id="colorReflections" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#A8A29E" fontSize={12} tickLine={false} />
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
              <Area type="monotone" dataKey="views" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#colorReflections)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recently Added Lessons & Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Lessons List (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Recently Added Lessons
            </h3>
            <Link to="/dashboard/my-lessons" className="text-xs font-semibold text-[#059669] hover:underline flex items-center">
              View All <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="space-y-3">
            {myLessons.slice(0, 4).map((lesson) => (
              <div
                key={lesson.id}
                className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/50 flex items-center justify-between"
              >
                <div className="min-w-0 pr-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <CategoryBadge category={lesson.category} />
                    <AccessBadge level={lesson.accessLevel} />
                  </div>
                  <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100 truncate">
                    {lesson.title}
                  </h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {new Date(lesson.createdAt).toLocaleDateString()} • {lesson.visibility}
                  </p>
                </div>
                <Link
                  to={`/lessons/${lesson.id}`}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:text-[#059669] transition flex-shrink-0"
                >
                  Details
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Shortcuts & Streak Card (1 col) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                to="/dashboard/add-lesson"
                className="w-full p-3.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:border-[#059669] hover:bg-[#ECFDF5] dark:hover:bg-[#059669]/10 font-semibold text-xs text-stone-800 dark:text-stone-200 flex items-center space-x-3 transition"
              >
                <PlusCircle className="w-4 h-4 text-[#059669]" />
                <span>Create Life Lesson Entry</span>
              </Link>
              <Link
                to="/dashboard/my-favorites"
                className="w-full p-3.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:border-[#0D9488] hover:bg-teal-50 dark:hover:bg-teal-900/10 font-semibold text-xs text-stone-800 dark:text-stone-200 flex items-center space-x-3 transition"
              >
                <Bookmark className="w-4 h-4 text-[#0D9488]" />
                <span>Manage Saved Favorites</span>
              </Link>
              <Link
                to="/dashboard/profile"
                className="w-full p-3.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/10 font-semibold text-xs text-stone-800 dark:text-stone-200 flex items-center space-x-3 transition"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>View Public Profile & Stats</span>
              </Link>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-100 dark:border-stone-800 mt-6 text-xs text-stone-500">
            <p className="font-bold text-stone-800 dark:text-stone-200 mb-1">Pro Tip:</p>
            <p className="leading-relaxed">
              Upgrade to Premium to create paid lessons and gain verified status.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
