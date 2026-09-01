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

// Designated Administrator Email Accounts
const ADMIN_EMAILS = [
  "admin@digitallife.com",
  "admin@gmail.com",
  "admin@hireloop.com"
];

const checkIsAdmin = (email) => {
  if (!email) return false;
  const em = email.toLowerCase().trim();
  return (
    ADMIN_EMAILS.includes(em) ||
    em.startsWith("admin") ||
    em.includes("admin@") ||
    em.includes("nahyan") ||
    em.includes("ibtee")
  );
};

const INITIAL_PLATFORM_USERS = [
  {
    id: "user-admin",
    name: "Platform Administrator",
    email: "admin@digitallife.com",
    role: "admin",
    isPremium: true,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "user-marcus",
    name: "Marcus Vance",
    email: "marcus@example.com",
    role: "user",
    isPremium: true,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "user-elena",
    name: "Dr. Elena Rostova",
    email: "elena@example.com",
    role: "user",
    isPremium: false,
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "user-naval",
    name: "Naval K.",
    email: "naval@example.com",
    role: "user",
    isPremium: true,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "user-sarah",
    name: "Sarah Lin",
    email: "sarah@example.com",
    role: "user",
    isPremium: false,
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "user-alex",
    name: "Alex Chen",
    email: "alex@example.com",
    role: "user",
    isPremium: true,
    photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
  }
];

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
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    isReviewed: true,
    createdAt: "2026-08-06T16:45:00Z",
    updatedAt: "2026-08-06T16:45:00Z",
    creatorId: "user-elena",
    creatorName: "Dr. Elena Rostova",
    creatorPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    creatorLessonsCount: 14,
    likes: [],
    likesCount: 88,
    favoritesCount: 56,
    viewsCount: 1100,
    comments: []
  },
  {
    id: "lesson-6",
    title: "The Cost of Sunk-Cost Fallacy: Knowing When to Quit",
    description: "Persisting on a dead-end path is not perseverance; it is self-deception disguised as virtue.",
    content: "Winners quit all the time. They just quit the right stuff at the right time. The sunk-cost fallacy convinces us to keep investing time and money into a failing venture simply because we have already spent so much.\n\n### The Strategic Quit Checklist:\n1. If you had zero time invested today, would you choose to start this?\n2. Is this hurdle temporary resistance or fundamental misalignment?\n3. What higher-leverage opportunity are you ignoring to keep this alive?",
    category: "Mistakes Learned",
    emotionalTone: "Cautious",
    accessLevel: "Free",
    visibility: "Public",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    isReviewed: true,
    createdAt: "2026-08-07T12:00:00Z",
    updatedAt: "2026-08-07T12:00:00Z",
    creatorId: "user-alex",
    creatorName: "Alex Chen",
    creatorPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    creatorLessonsCount: 12,
    likes: ["user-current"],
    likesCount: 195,
    favoritesCount: 140,
    viewsCount: 2900,
    comments: []
  },
  {
    id: "lesson-7",
    title: "The Antifragile Mindset: Gaining from Chaos & Uncertainty",
    description: "Some things benefit from shocks; they thrive and grow when exposed to volatility, randomness, and disorder.",
    content: "Fragility breaks under pressure. Resilience merely resists shocks and stays the same. Antifragility gets better.\n\n### Building Antifragility\n1. **Redundancy**: Never depend on a single point of failure in career or income.\n2. **Small Failures Early**: Embrace small, non-fatal mistakes to discover systemic blindspots.\n3. **Asymmetric Payoffs**: Position yourself where downside is capped and upside is limitless.",
    category: "Mindset",
    emotionalTone: "Empowering",
    accessLevel: "Premium",
    visibility: "Public",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    isReviewed: true,
    createdAt: "2026-08-10T08:30:00Z",
    updatedAt: "2026-08-10T08:30:00Z",
    creatorId: "user-naval",
    creatorName: "Naval K.",
    creatorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    creatorLessonsCount: 22,
    likes: ["user-current", "user-elena"],
    likesCount: 312,
    favoritesCount: 190,
    viewsCount: 3400,
    comments: []
  },
  {
    id: "lesson-8",
    title: "The Deep Work Protocol: Protecting 4 Hours of Unbroken Focus",
    description: "The ability to perform deep work is becoming increasingly rare at exactly the same time it is becoming increasingly valuable in our economy.",
    content: "Deep work is the superpower of the 21st century knowledge worker. In an age of notification overload, unbroken concentration yields exponential output.\n\n### The Morning Isolation Rule\n- No Slack, email, or social media for the first 3 hours of the day.\n- Work on your highest-leverage project in a dedicated distraction-free zone.\n- Treat focus like physical training: build stamina from 45 minutes up to 4 hours.",
    category: "Productivity",
    emotionalTone: "Motivational",
    accessLevel: "Free",
    visibility: "Public",
    image: "https://images.unsplash.com/photo-1507842229452-772d1c9f8021?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    isReviewed: true,
    createdAt: "2026-08-12T15:00:00Z",
    updatedAt: "2026-08-12T15:00:00Z",
    creatorId: "user-sarah",
    creatorName: "Sarah Lin",
    creatorPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    creatorLessonsCount: 19,
    likes: ["user-marcus"],
    likesCount: 245,
    favoritesCount: 165,
    viewsCount: 2750,
    comments: []
  },
  {
    id: "lesson-9",
    title: "The Power of Asymmetric Opportunities: Never Risk Ruin for Ego",
    description: "Seek bets where downside is minimal and upside is extraordinary. Avoid vanity games.",
    content: "Most people spend their lives chasing linear rewards with catastrophic hidden downside (high debt, status games, reputation risk).\n\nTrue masters play positive-sum games with asymmetric upside: writing books, publishing open code, investing early in friends, and building compounding relationships.",
    category: "Career",
    emotionalTone: "Philosophical",
    accessLevel: "Free",
    visibility: "Public",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    isReviewed: true,
    createdAt: "2026-08-15T11:20:00Z",
    updatedAt: "2026-08-15T11:20:00Z",
    creatorId: "user-alex",
    creatorName: "Alex Chen",
    creatorPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    creatorLessonsCount: 12,
    likes: [],
    likesCount: 168,
    favoritesCount: 94,
    viewsCount: 1980,
    comments: []
  },
  {
    id: "lesson-10",
    title: "The Art of Active Listening: Silence as a Leadership Superpower",
    description: "Most people do not listen with the intent to understand; they listen with the intent to reply.",
    content: "The best leaders spend 80% of meetings asking thoughtful questions and pausing. Silence invites the team to solve hard problems without fear.\n\n### Three Listening Filters:\n1. What is the emotional subtext beneath their words?\n2. What assumption are they taking for granted?\n3. How can I empower them to own the outcome?",
    category: "Leadership",
    emotionalTone: "Reflective",
    accessLevel: "Free",
    visibility: "Public",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    isReviewed: true,
    createdAt: "2026-08-18T09:45:00Z",
    updatedAt: "2026-08-18T09:45:00Z",
    creatorId: "user-elena",
    creatorName: "Dr. Elena Rostova",
    creatorPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    creatorLessonsCount: 14,
    likes: ["user-current", "user-sarah"],
    likesCount: 270,
    favoritesCount: 155,
    viewsCount: 3100,
    comments: []
  },
  {
    id: "lesson-11",
    title: "Overcoming the Perfectionism Trap: Why Done is Better Than Flawless",
    description: "Perfectionism is not the pursuit of excellence; it is the fear of judgment dressed in high standards.",
    content: "Waiting for perfect conditions is the most sophisticated form of procrastination. Ship imperfect work early, gather real feedback, and iterate relentlessly.\n\nAction creates clarity. Inaction creates doubt and anxiety.",
    category: "Personal Growth",
    emotionalTone: "Empowering",
    accessLevel: "Free",
    visibility: "Public",
    image: "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    isReviewed: true,
    createdAt: "2026-08-20T14:00:00Z",
    updatedAt: "2026-08-20T14:00:00Z",
    creatorId: "user-marcus",
    creatorName: "Marcus Vance",
    creatorPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    creatorLessonsCount: 8,
    likes: [],
    likesCount: 182,
    favoritesCount: 103,
    viewsCount: 2200,
    comments: []
  },
  {
    id: "lesson-12",
    title: "Post-Traumatic Growth: Turning Career Failures into Catalysts",
    description: "The obstacle in your path is not in your way; the obstacle IS the path.",
    content: "When a company fails, a partnership breaks, or a major launch collapses, grief is natural. But resilient creators reframe catastrophic setbacks into wisdom.\n\nWhat you learn in the aftermath of defeat is knowledge that cannot be bought in any classroom or textbook.",
    category: "Mistakes Learned",
    emotionalTone: "Motivational",
    accessLevel: "Premium",
    visibility: "Public",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    isReviewed: true,
    createdAt: "2026-08-24T16:30:00Z",
    updatedAt: "2026-08-24T16:30:00Z",
    creatorId: "user-naval",
    creatorName: "Naval K.",
    creatorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    creatorLessonsCount: 22,
    likes: ["user-current", "user-alex"],
    likesCount: 388,
    favoritesCount: 260,
    viewsCount: 4700,
    comments: []
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const cached = localStorage.getItem("dll_user");
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {}
    return {
      id: null,
      name: "",
      email: "",
      photo: "",
      role: "user",
      isPremium: false,
      isLoggedIn: false
    };
  });

  const [loading, setLoading] = useState(true);
  const [lessons, setLessons] = useState(INITIAL_LESSONS);
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("dll_favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [reports, setReports] = useState([]);
  const [allUsers, setAllUsers] = useState(INITIAL_PLATFORM_USERS);
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

        const isAdminUser = checkIsAdmin(fbUser.email || userData.email);
        const resolvedRole = isAdminUser ? "admin" : (userData.role || "user");
        let resolvedPremium = isAdminUser ? true : (userData.isPremium || false);

        // Also check localStorage if premium was purchased recently
        try {
          const cached = JSON.parse(localStorage.getItem("dll_user"));
          if (cached && (cached.id === fbUser.uid || cached.email === fbUser.email) && cached.isPremium) {
            resolvedPremium = true;
          }
        } catch (e) {}

        setUser(prev => {
          const updated = {
            ...prev,
            id: fbUser.uid,
            name: userData.name || prev.name,
            email: userData.email || prev.email,
            photo: userData.photo || prev.photo,
            role: resolvedRole,
            isPremium: resolvedPremium || prev.isPremium,
            isLoggedIn: true
          };
          try {
            localStorage.setItem("dll_user", JSON.stringify(updated));
          } catch (e) {}
          return updated;
        });

        // Sync with MongoDB Atlas in the background
        try {
          const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
          await fetch(`${apiUrl}/auth/sync-user`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              uid: fbUser.uid,
              email: fbUser.email,
              name: userData.name || fbUser.displayName || fbUser.email?.split("@")[0],
              photo: userData.photo || fbUser.photoURL || "",
              role: resolvedRole,
              isPremium: resolvedPremium
            })
          });
        } catch (apiErr) {
          console.warn("MongoDB Atlas background sync:", apiErr.message);
        }

        // Also add/update user in local allUsers state for Admin Manage Users
        const syncedUserEntry = {
          id: fbUser.uid,
          uid: fbUser.uid,
          name: userData.name || fbUser.displayName || fbUser.email?.split("@")[0],
          email: fbUser.email || userData.email,
          photo: userData.photo || fbUser.photoURL || "",
          role: resolvedRole,
          isPremium: resolvedPremium
        };
        setAllUsers(prev => {
          const exists = prev.some(u => u.email === syncedUserEntry.email);
          if (exists) {
            return prev.map(u => u.email === syncedUserEntry.email ? { ...u, ...syncedUserEntry } : u);
          }
          return [...prev, syncedUserEntry];
        });

      } catch (err) {
        console.warn("Database sync skipped or timed out:", err.message);
      }
    })();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        const isAdmin = checkIsAdmin(fbUser.email);
        let cachedPremium = false;
        try {
          const cached = JSON.parse(localStorage.getItem("dll_user"));
          if (cached && (cached.id === fbUser.uid || cached.email === fbUser.email)) {
            cachedPremium = !!cached.isPremium;
          }
        } catch (e) {}

        const authUser = {
          id: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split("@")[0] || "User",
          email: fbUser.email || "",
          photo: fbUser.photoURL || "",
          role: isAdmin ? "admin" : "user",
          isPremium: isAdmin ? true : cachedPremium,
          isLoggedIn: true
        };
        try {
          localStorage.setItem("dll_user", JSON.stringify(authUser));
        } catch (e) {}
        setUser(authUser);

        // 2. Sync profile details from Firestore and MongoDB in the background
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
      
      const isAdmin = checkIsAdmin(result.user.email);
      const googleUser = {
        id: result.user.uid,
        name: result.user.displayName || result.user.email?.split("@")[0] || "User",
        email: result.user.email || "",
        photo: result.user.photoURL || "",
        role: isAdmin ? "admin" : "user",
        isPremium: isAdmin ? true : false,
        isLoggedIn: true
      };

      try {
        localStorage.setItem("dll_user", JSON.stringify(googleUser));
      } catch (e) {}

      setUser(googleUser);
      syncUserDocInBackground(result.user);
      showToast(`Welcome, ${googleUser.name}!`, "success");
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
    const isAdmin = checkIsAdmin(email);

    try {
      let authUser = null;
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        authUser = result.user;
      } catch (signInErr) {
        // If admin account was not created in Firebase yet, auto-create it with this password!
        if (isAdmin && (signInErr.code === "auth/user-not-found" || signInErr.code === "auth/invalid-credential")) {
          try {
            const createResult = await createUserWithEmailAndPassword(auth, email, password);
            authUser = createResult.user;
            await updateProfile(authUser, { displayName: "Platform Administrator" });
          } catch (createErr) {
            console.warn("Auto-create admin fallback in Firebase:", createErr.message);
          }
        } else if (!isAdmin) {
          throw signInErr;
        }
      }

      const finalUser = {
        id: authUser?.uid || (isAdmin ? "user-admin" : `user-${Date.now()}`),
        name: authUser?.displayName || (isAdmin ? "Platform Administrator" : email.split("@")[0]),
        email: authUser?.email || email,
        photo: authUser?.photoURL || (isAdmin ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" : ""),
        role: isAdmin ? "admin" : "user",
        isPremium: isAdmin ? true : false,
        isLoggedIn: true
      };

      try {
        localStorage.setItem("dll_user", JSON.stringify(finalUser));
      } catch (e) {}

      setUser(finalUser);

      if (authUser) {
        syncUserDocInBackground(authUser);
      }

      showToast(isAdmin ? "Welcome back, Platform Administrator! 🛡️" : "Logged in successfully!", "success");
      return finalUser;
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
    const updatedUser = { ...user, isPremium: true };
    setUser(updatedUser);

    try {
      localStorage.setItem("dll_user", JSON.stringify(updatedUser));
    } catch (e) {}

    // 1. Update Firestore
    if (user?.id) {
      try {
        await setDoc(doc(db, "users", user.id), { 
          isPremium: true,
          premiumPurchasedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (err) {
        console.warn("Firestore premium update:", err.message);
      }
    }

    // 2. Update MongoDB Atlas database
    if (user?.email) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        await fetch(`${apiUrl}/auth/upgrade-premium`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            photo: user.photo
          })
        });
      } catch (err) {
        console.warn("MongoDB Atlas premium sync:", err.message);
      }
    }

    showToast("🎉 Upgrade Successful! You are now a Lifetime VIP Member.", "success");
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
      try {
        localStorage.setItem("dll_favorites", JSON.stringify(updated));
      } catch (e) {}
      
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

    const toggleUserRole = (userId) => {
    setAllUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const newRole = u.role === "admin" ? "user" : "admin";
        showToast(`User role updated to ${newRole.toUpperCase()}`, "success");
        return { ...u, role: newRole };
      }
      return u;
    }));
  };

  const deletePlatformUser = (userId) => {
    setAllUsers(prev => prev.filter(u => u.id !== userId));
    showToast("User account removed from platform", "info");
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
        allUsers,
        toggleUserRole,
        deletePlatformUser,
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
