import React from 'react';
import './QuantityPicker.css';

const QuantityPicker = ({ 
  value, 
  onChange, 
  min = 1, 
  max = 10,
  className = ''
}) => {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e) => {
    let newValue = parseInt(e.target.value) || min;
    if (newValue < min) newValue = min;
    if (newValue > max) newValue = max;
    onChange(newValue);
  };

  return (
    <div className={`quantity-picker ${className}`}>
      <button 
        className="quantity-btn" 
        id="decrease-qty"
        onClick={handleDecrease}
        disabled={value <= min}
      >
        -
      </button>
      <input 
        type="number" 
        id="quantity-input"
        value={value} 
        min={min} 
        max={max}
        onChange={handleInputChange}
        className="quantity-input"
      />
      <button 
        className="quantity-btn" 
        id="increase-qty"
        onClick={handleIncrease}
        disabled={value >= max}
      >
        +
      </button>
    </div>
  );
};

export default QuantityPicker;

