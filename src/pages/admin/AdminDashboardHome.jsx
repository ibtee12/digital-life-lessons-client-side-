import React, { useState, useMemo } from 'react';
import { 
  Users, BookOpen, Flag, TrendingUp, ShieldCheck, Star, Calendar, Filter, ChevronLeft, ChevronRight, RotateCcw
} from 'lucide-react';
import { 
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { useAuth } from '../../context/AuthContext';

// Custom Tooltip for Stacked Ratio Lesson Bar Chart
const CustomLessonTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const publicCount = payload.find(p => p.dataKey === 'publicLessons')?.value || 0;
    const premiumCount = payload.find(p => p.dataKey === 'premiumLessons')?.value || 0;
    const total = publicCount + premiumCount;

    return (
      <div className="bg-[#1C1917] border border-stone-700/80 rounded-2xl p-3.5 shadow-2xl text-xs space-y-2 min-w-[170px]">
        <p className="font-bold text-stone-200 border-b border-stone-800 pb-1.5">{label}</p>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-emerald-400 font-semibold">
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#059669]" />
              <span>Public Lessons:</span>
            </span>
            <span className="font-extrabold">{publicCount}</span>
          </div>
          <div className="flex items-center justify-between text-amber-400 font-semibold">
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <span>Premium Lessons:</span>
            </span>
            <span className="font-extrabold">{premiumCount}</span>
          </div>
        </div>
        <div className="pt-1.5 border-t border-stone-800 flex items-center justify-between text-stone-300 font-bold">
          <span>Total Uploaded:</span>
          <span className="text-white text-sm font-black">{total}</span>
        </div>
      </div>
    );
  }
  return null;
};

// Custom Tooltip for User Demographics
const CustomUserTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const freeCount = payload.find(p => p.dataKey === 'freeUsers')?.value || 0;
    const premiumCount = payload.find(p => p.dataKey === 'premiumUsers')?.value || 0;
    const total = freeCount + premiumCount;

    return (
      <div className="bg-[#1C1917] border border-stone-700/80 rounded-2xl p-3.5 shadow-2xl text-xs space-y-2 min-w-[170px]">
        <p className="font-bold text-stone-200 border-b border-stone-800 pb-1.5">{label}</p>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-blue-400 font-semibold">
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
              <span>Free Members:</span>
            </span>
            <span className="font-extrabold">{freeCount}</span>
          </div>
          <div className="flex items-center justify-between text-amber-400 font-semibold">
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <span>Premium Subscribers:</span>
            </span>
            <span className="font-extrabold">{premiumCount}</span>
          </div>
        </div>
        <div className="pt-1.5 border-t border-stone-800 flex items-center justify-between text-stone-300 font-bold">
          <span>Total Users:</span>
          <span className="text-white text-sm font-black">{total}</span>
        </div>
      </div>
    );
  }
  return null;
};

