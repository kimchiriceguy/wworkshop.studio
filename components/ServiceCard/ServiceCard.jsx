import React from 'react';
import './ServiceCard.css';

const ServiceCard = ({ 
  title,
  description,
  onClick,
  className = ''
}) => {
  return (
    <div 
      className={`service-modal ${className}`}
      onClick={onClick}
    >
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default ServiceCard;

