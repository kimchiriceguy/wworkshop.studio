// User Service - Firebase Firestore operations for user management
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config';
import { COLLECTIONS } from '../collections';

/**
 * Create or update user document
 */
export const createUser = async (userData) => {
  try {
    const user = {
      ...userData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    await setDoc(doc(db, COLLECTIONS.USERS, userData.uid), user, { merge: true });
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

/**
 * Get user by ID
 */
export const getUser = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, userId));
    if (userDoc.exists()) {
      return { data: userDoc.data(), error: null };
    }
    return { data: null, error: 'User not found' };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

/**
 * Update user
 */
export const updateUser = async (userId, updates) => {
  try {
    await updateDoc(doc(db, COLLECTIONS.USERS, userId), {
      ...updates,
      updatedAt: Timestamp.now()
    });
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

/**
 * Delete user
 */
export const deleteUser = async (userId) => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.USERS, userId));
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

/**
 * Get all users
 */
export const getAllUsers = async () => {
  try {
    const q = query(collection(db, COLLECTIONS.USERS), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return { data: users, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

