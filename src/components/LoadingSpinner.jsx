import React from 'react';

export const LoadingSpinner = ({ fullScreen = false, message = 'Loading Wisdom...' }) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      {/* Emerald Pulsing Spinner */}
      <div className="relative w-14 h-14 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-[#059669]/20 border-t-[#059669] animate-spin" />
        <div className="w-8 h-8 rounded-full bg-[#059669]/15 flex items-center justify-center animate-pulse">
          <div className="w-3 h-3 rounded-full bg-[#059669]" />
        </div>
      </div>
      <p className="text-xs font-bold uppercase tracking-widest text-[#059669] dark:text-[#34D399] animate-pulse">
        {message}
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#FAFAF9]/90 dark:bg-[#0C0A09]/90 backdrop-blur-md flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};
