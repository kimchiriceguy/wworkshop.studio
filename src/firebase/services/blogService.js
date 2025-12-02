import {
  collection,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { db } from '../config';

const COLLECTION = 'blog';

export const getBlog = async (id) => {
  try {
    const ref = doc(collection(db, COLLECTION), id);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      return { data: null, error: null };
    }
    return { data: { id: snap.id, ...snap.data() }, error: null };
  } catch (error) {
    console.error('Error fetching blog:', error);
    return { data: null, error: error.message };
  }
};

export const saveBlog = async (id, content, title = '') => {
  try {
    const ref = doc(collection(db, COLLECTION), id);
    await setDoc(ref, { content, title }, { merge: true });
    return { error: null };
  } catch (error) {
    console.error('Error saving blog:', error);
    return { error: error.message };
  }
};


