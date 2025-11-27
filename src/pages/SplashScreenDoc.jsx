import { useState } from 'react'
import DocPage from './DocPage'
import { SplashScreen } from '../../components'
import '../../components/SplashScreen/SplashScreen.css'

const SplashScreenDoc = ({ onBack }) => {
  const [showSplash, setShowSplash] = useState(false)

  return (
    <>
      <DocPage
        title="SplashScreen Component"
        onBack={onBack}
        overview="The SplashScreen component displays a full-screen video splash that shows once per session. It automatically fades out when the video ends or after a timeout, and remembers that it has been shown using session storage."
        demo={
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => setShowSplash(true)}
              style={{
                padding: '1rem 2rem',
                background: '#8400ff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontFamily: 'Inconsolata, monospace'
              }}
            >
              Show Splash Screen Demo
            </button>
            <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.7)' }}>
              Click the button above to see the splash screen. Note: In this demo, it uses a placeholder image instead of video.
            </p>
          </div>
        }
        instructions={[
          {
            title: 'Step 1: Import the Component',
            code: `import { SplashScreen } from './components';
import './components/SplashScreen/SplashScreen.css';`
          },
          {
            title: 'Step 2: Use the Component',
            code: `function App() {
  const [splashComplete, setSplashComplete] = React.useState(false);

  return (
    <>
      <SplashScreen
        videoSrc="/assets/videos/splash.mp4"
        onComplete={() => setSplashComplete(true)}
        fadeOutDuration={1000}
        maxWaitTime={3000}
        useSessionStorage={true}
      />
      {splashComplete && (
        {/* Your main app content */}
      )}
    </>
  );
}`
          }
        ]}
        props={[
          { name: 'videoSrc', type: 'string', default: '-', description: 'Path to the splash video file (MP4 format recommended)' },
          { name: 'onComplete', type: 'function', default: '-', description: 'Callback function called when splash completes: () => void' },
          { name: 'fadeOutDuration', type: 'number', default: '1000', description: 'Duration of fade-out animation in milliseconds' },
          { name: 'maxWaitTime', type: 'number', default: '3000', description: 'Maximum wait time if video doesn\'t play (ms)' },
          { name: 'useSessionStorage', type: 'boolean', default: 'true', description: 'Whether to remember splash has been shown in session storage' }
        ]}
        examples={[
          {
            code: `import React, { useState } from 'react';
import { SplashScreen } from './components';
import './components/SplashScreen/SplashScreen.css';

function App() {
  const [showContent, setShowContent] = useState(false);

  return (
    <div>
      <SplashScreen
        videoSrc="./assets/videos/wworkshopstudio_SPLASH.mp4"
        onComplete={() => {
          console.log('Splash screen completed');
          setShowContent(true);
        }}
        fadeOutDuration={1000}
        maxWaitTime={3000}
        useSessionStorage={true}
      />
      
      {showContent && (
        <div>
          <h1>Welcome to the App</h1>
          {/* Your main content here */}
        </div>
      )}
    </div>
  );
}

export default App;`
          }
        ]}
        notes={[
          'The splash screen uses sessionStorage to remember it has been shown - users won\'t see it again until they close the browser tab',
          'If you want the splash to show every time, set useSessionStorage to false',
          'The video should be muted and autoplay for best browser compatibility',
          'If the video fails to load or play, the component will automatically skip after maxWaitTime',
          'The component handles cleanup of event listeners and timeouts automatically',
          'Recommended video format: MP4 with H.264 codec for maximum compatibility',
          'The splash screen is fixed positioned and covers the entire viewport'
        ]}
      />
      {showSplash && (
        <SplashScreen
          videoSrc="/vite.svg"
          onComplete={() => setShowSplash(false)}
          useSessionStorage={false}
          maxWaitTime={2000}
        />
      )}
    </>
  )
}

export default SplashScreenDoc

