import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import QuantityPicker from '../QuantityPicker/QuantityPicker';
import './ProductModal.css';

const ProductModal = ({ 
  isOpen, 
  onClose, 
  product,
  onAddToCart
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedType, setSelectedType] = useState(null);

  if (!product) return null;

  const { name, description, price, images = [], types = [] } = product;
  const displayImages = images.length > 0 ? images : [];
  const currentImage = displayImages[currentImageIndex] || '';

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      (prev - 1 + displayImages.length) % displayImages.length
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      (prev + 1) % displayImages.length
    );
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      const productName = selectedType ? `${name} - ${selectedType}` : name;
      onAddToCart({
        ...product,
        name: productName,
        quantity,
        selectedType
      });
    }
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      className="product-modal"
    >
      <h2 id="modal-title">{selectedType ? `${name} - ${selectedType}` : name}</h2>
      <div className="product-modal-image-container">
        <img 
          id="modal-img" 
          src={currentImage} 
          alt={name}
          className="product-modal-image"
        />
        {displayImages.length > 1 && (
          <div className="product-modal-image-controls">
            <button 
              id="prev-btn" 
              onClick={handlePrevImage}
              className="image-nav-btn"
            >
              ⟵
            </button>
            <button 
              id="next-btn" 
              onClick={handleNextImage}
              className="image-nav-btn"
            >
              ⟶
            </button>
          </div>
        )}
      </div>
      <p id="modal-desc" className="product-modal-description">{description}</p>
      <p id="modal-price" className="product-modal-price" style={{ fontWeight: 'bold' }}>
        {price}
      </p>
      
      {types.length > 0 && (
        <div id="TYPE-picker" className="product-modal-type-picker">
          <p style={{ marginBottom: '0.5rem' }}>Select a type:</p>
          <div id="TYPE-options" className="product-modal-type-options">
            {types.map((type, index) => (
              <button
                key={index}
                onClick={() => setSelectedType(type)}
                className={`type-option ${selectedType === type ? 'selected' : ''}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}

      <QuantityPicker
        value={quantity}
        onChange={setQuantity}
        min={1}
        max={10}
      />

      <button 
        className="add-to-cart-btn"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </Modal>
  );
};

export default ProductModal;

