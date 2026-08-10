import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, Sparkles, RefreshCw } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LessonCard } from '../components/LessonCard';
import { Pagination } from '../components/Pagination';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = ['All', 'Personal Growth', 'Career', 'Relationships', 'Mindset', 'Mistakes Learned'];
const TONES = ['All', 'Motivational', 'Sad', 'Realization', 'Gratitude'];

export const LessonsPage = () => {
  const { lessons } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTone, setSelectedTone] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'most_saved'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter public lessons only
  const publicLessons = useMemo(() => {
    return lessons.filter((l) => l.visibility === 'Public');
  }, [lessons]);

  // Apply Search, Category, Tone filters & Sorting
  const filteredLessons = useMemo(() => {
    let result = publicLessons;

    // Search filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (l) =>
          l.title.toLowerCase().includes(term) ||
          l.description.toLowerCase().includes(term) ||
          l.category.toLowerCase().includes(term)
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((l) => l.category === selectedCategory);
    }

    // Emotional Tone filter
    if (selectedTone !== 'All') {
      result = result.filter((l) => l.emotionalTone === selectedTone);
    }

    // Sorting
    if (sortBy === 'newest') {
      result = [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'most_saved') {
      result = [...result].sort((a, b) => (b.favoritesCount || 0) - (a.favoritesCount || 0));
    }

    return result;
  }, [publicLessons, searchTerm, selectedCategory, selectedTone, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredLessons.length / itemsPerPage);
  const paginatedLessons = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredLessons.slice(start, start + itemsPerPage);
  }, [filteredLessons, currentPage]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedTone('All');
    setSortBy('newest');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] dark:bg-[#0C0A09] text-[#1C1917] dark:text-[#FAFAF9]">
      <Navbar />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-[#ECFDF5] dark:bg-[#059669]/20 text-[#059669] dark:text-[#34D399] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community Knowledge Base</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100">
            Explore Public Wisdom
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-sm md:text-base mt-3">
            Browse real reflections, career insights, and mental models shared by contributors.
          </p>
        </div>

        {/* 1. Centered Search Bar (Max-w-2xl, Rounded-full) */}
        <div className="max-w-2xl mx-auto mb-8 relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 absolute left-4 text-stone-400 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search lessons by title, category, or keyword..."
              className="w-full h-12 pl-12 pr-4 rounded-full border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#292524] text-stone-900 dark:text-stone-100 text-sm font-medium shadow-sm focus:outline-none focus:border-[#059669] focus:ring-2 focus:ring-[#D1FAE5] dark:focus:ring-[#059669]/30 transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 text-xs font-semibold text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* 2. Filters & Sort Controls Bar */}
        <div className="bg-white dark:bg-[#292524] p-5 rounded-2xl border border-stone-200 dark:border-stone-700/80 shadow-sm mb-10 space-y-4">
          
          {/* Category Filters */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400 mr-2 flex-shrink-0 flex items-center">
              <Filter className="w-3.5 h-3.5 mr-1" /> Category:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-[#059669] text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Emotional Tone Filters & Sort Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-stone-100 dark:border-stone-800">
            
            {/* Tone Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 mr-2 flex-shrink-0">
                Emotional Tone:
              </span>
              {TONES.map((tone) => (
                <button
                  key={tone}
                  onClick={() => {
                    setSelectedTone(tone);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                    selectedTone === tone
                      ? 'bg-[#0D9488] text-white shadow-sm'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 justify-end">
              <ArrowUpDown className="w-4 h-4 text-stone-400" />
              <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-9 px-3 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1917] text-stone-800 dark:text-stone-200 text-xs font-semibold focus:outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="most_saved">Most Saved</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. Cards Grid (3 col desktop, 2 col tablet, 1 col mobile) */}
        {paginatedLessons.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 equal-card-grid">
              {paginatedLessons.map((lesson) => (
                <div key={lesson.id} className="h-full">
                  <LessonCard lesson={lesson} />
                </div>
              ))}
            </div>

            {/* 4. One-page Pagination Controls */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-white dark:bg-[#292524] rounded-3xl border border-stone-200 dark:border-stone-700 p-8 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">
              No Wisdom Entries Found
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto mb-6">
              We couldn't find any public life lessons matching your active search or filter parameters.
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm shadow-md transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};
