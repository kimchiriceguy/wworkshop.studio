# SQL to Firebase Firestore Query Conversion Guide

This guide shows how to convert SQL queries from your previous database to Firebase Firestore queries.

## Table of Contents
1. [Basic Query Patterns](#basic-query-patterns)
2. [Appointments Queries](#appointments-queries)
3. [Barbers Queries](#barbers-queries)
4. [Orders & Purchases Queries](#orders--purchases-queries)
5. [Users Queries](#users-queries)
6. [Common SQL Operations](#common-sql-operations)

---

## Basic Query Patterns

### SELECT * FROM table

**SQL:**
```sql
SELECT * FROM barbers;
```

**Firebase:**
```javascript
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase/config';
import { COLLECTIONS } from './firebase/collections';

const querySnapshot = await getDocs(collection(db, COLLECTIONS.BARBERS));
const barbers = [];
querySnapshot.forEach((doc) => {
  barbers.push({ id: doc.id, ...doc.data() });
});
```

### SELECT * FROM table WHERE condition

**SQL:**
```sql
SELECT * FROM barbers WHERE status = 'active';
```

**Firebase:**
```javascript
import { collection, query, where, getDocs } from 'firebase/firestore';

const q = query(
  collection(db, COLLECTIONS.BARBERS),
  where('status', '==', 'active')
);
const querySnapshot = await getDocs(q);
const barbers = [];
querySnapshot.forEach((doc) => {
  barbers.push({ id: doc.id, ...doc.data() });
});
```

### SELECT * FROM table ORDER BY

**SQL:**
```sql
SELECT * FROM barbers ORDER BY name ASC;
```

**Firebase:**
```javascript
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

const q = query(
  collection(db, COLLECTIONS.BARBERS),
  orderBy('name', 'asc')
);
const querySnapshot = await getDocs(q);
// ... process results
```

### SELECT * FROM table WHERE condition ORDER BY LIMIT

**SQL:**
```sql
SELECT * FROM appointments 
WHERE date = '2025-01-15' 
ORDER BY time ASC 
LIMIT 10;
```

**Firebase:**
```javascript
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

const date = new Date('2025-01-15');
date.setHours(0, 0, 0, 0);
const startOfDay = Timestamp.fromDate(date);
const endOfDay = Timestamp.fromDate(new Date(date.getTime() + 86400000));

const q = query(
  collection(db, COLLECTIONS.APPOINTMENTS),
  where('date', '>=', startOfDay),
  where('date', '<', endOfDay),
  orderBy('date', 'asc'),
  orderBy('time', 'asc'),
  limit(10)
);
const querySnapshot = await getDocs(q);
```

---

## Appointments Queries

### Get all appointments

**SQL:**
```sql
SELECT * FROM appointments;
```

**Firebase:**
```javascript
import { getAllAppointments } from './firebase/services/appointmentService';

const { data, error } = await getAllAppointments();
if (!error) {
  console.log(data); // Array of appointments
}
```

### Get appointments by user

**SQL:**
```sql
SELECT * FROM appointments WHERE user_id = 123;
```

**Firebase:**
```javascript
import { collection, query, where, getDocs } from 'firebase/firestore';

const userId = 'user-uid-here';
const q = query(
  collection(db, COLLECTIONS.APPOINTMENTS),
  where('userId', '==', userId)
);
const querySnapshot = await getDocs(q);
const appointments = [];
querySnapshot.forEach((doc) => {
  appointments.push({ id: doc.id, ...doc.data() });
});
```

### Get appointments by barber

**SQL:**
```sql
SELECT * FROM appointments WHERE barber_id = 1;
```

**Firebase:**
```javascript
const barberId = 'barber-1';
const q = query(
  collection(db, COLLECTIONS.APPOINTMENTS),
  where('barberId', '==', barberId)
);
const querySnapshot = await getDocs(q);
// ... process results
```

### Get appointments by date

**SQL:**
```sql
SELECT * FROM appointments WHERE date = '2025-01-15';
```

**Firebase:**
```javascript
import { Timestamp } from 'firebase/firestore';

const selectedDate = new Date('2025-01-15');
selectedDate.setHours(0, 0, 0, 0);
const startOfDay = Timestamp.fromDate(selectedDate);
const endOfDay = Timestamp.fromDate(new Date(selectedDate.getTime() + 86400000));

const q = query(
  collection(db, COLLECTIONS.APPOINTMENTS),
  where('date', '>=', startOfDay),
  where('date', '<', endOfDay)
);
const querySnapshot = await getDocs(q);
```

### Get appointments by status

**SQL:**
```sql
SELECT * FROM appointments WHERE status = 'pending';
```

**Firebase:**
```javascript
const q = query(
  collection(db, COLLECTIONS.APPOINTMENTS),
  where('status', '==', 'pending')
);
const querySnapshot = await getDocs(q);
```

### Get appointments with JOIN (barber name)

**SQL:**
```sql
SELECT a.*, b.name as barber_name 
FROM appointments a
JOIN barbers b ON a.barber_id = b.id;
```

**Firebase:**
```javascript
// Firestore doesn't support JOINs - fetch separately or denormalize
const { data: appointments } = await getAllAppointments();
const { data: barbers } = await getAllBarbers();

const appointmentsWithBarbers = appointments.map(apt => {
  const barber = barbers.find(b => b.id === apt.barberId);
  return {
    ...apt,
    barberName: barber?.name || 'Unknown'
  };
});
```

---

## Barbers Queries

### Get active barbers

**SQL:**
```sql
SELECT * FROM barbers WHERE status = 'active';
```

**Firebase:**
```javascript
import { getActiveBarbers } from './firebase/services/barberService';

const { data, error } = await getActiveBarbers();
if (!error) {
  console.log(data); // Array of active barbers
}
```

### Get barber by ID

**SQL:**
```sql
SELECT * FROM barbers WHERE id = 1;
```

**Firebase:**
```javascript
import { getBarber } from './firebase/services/barberService';

const { data, error } = await getBarber('barber-1');
if (!error && data) {
  console.log(data);
}
```

### Get barbers with specific service in portfolio

**SQL:**
```sql
SELECT * FROM barbers 
WHERE JSON_CONTAINS(portfolio, '"Haircut"');
```

**Firebase:**
```javascript
// Firestore doesn't support array-contains on nested JSON
// Store portfolio as array in Firestore
const q = query(
  collection(db, COLLECTIONS.BARBERS),
  where('specialties', 'array-contains', 'Haircut')
);
const querySnapshot = await getDocs(q);
```

---

## Orders & Purchases Queries

### Get all orders

**SQL:**
```sql
SELECT * FROM orders;
```

**Firebase:**
```javascript
import { getAllOrders } from './firebase/services/orderService';

const { data, error } = await getAllOrders();
```

### Get orders by user

**SQL:**
```sql
SELECT * FROM orders WHERE user_id = 123;
```

**Firebase:**
```javascript
import { getOrdersByUser } from './firebase/services/orderService';

const { data, error } = await getOrdersByUser('user-uid');
```

### Get purchases for an order

**SQL:**
```sql
SELECT * FROM purchases WHERE order_id = 456;
```

**Firebase:**
```javascript
// In Firestore, purchases are typically stored as items array in order document
const { data: order } = await getOrder('order-id');
const purchases = order.items || [];

// OR if stored as separate collection:
const q = query(
  collection(db, 'purchases'),
  where('orderId', '==', 'order-id')
);
const querySnapshot = await getDocs(q);
```

### Get orders with total calculation

**SQL:**
```sql
SELECT o.*, SUM(p.price * p.quantity) as total
FROM orders o
LEFT JOIN purchases p ON o.id = p.order_id
GROUP BY o.id;
```

**Firebase:**
```javascript
// In Firestore, calculate total when creating order or store it
const { data: orders } = await getAllOrders();
// Total is already stored in order document
orders.forEach(order => {
  console.log(`Order ${order.id}: $${order.total}`);
});
```

---

## Users Queries

### Get user by email

**SQL:**
```sql
SELECT * FROM users WHERE email = 'user@example.com';
```

**Firebase:**
```javascript
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

const q = query(
  collection(db, COLLECTIONS.USERS),
  where('email', '==', 'user@example.com'),
  limit(1)
);
const querySnapshot = await getDocs(q);
if (!querySnapshot.empty) {
  const userDoc = querySnapshot.docs[0];
  const user = { id: userDoc.id, ...userDoc.data() };
}
```

### Get all users

**SQL:**
```sql
SELECT * FROM users;
```

**Firebase:**
```javascript
import { getAllUsers } from './firebase/services/userService';

const { data, error } = await getAllUsers();
```

### Get admin users

**SQL:**
```sql
SELECT * FROM admin_users;
```

**Firebase:**
```javascript
// Admin status is stored in users collection
const q = query(
  collection(db, COLLECTIONS.USERS),
  where('isAdmin', '==', true)
);
const querySnapshot = await getDocs(q);
const admins = [];
querySnapshot.forEach((doc) => {
  admins.push({ id: doc.id, ...doc.data() });
});
```

---

## Common SQL Operations

### INSERT

**SQL:**
```sql
INSERT INTO appointments (user_id, barber_id, service, date, time, status)
VALUES (123, 1, 'Haircut', '2025-01-15', '10:00:00', 'pending');
```

**Firebase:**
```javascript
import { createAppointment } from './firebase/services/appointmentService';
import { Timestamp } from 'firebase/firestore';

const appointmentData = {
  userId: 'user-uid',
  barberId: 'barber-1',
  service: 'Haircut',
  date: Timestamp.fromDate(new Date('2025-01-15')),
  time: '10:00 AM',
  status: 'pending'
};

const { id, error } = await createAppointment(appointmentData);
```

### UPDATE

**SQL:**
```sql
UPDATE appointments 
SET status = 'confirmed' 
WHERE id = 789;
```

**Firebase:**
```javascript
import { updateAppointment } from './firebase/services/appointmentService';

const { error } = await updateAppointment('appointment-id', {
  status: 'confirmed'
});
```

### DELETE

**SQL:**
```sql
DELETE FROM appointments WHERE id = 789;
```

**Firebase:**
```javascript
import { deleteAppointment } from './firebase/services/appointmentService';

const { error } = await deleteAppointment('appointment-id');
```

### COUNT

**SQL:**
```sql
SELECT COUNT(*) FROM appointments WHERE status = 'pending';
```

**Firebase:**
```javascript
const q = query(
  collection(db, COLLECTIONS.APPOINTMENTS),
  where('status', '==', 'pending')
);
const querySnapshot = await getDocs(q);
const count = querySnapshot.size;
```

### Aggregate Functions (SUM, AVG, etc.)

**SQL:**
```sql
SELECT SUM(price * quantity) as total 
FROM purchases 
WHERE order_id = 456;
```

**Firebase:**
```javascript
// Calculate in application code
const { data: order } = await getOrder('order-id');
const total = order.items.reduce((sum, item) => {
  return sum + (item.price * item.quantity);
}, 0);
```

### Date Range Queries

**SQL:**
```sql
SELECT * FROM appointments 
WHERE date BETWEEN '2025-01-01' AND '2025-01-31';
```

**Firebase:**
```javascript
import { Timestamp } from 'firebase/firestore';

const startDate = Timestamp.fromDate(new Date('2025-01-01'));
const endDate = Timestamp.fromDate(new Date('2025-01-31'));

const q = query(
  collection(db, COLLECTIONS.APPOINTMENTS),
  where('date', '>=', startDate),
  where('date', '<=', endDate)
);
const querySnapshot = await getDocs(q);
```

### LIKE / Pattern Matching

**SQL:**
```sql
SELECT * FROM users WHERE email LIKE '%@example.com';
```

**Firebase:**
```javascript
// Firestore doesn't support LIKE - fetch all and filter
const { data: users } = await getAllUsers();
const filtered = users.filter(user => 
  user.email && user.email.endsWith('@example.com')
);
```

### IN Clause

**SQL:**
```sql
SELECT * FROM barbers WHERE id IN (1, 2, 3);
```

**Firebase:**
```javascript
// Firestore supports 'in' operator (max 10 values)
const barberIds = ['barber-1', 'barber-2', 'barber-3'];
const q = query(
  collection(db, COLLECTIONS.BARBERS),
  where('id', 'in', barberIds)
);
const querySnapshot = await getDocs(q);

// For more than 10, use multiple queries or fetch all and filter
```

---

## Important Differences

### 1. No JOINs
- Firestore doesn't support JOINs
- Solution: Denormalize data or fetch separately and combine in code

### 2. Limited WHERE Conditions
- Firestore has limited compound query support
- Can only use one range operator (<, <=, >, >=) per query
- Solution: Structure data to minimize complex queries

### 3. No Transactions Across Collections
- Firestore transactions are limited to a single document or documents in the same collection group
- Solution: Use batch writes or structure data differently

### 4. Indexes Required
- Compound queries require composite indexes
- Firebase will provide index creation links in error messages

### 5. Data Types
- SQL `DATE` → Firestore `Timestamp`
- SQL `JSON` → Firestore `object` or `array`
- SQL `ENUM` → Firestore `string`

---

## Example: Complete Query Conversion

### SQL Query:
```sql
SELECT a.*, b.name as barber_name, u.email as user_email
FROM appointments a
JOIN barbers b ON a.barber_id = b.id
JOIN users u ON a.user_id = u.id
WHERE a.date = '2025-01-15'
  AND a.status = 'pending'
ORDER BY a.time ASC;
```

### Firebase Equivalent:
```javascript
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import { getAllBarbers } from './firebase/services/barberService';
import { getAllUsers } from './firebase/services/userService';

// 1. Get appointments
const selectedDate = new Date('2025-01-15');
selectedDate.setHours(0, 0, 0, 0);
const startOfDay = Timestamp.fromDate(selectedDate);
const endOfDay = Timestamp.fromDate(new Date(selectedDate.getTime() + 86400000));

const appointmentsQuery = query(
  collection(db, COLLECTIONS.APPOINTMENTS),
  where('date', '>=', startOfDay),
  where('date', '<', endOfDay),
  where('status', '==', 'pending'),
  orderBy('date', 'asc'),
  orderBy('time', 'asc')
);

const appointmentsSnapshot = await getDocs(appointmentsQuery);
const appointments = [];
appointmentsSnapshot.forEach((doc) => {
  appointments.push({ id: doc.id, ...doc.data() });
});

// 2. Get barbers and users (for JOIN equivalent)
const { data: barbers } = await getAllBarbers();
const { data: users } = await getAllUsers();

// 3. Combine data (simulate JOIN)
const appointmentsWithDetails = appointments.map(apt => {
  const barber = barbers.find(b => b.id === apt.barberId);
  const user = users.find(u => u.uid === apt.userId);
  
  return {
    ...apt,
    barberName: barber?.name || 'Unknown',
    userEmail: user?.email || 'Unknown'
  };
});
```

---

## Quick Reference

| SQL | Firebase |
|-----|----------|
| `SELECT * FROM table` | `getDocs(collection(db, 'table'))` |
| `WHERE field = value` | `where('field', '==', value)` |
| `WHERE field > value` | `where('field', '>', value)` |
| `ORDER BY field ASC` | `orderBy('field', 'asc')` |
| `LIMIT n` | `limit(n)` |
| `INSERT INTO` | `setDoc(doc(collection(...)), data)` |
| `UPDATE table SET` | `updateDoc(doc(...), updates)` |
| `DELETE FROM` | `deleteDoc(doc(...))` |
| `COUNT(*)` | `querySnapshot.size` |
| `JOIN` | Fetch separately and combine in code |

---

