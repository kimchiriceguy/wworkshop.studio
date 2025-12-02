# Firebase Database Setup Guide

## Problem: No Database in Firebase

If you're seeing `ERR_BLOCKED_BY_CLIENT` errors and there's no data in Firebase, it's because:
- **Ad blockers** or privacy extensions are blocking Firestore requests
- The migration script can't create the database structure when blocked
- The app falls back to placeholder data, but Firebase remains empty

## Solution: Run Migration Manually

### Option 1: Browser Console (Recommended)

1. **Temporarily disable ad blockers:**
   - uBlock Origin, AdBlock Plus, Privacy Badger, etc.
   - Or use an incognito/private window with extensions disabled

2. **Open your app** in the browser

3. **Open browser console** (F12 or Right-click → Inspect → Console)

4. **Run the migration:**
   ```javascript
   window.runFirebaseMigration()
   ```

5. **Wait for completion** - you should see:
   ```
   ✅ Migration completed successfully!
   📊 Summary:
      - Barbers created: 4
      - Products created: 6
      - Services created: 3
   ```

6. **Re-enable ad blockers** (optional - app will work with fallback data if blocked)

### Option 2: Import and Run in Code

Add this to your `App.jsx` temporarily:

```javascript
import { runStandaloneMigration } from './firebase/migrations/runMigrationStandalone';

// Run once
useEffect(() => {
  runStandaloneMigration();
}, []);
```

Then remove it after migration completes.

### Option 3: Firebase Console (Manual)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `wworkshopstudio-b79dc`
3. Go to **Firestore Database**
4. Create collections manually:
   - `barbers` - Add 4 documents with placeholder barber data
   - `products` - Add 6 documents with placeholder product data
   - `services` - Add 3 documents with service data
   - `appointments` - Empty collection (will be populated by bookings)
   - `orders` - Empty collection (will be populated by shop purchases)

## What Gets Created

### Barbers Collection
- 4 placeholder barbers: Barber Alpha, Barber Beta, Barber Gamma, Barber Delta
- Each with schedule, portfolio, and contact info

### Products Collection
- 6 placeholder products with lorem ipsum names
- Prices, descriptions, images

### Services Collection
- 3 default services: Haircut, Beard Trim, Shave
- Prices and durations

### Other Collections
- `appointments` - For booking system
- `orders` - For shop purchases
- `users` - For user accounts
- `blog` - For About page content

## Verify Migration

After running migration, check Firebase Console:

1. Go to **Firestore Database**
2. You should see collections with data
3. Check `barbers` collection - should have 4 documents
4. Check `products` collection - should have 6 documents
5. Check `services` collection - should have 3 documents

## Troubleshooting

### Migration Still Fails

1. **Check Firebase Config:**
   - Verify `src/firebase/config.js` has correct project ID
   - Check Firebase Console → Project Settings → General

2. **Check Firestore Rules:**
   - Go to Firebase Console → Firestore Database → Rules
   - Should allow reads/writes (for development):
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true; // Development only!
       }
     }
   }
   ```

3. **Check Network Tab:**
   - Open DevTools → Network tab
   - Look for blocked requests to `firestore.googleapis.com`
   - If blocked, disable ad blocker

4. **Check Console Errors:**
   - Look for specific error messages
   - Common issues: permission denied, network errors

### App Works But Firebase Empty

- This is expected if ad blockers are active
- App uses fallback placeholder data
- To populate Firebase, run migration with ad blockers disabled

## After Migration

Once migration completes:
- ✅ Firebase will have all required data
- ✅ App will use Firebase data when available
- ✅ App will fall back to placeholders if Firebase is blocked
- ✅ You can re-enable ad blockers (app still works)

## Need Help?

If migration still doesn't work:
1. Check browser console for specific errors
2. Verify Firebase project is active
3. Check Firestore is enabled in Firebase Console
4. Try different browser or incognito mode

