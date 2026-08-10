import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const INITIAL_LESSONS = [
  {
    id: 'lesson-1',
    title: 'The Art of Saying No Without Feeling Guilty',
    description: 'Protecting your energy is not selfish. When you say no to the wrong things, you create space to say yes to what truly aligns with your core values.',
    content: `For years, I believed that being helpful meant agreeing to every request, meeting every demand, and stretching myself thin. The result? Burnout, resentment, and a constant feeling of depletion.

### The Turning Point
One evening, sitting in front of a half-written presentation I had promised to do for someone else while ignoring my own priority goals, it hit me: Every time I said 'yes' to someone else's priority out of guilt, I was saying 'no' to my own peace of mind.

### Key Insights
1. **Boundaries Are Bridges, Not Walls**: Setting clear boundaries teaches people how to interact with you respectfully.
2. **Clear is Kind**: A direct, polite refusal is far better than a half-hearted agreement followed by frustration.
3. **The 24-Hour Rule**: Give yourself time before committing. Say, "Let me check my schedule and get back to you tomorrow."

Preserving your focus isn't selfish — it's the foundation of sustained contribution.`,
    category: 'Personal Growth',
    emotionalTone: 'Motivational',
    accessLevel: 'Free',
    visibility: 'Public',
    isFeatured: true,
    isReviewed: true,
    createdAt: '2026-08-01T10:00:00Z',
    updatedAt: '2026-08-05T14:30:00Z',
    creatorId: 'user-101',
    creatorName: 'Marcus Vance',
    creatorPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    creatorLessonsCount: 14,
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80',
    likes: ['user-101', 'user-102', 'user-103'],
    likesCount: 1240,
    favoritesCount: 412,
    viewsCount: 5820,
    comments: [
      { id: 'c1', userId: 'user-102', userName: 'Sarah Jenkins', userPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', text: 'This insight changed how I manage my calendar. Thank you for sharing!', createdAt: '2026-08-02T11:20:00Z' },
      { id: 'c2', userId: 'user-103', userName: 'David Miller', userPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', text: 'Clear is kind — so true!', createdAt: '2026-08-03T15:45:00Z' }
    ]
  },
  {
    id: 'lesson-2',
    title: 'High-Growth Career Frameworks Nobody Teaches in School',
    description: 'Success in modern careers relies heavily on leverage, compounding reputation, and building systems rather than trading hours for dollars.',
    content: `Traditional education equips us with hard skills, but rarely prepares us for the strategic dynamics of career progression. 

### Principles of Career Acceleration
- **Solve Unowned Problems**: The fastest way to gain influence is taking responsibility for unsolved challenges nobody else wants to touch.
- **Build in Public**: Document your learning, share your insights, and let your portfolio speak louder than your resume.
- **Seek Asymmetric Upside**: Position yourself in projects where failure is low-cost but success brings exponential rewards.`,
    category: 'Career',
    emotionalTone: 'Realization',
    accessLevel: 'Premium',
    visibility: 'Public',
    isFeatured: true,
    isReviewed: true,
    createdAt: '2026-08-04T09:15:00Z',
    updatedAt: '2026-08-06T12:00:00Z',
    creatorId: 'user-102',
    creatorName: 'Elena Rostova',
    creatorPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    creatorLessonsCount: 22,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    likes: ['user-101'],
    likesCount: 980,
    favoritesCount: 654,
    viewsCount: 7120,
    comments: [
      { id: 'c3', userId: 'user-101', userName: 'Marcus Vance', userPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80', text: 'Invaluable perspective on asymmetric leverage.', createdAt: '2026-08-05T14:10:00Z' }
    ]
  },
  {
    id: 'lesson-3',
    title: 'Embracing Failure as Raw Feedback, Not Personal Identity',
    description: 'When an project fails, it is an experiment outcome — not a statement about your personal worth. Learn to detach ego from results.',
    content: `Failure carries a heavy stigma in our culture. But in engineering and scientific discovery, failure is simply a data point indicating what hypothesis didn't work.

When we view mistakes through this lens, shame evaporates and curiosity takes over.`,
    category: 'Mistakes Learned',
    emotionalTone: 'Sad',
    accessLevel: 'Free',
    visibility: 'Public',
    isFeatured: true,
    isReviewed: true,
    createdAt: '2026-08-03T14:20:00Z',
    updatedAt: '2026-08-03T14:20:00Z',
    creatorId: 'user-103',
    creatorName: 'Julian Hayes',
    creatorPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    creatorLessonsCount: 8,
    image: 'https://images.unsplash.com/photo-1499209974431-9dac3ada00d7?auto=format&fit=crop&w=800&q=80',
    likes: ['user-102', 'user-103'],
    likesCount: 750,
    favoritesCount: 290,
    viewsCount: 3400,
    comments: []
  },
  {
    id: 'lesson-4',
    title: 'The Silent Power of Daily Gratitude Audits',
    description: 'Gratitude is not just a warm feeling; it is a neurological re-wire that shifts your subconscious focus from scarcity to abundance.',
    content: `Every morning before opening emails or news, write down three hyper-specific things you appreciate. Not generic concepts like "family," but specific moments like "the warmth of coffee on a cold morning."`,
    category: 'Mindset',
    emotionalTone: 'Gratitude',
    accessLevel: 'Premium',
    visibility: 'Public',
    isFeatured: false,
    isReviewed: true,
    createdAt: '2026-08-06T08:00:00Z',
    updatedAt: '2026-08-06T08:00:00Z',
    creatorId: 'user-104',
    creatorName: 'Aria Chen',
    creatorPhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    creatorLessonsCount: 19,
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    likes: ['user-101', 'user-104'],
    likesCount: 1540,
    favoritesCount: 890,
    viewsCount: 9200,
    comments: []
  },
  {
    id: 'lesson-5',
    title: 'Nurturing Lifelong Relationships in a Distracted World',
    description: 'Deep friendships don’t happen by accident. They require deliberate presence, shared vulnerability, and intentional check-ins.',
    content: `In a world of superficial social media likes, genuine human connection has become a rare currency. Here is how to cultivate lasting bonds across decades.`,
    category: 'Relationships',
    emotionalTone: 'Motivational',
    accessLevel: 'Free',
    visibility: 'Public',
    isFeatured: false,
    isReviewed: true,
    createdAt: '2026-08-07T16:45:00Z',
    updatedAt: '2026-08-07T16:45:00Z',
    creatorId: 'user-101',
    creatorName: 'Marcus Vance',
    creatorPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    creatorLessonsCount: 14,
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    likes: ['user-103'],
    likesCount: 620,
    favoritesCount: 180,
    viewsCount: 2900,
    comments: []
  }
];

export const AuthProvider = ({ children }) => {
  // Demo Mode User State to easily evaluate Free vs Premium vs Admin features
  const [user, setUser] = useState({
    id: 'user-current',
    name: 'Nahyan Ahmed',
    email: 'nahyan@example.com',
    photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    role: 'user', // 'user' | 'admin'
    isPremium: false, // false = Free Plan, true = Premium Plan
    isLoggedIn: true
  });

  const [lessons, setLessons] = useState(INITIAL_LESSONS);
  const [favorites, setFavorites] = useState(['lesson-1', 'lesson-4']);
  const [reports, setReports] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleDemoRole = (newRole, isPrem) => {
    setUser(prev => ({
      ...prev,
      role: newRole,
      isPremium: isPrem !== undefined ? isPrem : prev.isPremium
    }));
    showToast(`Switched mode: ${newRole.toUpperCase()} (${isPrem ? 'Premium ⭐' : 'Free'})`, 'info');
  };

  const toggleLoginState = () => {
    setUser(prev => ({
      ...prev,
      isLoggedIn: !prev.isLoggedIn
    }));
    showToast(user.isLoggedIn ? 'Logged out successfully' : 'Logged in as Nahyan Ahmed', 'info');
  };

  const upgradeToPremium = () => {
    setUser(prev => ({ ...prev, isPremium: true }));
    showToast('🎉 Upgrade Successful! You are now a Premium Member.', 'success');
  };

  // Like Toggle
  const toggleLike = (lessonId) => {
    if (!user.isLoggedIn) {
      showToast('Please log in to like lessons', 'error');
      return;
    }
    setLessons(prev =>
      prev.map(l => {
        if (l.id === lessonId) {
          const hasLiked = l.likes.includes(user.id);
          const newLikes = hasLiked
            ? l.likes.filter(id => id !== user.id)
            : [...l.likes, user.id];
          return {
            ...l,
            likes: newLikes,
            likesCount: hasLiked ? l.likesCount - 1 : l.likesCount + 1
          };
        }
        return l;
      })
    );
  };

  // Favorites Toggle
  const toggleFavorite = (lessonId) => {
    if (!user.isLoggedIn) {
      showToast('Please log in to save favorites', 'error');
      return;
    }
    setFavorites(prev => {
      const exists = prev.includes(lessonId);
      const updated = exists ? prev.filter(id => id !== lessonId) : [...prev, lessonId];
      
      // Update lesson favorites count
      setLessons(lList =>
        lList.map(l => l.id === lessonId ? { ...l, favoritesCount: exists ? l.favoritesCount - 1 : l.favoritesCount + 1 } : l)
      );

      showToast(exists ? 'Removed from Favorites' : 'Saved to Favorites', 'success');
      return updated;
    });
  };

  // Add Comment
  const addComment = (lessonId, text) => {
    if (!user.isLoggedIn) {
      showToast('Please log in to comment', 'error');
      return;
    }
    const newComment = {
      id: `c-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userPhoto: user.photo,
      text,
      createdAt: new Date().toISOString()
    };
    setLessons(prev =>
      prev.map(l => l.id === lessonId ? { ...l, comments: [newComment, ...l.comments] } : l)
    );
    showToast('Comment added successfully!', 'success');
  };

  // Report Lesson
  const reportLesson = (lessonId, reason) => {
    const reportEntry = {
      id: `rep-${Date.now()}`,
      lessonId,
      reporterUserId: user.id,
      reportedUserEmail: user.email,
      reason,
      timestamp: new Date().toISOString()
    };
    setReports(prev => [...prev, reportEntry]);
    showToast('Report submitted. Our moderation team will review it.', 'info');
  };

  // Create Lesson
  const createLesson = (lessonData) => {
    const newLesson = {
      id: `lesson-${Date.now()}`,
      ...lessonData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      creatorId: user.id,
      creatorName: user.name,
      creatorPhoto: user.photo,
      creatorLessonsCount: 1,
      likes: [],
      likesCount: 0,
      favoritesCount: 0,
      viewsCount: 0,
      comments: [],
      isReviewed: true
    };
    setLessons(prev => [newLesson, ...prev]);
    showToast('Lesson created successfully!', 'success');
    return newLesson.id;
  };

  // Update Lesson
  const updateLesson = (lessonId, updatedFields) => {
    setLessons(prev =>
      prev.map(l => l.id === lessonId ? { ...l, ...updatedFields, updatedAt: new Date().toISOString() } : l)
    );
    showToast('Lesson updated successfully!', 'success');
  };

  // Delete Lesson
  const deleteLesson = (lessonId) => {
    setLessons(prev => prev.filter(l => l.id !== lessonId));
    setReports(prev => prev.filter(r => r.lessonId !== lessonId));
    setFavorites(prev => prev.filter(id => id !== lessonId));
    showToast('Lesson deleted permanently', 'info');
  };

  // Toggle Featured (Admin)
  const toggleFeatured = (lessonId) => {
    setLessons(prev =>
      prev.map(l => l.id === lessonId ? { ...l, isFeatured: !l.isFeatured } : l)
    );
    showToast('Featured status updated', 'success');
  };

  // Ignore Reports (Admin)
  const ignoreReports = (lessonId) => {
    setReports(prev => prev.filter(r => r.lessonId !== lessonId));
    showToast('Reports cleared for this lesson', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        lessons,
        favorites,
        reports,
        toastMessage,
        showToast,
        toggleDemoRole,
        toggleLoginState,
        upgradeToPremium,
        toggleLike,
        toggleFavorite,
        addComment,
        reportLesson,
        createLesson,
        updateLesson,
        deleteLesson,
        toggleFeatured,
        ignoreReports
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
