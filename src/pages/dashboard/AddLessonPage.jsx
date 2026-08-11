import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Info, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const CATEGORIES = ['Personal Growth', 'Career', 'Relationships', 'Mindset', 'Mistakes Learned'];
const TONES = ['Motivational', 'Sad', 'Realization', 'Gratitude'];

export const AddLessonPage = () => {
  const { user, createLesson } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Personal Growth');
  const [emotionalTone, setEmotionalTone] = useState('Motivational');
  const [image, setImage] = useState('');
  const [accessLevel, setAccessLevel] = useState('Free');
  const [visibility, setVisibility] = useState('Public');

  const handleSubmit = (e) => {
    e.preventDefault();

    const lessonData = {
      title,
      description,
      content: content || description,
      category,
      emotionalTone,
      image: image || 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80',
      accessLevel: user.isPremium ? accessLevel : 'Free', // Defaults to Free if not Premium
      visibility,
      isFeatured: false
    };

    const newId = createLesson(lessonData);
    navigate('/dashboard/my-lessons');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">
            Create New Life Lesson
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Share an insight, personal framework, or lesson learned from your journey.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#292524] rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-700/80 shadow-sm space-y-6">
        
        {/* Lesson Title */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
            Lesson Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. The Art of Saying No Without Feeling Guilty"
            className="w-full h-12 px-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 text-sm font-semibold focus:outline-none focus:border-[#059669] focus:ring-2 focus:ring-[#D1FAE5] dark:focus:ring-[#059669]/30 transition"
          />
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
            Short Summary / Preview <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A brief 1-2 sentence preview of the key insight..."
            className="w-full h-11 px-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#059669] focus:ring-2 focus:ring-[#D1FAE5] dark:focus:ring-[#059669]/30 transition"
          />
        </div>

        {/* Category & Emotional Tone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
              Wisdom Category <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 text-sm font-semibold focus:outline-none focus:border-[#059669]"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
              Emotional Tone <span className="text-red-500">*</span>
            </label>
            <select
              value={emotionalTone}
              onChange={(e) => setEmotionalTone(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 text-sm font-semibold focus:outline-none focus:border-[#059669]"
            >
              {TONES.map((tone) => (
                <option key={tone} value={tone}>{tone}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Access Level & Visibility Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Access Level with Tooltip */}
          <div className="relative group">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                Access Level
              </label>
              {!user.isPremium && (
                <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium flex items-center">
                  <Lock className="w-3 h-3 mr-1" /> Premium Only
                </span>
              )}
            </div>

            <select
              disabled={!user.isPremium}
              value={user.isPremium ? accessLevel : 'Free'}
              onChange={(e) => setAccessLevel(e.target.value)}
              className={`w-full h-11 px-3 rounded-xl border border-stone-200 dark:border-stone-700 text-sm font-semibold focus:outline-none ${
                !user.isPremium
                  ? 'bg-stone-100 dark:bg-stone-800 text-stone-400 cursor-not-allowed'
                  : 'bg-stone-50 dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 focus:border-[#059669]'
              }`}
            >
              <option value="Free">Free (Visible to everyone)</option>
              <option value="Premium">Premium (Paid members only)</option>
            </select>

            {/* Gated Rule Tooltip for Free Users */}
            {!user.isPremium && (
              <div className="mt-1.5 p-2 rounded-lg bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs flex items-center space-x-1.5">
                <Info className="w-4 h-4 flex-shrink-0" />
                <span>Upgrade to Premium to create paid lessons.</span>
              </div>
            )}
          </div>

          {/* Visibility */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
              Visibility Status
            </label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 text-sm font-semibold focus:outline-none focus:border-[#059669]"
            >
              <option value="Public">Public (Visible in search)</option>
              <option value="Private">Private (Draft for your eyes only)</option>
            </select>
          </div>
        </div>

        {/* Feature Image URL */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
            Featured Image URL (Optional)
          </label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="w-full h-11 px-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#059669] transition"
          />
        </div>

        {/* Full Story Content */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
            Full Story & Actionable Takeaways <span className="text-red-500">*</span>
          </label>
          <textarea
            rows="8"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write out the full story, context, and key takeaways..."
            className="w-full p-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#059669] focus:ring-2 focus:ring-[#D1FAE5] dark:focus:ring-[#059669]/30 transition leading-relaxed"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4 border-t border-stone-100 dark:border-stone-800">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-extrabold text-sm shadow-md flex items-center space-x-2 transition"
          >
            <span>Publish Life Lesson</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>
    </div>
  );
};
