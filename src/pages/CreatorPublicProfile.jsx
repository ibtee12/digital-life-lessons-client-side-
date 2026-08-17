import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Heart, Bookmark, Award, Sparkles } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LessonCard } from '../components/LessonCard';
import { useAuth } from '../context/AuthContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const CreatorPublicProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lessons } = useAuth();

  // Find creator details from lessons
  const authorLessons = useMemo(() => {
    return lessons.filter(
      (l) => l.creatorId === id || l.creatorName?.toLowerCase().replace(/\s+/g, '-') === id
    );
  }, [lessons, id]);

  const authorInfo = useMemo(() => {
    if (authorLessons.length > 0) {
      return {
        name: authorLessons[0].creatorName,
        photo: authorLessons[0].creatorPhoto,
        role: 'Verified Wisdom Contributor'
      };
    }
    return {
      name: 'Featured Author',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Top Contributor'
    };
  }, [authorLessons]);

  useDocumentTitle(`${authorInfo.name}'s Wisdom Archive`);

  const totalLikes = authorLessons.reduce((acc, l) => acc + (l.likesCount || 0), 0);
  const totalSaves = authorLessons.reduce((acc, l) => acc + (l.favoritesCount || 0), 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] dark:bg-[#0C0A09] text-[#1C1917] dark:text-[#FAFAF9]">
      <Navbar />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-12">
        
        {/* Back button */}
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </div>

        {/* Author Banner Card */}
        <div className="bg-white dark:bg-[#292524] rounded-3xl p-8 sm:p-10 border border-stone-200 dark:border-stone-700/80 shadow-md relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8 text-center sm:text-left">
            
            {/* Avatar */}
            <div className="relative">
              <img
                src={authorInfo.photo}
                alt={authorInfo.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-[#059669]/30 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 bg-[#059669] text-white p-1.5 rounded-full shadow">
                <Award className="w-4 h-4" />
              </div>
            </div>

            {/* Meta */}
            <div className="flex-1">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#ECFDF5] dark:bg-[#059669]/15 text-[#047857] dark:text-[#34D399] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{authorInfo.role}</span>
              </div>
              <h1 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100">
                {authorInfo.name}
              </h1>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1 max-w-xl leading-relaxed">
                Sharing defining personal reflections, career frameworks, and hard-earned mental models to help others navigate their journeys.
              </p>

              {/* Aggregated Stats */}
              <div className="flex items-center justify-center sm:justify-start space-x-6 mt-6 pt-6 border-t border-stone-100 dark:border-stone-800 text-xs">
                <div>
                  <span className="text-stone-400 uppercase font-bold text-[10px] block">Published</span>
                  <span className="font-extrabold text-stone-900 dark:text-stone-100 text-base">{authorLessons.length} Lessons</span>
                </div>
                <div className="w-px h-6 bg-stone-200 dark:bg-stone-700" />
                <div>
                  <span className="text-stone-400 uppercase font-bold text-[10px] block">Reactions</span>
                  <span className="font-extrabold text-red-500 text-base">{totalLikes} Likes</span>
                </div>
                <div className="w-px h-6 bg-stone-200 dark:bg-stone-700" />
                <div>
                  <span className="text-stone-400 uppercase font-bold text-[10px] block">Bookmarks</span>
                  <span className="font-extrabold text-[#059669] text-base">{totalSaves} Saves</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Author Lessons Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">
              Published Life Lessons ({authorLessons.length})
            </h2>
          </div>

          {authorLessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 equal-card-grid">
              {authorLessons.map((lesson) => (
                <div key={lesson.id} className="h-full">
                  <LessonCard lesson={lesson} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-[#292524] rounded-3xl border border-stone-200 dark:border-stone-700 text-stone-400 text-sm">
              No public life lessons available for this creator yet.
            </div>
          )}
        </section>

      </main>

      <Footer />
    </div>
  );
};
