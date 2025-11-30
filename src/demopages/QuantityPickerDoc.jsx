import { useState } from 'react'
import DocPage from './DocPage'
import { QuantityPicker } from '../../components'
import '../../components/QuantityPicker/QuantityPicker.css'

const QuantityPickerDoc = ({ onBack }) => {
  const [quantity, setQuantity] = useState(1)

  return (
    <DocPage
      title="QuantityPicker Component"
      onBack={onBack}
      overview="The QuantityPicker component provides a user-friendly way to select quantities with increment and decrement buttons. It's perfect for shopping carts, product modals, and any quantity selection needs."
      demo={
        <div style={{ textAlign: 'center' }}>
          <QuantityPicker
            value={quantity}
            onChange={setQuantity}
            min={1}
            max={10}
          />
          <p style={{ marginTop: '1rem', color: '#8400ff' }}>
            Current quantity: {quantity}
          </p>
          <p style={{ marginTop: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
            Use the +/- buttons or type directly in the input field.
          </p>
        </div>
      }
      instructions={[
        {
          title: 'Step 1: Import the Component',
          code: `import { QuantityPicker } from './components';
import './components/QuantityPicker/QuantityPicker.css';`
        },
        {
          title: 'Step 2: Use the Component',
          code: `function ProductPage() {
  const [quantity, setQuantity] = useState(1);

  return (
    <QuantityPicker
      value={quantity}
      onChange={setQuantity}
      min={1}
      max={10}
    />
  );
}`
        }
      ]}
      props={[
        { name: 'value', type: 'number', default: '-', description: 'Current quantity value' },
        { name: 'onChange', type: 'function', default: '-', description: 'Callback when quantity changes: (newValue) => void' },
        { name: 'min', type: 'number', default: '1', description: 'Minimum allowed quantity' },
        { name: 'max', type: 'number', default: '10', description: 'Maximum allowed quantity' },
        { name: 'className', type: 'string', default: '\'\'', description: 'Additional CSS classes' }
      ]}
      examples={[
        {
          code: `import React, { useState } from 'react';
import { QuantityPicker } from './components';

function AddToCartForm() {
  const [quantity, setQuantity] = useState(1);
  const [stock] = useState(15); // Available stock

  const handleAddToCart = () => {
    console.log('Adding', quantity, 'items to cart');
    // Add to cart logic
  };

  return (
    <div>
      <QuantityPicker
        value={quantity}
        onChange={setQuantity}
        min={1}
        max={Math.min(stock, 10)} // Limit to stock or 10, whichever is lower
      />
      <button onClick={handleAddToCart}>
        Add {quantity} to Cart
      </button>
    </div>
  );
}

export default AddToCartForm;`
        }
      ]}
      notes={[
        'Buttons are automatically disabled at min/max limits',
        'Input field allows direct typing of values',
        'Values are automatically clamped to min/max range',
        'Component is fully controlled - value must be managed by parent',
        'Default range is 1-10, but can be customized',
        'Styling matches the dark theme with purple accents'
      ]}
    />
  )
}

export default QuantityPickerDoc

