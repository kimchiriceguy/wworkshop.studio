// Blog Service - Firebase Firestore operations for blog content
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
 * Get blog content
 */
export const getBlog = async (blogId = 'main') => {
  try {
    const blogDoc = await getDoc(doc(db, COLLECTIONS.BLOG, blogId));
    if (blogDoc.exists()) {
      return { data: blogDoc.data(), error: null };
    }
    return { data: null, error: 'Blog not found' };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

/**
 * Create or update blog content
 */
export const saveBlog = async (blogId, content, title = '') => {
  try {
    const blogData = {
      id: blogId,
      title: title || 'About WWORKSHOP STUDIO',
      content: content,
      updatedAt: Timestamp.now(),
      updatedBy: 'admin' // TODO: Get from auth context
    };

    await setDoc(doc(db, COLLECTIONS.BLOG, blogId), blogData, { merge: true });
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

/**
 * Delete blog post
 */
export const deleteBlog = async (blogId) => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.BLOG, blogId));
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

/**
 * Get all blog posts
 */
export const getAllBlogs = async () => {
  try {
    const q = query(collection(db, COLLECTIONS.BLOG), orderBy('updatedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const blogs = [];
    querySnapshot.forEach((doc) => {
      blogs.push({ id: doc.id, ...doc.data() });
    });
    return { data: blogs, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

