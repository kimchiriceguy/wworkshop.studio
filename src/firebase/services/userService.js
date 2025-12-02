import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../config';

const COLLECTION = 'users';

export const getAllUsers = async () => {
  try {
    const snap = await getDocs(collection(db, COLLECTION));
    const results = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return { data: results, error: null };
  } catch (error) {
    console.error('Error fetching users:', error);
    return { data: null, error: error.message };
  }
};

export const updateUser = async (id, updates) => {
  try {
    const ref = doc(db, COLLECTION, id);
    await updateDoc(ref, updates);
    return { error: null };
  } catch (error) {
    console.error('Error updating user:', error);
    return { error: error.message };
  }
};

export const deleteUser = async (id) => {
  try {
    const ref = doc(db, COLLECTION, id);
    await deleteDoc(ref);
    return { error: null };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { error: error.message };
  }
};


