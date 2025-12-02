import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config';

// Simple dev-only seeding for barbers collection
export const seedPlaceholderBarbers = async () => {
  const placeholderBarbers = [
    { name: 'Asterio', status: 'active' },
    { name: 'Dorothy', status: 'active' },
    { name: 'Gylliane', status: 'active' },
    { name: 'Martin', status: 'active' },
  ];

  try {
    const colRef = collection(db, 'barbers');
    await Promise.all(
      placeholderBarbers.map((barber) => addDoc(colRef, barber)),
    );
  } catch (error) {
    console.error('Error seeding barbers:', error);
  }
};


