import DocPage from './DocPage'
import { ProductCard } from '../../components'
import '../../components/ProductCard/ProductCard.css'

const ProductCardDoc = ({ onBack }) => {
  const products = [
    {
      id: 1,
      name: 'DUST VOLUME POWER',
      price: 'P380',
      image: '/vite.svg',
      description: 'Adds volume and texture to all hair types.',
      images: ['/vite.svg', '/vite.svg']
    },
    {
      id: 2,
      name: 'ORIGINAL POMADE',
      price: 'P480',
      image: '/vite.svg',
      description: 'Perfect for classic looks.',
      images: ['/vite.svg'],
      types: ['NOMAD', 'FURY', 'REVOLT']
    }
  ]

  return (
    <DocPage
      title="ProductCard Component"
      onBack={onBack}
      overview="The ProductCard component displays product information in a card format. It's designed to work seamlessly with the ProductModal component for detailed product views."
      demo={
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={(data) => alert(`Clicked: ${data.name}`)}
            />
          ))}
        </div>
      }
      instructions={[
        {
          title: 'Step 1: Import the Component',
          code: `import { ProductCard } from './components';
import './components/ProductCard/ProductCard.css';`
        },
        {
          title: 'Step 2: Use the Component',
          code: `function ProductGrid() {
  const product = {
    id: 1,
    name: 'DUST VOLUME POWER',
    price: 'P380',
    image: './assets/shop/prod1/1.jpg',
    description: 'Adds volume and texture to all hair types.',
    images: ['./assets/shop/prod1/1.jpg', './assets/shop/prod1/2.webp'],
    types: []
  };

  const handleProductClick = (productData) => {
    console.log('Product clicked:', productData);
    // Open ProductModal with this product
  };

  return (
    <ProductCard
      product={product}
      onClick={handleProductClick}
    />
  );
}`
        }
      ]}
      props={[
        { name: 'product', type: 'object', default: '-', description: 'Product object: {id, name, price, image, description, images?, types?}' },
        { name: 'onClick', type: 'function', default: '-', description: 'Callback when card is clicked: (productData) => void' },
        { name: 'className', type: 'string', default: '\'\'', description: 'Additional CSS classes' }
      ]}
      examples={[
        {
          code: `import React, { useState } from 'react';
import { ProductCard, ProductModal } from './components';
import './components/ProductCard/ProductCard.css';
import './components/ProductModal/ProductModal.css';

function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: 'DUST VOLUME POWER',
      price: 'P380',
      image: './assets/shop/prod1/1.jpg',
      description: 'DUST VOLUME POWDER adds volume and texture to all hair types.',
      images: [
        './assets/shop/prod1/1.jpg',
        './assets/shop/prod1/2.webp',
        './assets/shop/prod1/3.webp'
      ]
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

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    // Add to cart logic
  };

  return (
    <div className="shop-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={handleProductClick}
        />
      ))}
      
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default ShopPage;`
        }
      ]}
      notes={[
        'Product images array is optional - if not provided, uses the main image',
        'Types array is for products with variants (e.g., different scents, sizes)',
        'The card has hover effects that highlight on mouse over',
        'All product data is passed to onClick handler for modal display',
        'Card is responsive and works well in grid layouts',
        'Price can be formatted as string (e.g., \'P380\' or \'$19.99\')'
      ]}
    />
  )
}

export default ProductCardDoc

