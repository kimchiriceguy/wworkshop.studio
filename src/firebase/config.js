// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// (values provided from your new Firebase project)
const firebaseConfig = {
  apiKey: 'AIzaSyBHLOJz-oORkoGd0HLp9CzPkgNbIL4tR-8',
  authDomain: 'wworkshopdotstudio.firebaseapp.com',
  projectId: 'wworkshopdotstudio',
  storageBucket: 'wworkshopdotstudio.firebasestorage.app',
  messagingSenderId: '1027279525672',
  appId: '1:1027279525672:web:6c40c9af5de40c1129621d',
  measurementId: 'G-P8QXEP83NX',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);