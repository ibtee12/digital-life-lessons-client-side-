import React from 'react';
import { Award, BookOpen, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CONTRIBUTORS = [
  {
    id: 'user-102',
    name: 'Elena Rostova',
    role: 'Product Strategist',
    lessonsCount: 22,
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    badge: 'Top Contributor'
  },
  {
    id: 'user-104',
    name: 'Aria Chen',
    role: 'Mindfulness Coach',
    lessonsCount: 19,
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    badge: 'Top Contributor'
  },
  {
    id: 'user-101',
    name: 'Marcus Vance',
    role: 'Leadership Mentor',
    lessonsCount: 14,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    badge: 'Top Contributor'
  },
  {
    id: 'user-103',
    name: 'Julian Hayes',
    role: 'Engineering Lead',
    lessonsCount: 8,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    badge: 'Top Contributor'
  }
];

export const TopContributors = () => {
  return (
    <section className="py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#059669] dark:text-[#34D399]">
            Active Community Thinkers
          </span>
          <h2 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight mt-1">
            Top Contributors of the Week
          </h2>
        </div>
      </div>

      {/* Horizontal scroll container on mobile, grid on desktop */}
      <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-5 pb-4 lg:pb-0 scrollbar-none snap-x">
        {CONTRIBUTORS.map((c) => (
          <div
            key={c.id}
            className="flex-shrink-0 w-[260px] sm:w-[280px] lg:w-auto snap-start p-6 rounded-2xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 card-hover-effect flex flex-col items-center text-center"
          >
            {/* Avatar 64px */}
            <div className="relative mb-4">
              <img
                src={c.photo}
                alt={c.name}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-[#ECFDF5] dark:ring-[#059669]/20"
              />
              <div className="absolute -bottom-1 -right-1 bg-[#059669] text-white p-1 rounded-full shadow">
                <Award className="w-3.5 h-3.5" />
              </div>
            </div>

            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base mb-0.5">
              {c.name}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-3">
              {c.role}
            </p>

            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ECFDF5] dark:bg-[#059669]/15 text-[#047857] dark:text-[#34D399] mb-4">
              {c.badge}
            </span>

            <div className="w-full pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-600 dark:text-stone-400">
              <span className="flex items-center space-x-1">
                <BookOpen className="w-3.5 h-3.5 text-[#059669]" />
                <span className="font-semibold text-stone-900 dark:text-stone-200">{c.lessonsCount}</span> Lessons
              </span>
              <Link
                to="/dashboard/profile"
                className="font-medium text-[#059669] hover:underline flex items-center"
              >
                Profile <ChevronRight className="w-3 h-3 ml-0.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
