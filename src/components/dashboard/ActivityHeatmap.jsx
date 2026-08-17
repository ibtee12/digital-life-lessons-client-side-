import React, { useState } from 'react';
import { Flame, Calendar, Sparkles } from 'lucide-react';

export const ActivityHeatmap = () => {
  const [hoveredCell, setHoveredCell] = useState(null);

  // Generate 20 weeks of sample activity data (7 days each)
  const weeks = Array.from({ length: 20 }, (_, weekIdx) => {
    return Array.from({ length: 7 }, (_, dayIdx) => {
      const isWeekend = dayIdx === 5 || dayIdx === 6;
      // Deterministic activity levels for demo
      const val = ((weekIdx * 7 + dayIdx * 3) % 5);
      const count = isWeekend ? (val > 2 ? val : 0) : val;
      return {
        id: `w${weekIdx}-d${dayIdx}`,
        count,
        date: `Day ${weekIdx * 7 + dayIdx + 1}`
      };
    });
  });

  const getIntensityClass = (count) => {
    if (count === 0) return 'bg-stone-100 dark:bg-stone-800/80 border-stone-200/50 dark:border-stone-700/50';
    if (count === 1) return 'bg-[#D1FAE5] dark:bg-[#059669]/30 border-emerald-200/60 dark:border-emerald-800/50';
    if (count === 2) return 'bg-[#6EE7B7] dark:bg-[#059669]/60 border-emerald-300 dark:border-emerald-600/50';
    if (count >= 3) return 'bg-[#059669] dark:bg-[#059669] border-[#047857] shadow-sm shadow-[#059669]/30';
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
            <span className="font-extrabold text-amber-600 dark:text-amber-400 text-sm">🔥 12 Days</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-[#ECFDF5] dark:bg-[#059669]/15 border border-emerald-200 dark:border-emerald-800/40 text-xs">
            <span className="text-stone-400 uppercase font-bold text-[10px] block">Total Insights</span>
            <span className="font-extrabold text-[#059669] dark:text-[#34D399] text-sm">84 Recorded</span>
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
                  title={`${day.count} reflections logged`}
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
            {hoveredCell.count === 0 ? 'No reflections' : `${hoveredCell.count} reflections logged`} on {hoveredCell.date}
          </span>
        ) : (
          <span>Hover over blocks to view daily insight counts</span>
        )}
      </div>

    </div>
  );
};
