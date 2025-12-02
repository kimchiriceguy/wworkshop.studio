import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../config';

const COLLECTION = 'orders';

export const getAllOrders = async () => {
  try {
    const snap = await getDocs(collection(db, COLLECTION));
    const results = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return { data: results, error: null };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { data: null, error: error.message };
  }
};

export const updateOrder = async (id, updates) => {
  try {
    const ref = doc(db, COLLECTION, id);
    await updateDoc(ref, updates);
    return { error: null };
  } catch (error) {
    console.error('Error updating order:', error);
    return { error: error.message };
  }
};

export const deleteOrder = async (id) => {
  try {
    const ref = doc(db, COLLECTION, id);
    await deleteDoc(ref);
    return { error: null };
  } catch (error) {
    console.error('Error deleting order:', error);
    return { error: error.message };
  }
};


