import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button/Button';
import FormInput from '../components/FormInput/FormInput';
import Modal from '../components/Modal/Modal';
import '../components/Button/Button.css';
import '../components/FormInput/FormInput.css';
import '../components/Modal/Modal.css';
import './Login.css';

function Login({ isOpen, onClose, mode = 'login' }) {
    const { login, signup } = useAuth();
    const [isSignUp, setIsSignUp] = useState(mode === 'signup');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIsSignUp(mode === 'signup');
    }, [mode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isSignUp) {
                if (!displayName) {
                    setError('Display name is required');
                    setLoading(false);
                    return;
                }
                const result = await signup(email, password, displayName, phone);
                if (result.success) {
                    onClose?.();
                }
            } else {
                const result = await login(email, password);
                if (result.success) {
                    onClose?.();
                } else {
                    setError('Invalid email or password');
                }
            }
        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isSignUp ? 'Sign Up' : 'Login'}
            size="medium"
        >
            <div className="login-container">
                <div className="login-card">
                    <img
                        src="/assets/logos/wworkshopstudio@2x.png"
                        alt="WWORKSHOP STUDIO Logo"
                        className="login-logo"
                    />

                    <h1 className="login-title">
                        {isSignUp ? 'SIGN UP' : 'LOGIN'}
                    </h1>

                    <form onSubmit={handleSubmit} className="login-form">
                        {isSignUp && (
                            <FormInput
                                label="Display Name"
                                name="displayName"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                required
                            />
                        )}

                        <FormInput
                            label="Email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        {isSignUp && (
                            <FormInput
                                label="Phone Number"
                                name="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        )}

                        <FormInput
                            label="Password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {error && <div className="error-message">{error}</div>}

                        <Button
                            type="submit"
                            variant="primary"
                            disabled={loading}
                            className="login-button"
                        >
                            {loading ? 'LOADING...' : (isSignUp ? 'SIGN UP' : 'LOGIN')}
                        </Button>
                    </form>

                    <div className="login-switch">
                        <p>
                            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                            <button
                                type="button"
                                className="switch-button"
                                onClick={() => {
                                    setIsSignUp(!isSignUp);
                                    setError('');
                                }}
                            >
                                {isSignUp ? 'Login' : 'Sign Up'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default Login;

