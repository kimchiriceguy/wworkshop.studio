import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../config';

const COLLECTION = 'products';

export const getAllProducts = async () => {
  try {
    const snap = await getDocs(collection(db, COLLECTION));
    const results = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return { data: results, error: null };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { data: null, error: error.message };
  }
};

export const createProduct = async (productData) => {
  try {
    const ref = await addDoc(collection(db, COLLECTION), productData);
    return { id: ref.id, error: null };
  } catch (error) {
    console.error('Error creating product:', error);
    return { id: null, error: error.message };
  }
};

export const updateProduct = async (id, updates) => {
  try {
    const ref = doc(db, COLLECTION, id);
    await updateDoc(ref, updates);
    return { error: null };
  } catch (error) {
    console.error('Error updating product:', error);
    return { error: error.message };
  }
};

export const deleteProduct = async (id) => {
  try {
    const ref = doc(db, COLLECTION, id);
    await deleteDoc(ref);
    return { error: null };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { error: error.message };
  }
};


