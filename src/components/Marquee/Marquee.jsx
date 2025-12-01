import React from 'react';
import './Marquee.css';

const Marquee = ({ text = 'BARBERSHOP / SCHOOL / CONSULTANCY /', speed = 50 }) => {
  // Duplicate text multiple times for seamless loop - need enough for smooth infinite scroll
  const duplicatedText = Array(20).fill(text).join(' ');

  return (
    <div className="marquee-wrapper">
      <div className="marquee-content" style={{ '--speed': `${speed}s` }}>
        <span className="marquee-text">{duplicatedText}</span>
        <span className="marquee-text">{duplicatedText}</span>
      </div>
    </div>
  );
};

export default Marquee;

