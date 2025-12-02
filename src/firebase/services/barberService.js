import {
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../config';

const COLLECTION = 'barbers';

export const getActiveBarbers = async () => {
  try {
    const q = query(
      collection(db, COLLECTION),
      where('status', '==', 'active'),
    );
    const snap = await getDocs(q);
    const results = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return { data: results, error: null };
  } catch (error) {
    console.error('Error getting active barbers:', error);
    return { data: null, error: error.message };
  }
};


