import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config';

// Check if a user is an admin
export const isAdmin = async (userId) => {
    try {
        const adminRef = doc(db, 'adminUsers', userId);
        const adminSnap = await getDoc(adminRef);
        return adminSnap.exists();
    } catch (error) {
        console.error("Error checking admin status:", error);
        return false;
    }
};

// Get admin profile? 
export const getAdminProfile = async (userId) => {
    try {
        const adminRef = doc(db, 'adminUsers', userId);
        const adminSnap = await getDoc(adminRef);

        if (adminSnap.exists()) {
            return { data: { id: adminSnap.id, ...adminSnap.data() }, error: null };
        }

        return { data: null, error: 'Not an admin' };
    } catch (error) {
        console.error("Error getting admin profile:", error);
        return { data: null, error: error.message };
    }
};