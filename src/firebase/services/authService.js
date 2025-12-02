import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../config';

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    console.error('Error signing in:', error);
    return { user: null, error: error.message };
  }
};

export const signUp = async (email, password, displayName, phone = '') => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update auth profile
    if (displayName) {
      await updateProfile(user, { displayName });
    }

    // Create Firestore user document in `users` collection
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      email,
      name: displayName || '',
      phone: phone || '',
      createdAt: serverTimestamp(),
    });

    return { user, error: null };
  } catch (error) {
    console.error('Error signing up:', error);
    return { user: null, error: error.message };
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    console.error('Error logging out:', error);
    return { error: error.message };
  }
};

export const getUserData = async (uid) => {
  try {
    const userRef = doc(db, 'users', uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      return { data: null, error: null };
    }
    return { data: { id: snap.id, ...snap.data() }, error: null };
  } catch (error) {
    console.error('Error getting user data:', error);
    return { data: null, error: error.message };
  }
};

export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};


