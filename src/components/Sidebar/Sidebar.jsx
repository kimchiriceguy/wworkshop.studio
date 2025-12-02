import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Scissors, Calendar, ShoppingBag, Info, Instagram, Facebook, Twitter } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();

    const navLinks = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/services', label: 'Services', icon: Scissors },
        { path: '/booking', label: 'Booking', icon: Calendar },
        { path: '/shop', label: 'Shop', icon: ShoppingBag },
        { path: '/about', label: 'About', icon: Info },
    ];

    const socialLinks = [
        { href: 'https://instagram.com/yourprofile', icon: Instagram, label: 'Instagram' },
        { href: 'https://facebook.com/yourpage', icon: Facebook, label: 'Facebook' },
        { href: 'https://twitter.com/yourhandle', icon: Twitter, label: 'Twitter' },
    ];

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
                onClick={onClose}
            />

            {/* Sidebar - Now on the left */}
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                {/* Header with Logo */}
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <img src="/logo.png" alt="Logo" className="logo-image" />
                    </div>
                    <button className="sidebar-close" onClick={onClose}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Navigation */}
                <nav className="sidebar-content">
                    <div className="sidebar-group">
                        <div className="sidebar-group-label">Navigation</div>
                        <div className="sidebar-menu">
                            {navLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`sidebar-menu-button ${isActive(link.path) ? 'active' : ''}`}
                                        onClick={onClose}
                                    >
                                        <Icon className="sidebar-icon" size={20} />
                                        <span className="sidebar-label">{link.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </nav>

                {/* Footer */}
                <div className="sidebar-footer">
                    <div className="sidebar-separator"></div>
                    <div className="sidebar-group">
                        <div className="sidebar-group-label">Connect</div>
                        <div className="sidebar-social">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        className="social-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Icon size={18} />
                                        <span>{social.label}</span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;