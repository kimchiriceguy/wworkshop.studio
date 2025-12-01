// Service Service - Firebase Firestore operations for barbershop services
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
 * Create a new service
 */
export const createService = async (serviceData) => {
  try {
    const service = {
      ...serviceData,
      isActive: true,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    const docRef = doc(collection(db, COLLECTIONS.SERVICES));
    await setDoc(docRef, { ...service, id: docRef.id });
    return { id: docRef.id, error: null };
  } catch (error) {
    return { id: null, error: error.message };
  }
};

/**
 * Get service by ID
 */
export const getService = async (serviceId) => {
  try {
    const serviceDoc = await getDoc(doc(db, COLLECTIONS.SERVICES, serviceId));
    if (serviceDoc.exists()) {
      return { data: serviceDoc.data(), error: null };
    }
    return { data: null, error: 'Service not found' };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

/**
 * Update service
 */
export const updateService = async (serviceId, updates) => {
  try {
    await updateDoc(doc(db, COLLECTIONS.SERVICES, serviceId), {
      ...updates,
      updatedAt: Timestamp.now()
    });
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

/**
 * Delete service
 */
export const deleteService = async (serviceId) => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.SERVICES, serviceId));
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

/**
 * Get all services
 */
export const getAllServices = async () => {
  try {
    const q = query(collection(db, COLLECTIONS.SERVICES), orderBy('name', 'asc'));
    const querySnapshot = await getDocs(q);
    const services = [];
    querySnapshot.forEach((doc) => {
      services.push({ id: doc.id, ...doc.data() });
    });
    return { data: services, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

/**
 * Get active services only
 */
export const getActiveServices = async () => {
  try {
    const q = query(
      collection(db, COLLECTIONS.SERVICES),
      orderBy('name', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const services = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.isActive !== false) {
        services.push({ id: doc.id, ...data });
      }
    });
    return { data: services, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

