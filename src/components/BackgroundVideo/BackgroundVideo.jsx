import React, { useRef, useEffect } from 'react';
import './BackgroundVideo.css';

const BackgroundVideo = ({
  videoSrc,
  opacity = 0,
  onHover,
  autoplay = true,
  loop = true,
  muted = true,
  playsInline = true,
  className = ''
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleMouseEnter = () => {
      try {
        if (video) {
          // ensure muted so autoplay on user gesture is allowed
          video.muted = muted;
          video.currentTime = 0;
          video.style.opacity = opacity.toString();
          const playPromise = video.play();
          if (playPromise && typeof playPromise.then === 'function') {
            playPromise.then(() => {
              // playing
              // console.debug can be observed in browser console
              console.debug('BackgroundVideo: play started');
            }).catch((err) => {
              console.warn('BackgroundVideo: play failed', err);
            });
          }
        }
      } catch (err) {
        console.warn('BackgroundVideo: error in handleMouseEnter', err);
      }
      if (onHover) onHover(true);
    };

    const handleMouseLeave = () => {
      try {
        if (video) {
          video.style.opacity = '0';
          // pause and reset
          video.pause();
          try { video.currentTime = 0; } catch (e) { /* ignore */ }
        }
      } catch (err) {
        console.warn('BackgroundVideo: error in handleMouseLeave', err);
      }
      if (onHover) onHover(false);
    };

    const triggerElement = document.querySelector('.thumbnail');
    console.debug('BackgroundVideo: triggerElement', triggerElement);
    if (triggerElement) {
      triggerElement.addEventListener('mouseenter', handleMouseEnter);
      triggerElement.addEventListener('mouseleave', handleMouseLeave);
    } else {
      // nothing found - helpful debug info
      console.warn('BackgroundVideo: no element with class "thumbnail" found');
    }

    return () => {
      if (triggerElement) {
        triggerElement.removeEventListener('mouseenter', handleMouseEnter);
        triggerElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [opacity, onHover]);

  return (
    <video
      ref={videoRef}
      className={`background-video ${className}`}
      autoPlay={autoplay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      style={{ opacity: 0 }}
    >
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default BackgroundVideo;

