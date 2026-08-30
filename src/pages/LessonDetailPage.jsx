import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, Bookmark, Flag, Share2, Printer, Eye, Clock, Calendar, ArrowLeft, Send, Lock, Star, User, BookOpen, ShieldCheck 
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CategoryBadge, EmotionalToneBadge, AccessBadge } from '../components/Badge';
import { LessonCard } from '../components/LessonCard';
import { ReportModal } from '../components/ReportModal';
import { ShareModal } from '../components/ShareModal';
import { HeartBurst } from '../components/HeartBurst';
import { ReadingProgressBar } from '../components/ReadingProgressBar';
import { useAuth } from '../context/AuthContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const LessonDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    lessons, user, toggleLike, toggleFavorite, favorites, addComment 
  } = useAuth();

  const [commentText, setCommentText] = useState('');
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // Find target lesson
  const lesson = useMemo(() => {
    return lessons.find((l) => l.id === id) || lessons[0];
  }, [lessons, id]);

  useDocumentTitle(lesson?.title || 'Life Lesson Details');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const isLocked = lesson.accessLevel === 'Premium' && (!user.isLoggedIn || !user.isPremium);
  const isLiked = lesson.likes?.includes(user?.id);
  const isSaved = favorites?.includes(lesson.id);

  // Auto-calculated reading time based on word count
  const readingTime = useMemo(() => {
    if (!lesson.content) return 1;
    const words = lesson.content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  }, [lesson.content]);

  // Similar & Recommended lessons (filtered by category or tone, up to 6 cards)
  const recommendedLessons = useMemo(() => {
    return lessons
      .filter((l) => l.id !== lesson.id && (l.category === lesson.category || l.emotionalTone === lesson.emotionalTone))
      .slice(0, 6);
  }, [lessons, lesson]);

  const formattedCreated = new Date(lesson.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const formattedUpdated = new Date(lesson.updatedAt || lesson.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(lesson.id, commentText);
    setCommentText('');
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] dark:bg-[#0C0A09] text-[#1C1917] dark:text-[#FAFAF9]">
      <Navbar />
      <ReadingProgressBar />

      <main className="flex-1 max-w-[800px] w-full mx-auto px-4 sm:px-6 pt-24 pb-20 print:p-0 print:max-w-none">
        
        {/* Back Link */}
        <div className="mb-6 print:hidden">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Public Lessons</span>
          </button>
        </div>

        {/* Title & Badges */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <CategoryBadge category={lesson.category} />
            <EmotionalToneBadge tone={lesson.emotionalTone} />
            <AccessBadge level={lesson.accessLevel} />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-stone-900 dark:text-stone-100">
            {lesson.title}
          </h1>
        </div>

        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between text-xs text-stone-500 dark:text-stone-400 py-3 border-y border-stone-200 dark:border-stone-800 mb-8 gap-3">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-[#059669]" />
              <span>Created: {formattedCreated}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>{readingTime} min read</span>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 font-medium">
              Visibility: {lesson.visibility}
            </span>
            {/* PDF Export Button */}
            <button
              onClick={handleExportPDF}
              className="inline-flex items-center space-x-1 text-[#059669] hover:underline font-semibold print:hidden"
              title="Export as PDF / Print"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {/* Hero Feature Image (16/9 Rounded-2xl) */}
        {lesson.image && (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-8 shadow-lg bg-stone-100 dark:bg-stone-800">
            <img
              src={lesson.image}
              alt={lesson.title}
              className={`w-full h-full object-cover ${isLocked ? 'filter blur-[4px]' : ''}`}
            />
          </div>
        )}

        {/* Article Body Content (Max 65ch Prose) */}
        <div className="relative mb-12">
          
          {/* Blurred Premium Gated Content Overlay */}
          {isLocked ? (
            <div className="relative">
              {/* Partially Blurred Background Preview */}
              <div className="filter blur-md select-none pointer-events-none opacity-40 space-y-4">
                <p className="text-lg leading-relaxed font-serif">
                  {lesson.description}
                </p>
                <p className="text-base leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="text-base leading-relaxed">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>

              {/* Gold Upgrade Banner Card */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 bg-white/90 dark:bg-[#292524]/90 backdrop-blur-md rounded-2xl border-2 border-amber-400 shadow-2xl text-center">
                <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 shadow-lg">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 mb-2">
                  Premium Wisdom Locked
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-300 max-w-md mb-6 leading-relaxed">
                  This life lesson contains exclusive career and personal frameworks reserved for Premium members.
                </p>
                <Link
                  to="/pricing"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm shadow-lg shadow-amber-500/30 transition flex items-center space-x-2"
                >
                  <Star className="w-4 h-4 fill-white text-white" />
                  <span>Upgrade to Premium — ৳1500 Lifetime</span>
                </Link>
              </div>
            </div>
          ) : (
            /* Unlocked Full Prose Content */
            <article className="prose dark:prose-invert max-w-none text-stone-800 dark:text-stone-200 text-base md:text-lg leading-relaxed space-y-5">
              {lesson.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </article>
          )}
        </div>

        {/* Dedicated Author Card Section */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700 shadow-sm mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <img
              src={lesson.creatorPhoto}
              alt={lesson.creatorName}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-[#059669]"
            />
            <div>
              <h4 className="font-bold text-base text-stone-900 dark:text-stone-100">
                {lesson.creatorName}
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 flex items-center space-x-2 mt-0.5">
                <span>{lesson.creatorLessonsCount || 10} Public Lessons Created</span>
              </p>
            </div>
          </div>

          <Link
            to={`/author/${lesson.creatorId || 'user-101'}`}
            className="px-4 py-2 rounded-xl border border-[#059669] text-[#059669] dark:text-[#34D399] hover:bg-[#ECFDF5] dark:hover:bg-[#059669]/10 font-semibold text-xs transition"
          >
            View Author Profile
          </Link>
        </div>

        {/* Stats & Interactive Engagement Bar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700 shadow-md mb-12 flex items-center justify-between flex-wrap gap-4 print:hidden">
          
          {/* Stats Display */}
          <div className="flex items-center space-x-5 text-xs font-semibold text-stone-500 dark:text-stone-400">
            <span className="flex items-center space-x-1.5">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>{lesson.likesCount || 0} Likes</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Bookmark className="w-4 h-4 text-[#059669] fill-[#059669]" />
              <span>{lesson.favoritesCount || 0} Saved</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Eye className="w-4 h-4 text-sky-500" />
              <span>{lesson.viewsCount || 4200} Views</span>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Heart Bounce Button with Particle Burst */}
            <div className="relative">
              <HeartBurst triggerKey={isLiked ? lesson.id : null} />
              <motion.button
                whileTap={{ scale: 1.3 }}
                onClick={() => toggleLike(lesson.id)}
                className={`px-3.5 py-2 rounded-xl font-semibold text-xs flex items-center space-x-1.5 transition ${
                  isLiked
                    ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-600 text-red-600' : ''}`} />
                <span>{isLiked ? 'Liked' : 'Like'}</span>
              </motion.button>
            </div>

            {/* Favorite Save Button */}
            <button
              onClick={() => toggleFavorite(lesson.id)}
              className={`px-3.5 py-2 rounded-xl font-semibold text-xs flex items-center space-x-1.5 transition ${
                isSaved
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-[#059669] border border-emerald-200'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-emerald-50 hover:text-[#059669]'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#059669] text-[#059669]' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            {/* Share Button */}
            <button
              onClick={() => setShareModalOpen(true)}
              className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 transition"
              title="Share Lesson"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Report Button */}
            <button
              onClick={() => setReportModalOpen(true)}
              className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-400 hover:text-red-500 hover:bg-red-50 transition"
              title="Report Content"
            >
              <Flag className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Comment Section */}
        <section className="mb-16 print:hidden">
          <h3 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 mb-6">
            Discussion & Reflections ({lesson.comments?.length || 0})
          </h3>

          {/* Comment Form */}
          {user.isLoggedIn ? (
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <div className="flex items-start space-x-3">
                <img
                  src={user.photo}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-stone-200 dark:ring-stone-700"
                />
                <div className="flex-1">
                  <textarea
                    rows="3"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Share your reflection or takeaways on this lesson..."
                    className="w-full p-3.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#292524] text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#059669] focus:ring-2 focus:ring-[#D1FAE5] dark:focus:ring-[#059669]/30 transition"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="submit"
                      disabled={!commentText.trim()}
                      className="px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] disabled:opacity-40 text-white font-semibold text-xs shadow-md flex items-center space-x-1.5 transition"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post Reflection</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="p-4 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-sm text-center mb-8">
              Please <Link to="/login" className="text-[#059669] font-bold hover:underline">log in</Link> to post comments.
            </div>
          )}

          {/* Comments Thread */}
          <div className="space-y-4">
            {lesson.comments?.map((comment) => (
              <div
                key={comment.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#292524] border border-stone-200 dark:border-stone-700/80 flex items-start space-x-3.5"
              >
                <img
                  src={comment.userPhoto || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                  alt={comment.userName}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      {comment.userName}
                    </h5>
                    <span className="text-[11px] text-stone-400">
                      {new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    {comment.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Similar & Recommended Lessons Section (Up to 6 cards) */}
        {recommendedLessons.length > 0 && (
          <section className="pt-10 border-t border-stone-200 dark:border-stone-800 print:hidden">
            <h3 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 mb-6">
              Recommended Wisdom Entries
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 equal-card-grid">
              {recommendedLessons.map((recLesson) => (
                <div key={recLesson.id} className="h-full">
                  <LessonCard lesson={recLesson} />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Modals */}
      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        lessonId={lesson.id}
        lessonTitle={lesson.title}
      />

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        title={lesson.title}
      />

      <Footer />
    </div>
  );
};
