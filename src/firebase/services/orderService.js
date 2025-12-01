// Order Service - Firebase Firestore operations for shop orders
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
 * Create a new order
 */
export const createOrder = async (orderData) => {
  try {
    const order = {
      ...orderData,
      status: 'pending', // pending, processing, shipped, delivered, cancelled
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    const docRef = doc(collection(db, COLLECTIONS.ORDERS));
    await setDoc(docRef, { ...order, id: docRef.id });
    return { id: docRef.id, error: null };
  } catch (error) {
    return { id: null, error: error.message };
  }
};

/**
 * Get order by ID
 */
export const getOrder = async (orderId) => {
  try {
    const orderDoc = await getDoc(doc(db, COLLECTIONS.ORDERS, orderId));
    if (orderDoc.exists()) {
      return { data: orderDoc.data(), error: null };
    }
    return { data: null, error: 'Order not found' };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

/**
 * Update order
 */
export const updateOrder = async (orderId, updates) => {
  try {
    await updateDoc(doc(db, COLLECTIONS.ORDERS, orderId), {
      ...updates,
      updatedAt: Timestamp.now()
    });
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

/**
 * Delete order
 */
export const deleteOrder = async (orderId) => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.ORDERS, orderId));
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

/**
 * Get all orders
 */
export const getAllOrders = async () => {
  try {
    const q = query(collection(db, COLLECTIONS.ORDERS), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    return { data: orders, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

/**
 * Get orders by user
 */
export const getOrdersByUser = async (userId) => {
  try {
    const q = query(
      collection(db, COLLECTIONS.ORDERS),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    return { data: orders, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

