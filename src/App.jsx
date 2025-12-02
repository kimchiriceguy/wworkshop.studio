// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

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

  return (
    <>
      {/* Temporarily disabled SplashScreen - video file missing */}
      {/* {location.pathname === '/' && showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )} */}



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