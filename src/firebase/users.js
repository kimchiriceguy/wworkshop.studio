import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from './config';

export const createUser = async (name, email) => {
    try {
        const docRef = await addDoc(collection(db, 'users'), {
            name: name,
            email: email,
            createdAt: Timestamp.now()
        });
        console.log("User created with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};