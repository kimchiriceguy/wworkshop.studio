// Auth context - Firebase ready
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    // TODO: Replace with Firebase auth
    useEffect(() => {
        // Check for stored auth
        const storedUser = localStorage.getItem('user');
        const storedAdmin = localStorage.getItem('isAdmin');

        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAdmin(storedAdmin === 'true');
        }

        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // TODO: Replace with Firebase auth
        // For now, simple mock login
        const mockUser = {
            uid: 'mock-uid',
            email: email,
            displayName: email.split('@')[0]
        };

        // Check if admin (simple check for demo)
        const admin = email.includes('admin') || email.includes('@wworkshop.studio');

        setUser(mockUser);
        setIsAdmin(admin);
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('isAdmin', admin.toString());

        return { success: true, user: mockUser, isAdmin: admin };
    };

    const signup = async (email, password, displayName) => {
        // TODO: Replace with Firebase auth
        const mockUser = {
            uid: 'mock-uid-' + Date.now(),
            email: email,
            displayName: displayName || email.split('@')[0]
        };

        setUser(mockUser);
        setIsAdmin(false);
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('isAdmin', 'false');

        return { success: true, user: mockUser };
    };

    const logout = async () => {
        // TODO: Replace with Firebase auth
        setUser(null);
        setIsAdmin(false);
        localStorage.removeItem('user');
        localStorage.removeItem('isAdmin');
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

