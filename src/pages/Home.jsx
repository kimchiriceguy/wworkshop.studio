import React from 'react';
import { useNavigate } from 'react-router-dom';
import InfiniteMarquee from '../components/InfiniteMarquee/InfiniteMarquee';
import '../components/InfiniteMarquee/InfiniteMarquee.css';
import Carousel from '../components/Carousel/Carousel';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import '../components/Carousel/Carousel.css';
import '../components/Card/Card.css';
import '../components/Button/Button.css';
import '../components/ImageGallery/ImageGallery.css';
import './Home.css';

function Home() {
    const navigate = useNavigate();

    // Hero carousel slides
    const heroSlides = [
        {
            content: (
                <div className="hero-slide">
                    <img
                        src="/assets/homepage/1.jpg"
                        alt="Barbershop"
                        className="hero-image"
                    />
                    <div className="hero-overlay"></div>
                    <div className="hero-content">
                        <h1 className="hero-title">WWORKSHOP STUDIO</h1>
                        <p className="hero-subtitle">Premium Barbershop Experience</p>
                        <Button
                            variant="primary"
                            onClick={() => navigate('/booking')}
                            className="hero-cta"
                        >
                            BOOK APPOINTMENT &gt;
                        </Button>
                    </div>
                </div>
            )
        },
        {
            content: (
                <div className="hero-slide">
                    <img
                        src="/assets/homepage/2.jpg"
                        alt="Barbershop"
                        className="hero-image"
                    />
                    <div className="hero-overlay"></div>
                    <div className="hero-content">
                        <h1 className="hero-title">CRAFT & STYLE</h1>
                        <p className="hero-subtitle">Where Tradition Meets Modern Excellence</p>
                        <Button
                            variant="primary"
                            onClick={() => navigate('/services')}
                            className="hero-cta"
                        >
                            VIEW SERVICES &gt;
                        </Button>
                    </div>
                </div>
            )
        },
        {
            content: (
                <div className="hero-slide">
                    <img
                        src="/assets/homepage/3.jpg"
                        alt="Barbershop"
                        className="hero-image"
                    />
                    <div className="hero-overlay"></div>
                    <div className="hero-content">
                        <h1 className="hero-title">MASTER BARBERS</h1>
                        <p className="hero-subtitle">Expert Cuts by Skilled Professionals</p>
                        <Button
                            variant="primary"
                            onClick={() => navigate('/about')}
                            className="hero-cta"
                        >
                            LEARN MORE &gt;
                        </Button>
                    </div>
                </div>
            )
        }
    ];

    // Barbers data
    const barbers = [
        {
            title: 'Asterio',
            description: 'Master Barber with 10+ years of experience. Specializes in classic cuts and modern fades.',
            image: '/assets/barbers/asterio.jpg'
        },
        {
            title: 'Dorothy',
            description: 'Expert stylist known for precision cuts and creative designs.',
            image: '/assets/barbers/dorothy.jpg'
        },
        {
            title: 'Gylliane',
            description: 'Senior barber specializing in beard grooming and hot towel shaves.',
            image: '/assets/barbers/gylliane.jpg'
        },
        {
            title: 'Martin',
            description: 'Versatile barber with expertise in all styles from classic to contemporary.',
            image: '/assets/barbers/martin.jpg'
        }
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
            <div className="marquee-banner">
                <InfiniteMarquee
                    speed={25000}
                    direction="right"
                    gap="15px"
                >
                    <span className="marquee-text">BARBERSHOP / SCHOOL / CONSULTANCY / </span>
                </InfiniteMarquee>
            </div>

            {/* Hero Section */}
            <section className="hero-section">
                <Carousel
                    slides={heroSlides}
                    autoPlay={true}
                    autoPlayInterval={5000}
                    transitionDuration={1000}
                />
            </section>

            {/* About Section */}
            <section className="about-section">
                <div className="container">
                    <div className="about-content">
                        <div className="about-text">
                            <h2 className="section-title">ABOUT WWORKSHOP STUDIO</h2>
                            <p className="section-text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <p className="section-text">
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            <Button
                                variant="primary"
                                onClick={() => navigate('/about')}
                            >
                                LEARN MORE &gt;
                            </Button>
                        </div>
                        <div className="about-image">
                            <img
                                src="/assets/images/homepage1.jpg"
                                alt="Barbershop interior"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Barbers Section */}
            <section className="barbers-section">
                <div className="container">
                    <h2 className="section-title">MEET OUR BARBERS</h2>
                    <div className="barbers-grid">
                        {barbers.map((barber, index) => (
                            <Card
                                key={index}
                                title={barber.title}
                                description={barber.description}
                                image={barber.image}
                                imageAlt={barber.title}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="gallery-section">
                <div className="container">
                    <h2 className="section-title">GALLERY</h2>
                    <ImageGallery
                        images={galleryImages}
                        showThumbnails={true}
                        showNavigation={true}
                    />
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <h2 className="cta-title">READY FOR YOUR NEXT CUT?</h2>
                    <p className="cta-text">
                        Book your appointment today and experience the WWORKSHOP STUDIO difference.
                    </p>
                    <div className="cta-buttons">
                        <Button
                            variant="primary"
                            onClick={() => navigate('/booking')}
                        >
                            BOOK NOW &gt;
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => navigate('/shop')}
                        >
                            SHOP PRODUCTS &gt;
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;

