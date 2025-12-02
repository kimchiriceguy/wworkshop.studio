import React from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from '../components/Carousel/Carousel';
import ServiceCard from '../components/ServiceCard/ServiceCard';
import Button from '../components/Button/Button';
import Marquee from '../components/Marquee/Marquee';
import TopHeader from '../components/TopHeader/TopHeader';
import Sidebar from '../components/Sidebar/Sidebar';
import '../components/Carousel/Carousel.css';
import '../components/ServiceCard/ServiceCard.css';
import '../components/Button/Button.css';
import '../components/Marquee/Marquee.css';
import '../components/TopHeader/TopHeader.css';
import '../components/Sidebar/Sidebar.css';
import './Services.css';

function Services() {
    const navigate = useNavigate();

    const services = [
        {
            id: 'barbershop',
            title: 'LOREM IPSUM',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
        },
        {
            id: 'school',
            title: 'DOLOR SIT',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
        },
        {
            id: 'consultancy',
            title: 'AMET CONSECTETUR',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
                        <h2>LOREM IPSUM</h2>
                        <p>Lorem ipsum dolor sit amet</p>
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
                        <h2>DOLOR SIT AMET</h2>
                        <p>Consectetur adipiscing elit</p>
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
                        <h2>CONSECTETUR ADIPISCING</h2>
                        <p>Sed do eiusmod tempor</p>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="services-page">

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
                <div className="services-header">
                    <img
                        src="/assets/logos/wworkshopstudio@2x.png"
                        alt="WWORKSHOP STUDIO Logo"
                        className="services-logo"
                    />
                    <h1 className="page-title">LOREM IPSUM</h1>
                    <p className="services-intro">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
                    <Button
                        variant="outline"
                        onClick={() => navigate('/shop')}
                        style={{ marginLeft: '1rem' }}
                    >
                        VISIT SHOP &gt;
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Services;
