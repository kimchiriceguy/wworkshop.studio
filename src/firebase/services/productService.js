// Product Service - Firebase Firestore operations for shop products
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
 * Create a new product
 */
export const createProduct = async (productData) => {
  try {
    const product = {
      ...productData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    const docRef = doc(collection(db, COLLECTIONS.PRODUCTS));
    await setDoc(docRef, { ...product, id: docRef.id });
    return { id: docRef.id, error: null };
  } catch (error) {
    return { id: null, error: error.message };
  }
};

/**
 * Get product by ID
 */
export const getProduct = async (productId) => {
  try {
    const productDoc = await getDoc(doc(db, COLLECTIONS.PRODUCTS, productId));
    if (productDoc.exists()) {
      return { data: productDoc.data(), error: null };
    }
    return { data: null, error: 'Product not found' };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

/**
 * Update product
 */
export const updateProduct = async (productId, updates) => {
  try {
    await updateDoc(doc(db, COLLECTIONS.PRODUCTS, productId), {
      ...updates,
      updatedAt: Timestamp.now()
    });
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

/**
 * Delete product
 */
export const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.PRODUCTS, productId));
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

/**
 * Get all products
 */
export const getAllProducts = async () => {
  try {
    const q = query(collection(db, COLLECTIONS.PRODUCTS), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return { data: products, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

