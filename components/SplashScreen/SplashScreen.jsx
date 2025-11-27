import React, { useState, useEffect } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ 
  videoSrc, 
  onComplete,
  fadeOutDuration = 1000,
  maxWaitTime = 3000,
  useSessionStorage = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const videoRef = React.useRef(null);

  useEffect(() => {
    const hasShown = useSessionStorage && sessionStorage.getItem('splashShown');
    
    if (hasShown) {
      setIsVisible(false);
      setIsHidden(true);
      if (onComplete) onComplete();
      return;
    }

    setIsVisible(true);
    setIsHidden(false);

    const handleVideoEnd = () => {
      setIsFading(true);
      setTimeout(() => {
        setIsVisible(false);
        setIsHidden(true);
        if (useSessionStorage) {
          sessionStorage.setItem('splashShown', 'true');
        }
        if (onComplete) onComplete();
      }, fadeOutDuration);
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener('ended', handleVideoEnd);

      // Fallback timeout if video doesn't play
      const timeout = setTimeout(() => {
        if (!video.played || video.played.length === 0) {
          console.log('Video didn\'t play, skipping splash screen');
          handleVideoEnd();
        }
      }, maxWaitTime);

      // Try to play the video
      video.play().catch(err => {
        console.error('Error playing video:', err);
        handleVideoEnd();
      });

      return () => {
        video.removeEventListener('ended', handleVideoEnd);
        clearTimeout(timeout);
      };
    }
  }, [videoSrc, fadeOutDuration, maxWaitTime, useSessionStorage, onComplete]);

  if (isHidden) return null;

  return (
    <div className={`splash ${isFading ? 'fade-out' : ''} ${isHidden ? 'hidden' : ''}`}>
      <video 
        id="splashscreen"
        ref={videoRef}
        autoPlay 
        muted 
        playsInline
      >
        <source src={videoSrc} type="video/mp4" />
        Browser does not support video tag.
      </video>
    </div>
  );
};

export default SplashScreen;

