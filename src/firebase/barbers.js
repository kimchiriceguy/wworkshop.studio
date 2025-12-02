import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './config';

export const getActiveBarbers = async () => {
    try {
        const q = query(
            collection(db, 'barbers'),
            where('status', '==', 'active')
        );

        const querySnapshot = await getDocs(q);
        const barbers = [];

        querySnapshot.forEach((doc) => {
            barbers.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return barbers;
    } catch (error) {
        console.error("Error getting barbers:", error);
        throw error;
    }
};