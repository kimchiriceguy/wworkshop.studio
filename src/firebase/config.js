// Firebase Configuration
// Replace these values with your Firebase project configuration
// Get these from Firebase Console > Project Settings > General > Your apps

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDw1DiiUEzS1B93DrzeHeaWK5zUCbi94AI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "wworkshopstudio-b79dc.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "wworkshopstudio-b79dc",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "wworkshopstudio-b79dc.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1089319178170",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1089319178170:web:de4cfa38748c2b1545d783",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-YK4JG4FMP7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

