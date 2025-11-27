import React, { useEffect, useState } from 'react';
import './Alert.css';

const Alert = ({
  type = 'info',
  message,
  title,
  onClose,
  autoClose = false,
  autoCloseDelay = 5000,
  position = 'top-right',
  showIcon = true,
  className = '',
  index = 0
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, isVisible]);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    // wait for CSS fade-out to finish, then remove from DOM and notify parent
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300);
  };

  if (!isVisible) return null;

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  // Calculate vertical offset based on index
  const offsetStyle = {
    '--alert-offset': `${index * 80}px`
  };

  return (
    <div
      className={`alert alert-${type} alert-${position} ${className} ${isClosing ? 'alert-fade-out' : ''}`}
      style={offsetStyle}
    >
      <div className="alert-content">
        {showIcon && (
          <span className="alert-icon">{icons[type] || icons.info}</span>
        )}
        <div className="alert-body">
          {title && <h4 className="alert-title">{title}</h4>}
          <p className="alert-message">{message}</p>
        </div>
        {onClose && (
          <button
            className="alert-close"
            onClick={handleClose}
            aria-label="Close"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

// Toast component - wrapper for Alert with toast-specific defaults
export const Toast = (props) => {
  return (
    <Alert
      {...props}
      position={props.position || 'top-right'}
      autoClose={props.autoClose !== undefined ? props.autoClose : true}
      autoCloseDelay={props.autoCloseDelay || 3000}
    />
  );
};

export default Alert;

