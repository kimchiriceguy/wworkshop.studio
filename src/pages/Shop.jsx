import React, { useState } from 'react';
import InfiniteMarquee from '../components/InfiniteMarquee/InfiniteMarquee';
import '../components/InfiniteMarquee/InfiniteMarquee.css';
import ProductCard from '../components/ProductCard/ProductCard';
import SearchBar from '../components/SearchBar/SearchBar';
import Button from '../components/Button/Button';
import '../components/ProductCard/ProductCard.css';
import '../components/SearchBar/SearchBar.css';
import '../components/Button/Button.css';
import './Shop.css';

function Shop({ addToCart }) {
    const [searchTerm, setSearchTerm] = useState('');

    // TODO: Replace with Firebase data
    const products = [
        {
            id: 1,
            name: 'Premium Hair Pomade',
            price: 25.99,
            image: '/assets/shop/prod1/1.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 2,
            name: 'Beard Oil',
            price: 19.99,
            image: '/assets/shop/prod2/1.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 3,
            name: 'Styling Gel',
            price: 15.99,
            image: '/assets/shop/prod3/1.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 4,
            name: 'Shaving Cream',
            price: 22.99,
            image: '/assets/shop/prod1/1.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 5,
            name: 'Aftershave Lotion',
            price: 18.99,
            image: '/assets/shop/prod2/1.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 6,
            name: 'Hair Brush Set',
            price: 29.99,
            image: '/assets/shop/prod3/1.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
    ];

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="shop-page">
            <div className="marquee-banner">
        <InfiniteMarquee
          speed={25000}
          direction="right"
          gap="15px"
        >
          <span className="marquee-text">BARBERSHOP / SCHOOL / CONSULTANCY / </span>
          <span className="marquee-text">BARBERSHOP / SCHOOL / CONSULTANCY / </span>
        </InfiniteMarquee>
      </div>

            <div className="container">
                <div className="shop-header">
                    <img
                        src="/assets/logos/wworkshopstudio@2x.png"
                        alt="WWORKSHOP STUDIO Logo"
                        className="shop-logo"
                    />
                    <h1 className="page-title">SHOP</h1>
                    <p className="shop-intro">
                        Browse our selection of premium grooming products and merchandise.
                    </p>
                </div>

                <div className="shop-search">
                    <SearchBar
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="products-grid">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                            description={product.description}
                            onAddToCart={() => addToCart(product)}
                        />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="no-products">
                        <p>No products found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Shop;
