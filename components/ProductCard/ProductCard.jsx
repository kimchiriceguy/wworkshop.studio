import React from 'react';
import './ProductCard.css';

const ProductCard = ({ 
  product,
  onClick,
  className = ''
}) => {
  const {
    id,
    name,
    price,
    image,
    description,
    images = [],
    types = []
  } = product;

  const handleClick = () => {
    if (onClick) {
      onClick({
        id,
        name,
        price,
        description,
        images: images.length > 0 ? images : [image],
        types
      });
    }
  };

  return (
    <div 
      className={`product-card ${className}`}
      onClick={handleClick}
      data-id={id}
      data-images={JSON.stringify(images.length > 0 ? images : [image])}
      data-description={description}
      data-price={price}
      data-types={types.length > 0 ? JSON.stringify(types) : undefined}
    >
      <img src={image} alt={name} className="product-image" />
      <h2 className="product-name">{name}</h2>
      <p className="product-price">Price: {price}</p>
    </div>
  );
};

export default ProductCard;

