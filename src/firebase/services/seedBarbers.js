// Seed placeholder barbers to Firebase
import { createBarber } from './barberService';

export const seedPlaceholderBarbers = async () => {
  const placeholderBarbers = [
    {
      name: 'Asterio',
      email: 'asterio@wworkshop.studio',
      phone: '(555) 111-1111',
      bio: 'Master barber with 10+ years of experience specializing in classic cuts and modern styles.',
      image: '/assets/barbers/asterio.jpg',
      specialties: [],
      isActive: true,
      schedule: {
        monday: { start: '09:00', end: '17:00', available: true },
        tuesday: { start: '09:00', end: '17:00', available: true },
        wednesday: { start: '09:00', end: '17:00', available: true },
        thursday: { start: '09:00', end: '17:00', available: true },
        friday: { start: '09:00', end: '17:00', available: true },
        saturday: { start: '09:00', end: '15:00', available: true },
        sunday: { start: '09:00', end: '15:00', available: false }
      }
    },
    {
      name: 'Dorothy',
      email: 'dorothy@wworkshop.studio',
      phone: '(555) 222-2222',
      bio: 'Expert in precision cuts and beard grooming. Known for attention to detail.',
      image: '/assets/barbers/dorothy.jpg',
      specialties: [],
      isActive: true,
      schedule: {
        monday: { start: '10:00', end: '18:00', available: true },
        tuesday: { start: '10:00', end: '18:00', available: true },
        wednesday: { start: '10:00', end: '18:00', available: true },
        thursday: { start: '10:00', end: '18:00', available: true },
        friday: { start: '10:00', end: '18:00', available: true },
        saturday: { start: '09:00', end: '16:00', available: true },
        sunday: { start: '09:00', end: '15:00', available: false }
      }
    },
    {
      name: 'Gylliane',
      email: 'gylliane@wworkshop.studio',
      phone: '(555) 333-3333',
      bio: 'Specializes in contemporary styles and color work. Creative and trend-forward.',
      image: '/assets/barbers/gylliane.jpg',
      specialties: [],
      isActive: true,
      schedule: {
        monday: { start: '09:00', end: '17:00', available: true },
        tuesday: { start: '09:00', end: '17:00', available: true },
        wednesday: { start: '09:00', end: '17:00', available: false },
        thursday: { start: '09:00', end: '17:00', available: true },
        friday: { start: '09:00', end: '17:00', available: true },
        saturday: { start: '09:00', end: '15:00', available: true },
        sunday: { start: '09:00', end: '15:00', available: false }
      }
    },
    {
      name: 'Martin',
      email: 'martin@wworkshop.studio',
      phone: '(555) 444-4444',
      bio: 'Veteran barber with expertise in traditional techniques and hot towel shaves.',
      image: '/assets/barbers/martin.jpg',
      specialties: [],
      isActive: true,
      schedule: {
        monday: { start: '08:00', end: '16:00', available: true },
        tuesday: { start: '08:00', end: '16:00', available: true },
        wednesday: { start: '08:00', end: '16:00', available: true },
        thursday: { start: '08:00', end: '16:00', available: true },
        friday: { start: '08:00', end: '16:00', available: true },
        saturday: { start: '08:00', end: '14:00', available: true },
        sunday: { start: '09:00', end: '15:00', available: false }
      }
    }
  ];

  const results = [];
  for (const barber of placeholderBarbers) {
    const { id, error } = await createBarber(barber);
    if (error) {
      console.error(`Error creating barber ${barber.name}:`, error);
    } else {
      console.log(`Created barber ${barber.name} with ID: ${id}`);
      results.push({ name: barber.name, id, success: true });
    }
  }
  return results;
};

