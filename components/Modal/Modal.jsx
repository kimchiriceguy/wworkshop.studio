import React, { useEffect } from 'react';
import './Modal.css';

const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  title,
  showCloseButton = true,
  closeOnBackdropClick = true,
  className = '',
  size = 'medium' // 'small', 'medium', 'large', 'fullscreen'
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (closeOnBackdropClick && e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div 
      className={`modal ${isOpen ? 'show' : ''}`}
      onClick={handleBackdropClick}
    >
      <div className={`modal-content modal-${size} ${className}`}>
        {showCloseButton && (
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        )}
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default Modal;

