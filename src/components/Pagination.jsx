import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center space-x-2 pt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#292524] text-stone-600 dark:text-stone-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-100 dark:hover:bg-stone-800 transition"
        aria-label="Previous Page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-xl font-semibold text-sm transition ${
            currentPage === page
              ? 'bg-[#059669] text-white shadow-md shadow-[#059669]/30'
              : 'border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#292524] text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#292524] text-stone-600 dark:text-stone-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-100 dark:hover:bg-stone-800 transition"
        aria-label="Next Page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};
