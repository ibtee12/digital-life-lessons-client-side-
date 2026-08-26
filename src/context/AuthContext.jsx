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
    content: "Early in my career, I agreed to every request, deadline, and project pushed my way. I believed that saying yes was the only way to demonstrate value and loyalty. But by constantly pleasing others, I was quietly sabotaging my own peace, energy, and work quality.\n\n### 1. Protect Your Core Energy\nYour time is a non-renewable resource. Every time you say yes to something non-essential, you are implicitly saying no to your primary goals, your health, or your loved ones.\n\n### 2. Standard Scripts for Graceful Refusal\n- Thank you for thinking of me! Right now, my focus is fully committed to X, so I won't be able to give this the attention it deserves.\n- I would love to help, but I cannot take on new commitments this month.\n\nRemember: A clear no up front is always kinder than a delayed, resentful yes.",
    category: "Personal Growth",
    emotionalTone: "Empowering",
    accessLevel: "Free",
    visibility: "Public",
    isFeatured: true,
    isReviewed: true,
    createdAt: "2026-08-01T10:00:00Z",
    updatedAt: "2026-08-01T10:00:00Z",
    creatorId: "user-marcus",
    creatorName: "Marcus Vance",
    creatorPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    creatorLessonsCount: 8,
    likes: ["user-current", "user-sarah"],
    likesCount: 142,
    favoritesCount: 89,
    viewsCount: 1250,
    comments: [
      {
        id: "c-1",
        userId: "user-sarah",
        userName: "Sarah Lin",
        userPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
        text: "This transformed how I handle client scope creep. The standard scripts are gold!",
        createdAt: "2026-08-02T14:20:00Z"
      }
    ]
  },
  {
    id: "lesson-2",
    title: "Mastering Emotional Agility Under High Stress",
    description: "Stress is not what happens to us; it is our emotional reaction to events that we often cannot control.",
    content: "When high-stakes deadlines hit, our primitive threat response triggers panic. Emotional agility is the ability to observe your thoughts and feelings without being hooked by them.\n\n### The 3-Second Cognitive Pause\n1. Notice physical tension\n2. Label the emotion ('I am noticing feelings of overwhelm')\n3. Align action with your ultimate values rather than immediate impulse.",
    category: "Mindset",
    emotionalTone: "Philosophical",
    accessLevel: "Free",
    visibility: "Public",
    isFeatured: true,
    isReviewed: true,
    createdAt: "2026-08-03T11:30:00Z",
    updatedAt: "2026-08-03T11:30:00Z",
    creatorId: "user-elena",
    creatorName: "Dr. Elena Rostova",
    creatorPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    creatorLessonsCount: 14,
    likes: ["user-current"],
    likesCount: 238,
    favoritesCount: 110,
    viewsCount: 2400,
    comments: []
  },
  {
    id: "lesson-3",
    title: "Compound Habits: The Invisible Math of 1% Daily Improvements",
    description: "Success is the product of daily habits—not once-in-a-lifetime transformations.",
    content: "We often convince ourselves that massive success requires massive action. Whether it is losing weight, building a business, or writing a book, we put pressure on ourselves to make some earth-shattering improvement that everyone will talk about.\n\nMeanwhile, improving by 1 percent isn't particularly notable— sometimes it isn't even noticeable—but it can be far more meaningful in the long run.",
    category: "Productivity",
    emotionalTone: "Motivational",
    accessLevel: "Free",
    visibility: "Public",
    isFeatured: false,
    isReviewed: true,
    createdAt: "2026-08-04T09:00:00Z",
    updatedAt: "2026-08-04T09:00:00Z",
    creatorId: "user-marcus",
    creatorName: "Marcus Vance",
    creatorPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    creatorLessonsCount: 8,
    likes: [],
    likesCount: 95,
    favoritesCount: 42,
    viewsCount: 890,
    comments: []
  },
  {
    id: "lesson-4",
    title: "Executive Wealth Blueprint: Capital Allocation for Creators",
    description: "Deep dive into equity structures, automated investments, and royalty architectures for independent thinkers.",
    content: "Wealth is assets that earn while you sleep. Money is how we transfer time and wealth. Status is your place in the social hierarchy.\n\n### 1. Own Equity\nYou are not going to get rich renting out your time. You must own equity—a piece of a business—to gain your financial freedom.\n\n### 2. Specific Knowledge\nArm yourself with specific knowledge, accountability, and leverage. Specific knowledge is knowledge that you cannot be trained for. If society can train you, it can train someone else, and replace you.",
    category: "Career",
    emotionalTone: "Empowering",
    accessLevel: "Premium",
    visibility: "Public",
    isFeatured: true,
    isReviewed: true,
    createdAt: "2026-08-05T14:15:00Z",
    updatedAt: "2026-08-05T14:15:00Z",
    creatorId: "user-naval",
    creatorName: "Naval K.",
    creatorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    creatorLessonsCount: 22,
    likes: ["user-sarah"],
    likesCount: 480,
    favoritesCount: 310,
    viewsCount: 5600,
    comments: []
  },
  {
    id: "lesson-5",
    title: "Radical Candor in Remote Leadership Teams",
    description: "Care personally while challenging directly to build unbreakable high-trust engineering cultures.",
    content: "Radical Candor is the sweet spot between leaders who are obnoxiously aggressive and those who are ruinously empathetic.\n\nTo implement Radical Candor:\n1. Solicit feedback before giving it\n2. Give feedback immediately and privately\n3. Praise in public, criticize in private\n4. Make it about the work, never the person.",
    category: "Leadership",
    emotionalTone: "Reflective",
    accessLevel: "Premium",
    visibility: "Public",
    isFeatured: false,
    isReviewed: true,
    createdAt: "2026-08-06T16:45:00Z",
    updatedAt: "2026-08-06T16:45:00Z",
    creatorId: "user-elena",
    creatorName: "Dr. Elena Rostova",
    creatorPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    creatorLessonsCount: 14,
    likes: ["user-current"],
    likesCount: 312,
    favoritesCount: 180,
    viewsCount: 3400,
    comments: []
  },
  {
    id: "lesson-6",
    title: "Stoic Resilience: Turning Obstacles into Pure Fuel",
    description: "The impediment to action advances action. What stands in the way becomes the way.",
    content: "Our actions may be impeded, but there can be no impeding our intentions or dispositions. Because we can accommodate and adapt. The mind adapts and converts to its own purposes the obstacle to our acting.\n\nPractice mental reframing daily: Every setback is an opportunity for virtue practice.",
    category: "Mindset",
    emotionalTone: "Philosophical",
    accessLevel: "Free",
    visibility: "Public",
    isFeatured: true,
    isReviewed: true,
    createdAt: "2026-08-07T08:20:00Z",
    updatedAt: "2026-08-07T08:20:00Z",
    creatorId: "user-marcus",
    creatorName: "Marcus Aurelius Scholar",
    creatorPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    creatorLessonsCount: 5,
    likes: ["user-current", "user-sarah"],
    likesCount: 1540,
    favoritesCount: 890,
    viewsCount: 9200,
    comments: []
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    photo: "",
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

  // Fast background Firestore sync that NEVER hangs authentication
  const syncUserDocInBackground = (fbUser, customData = {}) => {
    // Run entirely asynchronous without blocking user login
    (async () => {
      try {
        const userRef = doc(db, "users", fbUser.uid);
        
        // 1.5s timeout promise so slow database connection NEVER hangs the app
        const fetchWithTimeout = Promise.race([
          getDoc(userRef),
          new Promise((_, reject) => setTimeout(() => reject(new Error("Firestore timeout")), 1500))
        ]);

        const userSnap = await fetchWithTimeout;

        let userData = {
          name: fbUser.displayName || fbUser.email?.split("@")[0] || "User",
          email: fbUser.email || "",
          photo: fbUser.photoURL || "",
          role: "user",
          isPremium: false,
          createdAt: new Date().toISOString(),
          ...customData
        };

        if (userSnap && userSnap.exists()) {
          const existing = userSnap.data();
          userData = { ...userData, ...existing };
        } else {
          setDoc(userRef, userData, { merge: true }).catch(() => {});
        }

        setUser(prev => ({
          ...prev,
          id: fbUser.uid,
          name: userData.name || prev.name,
          email: userData.email || prev.email,
          photo: userData.photo || prev.photo,
          role: userData.role || "user",
          isPremium: userData.isPremium || false,
          isLoggedIn: true
        }));
      } catch (err) {
        console.warn("Firestore sync skipped or timed out:", err.message);
      }
    })();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        // 1. Instantly set user state from Firebase Auth token (0ms lag)
        setUser({
          id: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split("@")[0] || "User",
          email: fbUser.email || "",
          photo: fbUser.photoURL || "",
          role: "user",
          isPremium: false,
          isLoggedIn: true
        });

        // 2. Sync profile details from Firestore in the background
        syncUserDocInBackground(fbUser);
      } else {
        setUser({
          id: null,
          name: "",
          email: "",
          photo: "",
          role: "user",
          isPremium: false,
          isLoggedIn: false
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      // Instantly set user in state
      setUser({
        id: result.user.uid,
        name: result.user.displayName || "User",
        email: result.user.email || "",
        photo: result.user.photoURL || "",
        role: "user",
        isPremium: false,
        isLoggedIn: true
      });

      syncUserDocInBackground(result.user);
      showToast(`Welcome back, ${result.user.displayName || "User"}!`, "success");
      return result.user;
    } catch (err) {
      console.error("Google sign in error:", err);
      let msg = err.message || "Failed to sign in with Google";
      if (err.code === "auth/popup-closed-by-user") {
        msg = "Sign in popup was closed. Please try again.";
      }
      showToast(msg, "error");
      throw err;
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      setUser({
        id: result.user.uid,
        name: result.user.displayName || email.split("@")[0],
        email: result.user.email || email,
        photo: result.user.photoURL || "",
        role: "user",
        isPremium: false,
        isLoggedIn: true
      });

      syncUserDocInBackground(result.user);
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
      const userPhoto = photo || "";

      // Update Firebase Auth profile in parallel
      updateProfile(result.user, {
        displayName: name,
        photoURL: userPhoto
      }).catch(() => {});

      // Instantly activate user state (0 delay)
      setUser({
        id: result.user.uid,
        name,
        email,
        photo: userPhoto,
        role: "user",
        isPremium: false,
        isLoggedIn: true
      });

      // Save to Firestore in background
      syncUserDocInBackground(result.user, { name, email, photo: userPhoto });

      showToast("Account created successfully!", "success");
      return result.user;
    } catch (err) {
      console.error("Registration error:", err);
      let msg = err.message || "Failed to create account.";
      if (err.code === "auth/operation-not-allowed") {
        msg = "Email/Password sign-in is disabled in your Firebase Console. Please enable Email/Password under Authentication -> Sign-in method in Firebase Console.";
      } else if (err.code === "auth/email-already-in-use") {
        msg = "An account with this email address already exists. Please log in instead.";
      } else if (err.code === "auth/weak-password") {
        msg = "The password is too weak. Please use at least 6 characters with uppercase and lowercase letters.";
      } else if (err.code === "auth/invalid-email") {
        msg = "The email address format is invalid.";
      }
      showToast(msg, "error");
      throw err;
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser({
        id: null,
        name: "",
        email: "",
        photo: "",
        role: "user",
        isPremium: false,
        isLoggedIn: false
      });
      showToast("Logged out successfully", "info");
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
