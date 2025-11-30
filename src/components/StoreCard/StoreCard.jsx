import React from 'react';
import './StoreCard.css';

const StoreCard = ({ 
  store,
  onClick,
  className = ''
}) => {
  const {
    id,
    name,
    image,
    address,
    phone,
    hours,
    rating,
    description
  } = store;

  const handleClick = () => {
    if (onClick) {
      onClick({
        id,
        name,
        address,
        phone,
        hours,
        rating,
        description
      });
    }
  };

  return (
    <div 
      className={`store-card ${className}`}
      onClick={handleClick}
      data-id={id}
    >
      {image && (
        <div className="store-card-image">
          <img src={image} alt={name} />
        </div>
      )}
      <div className="store-card-content">
        <h3 className="store-card-name">{name}</h3>
        {address && <p className="store-card-address">📍 {address}</p>}
        {phone && <p className="store-card-phone">📞 {phone}</p>}
        {hours && <p className="store-card-hours">🕐 {hours}</p>}
        {rating && (
          <div className="store-card-rating">
            ⭐ {rating}
          </div>
        )}
        {description && (
          <p className="store-card-description">{description}</p>
        )}
      </div>
    </div>
  );
};

export default StoreCard;

