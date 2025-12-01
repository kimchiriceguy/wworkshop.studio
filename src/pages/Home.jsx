import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../firebase/services/productService';
import Card from '../components/Card/Card';
import ProductCard from '../components/ProductCard/ProductCard';
import Button from '../components/Button/Button';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import Marquee from '../components/Marquee/Marquee';
import '../components/Card/Card.css';
import '../components/ProductCard/ProductCard.css';
import '../components/Button/Button.css';
import '../components/ImageGallery/ImageGallery.css';
import '../components/Marquee/Marquee.css';
import './Home.css';

function Home({ addToCart }) {
    const navigate = useNavigate();
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await getAllProducts();
            if (data && data.length > 0) {
                // Get first 8 products as featured
                setFeaturedProducts(data.slice(0, 8));
            } else {
                // Fallback featured products
                setFeaturedProducts([
                    {
                        id: 1,
                        name: 'Lorem Ipsum',
                        price: '$25.99',
                        image: '/assets/shop/prod1/1.jpg',
                        description: 'Lorem ipsum dolor sit amet'
                    },
                    {
                        id: 2,
                        name: 'Dolor Sit',
                        price: '$19.99',
                        image: '/assets/shop/prod2/1.jpg',
                        description: 'Consectetur adipiscing elit'
                    },
                    {
                        id: 3,
                        name: 'Amet Consectetur',
                        price: '$15.99',
                        image: '/assets/shop/prod3/1.jpg',
                        description: 'Sed do eiusmod tempor'
                    },
                    {
                        id: 4,
                        name: 'Adipiscing Elit',
                        price: '$22.99',
                        image: '/assets/shop/prod1/1.jpg',
                        description: 'Incididunt ut labore'
                    }
                ]);
            }
        };
        fetchProducts();
    }, []);

    // Service categories
    const serviceCategories = [
        { id: 'hair', name: 'HAIR', description: 'Lorem ipsum dolor sit amet' },
        { id: 'face', name: 'FACE', description: 'Consectetur adipiscing elit' },
        { id: 'shaving', name: 'SHAVING', description: 'Sed do eiusmod tempor' },
        { id: 'beard', name: 'BEARD', description: 'Incididunt ut labore' },
        { id: 'body', name: 'BODY', description: 'Dolore magna aliqua' },
        { id: 'tools', name: 'TOOLS', description: 'Ut enim ad minim' },
        { id: 'apparel', name: 'APPAREL', description: 'Veniam quis nostrud' }
    ];

    // Gallery images
    const galleryImages = [
        { src: '/assets/homepage/1.jpg', alt: 'Barbershop interior' },
        { src: '/assets/homepage/2.jpg', alt: 'Barber at work' },
        { src: '/assets/homepage/3.jpg', alt: 'Modern barbershop' },
        { src: '/assets/homepage/4.jpg', alt: 'Haircut in progress' },
        { src: '/assets/homepage/5.jpg', alt: 'Barbershop atmosphere' }
    ];

    return (
        <div className="home-page">
            <Marquee />

            {/* Hero Section - Large Banner */}
            <section className="hero-banner">
                <div className="hero-banner-content">
                    <h1 className="hero-main-title">LOREM IPSUM DOLOR SIT AMET</h1>
                    <p className="hero-main-subtitle">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    <div className="hero-cta-group">
                        <Button
                            variant="primary"
                            onClick={() => navigate('/booking')}
                            className="hero-cta-large"
                        >
                            BOOK A RESERVATION
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => navigate('/shop')}
                            className="hero-cta-large"
                        >
                            SHOP ALL PRODUCTS
                        </Button>
                    </div>
                </div>
            </section>

            {/* Mission Statement Section */}
            <section className="mission-section">
                <div className="container">
                    <div className="mission-content">
                        <h2 className="mission-title">LOREM IPSUM DOLOR SIT</h2>
                        <p className="mission-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <Button
                            variant="primary"
                            onClick={() => navigate('/about')}
                            className="mission-cta"
                        >
                            FIND A LOCATION
                        </Button>
                    </div>
                </div>
            </section>

            {/* Service Categories */}
            <section className="categories-section">
                <div className="container">
                    <div className="categories-grid">
                        {serviceCategories.map((category) => (
                            <Card
                                key={category.id}
                                className="category-card"
                                onClick={() => {
                                    if (category.id === 'apparel') {
                                        navigate('/shop');
                                    } else {
                                        navigate('/services');
                                    }
                                }}
                                title={category.name}
                                description={category.description}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Shop Best Sellers */}
            {featuredProducts.length > 0 && (
                <section className="products-section">
                    <div className="container">
                        <h2 className="section-title-center">LOREM IPSUM DOLOR</h2>
                        <div className="products-grid-home">
                            {featuredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={{
                                        ...product,
                                        image: product.image || '/assets/shop/prod1/1.jpg',
                                        price: typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price
                                    }}
                                    onClick={() => {
                                        if (addToCart) {
                                            addToCart({
                                                ...product,
                                                price: typeof product.price === 'string'
                                                    ? parseFloat(product.price.replace('$', ''))
                                                    : product.price
                                            });
                                        }
                                    }}
                                />
                            ))}
                        </div>
                        <div className="products-cta">
                            <Button
                                variant="primary"
                                onClick={() => navigate('/shop')}
                            >
                                SHOP ALL PRODUCTS &gt;
                            </Button>
                        </div>
                    </div>
                </section>
            )}

            {/* Gallery Section */}
            <section className="gallery-section">
                <div className="container">
                    <h2 className="section-title-center">LOREM IPSUM</h2>
                    <ImageGallery
                        images={galleryImages}
                        showThumbnails={true}
                        showNavigation={true}
                    />
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <h2 className="cta-title">LOREM IPSUM DOLOR SIT AMET?</h2>
                    <p className="cta-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="cta-buttons">
                        <Button
                            variant="primary"
                            onClick={() => navigate('/booking')}
                        >
                            BOOK A RESERVATION &gt;
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => navigate('/shop')}
                        >
                            SHOP ALL PRODUCTS &gt;
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;