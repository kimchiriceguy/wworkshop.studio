import React from 'react';
import { Link } from 'react-router-dom';
import './TopHeader.css';

const TopHeader = ({
    logoSrc = '/logo.png',
    logoAlt = 'Company Logo',
    backgroundOpacity = 0.2,
    borderColor = 'hsl(0 0% 0%)',
    borderOpacity = 0,
    darkBackgroundColor = 'hsl(0 0% 0%)',
    darkBackgroundOpacity = 0,
    darkBorderColor = 'hsl(0 0% 0%)',
    darkBorderOpacity = 0
}) => {
    return (
        <header
            className="top-header"
            style={{

                '--header-bg-opacity': backgroundOpacity,
                '--header-border': borderColor,
                '--header-border-opacity': borderOpacity,
                '--header-bg-dark': darkBackgroundColor,
                '--header-bg-opacity-dark': darkBackgroundOpacity,
                '--header-border-dark': darkBorderColor,
                '--header-border-opacity-dark': darkBorderOpacity,
            }}
        >
            <Link to="/" className="top-header-brand">
                <img src={logoSrc} alt={logoAlt} className="top-header-logo" />
            </Link>
        </header>
    );
};

export default TopHeader;