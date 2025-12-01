// Data Models - Structure definitions for Firestore documents

/**
 * User Model
 */
export const UserModel = {
  uid: '', // Firebase Auth UID
  email: '',
  displayName: '',
  phone: '',
  isAdmin: false,
  createdAt: '',
  updatedAt: ''
};

/**
 * Blog Model
 */
export const BlogModel = {
  id: '',
  title: '',
  content: '', // HTML content
  updatedAt: '',
  updatedBy: '' // User ID
};

/**
 * Appointment Model
 */
export const AppointmentModel = {
  id: '',
  barberId: '', // Reference to barber
  barberName: '',
  serviceId: '', // Reference to service
  serviceName: '',
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  date: '', // Timestamp
  time: '', // Time string (e.g., "10:00 AM")
  status: 'confirmed', // confirmed, cancelled, completed
  notes: '',
  createdAt: '',
  updatedAt: ''
};

/**
 * Product Model
 */
export const ProductModel = {
  id: '',
  name: '',
  description: '',
  price: 0,
  image: '', // URL or path
  images: [], // Array of image URLs
  category: '',
  stock: 0,
  isAvailable: true,
  createdAt: '',
  updatedAt: ''
};

/**
 * Order Model
 */
export const OrderModel = {
  id: '',
  userId: '', // Reference to user
  items: [ // Array of order items
    {
      productId: '',
      productName: '',
      quantity: 0,
      price: 0
    }
  ],
  total: 0,
  status: 'pending', // pending, processing, shipped, delivered, cancelled
  shippingAddress: {
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  },
  paymentMethod: '',
  createdAt: '',
  updatedAt: ''
};

/**
 * Barber Model
 */
export const BarberModel = {
  id: '',
  name: '',
  email: '',
  phone: '',
  bio: '',
  image: '', // URL or path
  specialties: [], // Array of service IDs
  isActive: true,
  schedule: { // Weekly schedule
    monday: { start: '09:00', end: '17:00', available: true },
    tuesday: { start: '09:00', end: '17:00', available: true },
    wednesday: { start: '09:00', end: '17:00', available: true },
    thursday: { start: '09:00', end: '17:00', available: true },
    friday: { start: '09:00', end: '17:00', available: true },
    saturday: { start: '09:00', end: '15:00', available: true },
    sunday: { start: '09:00', end: '15:00', available: false }
  },
  createdAt: '',
  updatedAt: ''
};

/**
 * Service Model
 */
export const ServiceModel = {
  id: '',
  name: '',
  description: '',
  details: '', // Detailed description
  price: 0,
  duration: 30, // Duration in minutes
  image: '', // URL or path
  category: '', // barbershop, school, consultancy
  isActive: true,
  createdAt: '',
  updatedAt: ''
};

