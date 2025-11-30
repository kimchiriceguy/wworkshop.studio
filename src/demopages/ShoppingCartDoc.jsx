import { useState } from 'react'
import DocPage from './DocPage'
import { ShoppingCart, Button } from '../../components'
import '../../components/ShoppingCart/ShoppingCart.css'
import '../../components/Button/Button.css'

const ShoppingCartDoc = ({ onBack }) => {
  const [cart, setCart] = useState([
    { id: 1, name: 'DUST VOLUME POWER', price: 380, image: '/vite.svg', quantity: 2 },
    { id: 2, name: 'ORIGINAL POMADE', price: 480, image: '/vite.svg', quantity: 1 }
  ])

  return (
    <>
      <DocPage
        title="ShoppingCart Component"
        onBack={onBack}
        overview="The ShoppingCart component provides a complete shopping cart solution with a floating cart icon, cart modal, quantity management, and checkout form with payment proof upload."
        demo={
          <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.7)' }}>
              Look for the cart icon in the bottom-right corner. Click it to see the cart modal.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button 
                variant="primary" 
                onClick={() => setCart([...cart, { id: Date.now(), name: 'New Product', price: 100, image: '/vite.svg', quantity: 1 }])}
              >
                Add Item to Cart
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => setCart([])}
              >
                Clear Cart
              </Button>
            </div>
            <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
              Current cart items: {cart.length}
            </p>
          </div>
        }
      instructions={[
        {
          title: 'Step 1: Import the Component',
          code: `import { ShoppingCart } from './components';
import './components/ShoppingCart/ShoppingCart.css';
import './components/Modal/Modal.css';
import './components/QuantityPicker/QuantityPicker.css';`
        },
        {
          title: 'Step 2: Use the Component',
          code: `function App() {
  const [cart, setCart] = useState([]);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCart(cart.map(item => 
      item.id === itemId ? {...item, quantity: newQuantity} : item
    ));
  };

  const handleRemoveItem = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const handleCheckout = ({ cart, proofFile, totalAmount }) => {
    console.log('Checkout:', { cart, proofFile, totalAmount });
    // Process order
  };

  return (
    <ShoppingCart
      cart={cart}
      onUpdateQuantity={handleUpdateQuantity}
      onRemoveItem={handleRemoveItem}
      onCheckout={handleCheckout}
    />
  );
}`
        }
      ]}
      props={[
        { name: 'cart', type: 'array', default: '[]', description: 'Array of cart items: [{id, name, price, image, quantity}]' },
        { name: 'onUpdateQuantity', type: 'function', default: '-', description: 'Update quantity: (itemId, newQuantity) => void' },
        { name: 'onRemoveItem', type: 'function', default: '-', description: 'Remove item: (itemId) => void' },
        { name: 'onCheckout', type: 'function', default: '-', description: 'Checkout callback: ({cart, proofFile, totalAmount}) => void' },
        { name: 'cartIcon', type: 'ReactNode', default: '-', description: 'Custom cart icon element' },
        { name: 'showCartIcon', type: 'boolean', default: 'true', description: 'Show/hide cart icon' }
      ]}
      examples={[
        {
          code: `import React, { useState } from 'react';
import { ShoppingCart } from './components';

function ShopApp() {
  const [cart, setCart] = useState([]);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCart(cart.map(item => 
      item.id === itemId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const handleRemoveItem = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const handleCheckout = async ({ cart, proofFile, totalAmount }) => {
    const formData = new FormData();
    formData.append('proof', proofFile);
    formData.append('cart', JSON.stringify(cart));
    formData.append('total', totalAmount);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      if (result.success) {
        setCart([]);
        alert('Order placed successfully!');
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <div>
      <ShoppingCart
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
      {/* Your shop content */}
    </div>
  );
}

export default ShopApp;`
        }
      ]}
      notes={[
        'Cart icon is fixed positioned in bottom-right corner',
        'Cart count badge shows total items in cart',
        'Each cart item can have its quantity updated independently',
        'Checkout form includes QR code display and proof of payment upload',
        'Total amount is automatically calculated from cart items',
        'Cart persists in component state - consider using localStorage for persistence',
        'Proof file is passed as File object to onCheckout handler'
      ]}
      />
      <ShoppingCart
        cart={cart}
        onUpdateQuantity={(itemId, newQuantity) => {
          setCart(cart.map(item => 
            item.id === itemId ? {...item, quantity: newQuantity} : item
          ))
        }}
        onRemoveItem={(itemId) => {
          setCart(cart.filter(item => item.id !== itemId))
        }}
        onCheckout={({ cart, proofFile, totalAmount }) => {
          alert(`Checkout: ${cart.length} items, Total: ${totalAmount}`)
          setCart([])
        }}
      />
    </>
  )
}

export default ShoppingCartDoc

