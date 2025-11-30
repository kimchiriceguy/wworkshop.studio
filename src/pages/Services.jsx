import React from 'react';
import { useNavigate } from 'react-router-dom';
import InfiniteMarquee from '../components/InfiniteMarquee/InfiniteMarquee';
import '../components/InfiniteMarquee/InfiniteMarquee.css';
import Carousel from '../components/Carousel/Carousel';
import ServiceCard from '../components/ServiceCard/ServiceCard';
import Button from '../components/Button/Button';
import '../components/Carousel/Carousel.css';
import '../components/ServiceCard/ServiceCard.css';
import '../components/Button/Button.css';
import './Services.css';

function Services() {
    const navigate = useNavigate();

    const services = [
        {
            id: 'barbershop',
            title: 'BARBERSHOP',
            description: 'Premium haircuts, beard trims, and grooming services in a modern, comfortable environment.',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
        },
        {
            id: 'school',
            title: 'SCHOOL',
            description: 'Professional barber training programs. Learn the art and craft of barbering from industry experts.',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
        },
        {
            id: 'consultancy',
            title: 'CONSULTANCY',
            description: 'Business consulting for barbershop owners. Build and grow your barbershop business.',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
        }
    ];

    // Carousel slides for services
    const serviceSlides = [
        {
            content: (
                <div className="service-slide">
                    <img src="/assets/homepage/1.jpg" alt="Barbershop" className="slide-image" />
                    <div className="slide-overlay"></div>
                    <div className="slide-content">
                        <h2>BARBERSHOP SERVICES</h2>
                        <p>Expert cuts and grooming services</p>
                    </div>
                </div>
            )
        },
        {
            content: (
                <div className="service-slide">
                    <img src="/assets/homepage/2.jpg" alt="Barbershop" className="slide-image" />
                    <div className="slide-overlay"></div>
                    <div className="slide-content">
                        <h2>PROFESSIONAL TRAINING</h2>
                        <p>Learn from master barbers</p>
                    </div>
                </div>
            )
        },
        {
            content: (
                <div className="service-slide">
                    <img src="/assets/homepage/3.jpg" alt="Barbershop" className="slide-image" />
                    <div className="slide-overlay"></div>
                    <div className="slide-content">
                        <h2>BUSINESS CONSULTING</h2>
                        <p>Grow your barbershop business</p>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="services-page">
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
                <div className="services-header">
                    <img
                        src="/assets/logos/wworkshopstudio@2x.png"
                        alt="WWORKSHOP STUDIO Logo"
                        className="services-logo"
                    />
                    <h1 className="page-title">OUR SERVICES</h1>
                    <p className="services-intro">
                        Experience the finest in barbering services. From classic cuts to modern styles,
                        we offer comprehensive grooming solutions for the modern gentleman.
                    </p>
                </div>

                <div className="services-carousel">
                    <Carousel
                        slides={serviceSlides}
                        autoPlay={true}
                        autoPlayInterval={5000}
                        transitionDuration={1000}
                    />
                </div>

                <div className="services-grid">
                    {services.map((service) => (
                        <ServiceCard
                            key={service.id}
                            title={service.title}
                            description={service.description}
                            onClick={() => navigate('/booking')}
                        />
                    ))}
                </div>

                <div className="services-cta">
                    <Button
                        variant="primary"
                        onClick={() => navigate('/booking')}
                    >
                        BOOK APPOINTMENT &gt;
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Services;
