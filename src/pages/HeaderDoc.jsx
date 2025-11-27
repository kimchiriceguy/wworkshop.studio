import { useState } from 'react'
import DocPage from './DocPage'
import { Header } from '../../components'
import '../../components/Header/Header.css'

const HeaderDoc = ({ onBack }) => {
  const [activeNav, setActiveNav] = useState('home')
  
  const navItems = [
    { label: 'Home', href: '#', active: activeNav === 'home', onClick: () => setActiveNav('home') },
    { label: 'About', href: '#', active: activeNav === 'about', onClick: () => setActiveNav('about') },
    { label: 'Services', href: '#', active: activeNav === 'services', onClick: () => setActiveNav('services') }
  ]

  const socialLinks = [
    { url: 'https://www.facebook.com/wworkshop.studio', icon: '/vite.svg', title: 'Facebook' },
    { url: 'https://www.instagram.com/wworkshop.studio/', icon: '/vite.svg', title: 'Instagram' }
  ]

  const loginStatus = {
    isLoggedIn: false,
    loginLink: '#'
  }

  const handleSearch = (value) => {
    console.log('Search:', value)
    alert(`Searching for: ${value}`)
  }

  return (
    <DocPage
      title="Header Component"
      onBack={onBack}
      overview="The Header component provides a complete navigation header with logo, menu items, social media links, login status, and search functionality."
      demo={
        <div style={{ position: 'relative', width: '100%', minHeight: '300px', padding: '2rem', background: '#000' }}>
          <Header
            logoUrl="/vite.svg"
            logoAlt="Demo Logo"
            navItems={navItems}
            socialLinks={socialLinks}
            loginStatus={loginStatus}
            onSearch={handleSearch}
            searchPlaceholder="Try searching..."
          />
          <div style={{ marginTop: '150px', padding: '2rem', textAlign: 'center', color: 'rgba(255,255,255,0.7)' }}>
            <p>This is demo content below the header. Try clicking the navigation items or using the search!</p>
          </div>
        </div>
      }
      instructions={[
        {
          title: 'Step 1: Install Dependencies',
          content: 'Make sure you have React installed in your project:',
          code: 'npm install react react-dom'
        },
        {
          title: 'Step 2: Import the Component',
          code: 'import { Header } from \'./components\';'
        },
        {
          title: 'Step 3: Import CSS',
          content: 'Make sure to import the component\'s CSS file:',
          code: 'import \'./components/Header/Header.css\';'
        },
        {
          title: 'Step 4: Use the Component',
          code: `function App() {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' }
  ];

  const socialLinks = [
    { 
      url: 'https://facebook.com', 
      icon: '/icons/facebook.svg', 
      title: 'Facebook' 
    },
    { 
      url: 'https://instagram.com', 
      icon: '/icons/instagram.svg', 
      title: 'Instagram' 
    }
  ];

  const loginStatus = {
    isLoggedIn: false,
    loginLink: '/login'
  };

  const handleSearch = (searchValue) => {
    console.log('Searching for:', searchValue);
  };

  return (
    <Header
      logoUrl="/assets/logo.png"
      logoAlt="Company Logo"
      navItems={navItems}
      socialLinks={socialLinks}
      loginStatus={loginStatus}
      onSearch={handleSearch}
      searchPlaceholder="Search products..."
    />
  );
}`
        }
      ]}
      props={[
        { name: 'logoUrl', type: 'string', default: '-', description: 'URL to the logo image' },
        { name: 'logoAlt', type: 'string', default: '"Logo"', description: 'Alt text for the logo image' },
        { name: 'navItems', type: 'array', default: '[]', description: 'Array of navigation items: [{label, href, active?, onClick?}]' },
        { name: 'socialLinks', type: 'array', default: '[]', description: 'Array of social links: [{url, icon, title}]' },
        { name: 'loginStatus', type: 'object', default: 'null', description: 'Login status object: {isLoggedIn, username?, accountLink?, loginLink?, onLogout?}' },
        { name: 'onSearch', type: 'function', default: '-', description: 'Callback function when search is submitted: (searchValue) => void' },
        { name: 'searchPlaceholder', type: 'string', default: '"Search..."', description: 'Placeholder text for search input' }
      ]}
      examples={[
        {
          code: `import React from 'react';
import { Header } from './components';
import './components/Header/Header.css';

function App() {
  const [activeNav, setActiveNav] = React.useState('home');

  const navItems = [
    { 
      label: 'Home', 
      href: '/', 
      active: activeNav === 'home',
      onClick: () => setActiveNav('home')
    },
    { 
      label: 'About', 
      href: '/about',
      active: activeNav === 'about',
      onClick: () => setActiveNav('about')
    },
    { 
      label: 'Services', 
      href: '/services',
      active: activeNav === 'services',
      onClick: () => setActiveNav('services')
    }
  ];

  const socialLinks = [
    { 
      url: 'https://www.facebook.com/wworkshop.studio', 
      icon: './assets/logos/facebook-circle.svg', 
      title: 'Facebook' 
    },
    { 
      url: 'https://www.instagram.com/wworkshop.studio/', 
      icon: './assets/logos/instagram-svgrepo-com.svg', 
      title: 'Instagram' 
    }
  ];

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [username, setUsername] = React.useState('');

  const loginStatus = isLoggedIn ? {
    isLoggedIn: true,
    username: username,
    accountLink: '/account',
    onLogout: () => {
      setIsLoggedIn(false);
      setUsername('');
    }
  } : {
    isLoggedIn: false,
    loginLink: '/login'
  };

  const handleSearch = (searchValue) => {
    console.log('Searching for:', searchValue);
    // Implement your search logic here
  };

  return (
    <div>
      <Header
        logoUrl="./assets/logos/wworkshopstudio_5@2x copy.png"
        logoAlt="Workshop Studio Logo"
        navItems={navItems}
        socialLinks={socialLinks}
        loginStatus={loginStatus}
        onSearch={handleSearch}
        searchPlaceholder="Search products..."
      />
      {/* Your page content here */}
    </div>
  );
}

export default App;`
        }
      ]}
      notes={[
        'The Header component is fixed positioned and includes three main sections: top-right bar, logo container, and navigation bar',
        'Social links open in a new tab with proper security attributes (rel="noopener noreferrer")',
        'The search functionality is optional - if onSearch is not provided, the search bar won\'t appear',
        'Navigation items can have onClick handlers for client-side routing (e.g., React Router)',
        'The component uses the "Inconsolata" font family - make sure to import it in your project',
        'All styling is self-contained in Header.css'
      ]}
    />
  )
}

export default HeaderDoc

