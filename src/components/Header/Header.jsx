import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

const Header = ({ cartCount = 0, onCartClick }) => {
  const location = useLocation();
  const { user, isAdmin, logout } = useAuth();

  const navItems = [
    { path: '/', label: 'HOME' },
    { path: '/about', label: 'ABOUT' },
    { path: '/services', label: 'SERVICES' },
    { path: '/booking', label: 'BOOKING' },
    { path: '/shop', label: 'SHOP' }
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="main-header">
      <div className="header-top">
        <div className="header-logo">
          <Link to="/">
            <img 
              src="/assets/logos/wworkshopstudio_5@2x copy.png" 
              alt="WWORKSHOP STUDIO" 
              className="logo-img"
            />
          </Link>
        </div>
        <div className="header-actions">
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="header-link admin-link">
                  ADMIN
                </Link>
              )}
              <span className="header-user">Welcome, {user.displayName || user.email}</span>
              <button onClick={handleLogout} className="header-link">
                LOGOUT
              </button>
            </>
          ) : (
            <Link to="/login" className="header-link">
              LOGIN
            </Link>
          )}
          <button onClick={onCartClick} className="cart-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
      <nav className="header-nav">
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
