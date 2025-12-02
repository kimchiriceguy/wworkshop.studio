import { collection, addDoc } from 'firebase/firestore';
import { db } from './config';

export const createAppointment = async (userId, barberId, service, date, time) => {
    try {
        const docRef = await addDoc(collection(db, 'appointments'), {
            userId,
            barberId,
            service,
            date,
            time,
            status: 'pending'
        });
        return docRef.id;
    } catch (error) {
        console.error("Error creating appointment:", error);
        throw error;
    }
};