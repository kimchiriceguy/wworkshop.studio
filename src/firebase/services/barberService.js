// Barber Service - Firebase Firestore operations for barbers
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
 * Create a new barber
 */
export const createBarber = async (barberData) => {
  try {
    const barber = {
      ...barberData,
      isActive: true,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    const docRef = doc(collection(db, COLLECTIONS.BARBERS));
    await setDoc(docRef, { ...barber, id: docRef.id });
    return { id: docRef.id, error: null };
  } catch (error) {
    return { id: null, error: error.message };
  }
};

/**
 * Get barber by ID
 */
export const getBarber = async (barberId) => {
  try {
    const barberDoc = await getDoc(doc(db, COLLECTIONS.BARBERS, barberId));
    if (barberDoc.exists()) {
      return { data: barberDoc.data(), error: null };
    }
    return { data: null, error: 'Barber not found' };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

/**
 * Update barber
 */
export const updateBarber = async (barberId, updates) => {
  try {
    await updateDoc(doc(db, COLLECTIONS.BARBERS, barberId), {
      ...updates,
      updatedAt: Timestamp.now()
    });
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

/**
 * Delete barber
 */
export const deleteBarber = async (barberId) => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.BARBERS, barberId));
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

/**
 * Get all barbers
 */
export const getAllBarbers = async () => {
  try {
    const q = query(collection(db, COLLECTIONS.BARBERS), orderBy('name', 'asc'));
    const querySnapshot = await getDocs(q);
    const barbers = [];
    querySnapshot.forEach((doc) => {
      barbers.push({ id: doc.id, ...doc.data() });
    });
    return { data: barbers, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

/**
 * Get active barbers only
 */
export const getActiveBarbers = async () => {
  try {
    const q = query(
      collection(db, COLLECTIONS.BARBERS),
      orderBy('name', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const barbers = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.isActive !== false) {
        barbers.push({ id: doc.id, ...data });
      }
    });
    return { data: barbers, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

