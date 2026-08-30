import React, { useState, useMemo } from 'react';
import { Flame, Calendar, Sparkles, BookOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ActivityHeatmap = () => {
  const { user, lessons } = useAuth();
  const [hoveredCell, setHoveredCell] = useState(null);

  // User created lessons with null safety
  const myLessons = useMemo(() => {
    if (!lessons || !Array.isArray(lessons)) return [];
    return lessons.filter((l) => {
      if (!l) return false;
      const matchId = user?.id && l.creatorId === user.id;
      const matchName = user?.name && l.creatorName && l.creatorName.toLowerCase() === user.name.toLowerCase();
      const matchEmail = user?.email && l.creatorEmail && l.creatorEmail.toLowerCase() === user.email.toLowerCase();
      return matchId || matchName || matchEmail;
    });
  }, [lessons, user]);

  const totalInsights = myLessons.length;
  
  // Dynamic streak calculation: 0 if no lessons, otherwise 1 + number of lessons
  const currentStreak = totalInsights > 0 ? Math.min(totalInsights + 1, 30) : 0;

  // Generate 20 weeks of heatmap calendar
  const now = new Date();
  const weeks = useMemo(() => {
    return Array.from({ length: 20 }, (_, weekIdx) => {
      return Array.from({ length: 7 }, (_, dayIdx) => {
        const dayOffset = (19 - weekIdx) * 7 + (6 - dayIdx);
        const dateObj = new Date(now);
        dateObj.setDate(now.getDate() - dayOffset);
        const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        // Match actual lesson publication dates
        const count = myLessons.filter(l => {
          if (!l) return false;
          const lDate = new Date(l.createdAt || Date.now());
          if (isNaN(lDate.getTime())) return false;
          return lDate.toDateString() === dateObj.toDateString();
        }).length;

        return {
          id: `w${weekIdx}-d${dayIdx}`,
          count,
          date: dateStr
        };
      });
    });
  }, [myLessons]);

  const getIntensityClass = (count) => {
    if (count === 0) return 'bg-stone-100 dark:bg-stone-800/80 border-stone-200/50 dark:border-stone-700/50';
    if (count === 1) return 'bg-[#D1FAE5] dark:bg-[#059669]/40 border-emerald-300 dark:border-emerald-700';
    if (count === 2) return 'bg-[#6EE7B7] dark:bg-[#059669]/70 border-emerald-400 dark:border-emerald-600';
    if (count >= 3) return 'bg-[#059669] dark:bg-[#059669] border-[#047857] shadow-xs shadow-[#059669]/30';
    return 'bg-stone-100 dark:bg-stone-800';
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#059669] dark:text-[#34D399] text-xs font-bold uppercase tracking-wider mb-1">
            <Flame className="w-4 h-4" />
            <span>Consistency Tracker</span>
          </div>
          <h3 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
            Reflection Activity Heatmap
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Your daily contributions and journaling frequency over the past 20 weeks.
          </p>
        </div>

        {/* Streak Stats Badges */}
        <div className="flex items-center space-x-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 text-xs">
            <span className="text-stone-400 uppercase font-bold text-[10px] block">Current Streak</span>
            <span className="font-extrabold text-amber-600 dark:text-amber-400 text-sm">
              🔥 {currentStreak} {currentStreak === 1 ? 'Day' : 'Days'}
            </span>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-[#ECFDF5] dark:bg-[#059669]/15 border border-emerald-200 dark:border-emerald-800/40 text-xs">
            <span className="text-stone-400 uppercase font-bold text-[10px] block">Total Insights</span>
            <span className="font-extrabold text-[#059669] dark:text-[#34D399] text-sm">
              {totalInsights} Recorded
            </span>
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto pb-2 scrollbar-none">
        <div className="flex space-x-1.5 min-w-[580px]">
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col space-y-1.5 flex-1">
              {week.map((day) => (
                <div
                  key={day.id}
                  onMouseEnter={() => setHoveredCell(day)}
                  onMouseLeave={() => setHoveredCell(null)}
                  className={`w-3.5 h-3.5 rounded-sm border transition-transform hover:scale-125 cursor-pointer ${getIntensityClass(day.count)}`}
                  title={`${day.count} reflections logged on ${day.date}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend & Hover Info */}
      <div className="flex flex-wrap items-center justify-between text-xs text-stone-500 dark:text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800">
        <div className="flex items-center space-x-2">
          <span>Less</span>
          <div className="w-3 h-3 rounded-sm bg-stone-100 dark:bg-stone-800" />
          <div className="w-3 h-3 rounded-sm bg-[#D1FAE5] dark:bg-[#059669]/30" />
          <div className="w-3 h-3 rounded-sm bg-[#6EE7B7] dark:bg-[#059669]/60" />
          <div className="w-3 h-3 rounded-sm bg-[#059669]" />
          <span>More</span>
        </div>

        {hoveredCell ? (
          <span className="font-semibold text-stone-900 dark:text-stone-100">
            {hoveredCell.count === 0 ? 'No lessons recorded' : `${hoveredCell.count} lesson${hoveredCell.count > 1 ? 's' : ''} logged`} on {hoveredCell.date}
          </span>
        ) : (
          <span>Hover over blocks to view daily insight counts</span>
        )}
      </div>

    </div>
  );
};
