# Firebase Backend Setup

This directory contains the Firebase backend framework for the WWORKSHOP STUDIO website.

## Setup Instructions

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or select an existing one
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Enable Storage (if you need image uploads)

2. **Get Firebase Configuration**
   - Go to Project Settings > General
   - Scroll down to "Your apps" section
   - Click on the web icon (</>) to add a web app
   - Copy the Firebase configuration object

3. **Set Environment Variables**
   - Create a `.env` file in the root directory
   - Add your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

4. **Firestore Security Rules**
   - Go to Firestore Database > Rules
   - Set up appropriate security rules (example provided below)

5. **Firestore Collections Structure**
   The following collections will be created automatically when you start using the services:
   - `users` - User accounts and profiles
   - `blog` - Blog posts for About page
   - `appointments` - Booking appointments
   - `products` - Shop products
   - `orders` - Customer orders
   - `barbers` - Barber profiles
   - `services` - Service offerings

## Firestore Security Rules Example

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Blog collection
    match /blog/{blogId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    // Appointments collection
    match /appointments/{appointmentId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true);
    }
    
    // Products collection
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    // Orders collection
    match /orders/{orderId} {
      allow read: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true);
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    // Barbers collection
    match /barbers/{barberId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    // Services collection (do i need this?)
    match /services/{serviceId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
  }
}
```

## Services Overview

### Authentication Service (`authService.js`)
- `signUp()` - Create new user account
- `signIn()` - Sign in existing user
- `logOut()` - Sign out current user
- `getUserData()` - Get user data from Firestore
- `onAuthStateChange()` - Subscribe to auth state changes

### Blog Service (`blogService.js`)
- `getBlog()` - Get blog content
- `saveBlog()` - Create or update blog
- `deleteBlog()` - Delete blog post
- `getAllBlogs()` - Get all blog posts

### Appointment Service (`appointmentService.js`)
- `createAppointment()` - Create new appointment
- `getAppointment()` - Get appointment by ID
- `updateAppointment()` - Update appointment
- `deleteAppointment()` - Delete appointment
- `getAllAppointments()` - Get all appointments
- `getAppointmentsByBarber()` - Get appointments for specific barber
- `getAppointmentsByDate()` - Get appointments for specific date

### Product Service (`productService.js`)
- `createProduct()` - Create new product
- `getProduct()` - Get product by ID
- `updateProduct()` - Update product
- `deleteProduct()` - Delete product
- `getAllProducts()` - Get all products

### Order Service (`orderService.js`)
- `createOrder()` - Create new order
- `getOrder()` - Get order by ID
- `updateOrder()` - Update order
- `deleteOrder()` - Delete order
- `getAllOrders()` - Get all orders
- `getOrdersByUser()` - Get orders for specific user

### Barber Service (`barberService.js`)
- `createBarber()` - Create new barber profile
- `getBarber()` - Get barber by ID
- `updateBarber()` - Update barber
- `deleteBarber()` - Delete barber
- `getAllBarbers()` - Get all barbers
- `getActiveBarbers()` - Get only active barbers

### Service Service (`serviceService.js`)
- `createService()` - Create new service
- `getService()` - Get service by ID
- `updateService()` - Update service
- `deleteService()` - Delete service
- `getAllServices()` - Get all services
- `getActiveServices()` - Get only active services

### User Service (`userService.js`)
- `createUser()` - Create or update user document
- `getUser()` - Get user by ID
- `updateUser()` - Update user
- `deleteUser()` - Delete user
- `getAllUsers()` - Get all users

## Data Models

See `models.js` for the structure of each document type.

## Usage Example

```javascript
import { createAppointment } from '../firebase/services/appointmentService';

const appointmentData = {
  barberId: 'barber-123',
  barberName: 'John Doe',
  serviceId: 'service-456',
  serviceName: 'Haircut',
  customerName: 'Jane Smith',
  customerEmail: 'jane@example.com',
  customerPhone: '123-456-7890',
  date: new Date('2024-01-15'),
  time: '10:00 AM'
};

const { id, error } = await createAppointment(appointmentData);
if (error) {
  console.error('Error creating appointment:', error);
} else {
  console.log('Appointment created with ID:', id);
}
```

