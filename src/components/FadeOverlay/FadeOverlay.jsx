import React, { useState, useEffect } from 'react';
import './FadeOverlay.css';

const FadeOverlay = ({
  message,
  duration = 700,
  fadeOutDuration = 600,
  onComplete,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, fadeOutDuration);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, fadeOutDuration, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fade-overlay ${isFading ? 'fade-out' : ''} ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.7)',
        zIndex: 99999,
        pointerEvents: 'auto',
        transition: `opacity ${fadeOutDuration}ms`,
        opacity: isFading ? 0 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <span style={{
        color: '#fff',
        fontSize: '2rem',
        fontFamily: 'Inconsolata, monospace'
      }}>
        {message}
      </span>
    </div>
  );
};

export default FadeOverlay;