export const AdminDashboardHome = () => {
  const { lessons, reports, allUsers } = useAuth();

  const totalUsersCount = allUsers?.length || 6;
  const totalPublicLessons = lessons.filter((l) => l.visibility === 'Public').length;
  const totalPremiumLessons = lessons.filter((l) => l.accessLevel === 'Premium').length;
  const totalReported = reports.length;

  // Chart 1 States: Content Analytics (Days / Months) & Offset Pagination
  const [lessonTimeframe, setLessonTimeframe] = useState('days'); // 'days' | 'months'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lessonDayOffset, setLessonDayOffset] = useState(0); // 0 = current 7-day window ending today
  const [lessonMonthOffset, setLessonMonthOffset] = useState(0);

  // Chart 2 States: User Demographics (Days / Months) & Offset Pagination
  const [userTimeframe, setUserTimeframe] = useState('days'); // 'days' | 'months'
  const [userDayOffset, setUserDayOffset] = useState(0);
  const [userMonthOffset, setUserMonthOffset] = useState(0);

  // 1. DYNAMIC LESSON GROWTH DATA (Ratio Stacked Bar: Emerald Green for Public + Golden for Premium)
  const { lessonGrowthData, lessonRangeLabel } = useMemo(() => {
    const now = new Date();

    if (lessonTimeframe === 'days') {
      // 7-day window based on lessonDayOffset
      // Offset 0 ends on TODAY (past 6 days + today)
      const data = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(now);
        // Calculate date for index 0 to 6
        const dayShift = (lessonDayOffset * 3) - 6 + i;
        date.setDate(now.getDate() + dayShift);

        const monthName = date.toLocaleString('en-US', { month: 'short' });
        const dayNum = date.getDate();
        const yearNum = date.getFullYear();
        const isToday = date.toDateString() === now.toDateString();
        const label = isToday ? `${monthName} ${dayNum} (Today)` : `${monthName} ${dayNum}`;

        // Filter lessons by date and category
        const matchingLessons = lessons.filter(l => {
          const lDate = new Date(l.createdAt || Date.now());
          const dateMatch = isToday ? true : lDate.toDateString() === date.toDateString();
          const categoryMatch = selectedCategory === 'All' ? true : l.category === selectedCategory;
          return dateMatch && categoryMatch;
        });

        // Ratio breakdown: Public vs Premium
        const publicLessons = matchingLessons.filter(l => l.accessLevel !== 'Premium').length;
        const premiumLessons = matchingLessons.filter(l => l.accessLevel === 'Premium').length;

        return {
          label,
          fullDate: `${monthName} ${dayNum}, ${yearNum}`,
          publicLessons,
          premiumLessons,
          total: publicLessons + premiumLessons
        };
      });

      const firstDate = data[0].fullDate;
      const lastDate = data[6].fullDate;
      const rangeLabel = `${firstDate} — ${lastDate}`;

      return { lessonGrowthData: data, lessonRangeLabel: rangeLabel };
    }

    // Default: 'months' (6-month window based on lessonMonthOffset)
    const data = Array.from({ length: 6 }, (_, i) => {
      const monthShift = (lessonMonthOffset * 1) - 5 + i;
      const date = new Date(now.getFullYear(), now.getMonth() + monthShift, 1);
      const monthName = date.toLocaleString('en-US', { month: 'short' });
      const yearNum = date.getFullYear();
      const isCurrentMonth = date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
      const label = `${monthName} ${yearNum}`;

      const matchingLessons = lessons.filter(l => {
        const lDate = new Date(l.createdAt || Date.now());
        const dateMatch = isCurrentMonth 
          ? true 
          : lDate.getFullYear() === yearNum && lDate.getMonth() === date.getMonth();
        const categoryMatch = selectedCategory === 'All' ? true : l.category === selectedCategory;
        return dateMatch && categoryMatch;
      });

      const publicLessons = matchingLessons.filter(l => l.accessLevel !== 'Premium').length;
      const premiumLessons = matchingLessons.filter(l => l.accessLevel === 'Premium').length;

      return {
        label,
        publicLessons,
        premiumLessons,
        total: publicLessons + premiumLessons
      };
    });

    const rangeLabel = `${data[0].label} — ${data[5].label}`;
    return { lessonGrowthData: data, lessonRangeLabel: rangeLabel };
  }, [lessonTimeframe, selectedCategory, lessonDayOffset, lessonMonthOffset, lessons]);

  // 2. DYNAMIC USER GROWTH DATA (Ratio Stacked Bar: Blue for Free + Golden for Premium)
  const { userGrowthData, userRangeLabel } = useMemo(() => {
    const currentUsers = allUsers?.length || 6;
    const currentPremium = allUsers?.filter(u => u.isPremium).length || 3;
    const currentFree = Math.max(0, currentUsers - currentPremium);
    const now = new Date();

    if (userTimeframe === 'days') {
      const data = Array.from({ length: 7 }, (_, i) => {
        const dayShift = (userDayOffset * 3) - 6 + i;
        const date = new Date(now);
        date.setDate(now.getDate() + dayShift);

        const monthName = date.toLocaleString('en-US', { month: 'short' });
        const dayNum = date.getDate();
        const yearNum = date.getFullYear();
        const isToday = date.toDateString() === now.toDateString();
        const label = isToday ? `${monthName} ${dayNum} (Today)` : `${monthName} ${dayNum}`;

        return {
          label,
          fullDate: `${monthName} ${dayNum}, ${yearNum}`,
          freeUsers: isToday ? currentFree : 0,
          premiumUsers: isToday ? currentPremium : 0,
          totalUsers: isToday ? currentUsers : 0
        };
      });

      const rangeLabel = `${data[0].fullDate} — ${data[6].fullDate}`;
      return { userGrowthData: data, userRangeLabel: rangeLabel };
    }

    // Default: 'months'
    const data = Array.from({ length: 6 }, (_, i) => {
      const monthShift = (userMonthOffset * 1) - 5 + i;
      const date = new Date(now.getFullYear(), now.getMonth() + monthShift, 1);
      const monthName = date.toLocaleString('en-US', { month: 'short' });
      const yearNum = date.getFullYear();
      const isCurrentMonth = date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
      const label = `${monthName} ${yearNum}`;

      return {
        label,
        freeUsers: isCurrentMonth ? currentFree : 0,
        premiumUsers: isCurrentMonth ? currentPremium : 0,
        totalUsers: isCurrentMonth ? currentUsers : 0
      };
    });

    const rangeLabel = `${data[0].label} — ${data[5].label}`;
    return { userGrowthData: data, userRangeLabel: rangeLabel };
  }, [userTimeframe, userDayOffset, userMonthOffset, allUsers]);

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1C1917] via-[#292524] to-[#44403C] text-white shadow-xl flex items-center justify-between">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#059669] text-white mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Platform Admin Analytics</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            System Overview & Growth Metrics
          </h2>
          <p className="text-sm text-stone-300 mt-1">
            Real-time interactive ratio analytics for lessons and user conversions.
          </p>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Real Users Count */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400">Total Users</p>
            <h3 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">{totalUsersCount}</h3>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">Active registered members</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Real Public Lessons Count */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400">Public Lessons</p>
            <h3 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">{totalPublicLessons}</h3>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">Free access content</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] dark:bg-[#059669]/20 text-[#059669] flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        {/* Real Premium Lessons Count */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400">Premium Lessons</p>
            <h3 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">{totalPremiumLessons}</h3>
            <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold mt-1">Subscriber exclusive ⭐</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-amber-500 flex items-center justify-center">
            <Star className="w-6 h-6" />
          </div>
        </div>

        {/* Real Reported Content Count */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400">Reported Content</p>
            <h3 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">{totalReported}</h3>
            <p className="text-[11px] text-red-500 font-semibold mt-1">{totalReported === 0 ? "No flags pending" : "Needs review"}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/30 text-red-500 flex items-center justify-center">
            <Flag className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* GRAPH 1: Lesson Publication Ratio Growth (Stacked Emerald Green + Golden Amber) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 shadow-sm space-y-6">
        
        {/* Header with Category Filter, Paging Buttons (< >) & Days/Months Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800">
          <div>
            <div className="flex items-center space-x-2 text-[#059669] dark:text-[#34D399] text-xs font-bold uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Content Analytics Ratio</span>
            </div>
            <h3 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 flex items-center space-x-2">
              <span>Lesson Publication Growth</span>
              <span className="text-xs font-medium text-stone-400">({lessonRangeLabel})</span>
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Track publication volume and subscription tier distribution over time.
            </p>
          </div>

          {/* Controls: Category Filter + Paging (< >) + Days/Months Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-stone-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-9 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-semibold focus:outline-none cursor-pointer"
              >
                <option value="All">All Categories ({lessons.length})</option>
                <option value="Personal Growth">Personal Growth</option>
                <option value="Mindset">Mindset</option>
                <option value="Career">Career</option>
                <option value="Leadership">Leadership</option>
                <option value="Productivity">Productivity</option>
                <option value="Mistakes Learned">Mistakes Learned</option>
              </select>
            </div>

            {/* Paging Buttons (< and >) */}
            <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
              <button
                onClick={() => {
                  if (lessonTimeframe === 'days') setLessonDayOffset(prev => prev - 1);
                  else setLessonMonthOffset(prev => prev - 1);
                }}
                className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition cursor-pointer"
                title="Previous period (Past)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {((lessonTimeframe === 'days' && lessonDayOffset !== 0) || (lessonTimeframe === 'months' && lessonMonthOffset !== 0)) && (
                <button
                  onClick={() => {
                    setLessonDayOffset(0);
                    setLessonMonthOffset(0);
                  }}
                  className="px-2 py-1 text-[10px] font-bold text-[#059669] hover:bg-white dark:hover:bg-stone-700 rounded-md transition cursor-pointer"
                  title="Reset to current period"
                >
                  Today
                </button>
              )}

              <button
                onClick={() => {
                  if (lessonTimeframe === 'days') setLessonDayOffset(prev => prev + 1);
                  else setLessonMonthOffset(prev => prev + 1);
                }}
                className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition cursor-pointer"
                title="Next period (Future)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Days vs Months Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
              <button
                onClick={() => {
                  setLessonTimeframe('days');
                  setLessonDayOffset(0);
                }}
                className={`px-3.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  lessonTimeframe === 'days'
                    ? 'bg-[#059669] text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-300 hover:text-[#059669]'
                }`}
              >
                Days
              </button>
              <button
                onClick={() => {
                  setLessonTimeframe('months');
                  setLessonMonthOffset(0);
                }}
                className={`px-3.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  lessonTimeframe === 'months'
                    ? 'bg-[#059669] text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-300 hover:text-[#059669]'
                }`}
              >
                Months
              </button>
            </div>

          </div>
        </div>

        {/* Stacked Ratio Bar Chart View */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={lessonGrowthData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
              <XAxis 
                dataKey="label" 
                stroke="#A8A29E" 
                fontSize={11} 
                tickLine={false} 
              />
              <YAxis 
                stroke="#A8A29E" 
                fontSize={11} 
                tickLine={false} 
                allowDecimals={false} 
              />
              <Tooltip content={<CustomLessonTooltip />} />

              {/* Stacked Bars: Emerald Green for Public + Golden Amber for Premium */}
              <Bar 
                dataKey="publicLessons" 
                name="Public Lessons (Free)" 
                fill="#059669" 
                stackId="lessonRatio" 
                radius={[0, 0, 4, 4]}
                barSize={32}
              />
              <Bar 
                dataKey="premiumLessons" 
                name="Premium Lessons (⭐)" 
                fill="#F59E0B" 
                stackId="lessonRatio" 
                radius={[6, 6, 0, 0]}
                barSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Single Clean Bottom Legend */}
        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800">
          <div className="flex items-center space-x-5">
            <span className="flex items-center space-x-2 font-semibold text-[#059669] dark:text-[#34D399]">
              <span className="w-3 h-3 rounded-sm bg-[#059669]" />
              <span>Public Lessons (Free)</span>
            </span>
            <span className="flex items-center space-x-2 font-semibold text-amber-500 dark:text-amber-400">
              <span className="w-3 h-3 rounded-sm bg-[#F59E0B]" />
              <span>Premium Lessons (⭐)</span>
            </span>
          </div>
          <span className="text-[11px]">Use <strong>&lt;</strong> and <strong>&gt;</strong> to shift dates</span>
        </div>

      </div>

      {/* GRAPH 2: User Demographics (Stacked Ratio: Blue for Free + Golden for Premium) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 shadow-sm space-y-6">
        
        {/* Header with Paging (< >) and Days/Months Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800">
          <div>
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Users className="w-4 h-4" />
              <span>User Demographics Ratio</span>
            </div>
            <h3 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 flex items-center space-x-2">
              <span>User Registration & Conversion</span>
              <span className="text-xs font-medium text-stone-400">({userRangeLabel})</span>
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Monitor member registrations and premium subscriber growth over time.
            </p>
          </div>

          {/* Controls: Paging (< >) + Days/Months Toggle */}
          <div className="flex items-center space-x-3">
            
            {/* Paging Buttons */}
            <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
              <button
                onClick={() => {
                  if (userTimeframe === 'days') setUserDayOffset(prev => prev - 1);
                  else setUserMonthOffset(prev => prev - 1);
                }}
                className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition cursor-pointer"
                title="Previous period (Past)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {((userTimeframe === 'days' && userDayOffset !== 0) || (userTimeframe === 'months' && userMonthOffset !== 0)) && (
                <button
                  onClick={() => {
                    setUserDayOffset(0);
                    setUserMonthOffset(0);
                  }}
                  className="px-2 py-1 text-[10px] font-bold text-blue-600 hover:bg-white dark:hover:bg-stone-700 rounded-md transition cursor-pointer"
                  title="Reset to current period"
                >
                  Today
                </button>
              )}

              <button
                onClick={() => {
                  if (userTimeframe === 'days') setUserDayOffset(prev => prev + 1);
                  else setUserMonthOffset(prev => prev + 1);
                }}
                className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition cursor-pointer"
                title="Next period (Future)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Days vs Months Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
              <button
                onClick={() => {
                  setUserTimeframe('days');
                  setUserDayOffset(0);
                }}
                className={`px-3.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  userTimeframe === 'days'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-300 hover:text-blue-600'
                }`}
              >
                Days
              </button>
              <button
                onClick={() => {
                  setUserTimeframe('months');
                  setUserMonthOffset(0);
                }}
                className={`px-3.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  userTimeframe === 'months'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-300 hover:text-blue-600'
                }`}
              >
                Months
              </button>
            </div>

          </div>
        </div>

        {/* Stacked Ratio Bar Chart View */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={userGrowthData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
              <XAxis 
                dataKey="label" 
                stroke="#A8A29E" 
                fontSize={11} 
                tickLine={false} 
              />
              <YAxis 
                stroke="#A8A29E" 
                fontSize={11} 
                tickLine={false} 
                allowDecimals={false} 
              />
              <Tooltip content={<CustomUserTooltip />} />

              {/* Stacked Bars: Blue for Free + Golden Amber for Premium */}
              <Bar 
                dataKey="freeUsers" 
                name="Free Members" 
                fill="#2563EB" 
                stackId="userRatio" 
                radius={[0, 0, 4, 4]}
                barSize={32}
              />
              <Bar 
                dataKey="premiumUsers" 
                name="Premium Subscribers ⭐" 
                fill="#F59E0B" 
                stackId="userRatio" 
                radius={[6, 6, 0, 0]}
                barSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Single Clean Bottom Legend */}
        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800">
          <div className="flex items-center space-x-5">
            <span className="flex items-center space-x-2 font-semibold text-blue-600 dark:text-blue-400">
              <span className="w-3 h-3 rounded-sm bg-[#2563EB]" />
              <span>Free Members</span>
            </span>
            <span className="flex items-center space-x-2 font-semibold text-amber-500 dark:text-amber-400">
              <span className="w-3 h-3 rounded-sm bg-[#F59E0B]" />
              <span>Premium Subscribers (⭐)</span>
            </span>
          </div>
          <span className="text-[11px]">Use <strong>&lt;</strong> and <strong>&gt;</strong> to shift dates</span>
        </div>

      </div>

    </div>
  );
};
