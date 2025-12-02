import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../firebase/services/productService';
import Card from '../components/Card/Card';
import ProductCard from '../components/ProductCard/ProductCard';
import Button from '../components/Button/Button';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import Marquee from '../components/Marquee/Marquee';
import InfiniteMarquee from '../components/InfiniteMarquee/InfiniteMarquee';
import Sidebar from '../components/Sidebar/Sidebar';
import TopHeader from '../components/TopHeader/TopHeader';
import SplashScreen from '../components/SplashScreen/SplashScreen';

import '../components/SplashScreen/SplashScreen.css';
import '../components/TopHeader/TopHeader.css';
import '../components/Sidebar/Sidebar.css';
import '../components/Marquee/Marquee.css';
import '../components/InfiniteMarquee/InfiniteMarquee.css';
import '../components/Card/Card.css';
import '../components/ProductCard/ProductCard.css';
import '../components/Button/Button.css';
import '../components/ImageGallery/ImageGallery.css';
import '../components/Marquee/Marquee.css';
import Carousel from '../components/Carousel/Carousel';
import './Home.css';
import { LogIn } from 'lucide-react';

function Home({ addToCart }) {
    const navigate = useNavigate();
    const [featuredProducts, setFeaturedProducts] = useState([]);

    const carouselSlides = [

    ]

    return (
        <div className="home-page">
            <SplashScreen
                videoSrc="./assets/videos/splash_video.mp4"
                onComplete={() => console.log('Splash screen complete')}
                fadeOutDuration={1000}
                maxWaitTime={3000}
                useSessionStorage={true}
            />

            {/* ok so these should be present in all pages */}
            <Marquee text="products • classes • cuts • consultancy •" speed={250} />
            <TopHeader
                logoSrc="./assets/logos/barberboy_alpha.png"
                logoAlt="wworkshop.studio Logo"
            />
            <Sidebar isOpen={true} onClose={() => { }} />
            {/* buh! */}

            <section className="home-hero-section">
                <div className="hero-content">
                    <h1 className='animatedguy'>Welcome to wworkshop.studio</h1>
                    <p>An Independent, Barber Owned, Barber Operated Barbershop with no pretense</p>
                    <Button variant="primary" onClick={() => navigate('/services')}>
                        Book an Appointment &gt;
                    </Button>
                </div>
            </section>

            {/* IM ANGRY VERY ANGEY */}


            {/* ANGRY DONE */}


        </div>
    );
}

export default Home;