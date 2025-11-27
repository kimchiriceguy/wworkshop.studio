import React, { useState, useEffect } from 'react';
import './Carousel.css';

const Carousel = ({ 
  slides = [],
  autoPlay = false,
  autoPlayInterval = 5000,
  transitionDuration = 3000,
  onSlideChange
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (autoPlay && slides.length > 1) {
      const interval = setInterval(() => {
        handleNext();
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, slides.length]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const nextIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(nextIndex);
    if (onSlideChange) onSlideChange(nextIndex);
    setTimeout(() => setIsTransitioning(false), transitionDuration);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(prevIndex);
    if (onSlideChange) onSlideChange(prevIndex);
    setTimeout(() => setIsTransitioning(false), transitionDuration);
  };

  const handleThumbnailClick = () => {
    if (currentIndex < slides.length - 1) {
      handleNext();
    }
  };

  return (
    <div className={`carousel ${isTransitioning ? 'next' : ''}`}>
      {/* Slides */}
      <div className="list">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`item ${index === currentIndex ? 'active' : ''}`}
          >
            <div className="content">
              {slide.content}
            </div>
          </div>
        ))}
      </div>

      {/* Thumbnails */}
      {slides.length > 0 && slides[currentIndex]?.thumbnail && (
        <div className="thumbnail" onClick={handleThumbnailClick}>
          <div className="item">
            <a href={slides[currentIndex].thumbnailLink || '#'}>
              <img 
                src={slides[currentIndex].thumbnail} 
                alt={slides[currentIndex].thumbnailAlt || 'Thumbnail'} 
              />
            </a>
          </div>
        </div>
      )}

      {/* Timer Bar */}
      {autoPlay && (
        <div className="time"></div>
      )}
    </div>
  );
};

export default Carousel;

