import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../config';

const COLLECTION = 'appointments';

export const createAppointment = async (appointmentData) => {
  try {
    const ref = await addDoc(collection(db, COLLECTION), {
      ...appointmentData,
    });
    return { id: ref.id, error: null };
  } catch (error) {
    console.error('Error creating appointment:', error);
    return { id: null, error: error.message };
  }
};

export const getAppointmentsByDate = async (dateStr) => {
  try {
    // Store date as simple string (e.g. "2024-12-02") for simplicity
    const q = query(
      collection(db, COLLECTION),
      where('date', '==', dateStr),
    );
    const snap = await getDocs(q);
    const results = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return { data: results, error: null };
  } catch (error) {
    console.error('Error fetching appointments by date:', error);
    return { data: null, error: error.message };
  }
};

export const getAllAppointments = async () => {
  try {
    const snap = await getDocs(collection(db, COLLECTION));
    const results = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return { data: results, error: null };
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return { data: null, error: error.message };
  }
};

export const updateAppointment = async (id, updates) => {
  try {
    const ref = doc(db, COLLECTION, id);
    await updateDoc(ref, updates);
    return { error: null };
  } catch (error) {
    console.error('Error updating appointment:', error);
    return { error: error.message };
  }
};

export const deleteAppointment = async (id) => {
  try {
    const ref = doc(db, COLLECTION, id);
    await deleteDoc(ref);
    return { error: null };
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return { error: error.message };
  }
};


