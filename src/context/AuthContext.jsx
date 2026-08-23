import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "../firebase/config";

const AuthContext = createContext();

const INITIAL_LESSONS = [
  {
    id: "lesson-1",
    title: "The Art of Saying No Without Feeling Guilty",
    description: "Boundaries are not walls to keep people out; they are bridges that define where you end and others begin.",
    content: "Early in my career, I agreed to every request, deadline, and project pushed my way. I believed that saying yes was the only way to demonstrate value and loyalty. But by constantly pleasing others, I was quietly sabotaging my own peace, energy, and work quality.\n\n### 1. Protect Your Core Energy\nYour time is a non-renewable resource. Every time you say yes to something non-essential, you are implicitly saying no to your primary goals, your health, or your loved ones.\n\n### 2. Standard Scripts for Graceful Refusal\n- Thank you for thinking of me! Right now, my focus is fully committed to X, so I won wrong be able to give this the attention it deserves.\n- I would love to help, but I cannot take on new commitments this month.\n\nRemember: A clear no up front is always kinder than a delayed, resentful yes.",
    category: "Personal Growth",
    emotionalTone: "Empowering",
    accessLevel: "Free",
    visibility: "Public",
    isFeatured: true,
    isReviewed: true,
    createdAt: "2026-08-01T10:00:00Z",
    updatedAt: "2026-08-01T10:00:00Z",
    creatorId: "user-101",
    creatorName: "Marcus Vance",
    creatorPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    creatorLessonsCount: 14,
    image: "https://images.unsplash.com/photo-1499209974431-9dac3ada00d7?auto=format&fit=crop&w=800&q=80",
    likes: ["user-102", "user-103"],
    likesCount: 124,
    favoritesCount: 45,
    viewsCount: 1280,
    comments: [
      {
        id: "c-1",
        userId: "user-102",
        userName: "Elena Rostova",
        userPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        text: "This insight completely shifted how I manage my workload. Essential read!",
        createdAt: "2026-08-02T14:30:00Z"
      }
    ]
  },
  {
    id: "lesson-2",
    title: "Mastering the 80/20 Rule in Career Breakthroughs",
    description: "Identify the 20% of effort that produces 80% of your career results, and double down relentlessly.",
    content: "The Pareto Principle applies to almost every aspect of professional execution. In software engineering, 20% of bugs cause 80% of system crashes. In sales, 20% of clients generate 80% of revenue.\n\n### How to Apply Pareto Audits Weekly\n1. List your top 10 weekly tasks.\n2. Highlight the 2 tasks that directly move the needle for your team or business.\n3. Automate, delegate, or eliminate the remaining 8 tasks.",
    category: "Career & Leadership",
    emotionalTone: "Analytical",
    accessLevel: "Free",
    visibility: "Public",
    isFeatured: true,
    isReviewed: true,
    createdAt: "2026-08-03T12:00:00Z",
    updatedAt: "2026-08-03T12:00:00Z",
    creatorId: "user-102",
    creatorName: "Elena Rostova",
    creatorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    creatorLessonsCount: 28,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    likes: ["user-101"],
    likesCount: 310,
    favoritesCount: 120,
    viewsCount: 2400,
    comments: []
  },
  {
    id: "lesson-3",
    title: "Financial Independence: The Power of Asymmetric Bets",
    description: "How to structure risk so that downside is strictly capped while upside remains virtually unlimited.",
    content: "Asymmetric risk management means putting yourself in positions where you have little to lose and everything to gain.\n\nExamples of Asymmetric Bets:\n- Publishing high-value content online (Cost: 2 hours of time; Upside: Global network, consulting opportunities).\n- Reaching out to industry leaders directly (Cost: 1 minute email; Upside: Life-changing mentorship).",
    category: "Finance & Wealth",
    emotionalTone: "Strategic",
    accessLevel: "Premium",
    visibility: "Public",
    isFeatured: true,
    isReviewed: true,
    createdAt: "2026-08-05T09:15:00Z",
    updatedAt: "2026-08-05T09:15:00Z",
    creatorId: "user-103",
    creatorName: "David Sterling",
    creatorPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    creatorLessonsCount: 42,
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
    likes: ["user-101", "user-102"],
    likesCount: 890,
    favoritesCount: 410,
    viewsCount: 5600,
    comments: []
  },
  {
    id: "lesson-4",
    title: "The Silent Power of Daily Gratitude Audits",
    description: "Gratitude is not just a warm feeling; it is a neurological re-wire that shifts your subconscious focus from scarcity to abundance.",
    content: "Every morning before opening emails or news, write down three hyper-specific things you appreciate. Not generic concepts like family, but specific moments like the warmth of coffee on a cold morning.",
    category: "Mindset",
    emotionalTone: "Gratitude",
    accessLevel: "Premium",
    visibility: "Public",
    isFeatured: false,
    isReviewed: true,
    createdAt: "2026-08-06T08:00:00Z",
    updatedAt: "2026-08-06T08:00:00Z",
    creatorId: "user-104",
    creatorName: "Aria Chen",
    creatorPhoto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    creatorLessonsCount: 19,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    likes: ["user-101", "user-104"],
    likesCount: 1540,
    favoritesCount: 890,
    viewsCount: 9200,
    comments: []
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: "user-current",
    name: "Nahyan Ahmed",
    email: "nahyan@example.com",
    photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    role: "user",
    isPremium: false,
    isLoggedIn: false
  });

  const [loading, setLoading] = useState(true);
  const [lessons, setLessons] = useState(INITIAL_LESSONS);
  const [favorites, setFavorites] = useState(["lesson-1", "lesson-4"]);
  const [reports, setReports] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = "success") => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const syncUserDoc = async (fbUser) => {
    try {
      const userRef = doc(db, "users", fbUser.uid);
      const userSnap = await getDoc(userRef);

      let userData = {
        name: fbUser.displayName || fbUser.email?.split("@")[0] || "User",
        email: fbUser.email || "",
        photo: fbUser.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
        role: "user",
        isPremium: false,
        createdAt: new Date().toISOString()
      };

      if (userSnap.exists()) {
        const existing = userSnap.data();
        userData = { ...userData, ...existing };
      } else {
        await setDoc(userRef, userData);
      }

      setUser({
        id: fbUser.uid,
        name: userData.name,
        email: userData.email,
        photo: userData.photo,
        role: userData.role || "user",
        isPremium: userData.isPremium || false,
        isLoggedIn: true
      });
    } catch (err) {
      console.error("Error syncing Firestore user document:", err);
      setUser({
        id: fbUser.uid,
        name: fbUser.displayName || "User",
        email: fbUser.email || "",
        photo: fbUser.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
        role: "user",
        isPremium: false,
        isLoggedIn: true
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        await syncUserDoc(fbUser);
      } else {
        setUser(prev => ({
          ...prev,
          isLoggedIn: false
        }));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await syncUserDoc(result.user);
      showToast(`Welcome back, ${result.user.displayName || "User"}!`, "success");
      return result.user;
    } catch (err) {
      console.error("Google sign in error:", err);
      showToast(err.message || "Failed to sign in with Google", "error");
      throw err;
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await syncUserDoc(result.user);
      showToast("Logged in successfully!", "success");
      return result.user;
    } catch (err) {
      console.error("Email login error:", err);
      let msg = "Failed to log in.";
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        msg = "Invalid email or password.";
      }
      showToast(msg, "error");
      throw err;
    }
  };

  const registerWithEmail = async (name, email, password, photo) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const userPhoto = photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80";

      await updateProfile(result.user, {
        displayName: name,
        photoURL: userPhoto
      });

      const userRef = doc(db, "users", result.user.uid);
      const userData = {
        name,
        email,
        photo: userPhoto,
        role: "user",
        isPremium: false,
        createdAt: new Date().toISOString()
      };

      await setDoc(userRef, userData);

      setUser({
        id: result.user.uid,
        name,
        email,
        photo: userPhoto,
        role: "user",
        isPremium: false,
        isLoggedIn: true
      });

      showToast("Account created successfully!", "success");
      return result.user;
    } catch (err) {
      console.error("Registration error:", err);
      let msg = err.message || "Failed to create account.";
      if (err.code === "auth/email-already-in-use") {
        msg = "An account with this email already exists.";
      }
      showToast(msg, "error");
      throw err;
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
      setUser(prev => ({ ...prev, isLoggedIn: false }));
      showToast("Logged out successfully", "info");
    } catch (err) {
      console.error("Logout error:", err);
      showToast("Failed to log out", "error");
    }
  };

  const toggleDemoRole = (newRole, isPrem) => {
    setUser(prev => ({
      ...prev,
      role: newRole,
      isPremium: isPrem !== undefined ? isPrem : prev.isPremium,
      isLoggedIn: true
    }));
    showToast(`Switched mode: ${newRole.toUpperCase()} (${isPrem ? "Premium ⭐" : "Free"})`, "info");
  };

  const toggleLoginState = () => {
    if (user.isLoggedIn) {
      logoutUser();
    } else {
      setUser(prev => ({
        ...prev,
        isLoggedIn: true
      }));
      showToast("Logged in mode active", "info");
    }
  };

  const upgradeToPremium = async () => {
    setUser(prev => ({ ...prev, isPremium: true }));
    if (user.id && user.id !== "user-current") {
      try {
        await setDoc(doc(db, "users", user.id), { isPremium: true }, { merge: true });
      } catch (err) {
        console.error("Failed to update premium in Firestore:", err);
      }
    }
    showToast("🎉 Upgrade Successful! You are now a Premium Member.", "success");
  };

  const toggleLike = (lessonId) => {
    if (!user.isLoggedIn) {
      showToast("Please log in to like lessons", "error");
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

  const toggleFavorite = (lessonId) => {
    if (!user.isLoggedIn) {
      showToast("Please log in to save favorites", "error");
      return;
    }
    setFavorites(prev => {
      const exists = prev.includes(lessonId);
      const updated = exists ? prev.filter(id => id !== lessonId) : [...prev, lessonId];
      
      setLessons(lList =>
        lList.map(l => l.id === lessonId ? { ...l, favoritesCount: exists ? l.favoritesCount - 1 : l.favoritesCount + 1 } : l)
      );

      showToast(exists ? "Removed from Favorites" : "Saved to Favorites", "success");
      return updated;
    });
  };

  const addComment = (lessonId, text) => {
    if (!user.isLoggedIn) {
      showToast("Please log in to comment", "error");
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
    showToast("Comment added successfully!", "success");
  };

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
    showToast("Report submitted. Our moderation team will review it.", "info");
  };

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
    showToast("Lesson created successfully!", "success");
    return newLesson.id;
  };

  const updateLesson = (lessonId, updatedFields) => {
    setLessons(prev =>
      prev.map(l => l.id === lessonId ? { ...l, ...updatedFields, updatedAt: new Date().toISOString() } : l)
    );
    showToast("Lesson updated successfully!", "success");
  };

  const deleteLesson = (lessonId) => {
    setLessons(prev => prev.filter(l => l.id !== lessonId));
    setReports(prev => prev.filter(r => r.lessonId !== lessonId));
    setFavorites(prev => prev.filter(id => id !== lessonId));
    showToast("Lesson deleted permanently", "info");
  };

  const toggleFeatured = (lessonId) => {
    setLessons(prev =>
      prev.map(l => l.id === lessonId ? { ...l, isFeatured: !l.isFeatured } : l)
    );
    showToast("Featured status updated", "success");
  };

  const ignoreReports = (lessonId) => {
    setReports(prev => prev.filter(r => r.lessonId !== lessonId));
    showToast("Reports cleared for this lesson", "info");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        lessons,
        favorites,
        reports,
        toastMessage,
        showToast,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logoutUser,
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
