import React from 'react';
import './Card.css';

const Card = ({ 
  title,
  description,
  image,
  imageAlt = '',
  onClick,
  className = '',
  footer,
  header
}) => {
  return (
    <div 
      className={`card ${className}`}
      onClick={onClick}
    >
      {header && <div className="card-header">{header}</div>}
      {image && (
        <div className="card-image">
          <img src={image} alt={imageAlt || title} />
        </div>
      )}
      <div className="card-content">
        {title && <h3 className="card-title">{title}</h3>}
        {description && <p className="card-description">{description}</p>}
      </div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;

