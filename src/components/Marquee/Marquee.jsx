import React, { useEffect, useRef } from 'react';
import './Marquee.css';

const Marquee = ({ text = 'placeholder', speed = 50 }) => {
  const marqueeRef = useRef(null);

  // Duplicate text multiple times for seamless loop - need enough for smooth infinite scroll
  const duplicatedText = Array(20).fill(text).join(' ');

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    const marqueeItems = marqueeRef.current?.querySelectorAll('.marquee-text');

    if (!marqueeItems) return;

    const handleClick = (item) => {
      const newColor = getRandomColor();
      // Set CSS variable on the element to new color
      item.style.setProperty('--clicked-color', newColor);
      // Add class to trigger CSS color change
      item.classList.add('clicked');
      // Remove class after 2.5 seconds to fade back
      setTimeout(() => {
        item.classList.remove('clicked');
      }, 2500);
    };

    marqueeItems.forEach(item => {
      item.addEventListener('click', () => handleClick(item));
    });

    // Cleanup event listeners
    return () => {
      marqueeItems.forEach(item => {
        item.removeEventListener('click', () => handleClick(item));
      });
    };
  }, []);

  return (
    <div className="marquee-wrapper" ref={marqueeRef}>
      <div className="marquee-content" style={{ '--speed': `${speed}s` }}>
        <h1 className="marquee-text">{duplicatedText}</h1>
        <h1 className="marquee-text">{duplicatedText}</h1>
      </div>
    </div>
  );
};

export default Marquee;