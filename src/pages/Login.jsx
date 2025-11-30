import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import InfiniteMarquee from '../components/InfiniteMarquee/InfiniteMarquee';
import '../components/InfiniteMarquee/InfiniteMarquee.css';
import Button from '../components/Button/Button';
import FormInput from '../components/FormInput/FormInput';
import '../components/Button/Button.css';
import '../components/FormInput/FormInput.css';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const { login, signup } = useAuth();
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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
                const result = await signup(email, password, displayName);
                if (result.success) {
                    // Force page reload to update auth state
                    window.location.href = '/';
                }
            } else {
                const result = await login(email, password);
                if (result.success) {
                    // Force page reload to update auth state
                    window.location.href = '/';
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
        <div className="login-page">
            <div className="marquee-banner">
                <InfiniteMarquee
                    speed={25000}
                    direction="right"
                    gap="15px"
                >
                    <span className="marquee-text">BARBERSHOP / SCHOOL / CONSULTANCY / </span>
                    <span className="marquee-text">BARBERSHOP / SCHOOL / CONSULTANCY / </span>
                </InfiniteMarquee>
            </div>

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
        </div>
    );
}

export default Login;

