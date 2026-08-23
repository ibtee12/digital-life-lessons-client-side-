import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCR0fBuQnqP4IMwXqCqWfBYgVL8bW3YBaM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "digital-life-lessons-36fb0.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "digital-life-lessons-36fb0",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "digital-life-lessons-36fb0.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "800630569778",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:800630569778:web:13a5a26612d1d45797752b",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-5ZQXHMFW5N"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const db = getFirestore(app);
