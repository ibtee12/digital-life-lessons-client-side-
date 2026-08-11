import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const CATEGORIES = ['Personal Growth', 'Career', 'Relationships', 'Mindset', 'Mistakes Learned'];
const TONES = ['Motivational', 'Sad', 'Realization', 'Gratitude'];

export const EditLessonPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, lessons, updateLesson } = useAuth();

  const target = lessons.find((l) => l.id === id) || lessons[0];

  const [title, setTitle] = useState(target.title || '');
  const [description, setDescription] = useState(target.description || '');
  const [content, setContent] = useState(target.content || '');
  const [category, setCategory] = useState(target.category || 'Personal Growth');
  const [emotionalTone, setEmotionalTone] = useState(target.emotionalTone || 'Motivational');
  const [image, setImage] = useState(target.image || '');
  const [accessLevel, setAccessLevel] = useState(target.accessLevel || 'Free');
  const [visibility, setVisibility] = useState(target.visibility || 'Public');

  useEffect(() => {
    if (target) {
      setTitle(target.title);
      setDescription(target.description);
      setContent(target.content);
      setCategory(target.category);
      setEmotionalTone(target.emotionalTone);
      setImage(target.image);
      setAccessLevel(target.accessLevel);
      setVisibility(target.visibility);
    }
  }, [target]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateLesson(target.id, {
      title,
      description,
      content,
      category,
      emotionalTone,
      image,
      accessLevel: user.isPremium ? accessLevel : 'Free',
      visibility
    });
    navigate('/dashboard/my-lessons');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <button
            onClick={() => navigate('/dashboard/my-lessons')}
            className="text-xs font-semibold text-[#059669] flex items-center mb-1 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to My Lessons
          </button>
          <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">
            Edit Life Lesson
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#292524] rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-700/80 shadow-sm space-y-6">
        
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
            Lesson Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-12 px-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 text-sm font-semibold focus:outline-none focus:border-[#059669]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
            Short Description Preview
          </label>
          <input
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-11 px-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#059669]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 text-sm font-semibold"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
              Emotional Tone
            </label>
            <select
              value={emotionalTone}
              onChange={(e) => setEmotionalTone(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 text-sm font-semibold"
            >
              {TONES.map((tone) => (
                <option key={tone} value={tone}>{tone}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
              Access Level
            </label>
            <select
              disabled={!user.isPremium}
              value={user.isPremium ? accessLevel : 'Free'}
              onChange={(e) => setAccessLevel(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 text-sm font-semibold disabled:opacity-50"
            >
              <option value="Free">Free</option>
              <option value="Premium">Premium</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
              Visibility
            </label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 text-sm font-semibold"
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
            Full Story Content
          </label>
          <textarea
            rows="8"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#059669]"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-stone-100 dark:border-stone-800">
          <button
            type="button"
            onClick={() => navigate('/dashboard/my-lessons')}
            className="px-5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-semibold text-xs"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-extrabold text-xs shadow-md flex items-center space-x-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>

      </form>
    </div>
  );
};
