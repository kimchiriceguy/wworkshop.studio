# How to Access the Admin Page

## Quick Answer

1. **Sign up or log in** with an email that contains `admin` or ends with `@wworkshop.studio`
2. The **ADMIN** link will appear in the header (top right)
3. Click it to go to `/admin`

## Detailed Instructions

### Option 1: Sign Up as Admin (Automatic)

When you sign up, admin status is automatically granted if your email:
- Contains the word `admin` (e.g., `admin@example.com`, `myadmin@gmail.com`)
- Ends with `@wworkshop.studio` (e.g., `user@wworkshop.studio`)

**Steps:**
1. Go to `/login` page
2. Click "Sign Up" (or toggle to sign up mode)
3. Enter an email like: `admin@test.com` or `test@wworkshop.studio`
4. Enter a password and display name
5. Sign up
6. After signing up, you'll be logged in automatically
7. Look for the **ADMIN** link in the header (top right, purple text)
8. Click it to access `/admin`

### Option 2: Make Existing User Admin (Manual)

If you already have an account, you can manually set admin status in Firebase:

**Steps:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `wworkshopstudio-b79dc`
3. Go to **Firestore Database**
4. Find the `users` collection
5. Find your user document (by your user ID/email)
6. Edit the document and add/update:
   ```json
   {
     "isAdmin": true
   }
   ```
7. Save the document
8. Refresh your app or log out and log back in
9. The **ADMIN** link should now appear

### Option 3: Direct URL (If Already Admin)

If you're already an admin user, you can go directly to:
```
http://localhost:5173/admin
```
(Replace with your actual URL)

**Note:** The Admin page will redirect you to `/login` if you're not an admin.

## Verify Admin Status

After logging in, check:
1. **Header** - Look for purple "ADMIN" link in top right
2. **Welcome message** - Should show "Welcome, [your name/email]"
3. **Console** - Check browser console for any errors

## Troubleshooting

### Admin Link Not Showing

1. **Check if you're logged in:**
   - Should see "Welcome, [name]" in header
   - If not, go to `/login` and sign in

2. **Check admin status in Firebase:**
   - Go to Firebase Console → Firestore → `users` collection
   - Find your user document
   - Check if `isAdmin` field exists and is `true`

3. **Refresh the page:**
   - Sometimes the auth state needs to refresh
   - Try logging out and logging back in

4. **Check browser console:**
   - Look for any Firebase errors
   - Check if ad blockers are blocking Firestore requests

### Admin Page Redirects to Login

This means your user doesn't have `isAdmin: true` in Firebase.

**Fix:**
1. Go to Firebase Console
2. Firestore Database → `users` collection
3. Find your user document
4. Set `isAdmin: true`
5. Refresh the app

### Can't Access Firebase Console

If Firebase is blocked by ad blockers:
1. Temporarily disable ad blockers
2. Access Firebase Console
3. Make the changes
4. Re-enable ad blockers

## Admin Page Features

Once you access the admin page, you can:
- **Blog Tab**: Edit blog content for the About page
- **Appointments Tab**: View, edit, and delete appointments
- **Products Tab**: Add, edit, and delete shop products
- **Orders Tab**: View and manage customer orders
- **Users Tab**: View, edit, and manage user accounts

## Security Note

For production, you should:
1. Set up proper Firestore security rules
2. Remove the automatic admin assignment based on email
3. Manually assign admin status to trusted users only
4. Use Firebase Admin SDK for server-side admin operations

