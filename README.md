# wworkshop.studio - Complete Setup & Installation Guide

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Firebase Configuration](#firebase-configuration)
- [Running the Application](#running-the-application)
- [Building for Production](#building-for-production)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before beginning the installation process, ensure the following software is installed on your system:

### Required Software

| Software | Minimum Version | Check Version Command | Download Link |
|----------|----------------|----------------------|---------------|
| Node.js | 18.0.0+ | `node --version` | [nodejs.org](https://nodejs.org/) |
| npm | 9.0.0+ | `npm --version` | Comes with Node.js |
| Git | 2.0.0+ | `git --version` | [git-scm.com](https://git-scm.com/) |

### Recommended (Optional)
- VS Code - Code editor with excellent React/JavaScript support
- Firebase CLI - For advanced Firebase operations: `npm install -g firebase-tools`

---

## Installation

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/kimchiriceguy/wworkshop.studio.git

# Navigate to the project directory
cd wworkshop.studio

# Switch to the webdev2 branch
git checkout webdev2
```

### Step 2: Install Dependencies

```bash
# Install all npm packages
npm install
```

This will install the following dependencies:

**Core Dependencies:**
- `react@19.2.0` - React library
- `react-dom@19.2.0` - React DOM renderer
- `react-router-dom@7.9.6` - Routing for React
- `firebase@12.6.0` - Firebase SDK for backend services
- `lucide-react@0.555.0` - Icon library
- `react-icons@5.5.0` - Additional icon library
- `react-bootstrap@2.10.10` - Bootstrap components for React
- `vanilla-infinite-marquee@1.0.13` - Marquee text animation

**Development Dependencies:**
- `vite@7.2.4` - Fast build tool and dev server
- `@vitejs/plugin-react@5.1.1` - React support for Vite
- `tailwindcss@3.4.18` - Utility-first CSS framework
- `postcss@8.5.6` - CSS processor
- `autoprefixer@10.4.22` - CSS vendor prefix automation
- `eslint@9.39.1` - JavaScript linter
- ESLint plugins for React best practices

### Step 3: Verify Installation

```bash
# Check if all packages installed correctly
npm list --depth=0
```

All dependencies should be listed without errors.

---

## Firebase Configuration

### Step 1: Create Firebase Project

1. Navigate to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select existing project
3. Enter project name: `wworkshopstudio` (or your preferred name)
4. Follow the setup wizard

### Step 2: Enable Required Services

In your Firebase Console:

1. **Authentication**
   - Navigate to Build → Authentication
   - Click "Get started"
   - Enable Email/Password sign-in method

2. **Firestore Database**
   - Navigate to Build → Firestore Database
   - Click "Create database"
   - Start in Test mode (for development)
   - Select your preferred region

### Step 3: Obtain Firebase Configuration

1. Navigate to Project Settings (gear icon)
2. Scroll to "Your apps" section
3. Click Web icon (`</>`)
4. Register your app
5. Copy the Firebase configuration object

### Step 4: Configure Firebase in Your Application

1. Open `src/firebase/config.js`
2. Replace the configuration with your Firebase credentials:

```javascript
// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

### Step 5: Set Firestore Security Rules (Development)

In Firebase Console, navigate to Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // Development only
    }
  }
}
```

**Important:** These rules should be modified before deploying to production.

### Step 6: Populate Database (Initial Migration)

#### Option A: Browser Console (Recommended)

1. **Disable ad blockers temporarily** (they block Firebase requests)
   - uBlock Origin, AdBlock Plus, Privacy Badger, etc.
   - Or use incognito/private window with extensions disabled

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser** to `http://localhost:5173`

4. **Open browser console** (Press `F12` or Right-click → Inspect → Console)

5. **Run migration:**
   ```javascript
   window.runFirebaseMigration()
   ```

6. **Wait for completion** - success message should appear:
   ```
   Migration completed successfully!
   Summary:
      - Barbers created: 4
      - Products created: 6
      - Services created: 3
   ```

#### Option B: Code-based Migration

Add this to `src/App.jsx` temporarily:

```javascript
import { runStandaloneMigration } from './firebase/migrations/runMigrationStandalone';

// Inside your component
useEffect(() => {
  runStandaloneMigration();
}, []);
```

Remove after migration completes.

#### Database Collections Created:

The migration creates the following collections:

- **`barbers`** - 4 placeholder barbers with schedules and portfolios
- **`products`** - 6 sample products for the shop
- **`services`** - 3 default services (Haircut, Beard Trim, Shave)
- **`appointments`** - Empty (populated by bookings)
- **`orders`** - Empty (populated by shop purchases)
- **`users`** - Empty (populated by user registrations)
- **`blog`** - Content for About page

### Step 7: Verify Firebase Setup

1. Navigate to Firebase Console → Firestore Database
2. Verify all collections contain data
3. Confirm `barbers` contains 4 documents
4. Confirm `products` contains 6 documents
5. Confirm `services` contains 3 documents

---

## Running the Application

### Development Server

```bash
# Start the development server
npm run dev
```

- Application opens at: `http://localhost:5173`
- Hot Module Replacement (HMR) enabled
- Auto-reloads on file changes

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## Building for Production

### Step 1: Create Production Build

```bash
npm run build
```

This process will:
- Bundle and optimize all code
- Minify JavaScript and CSS
- Generate optimized production files in `dist/` folder

### Step 2: Preview Production Build

```bash
npm run preview
```

- Application opens at: `http://localhost:4173`
- Test production build locally before deployment

### Step 3: Deploy

**Option A: Firebase Hosting**

```bash
# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase Hosting
firebase init hosting

# Deploy
firebase deploy
```

**Option B: Vercel**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

**Option C: Netlify**

- Upload the `dist/` folder to [Netlify Drop](https://app.netlify.com/drop)
- Or connect your GitHub repository for automatic deployments

---

## Troubleshooting

### Common Issues

#### 1. Firebase ERR_BLOCKED_BY_CLIENT

**Problem:** Ad blockers blocking Firebase requests

**Solution:**
- Temporarily disable ad blockers during setup
- Or use incognito/private window without extensions
- Application will function with fallback data if Firebase is blocked

#### 2. Port Already in Use

**Problem:** Port 5173 is already in use

**Solution:**
```bash
# Kill the process using port 5173 (Linux/Mac)
lsof -ti:5173 | xargs kill -9

# Or specify a different port
npm run dev -- --port 3000
```

#### 3. Node Version Mismatch

**Problem:** `npm install` fails due to Node version

**Solution:**
```bash
# Check your Node version
node --version

# Upgrade Node.js to version 18 or higher
# Download from https://nodejs.org/
```

#### 4. Firebase Permission Denied

**Problem:** Cannot read/write to Firestore

**Solution:**
- Check Firestore Rules in Firebase Console
- Ensure rules allow read/write (for development)
- Verify Firebase config in `src/firebase/config.js`

#### 5. Module Not Found Errors

**Problem:** Import errors or missing modules

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or clear npm cache
npm cache clean --force
npm install
```

#### 6. Tailwind Styles Not Loading

**Problem:** Tailwind classes not applying

**Solution:**
- Verify `tailwind.config.js` is in root directory
- Check that `index.css` includes Tailwind directives:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- Restart development server

#### 7. React Hot Reload Not Working

**Problem:** Changes not reflecting in browser

**Solution:**
```bash
# Restart development server
# Press Ctrl+C to stop, then:
npm run dev
```

### Additional Support

If issues persist:

1. Check browser console (F12) for specific error messages
2. Check terminal for build errors
3. Verify all dependencies are installed: `npm list --depth=0`
4. Attempt a fresh install:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

---

## Additional Resources

- React Documentation: [react.dev](https://react.dev/)
- Vite Documentation: [vitejs.dev](https://vitejs.dev/)
- Firebase Documentation: [firebase.google.com/docs](https://firebase.google.com/docs)
- Tailwind CSS Documentation: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- React Router Documentation: [reactrouter.com](https://reactrouter.com/)

---

## Conclusion

The wworkshop.studio application should now be properly configured and running. For additional information, consult the following project documentation files:
- `README.md` - Project overview
- `FIREBASE_SETUP.md` - Detailed Firebase instructions
- `SQL_TO_FIREBASE.md` - Migration guide
- `ADMIN_ACCESS.md` - Admin features documentation