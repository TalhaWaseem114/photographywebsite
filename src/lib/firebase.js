import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAFXKkR0S-t7O9zOnsIp7OckLYYvlLCH0U",
  authDomain: "photography-efa86.firebaseapp.com",
  projectId: "photography-efa86",
  storageBucket: "photography-efa86.firebasestorage.app",
  messagingSenderId: "340461651438",
  appId: "1:340461651438:web:e660a569bd187d9a1fbaff",
  measurementId: "G-X0BXZ6N95M"
};

// Initialize Firebase (singleton pattern for Next.js hot-reloads)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

let analytics = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, db, auth, storage, analytics };
