import DocPage from './DocPage'
import { BackgroundVideo } from '../../components'
import '../../components/BackgroundVideo/BackgroundVideo.css'

const BackgroundVideoDoc = ({ onBack }) => {
  return (
    <DocPage
      title="BackgroundVideo Component"
      onBack={onBack}
      overview="The BackgroundVideo component plays a video in the background when a trigger element (like a thumbnail) is hovered. It automatically pauses and resets when the hover ends, creating an engaging interactive experience."
      demo={
        <div>
          <div
            className="thumbnail"
            style={{
              width: '200px',
              height: '200px',
              margin: '0 auto',
              background: 'rgba(132, 0, 255, 0.2)',
              border: '2px solid #8400ff',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(132, 0, 255, 0.4)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(132, 0, 255, 0.2)'}
          >
            <p style={{ color: '#fff', textAlign: 'center' }}>Hover over this box<br />to trigger video</p>
          </div>
          <p style={{ marginTop: '1rem', textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
            Hover over the box above to see the background video play. Note: This demo uses a placeholder image instead of video.
          </p>
          <BackgroundVideo
            videoSrc="/assets/videos/4years.mp4"
            opacity={0.25}
            onHover={(isHovering) => console.log('Hovering:', isHovering)}
          />
        </div>
      }
      instructions={[
        {
          title: 'Step 1: Import the Component',
          code: `import { BackgroundVideo } from './components';
import './components/BackgroundVideo/BackgroundVideo.css';`
        },
        {
          title: 'Step 2: Use the Component',
          code: `function HomePage() {
  return (
    <div>
      <BackgroundVideo
        videoSrc="/assets/videos/background.mp4"
        opacity={0.2}
        onHover={(isHovering) => console.log('Hovering:', isHovering)}
      />
      <div className="thumbnail">
        {/* Hover over this to play video */}
      </div>
    </div>
  );
}`
        }
      ]}
      props={[
        { name: 'videoSrc', type: 'string', default: '-', description: 'Path to video file' },
        { name: 'opacity', type: 'number', default: '0', description: 'Opacity when playing (0-1)' },
        { name: 'onHover', type: 'function', default: '-', description: 'Hover callback: (isHovering) => void' },
        { name: 'autoplay', type: 'boolean', default: 'true', description: 'Auto-play video' },
        { name: 'loop', type: 'boolean', default: 'true', description: 'Loop video' },
        { name: 'muted', type: 'boolean', default: 'true', description: 'Mute video' },
        { name: 'playsInline', type: 'boolean', default: 'true', description: 'Play inline on mobile' },
        { name: 'className', type: 'string', default: '\'\'', description: 'Additional CSS classes' }
      ]}
      examples={[
        {
          code: `import React from 'react';
import { BackgroundVideo } from './components';

function HomePage() {
  return (
    <div>
      <BackgroundVideo
        videoSrc="./assets/videos/vid1.mp4"
        opacity={0.2}
        onHover={(isHovering) => {
          if (isHovering) {
            console.log('Video playing');
          } else {
            console.log('Video paused');
          }
        }}
        autoplay={true}
        loop={true}
        muted={true}
        playsInline={true}
      />
      
      <div className="thumbnail">
        <img src="./assets/images/homepage2.jpg" alt="Thumbnail" />
        {/* Hovering over this element will trigger the video */}
      </div>
      
      {/* Your page content */}
    </div>
  );
}

export default HomePage;`
        }
      ]}
      notes={[
        'Video is triggered by hovering over an element with class "thumbnail"',
        'Video automatically pauses and resets when hover ends',
        'Video is positioned fixed and covers the entire viewport',
        'Opacity can be adjusted for subtle background effects',
        'Video should be muted for autoplay to work in most browsers',
        'Component handles event listener cleanup automatically',
        'Recommended video format: MP4 with H.264 codec'
      ]}
    />
  )
}

export default BackgroundVideoDoc

