import React from 'react';
import './Header.css';

const Header = ({ 
  logoUrl, 
  logoAlt = "Logo",
  navItems = [],
  socialLinks = [],
  loginStatus = null,
  onSearch,
  searchPlaceholder = "Search..."
}) => {
  const [searchValue, setSearchValue] = React.useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  return (
    <>
      {/* Top Right Bar - Social Media & Login */}
      <div className="topright-bar">
        {socialLinks.map((link, index) => (
          <a 
            key={index}
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer"
            title={link.title}
          >
            <img src={link.icon} alt={link.title} />
          </a>
        ))}
        {loginStatus && (
          <span id="login-status" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }}>
            {loginStatus.isLoggedIn ? (
              <>
                Welcome, <strong style={{ color: 'white' }}>{loginStatus.username}</strong>!
                {loginStatus.accountLink && (
                  <a href={loginStatus.accountLink} style={{ marginLeft: '10px', color: 'white' }}>
                    Account
                  </a>
                )}
                {loginStatus.onLogout && (
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); loginStatus.onLogout(); }}
                    style={{ marginLeft: '10px', color: 'white' }}
                  >
                    Logout
                  </a>
                )}
              </>
            ) : (
              <a href={loginStatus.loginLink || '#'} style={{ color: 'white' }}>
                Login
              </a>
            )}
          </span>
        )}
      </div>

      {/* Logo Container */}
      {logoUrl && (
        <div className="logo-container">
          <img src={logoUrl} alt={logoAlt} className="logo" />
        </div>
      )}

      {/* Navigation Bar */}
      <nav className="navbar">
        <ul className="navbar-menu">
          {navItems.map((item, index) => (
            <li key={index}>
              <a 
                href={item.href} 
                className={item.active ? 'active' : ''}
                onClick={item.onClick ? (e) => { e.preventDefault(); item.onClick(); } : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        {onSearch && (
          <div className="search-container">
            <form onSubmit={handleSearch}>
              <input 
                type="text" 
                className="search-input" 
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button type="submit" className="search-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </form>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;

