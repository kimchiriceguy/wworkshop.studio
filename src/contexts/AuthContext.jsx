// Auth context - Firebase integrated
import { createContext, useContext, useState, useEffect } from 'react';
import { signIn, signUp, logOut, getUserData, onAuthStateChange } from '../firebase/services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Subscribe to auth state changes
        const unsubscribe = onAuthStateChange(async (firebaseUser) => {
            if (firebaseUser) {
                // Get user data from Firestore
                const { data: userData, error } = await getUserData(firebaseUser.uid);
                if (userData) {
                    setUser({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        displayName: firebaseUser.displayName || userData.displayName || '',
                        ...userData
                    });
                    setIsAdmin(userData.isAdmin || false);
                } else {
                    // Fallback to Firebase Auth user if Firestore data not found
                    setUser({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        displayName: firebaseUser.displayName || ''
                    });
                    setIsAdmin(false);
                }
            } else {
                setUser(null);
                setIsAdmin(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            const { user: firebaseUser, error } = await signIn(email, password);
            if (error) {
                return { success: false, error };
            }

            // Get user data from Firestore
            const { data: userData } = await getUserData(firebaseUser.uid);
            if (userData) {
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName || userData.displayName || '',
                    ...userData
                });
                setIsAdmin(userData.isAdmin || false);
            } else {
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName || ''
                });
                setIsAdmin(false);
            }

            return { success: true, user: firebaseUser };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const signup = async (email, password, displayName, phone = '') => {
        try {
            const { user: firebaseUser, error } = await signUp(email, password, displayName, phone);
            if (error) {
                return { success: false, error };
            }

            // User data is already created in Firestore by signUp service
            const { data: userData } = await getUserData(firebaseUser.uid);
            if (userData) {
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName || userData.displayName || '',
                    ...userData
                });
                setIsAdmin(userData.isAdmin || false);
            }

            return { success: true, user: firebaseUser };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            await logOut();
            setUser(null);
            setIsAdmin(false);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const value = {
        user,
        isAdmin,
        loading,
        login,
        signup,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

