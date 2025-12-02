// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';

// Import components
import Header from './components/Header/Header';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
// import SplashScreen from './components/SplashScreen/SplashScreen';

// Import pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Services from './pages/Services';
import About from './pages/About';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Booking from './pages/Booking';
import Admin from './pages/Admin';
import Login from './pages/Login';

// Import component styles
import './components/Header/Header.css';
import './components/ShoppingCart/ShoppingCart.css';
// import './components/SplashScreen/SplashScreen.css';

// Import global styles
import './index.css';

function AppContent() {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginMode, setLoginMode] = useState('login'); // 'login' or 'signup'
  const [loginMenuOpen, setLoginMenuOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();

  useEffect(() => {
    if (location.pathname === '/' && showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, showSplash]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const displayName =
    user?.displayName || user?.name || user?.username || user?.email || 'User';

  return (
    <>
      {/* Temporarily disabled SplashScreen - video file missing */}
      {/* {location.pathname === '/' && showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )} */}

      {/* Login / user container in top-right, visible on all pages */}
      <div className="login-status">
        {user ? (
          <>
            <div className="login-status-text">
              Welcome, <span className="login-status-name">{displayName}!</span>
            </div>
            {isAdmin && (
              <div className="login-status-admin-link">
                <Link to="/admin">Go to admin page</Link>
              </div>
            )}
            <div className="login-status-actions">
              <button
                type="button"
                className="login-status-button"
                onClick={() => {
                  setLoginMode('login');
                  setLoginOpen(true);
                  setLoginMenuOpen(false);
                }}
              >
                Login
              </button>
              <button
                type="button"
                className="login-status-caret"
                onClick={() => setLoginMenuOpen((open) => !open)}
              >
                ▾
              </button>
              {loginMenuOpen && (
                <div className="login-status-dropdown">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMode('login');
                      setLoginOpen(true);
                      setLoginMenuOpen(false);
                    }}
                  >
                    Sign in
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMode('signup');
                      setLoginOpen(true);
                      setLoginMenuOpen(false);
                    }}
                  >
                    Log in
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setLoginMenuOpen(false);
                    }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="login-status-actions">
            <button
              type="button"
              className="login-status-button"
              onClick={() => {
                setLoginMode('login');
                setLoginOpen(true);
                setLoginMenuOpen(false);
              }}
            >
              Login
            </button>
            <button
              type="button"
              className="login-status-caret"
              onClick={() => setLoginMenuOpen((open) => !open)}
            >
              ▾
            </button>
            {loginMenuOpen && (
              <div className="login-status-dropdown">
                <button
                  type="button"
                  onClick={() => {
                    setLoginMode('login');
                    setLoginOpen(true);
                    setLoginMenuOpen(false);
                  }}
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginMode('signup');
                    setLoginOpen(true);
                    setLoginMenuOpen(false);
                  }}
                >
                  Log in
                </button>
                <button type="button" disabled>
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<Home addToCart={addToCart} />}
          />
          <Route
            path="/shop"
            element={<Shop addToCart={addToCart} />}
          />
          <Route
            path="/services"
            element={<Services />}
          />
          <Route
            path="/booking"
            element={<Booking />}
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/admin"
            element={<Admin />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                items={cartItems}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                total={cartTotal}
              />
            }
          />
          <Route
            path="/product/:id"
            element={<ProductDetail addToCart={addToCart} />}
          />
        </Routes>
      </main>

      <ShoppingCart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        total={cartTotal}
      />

      <Login
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        mode={loginMode}
      />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;