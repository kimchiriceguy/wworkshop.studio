import React from 'react';
import './Loader.css';

const Loader = ({
  size = 'medium',
  variant = 'spinner',
  color = '#8400ff',
  text,
  fullScreen = false,
  className = ''
}) => {
  const sizeClasses = {
    small: 'loader-small',
    medium: 'loader-medium',
    large: 'loader-large'
  };

  const renderLoader = () => {
    //this is the 3 barberboys variant
    if (variant === 'tres_barberboys') {
      // use the project's favicon (served from public) for each dot
      const favSrc = '/assets/logos/favicon.png';
      return (
        <div className={`loader-tres_barberboys ${sizeClasses[size]}`}>
          <img src={favSrc} alt="favicon" className="loader-fav" style={{ filter: `drop-shadow(0 0 0 ${color})` }} />
          <img src={favSrc} alt="favicon" className="loader-fav" style={{ filter: `drop-shadow(0 0 0 ${color})` }} />
          <img src={favSrc} alt="favicon" className="loader-fav" style={{ filter: `drop-shadow(0 0 0 ${color})` }} />
        </div>
      );
    }

    if (variant === 'pulse') {
      return (
        <div className={`loader-pulse ${sizeClasses[size]}`} style={{ borderColor: color }}>
          <div style={{ backgroundColor: color }}></div>
        </div>
      );
    }

    // Default spinner
    return (
      <div
        className={`loader-spinner ${sizeClasses[size]}`}
        style={{ borderColor: `${color} transparent transparent transparent` }}
      ></div>
    );
  };

  const content = (
    <div className={`loader-container ${className}`}>
      {renderLoader()}
      {text && <p className="loader-text">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="loader-fullscreen">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;

