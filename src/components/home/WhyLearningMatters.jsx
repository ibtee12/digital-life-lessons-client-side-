import React from 'react';
import { ShieldCheck, BrainCircuit, Users, Zap } from 'lucide-react';

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: 'Preserve Personal Legacy',
    description: 'Life experiences fade if left unwritten. Capture defining moments and insights so your personal wisdom remains accessible forever.'
  },
  {
    icon: BrainCircuit,
    title: 'Mindful Reflection',
    description: 'Writing down lessons transforms raw events into structured mental models, deepening self-awareness and emotional intelligence.'
  },
  {
    icon: Users,
    title: 'Collective Wisdom',
    description: 'Access real-world stories and battle-tested advice from a community of growth-oriented professionals and thinkers.'
  },
  {
    icon: Zap,
    title: 'Accelerated Growth',
    description: 'Bypass costly trials by studying honest mistakes and proven frameworks shared by creators across diverse fields.'
  }
];

export const WhyLearningMatters = () => {
  return (
    <section className="py-16 border-y border-stone-200/80 dark:border-stone-800">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-[#059669] dark:text-[#34D399]">
          Core Value Proposition
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight mt-2">
          Why Learning From Life Matters
        </h2>
        <p className="text-stone-600 dark:text-stone-400 text-sm md:text-base mt-3 leading-relaxed">
          Knowledge is fleeting unless anchored. Preserving life lessons builds a resilient mindset and empowers those around you.
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {BENEFITS.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 card-hover-effect flex flex-col justify-between"
            >
              <div>
                {/* Circular Emerald Icon Container */}
                <div className="w-12 h-12 rounded-full bg-[#ECFDF5] dark:bg-[#059669]/20 text-[#059669] dark:text-[#34D399] flex items-center justify-center mb-5 shadow-sm">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
