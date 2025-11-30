import React, { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = ({
  images = [],
  currentIndex = 0,
  onImageChange,
  showThumbnails = true,
  showNavigation = true,
  className = ''
}) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex);

  const handlePrevious = () => {
    const newIndex = activeIndex > 0 ? activeIndex - 1 : images.length - 1;
    setActiveIndex(newIndex);
    if (onImageChange) onImageChange(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeIndex < images.length - 1 ? activeIndex + 1 : 0;
    setActiveIndex(newIndex);
    if (onImageChange) onImageChange(newIndex);
  };

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    if (onImageChange) onImageChange(index);
  };

  if (images.length === 0) {
    return (
      <div className={`image-gallery ${className}`}>
        <div className="image-gallery-empty">No images available</div>
      </div>
    );
  }

  return (
    <div className={`image-gallery ${className}`}>
      <div className="image-gallery-main">
        {showNavigation && images.length > 1 && (
          <>
            <button 
              className="image-gallery-nav image-gallery-prev"
              onClick={handlePrevious}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button 
              className="image-gallery-nav image-gallery-next"
              onClick={handleNext}
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}
        <div className="image-gallery-container">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src || image}
              alt={image.alt || `Image ${index + 1}`}
              className={`image-gallery-image ${index === activeIndex ? 'active' : ''}`}
            />
          ))}
        </div>
        {images.length > 1 && (
          <div className="image-gallery-indicator">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>
      {showThumbnails && images.length > 1 && (
        <div className="image-gallery-thumbnails">
          {images.map((image, index) => (
            <div
              key={index}
              className={`image-gallery-thumbnail ${index === activeIndex ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img
                src={image.src || image}
                alt={image.alt || `Thumbnail ${index + 1}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;

