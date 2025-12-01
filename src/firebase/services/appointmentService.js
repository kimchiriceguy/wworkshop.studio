// Appointment Service - Firebase Firestore operations for appointments/bookings
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config';
import { COLLECTIONS } from '../collections';

/**
 * Create a new appointment
 */
export const createAppointment = async (appointmentData) => {
  try {
    // Convert date to Timestamp if it's a Date object
    const date = appointmentData.date instanceof Date 
      ? Timestamp.fromDate(appointmentData.date)
      : appointmentData.date;

    const appointment = {
      ...appointmentData,
      date: date,
      status: 'confirmed', // confirmed, cancelled, completed
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    const docRef = doc(collection(db, COLLECTIONS.APPOINTMENTS));
    await setDoc(docRef, { ...appointment, id: docRef.id });
    return { id: docRef.id, error: null };
  } catch (error) {
    return { id: null, error: error.message };
  }
};

/**
 * Get appointment by ID
 */
export const getAppointment = async (appointmentId) => {
  try {
    const appointmentDoc = await getDoc(doc(db, COLLECTIONS.APPOINTMENTS, appointmentId));
    if (appointmentDoc.exists()) {
      return { data: appointmentDoc.data(), error: null };
    }
    return { data: null, error: 'Appointment not found' };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

/**
 * Update appointment
 */
export const updateAppointment = async (appointmentId, updates) => {
  try {
    await updateDoc(doc(db, COLLECTIONS.APPOINTMENTS, appointmentId), {
      ...updates,
      updatedAt: Timestamp.now()
    });
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

/**
 * Delete appointment
 */
export const deleteAppointment = async (appointmentId) => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.APPOINTMENTS, appointmentId));
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

/**
 * Get all appointments
 */
export const getAllAppointments = async () => {
  try {
    const q = query(collection(db, COLLECTIONS.APPOINTMENTS), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    const appointments = [];
    querySnapshot.forEach((doc) => {
      appointments.push({ id: doc.id, ...doc.data() });
    });
    return { data: appointments, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

/**
 * Get appointments by barber
 */
export const getAppointmentsByBarber = async (barberId) => {
  try {
    const q = query(
      collection(db, COLLECTIONS.APPOINTMENTS),
      where('barberId', '==', barberId),
      orderBy('date', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const appointments = [];
    querySnapshot.forEach((doc) => {
      appointments.push({ id: doc.id, ...doc.data() });
    });
    return { data: appointments, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

/**
 * Get appointments by date
 */
export const getAppointmentsByDate = async (date) => {
  try {
    // Handle both Date objects and date strings
    const dateObj = date instanceof Date ? date : new Date(date);
    const startOfDay = new Date(dateObj);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(dateObj);
    endOfDay.setHours(23, 59, 59, 999);

    const q = query(
      collection(db, COLLECTIONS.APPOINTMENTS),
      where('date', '>=', Timestamp.fromDate(startOfDay)),
      where('date', '<=', Timestamp.fromDate(endOfDay)),
      orderBy('date', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const appointments = [];
    querySnapshot.forEach((doc) => {
      appointments.push({ id: doc.id, ...doc.data() });
    });
    return { data: appointments, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

