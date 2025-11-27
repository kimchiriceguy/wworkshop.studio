import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import QuantityPicker from '../QuantityPicker/QuantityPicker';
import './ShoppingCart.css';

const ShoppingCart = ({ 
  cart = [],
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  cartIcon,
  showCartIcon = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [proofFile, setProofFile] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (onUpdateQuantity) {
      onUpdateQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId) => {
    if (onRemoveItem) {
      onRemoveItem(itemId);
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (onCheckout && proofFile) {
      onCheckout({
        cart,
        proofFile,
        totalAmount
      });
    }
  };

  return (
    <>
      {showCartIcon && (
        <div className="cart-icon" onClick={() => setIsOpen(true)}>
          {cartIcon || (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          )}
          <span id="cart-count" className="cart-count">{totalItems}</span>
        </div>
      )}

      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        className="cart-modal"
        size="large"
      >
        <h2>Shopping Cart</h2>
        <div id="cart-items" className="cart-items">
          {cart.length === 0 ? (
            <p className="cart-empty">Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">{item.price}</p>
                  <QuantityPicker
                    value={item.quantity}
                    onChange={(newQty) => handleQuantityChange(item.id, newQty)}
                    min={1}
                    max={10}
                  />
                </div>
                <button 
                  onClick={() => handleRemoveItem(item.id)}
                  className="remove-item"
                >
                  &times;
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <form id="order-form" onSubmit={handleCheckout} className="cart-form">
            <div className="cart-total">
              <p>Total: <span id="cart-total-amount">{totalAmount}</span></p>
            </div>

            {qrCodeUrl && (
              <div className="qr-section">
                <p><strong>Scan this QR Code to pay:</strong></p>
                <img 
                  src={qrCodeUrl} 
                  alt="Payment QR Code"
                  className="qr-code-image"
                />
              </div>
            )}

            <label htmlFor="proof-upload" className="proof-upload-label">
              Upload Proof of Payment:
            </label>
            <input 
              type="file" 
              id="proof-upload" 
              name="proof" 
              accept="image/*" 
              required
              onChange={(e) => setProofFile(e.target.files[0])}
              className="proof-upload-input"
            />

            <button type="submit" className="buy-now-button">
              Confirm Order
            </button>
          </form>
        )}
      </Modal>
    </>
  );
};

export default ShoppingCart;

