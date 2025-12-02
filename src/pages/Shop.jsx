import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../firebase/services/productService';
import ProductCard from '../components/ProductCard/ProductCard';
import SearchBar from '../components/SearchBar/SearchBar';
import Button from '../components/Button/Button';
import Marquee from '../components/Marquee/Marquee';
import TopHeader from '../components/TopHeader/TopHeader';
import Sidebar from '../components/Sidebar/Sidebar';
import '../components/ProductCard/ProductCard.css';
import '../components/SearchBar/SearchBar.css';
import '../components/Button/Button.css';
import '../components/Marquee/Marquee.css';
import '../components/TopHeader/TopHeader.css';
import '../components/Sidebar/Sidebar.css';
import './Shop.css';

function Shop({ addToCart }) {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Placeholder products
    const placeholderProducts = [
        {
            id: 'prod-1',
            name: 'Lorem Ipsum',
            price: 25.99,
            image: '/assets/shop/prod1/1.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 'prod-2',
            name: 'Dolor Sit',
            price: 19.99,
            image: '/assets/shop/prod2/1.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 'prod-3',
            name: 'Amet Consectetur',
            price: 15.99,
            image: '/assets/shop/prod3/1.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 'prod-4',
            name: 'Adipiscing Elit',
            price: 22.99,
            image: '/assets/shop/prod1/1.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 'prod-5',
            name: 'Sed Eiusmod',
            price: 18.99,
            image: '/assets/shop/prod2/1.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 'prod-6',
            name: 'Tempor Incididunt',
            price: 29.99,
            image: '/assets/shop/prod3/1.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const { data, error } = await getAllProducts();
            if (error || !data || data.length === 0) {
                console.log('Using placeholder products');
                // Always use placeholder products if Firebase is empty or fails
                setProducts(placeholderProducts);
            } else {
                setProducts(data);
            }
            setLoading(false);
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="shop-page">
            <Marquee
                text="barbershop / school / consultancy /"
                speed={300}
            />
            <TopHeader
                logoSrc="./assets/logos/barberboy_alpha.png"
                logoAlt="wworkshop.studio Logo"
            />
            <Sidebar isOpen={true} onClose={() => { }} />

            <div className="container">
                <div className="shop-header">
                    <img
                        src="/assets/logos/wworkshopstudio@2x.png"
                        alt="WWORKSHOP STUDIO Logo"
                        className="shop-logo"
                    />
                    <h1 className="page-title">LOREM IPSUM</h1>
                    <p className="shop-intro">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>

                <div className="shop-search">
                    <SearchBar
                        placeholder="Lorem ipsum..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="products-grid">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={{
                                ...product,
                                image: product.image || '/assets/shop/prod1/1.jpg',
                                price: typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price
                            }}
                            onClick={() => addToCart(product)}
                        />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="no-products">
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                )}

                {filteredProducts.length > 0 && (
                    <div className="shop-cta" style={{ marginTop: '3rem', textAlign: 'center', padding: '2rem 0' }}>
                        <Button variant="primary" onClick={() => navigate('/booking')}>
                            BOOK APPOINTMENT &gt;
                        </Button>
                        <Button variant="outline" onClick={() => navigate('/services')} style={{ marginLeft: '1rem' }}>
                            VIEW SERVICES &gt;
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Shop;
