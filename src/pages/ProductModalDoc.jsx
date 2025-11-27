import { useState } from 'react'
import DocPage from './DocPage'
import { ProductModal, ProductCard, Button } from '../../components'
import '../../components/ProductModal/ProductModal.css'
import '../../components/ProductCard/ProductCard.css'
import '../../components/Button/Button.css'

const ProductModalDoc = ({ onBack }) => {
  const [isOpen, setIsOpen] = useState(false)
  const product = {
    name: 'ORIGINAL WATER-BASED POMADE',
    price: 'P480',
    description: 'Perfect for timeless, classic looks – such as high pompadours, side parts, and slick backs.',
    images: ['/vite.svg', '/vite.svg', '/vite.svg'],
    types: ['NOMAD', 'FURY', 'REVOLT']
  }

  return (
    <>
      <DocPage
        title="ProductModal Component"
        onBack={onBack}
        overview="The ProductModal component displays detailed product information in a modal. It includes image gallery navigation, type/variant selection, quantity picker, and add to cart functionality."
        demo={
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '1rem' }}>
              <ProductCard
                product={{
                  id: 1,
                  name: product.name,
                  price: product.price,
                  image: '/vite.svg',
                  description: product.description,
                  images: product.images,
                  types: product.types
                }}
                onClick={() => setIsOpen(true)}
              />
            </div>
            <Button variant="primary" onClick={() => setIsOpen(true)}>
              Open Product Modal
            </Button>
            <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
              Click the card or button above to see the product modal with image gallery, type selection, and quantity picker.
            </p>
          </div>
        }
      instructions={[
        {
          title: 'Step 1: Import Components',
          code: `import { ProductModal } from './components';
import './components/ProductModal/ProductModal.css';
import './components/QuantityPicker/QuantityPicker.css';`
        },
        {
          title: 'Step 2: Use the Component',
          code: `function ProductPage() {
  const [isOpen, setIsOpen] = useState(false);
  const product = {
    name: 'DUST VOLUME POWER',
    price: 'P380',
    description: 'Adds volume and texture.',
    images: ['./prod1.jpg', './prod2.jpg'],
    types: ['NOMAD', 'FURY', 'REVOLT'] // Optional
  };

  const handleAddToCart = (productData) => {
    console.log('Adding to cart:', productData);
    // Add to cart logic
  };

  return (
    <ProductModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      product={product}
      onAddToCart={handleAddToCart}
    />
  );
}`
        }
      ]}
      props={[
        { name: 'isOpen', type: 'boolean', default: '-', description: 'Controls modal visibility' },
        { name: 'onClose', type: 'function', default: '-', description: 'Callback to close modal: () => void' },
        { name: 'product', type: 'object', default: '-', description: 'Product object: {name, price, description, images, types?}' },
        { name: 'onAddToCart', type: 'function', default: '-', description: 'Callback when adding to cart: (productData) => void' }
      ]}
      examples={[
        {
          code: `import React, { useState } from 'react';
import { ProductCard, ProductModal } from './components';

function Shop() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const products = [
    {
      id: 1,
      name: 'DUST VOLUME POWER',
      price: 'P380',
      image: './assets/shop/prod1/1.jpg',
      description: 'DUST VOLUME POWDER adds volume and texture.',
      images: ['./assets/shop/prod1/1.jpg', './assets/shop/prod1/2.webp']
    },
    {
      id: 2,
      name: 'ORIGINAL WATER-BASED POMADE',
      price: 'P480',
      image: './assets/shop/prod3/1.jpg',
      description: 'Perfect for timeless, classic looks.',
      images: ['./assets/shop/prod3/1.jpg'],
      types: ['NOMAD', 'FURY', 'REVOLT']
    }
  ];

  const handleProductClick = (productData) => {
    setSelectedProduct(productData);
    setIsModalOpen(true);
  };

  const handleAddToCart = (productData) => {
    setCart([...cart, productData]);
    setIsModalOpen(false);
    alert('Added to cart!');
  };

  return (
    <div>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={handleProductClick}
          />
        ))}
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default Shop;`
        }
      ]}
      notes={[
        'Image gallery navigation (prev/next) only appears if multiple images exist',
        'Type selection is optional - only shows if product.types array exists',
        'Quantity picker is integrated (1-10 range)',
        'Selected type is included in the product name when adding to cart',
        'Modal automatically closes after adding to cart',
        'Product data passed to onAddToCart includes quantity and selectedType'
      ]}
      />
      <ProductModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        product={product}
        onAddToCart={(data) => {
          alert(`Added to cart: ${data.name} x${data.quantity}`)
          setIsOpen(false)
        }}
      />
    </>
  )
}

export default ProductModalDoc

