import { useState } from 'react'
import DocPage from './DocPage'
import { FadeOverlay, Button } from '../../components'
import '../../components/FadeOverlay/FadeOverlay.css'
import '../../components/Button/Button.css'

const FadeOverlayDoc = ({ onBack }) => {
  const [showOverlay, setShowOverlay] = useState(false)

  return (
    <>
      <DocPage
        title="FadeOverlay Component"
        onBack={onBack}
        overview="The FadeOverlay component displays a full-screen overlay with a message that automatically fades in and out. It's perfect for welcome messages, loading states, or temporary notifications."
        demo={
          <div style={{ textAlign: 'center' }}>
            <Button variant="primary" onClick={() => setShowOverlay(true)}>
              Show Fade Overlay
            </Button>
            <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
              Click the button above to see the fade overlay in action. It will automatically fade out after 1.5 seconds.
            </p>
          </div>
        }
        instructions={[
          {
            title: 'Step 1: Import the Component',
            code: `import { FadeOverlay } from './components';
import './components/FadeOverlay/FadeOverlay.css';`
          },
          {
            title: 'Step 2: Use the Component',
            code: `function App() {
  const [showOverlay, setShowOverlay] = useState(true);

  return (
    <>
      {showOverlay && (
        <FadeOverlay
          message="Welcome to the Shop"
          duration={700}
          fadeOutDuration={600}
          onComplete={() => setShowOverlay(false)}
        />
      )}
      {/* Your content */}
    </>
  );
}`
          }
        ]}
        props={[
          { name: 'message', type: 'string', default: '-', description: 'Message text to display' },
          { name: 'duration', type: 'number', default: '700', description: 'Time to display before fade out (ms)' },
          { name: 'fadeOutDuration', type: 'number', default: '600', description: 'Fade out animation duration (ms)' },
          { name: 'onComplete', type: 'function', default: '-', description: 'Callback when overlay completes: () => void' },
          { name: 'className', type: 'string', default: '\'\'', description: 'Additional CSS classes' }
        ]}
        examples={[
          {
            code: `import React, { useState, useEffect } from 'react';
import { FadeOverlay } from './components';

function ShopPage() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Show welcome overlay on first visit
    const hasVisited = sessionStorage.getItem('hasVisitedShop');
    if (hasVisited) {
      setShowWelcome(false);
    } else {
      sessionStorage.setItem('hasVisitedShop', 'true');
    }
  }, []);

  return (
    <div>
      {showWelcome && (
        <FadeOverlay
          message="Welcome to the Shop"
          duration={1500}
          fadeOutDuration={700}
          onComplete={() => setShowWelcome(false)}
        />
      )}
      {/* Shop content */}
    </div>
  );
}

export default ShopPage;`
          }
        ]}
        notes={[
          'Overlay covers the entire viewport',
          'Automatically fades out after the specified duration',
          'Perfect for one-time welcome messages',
          'Can be used for loading states or notifications',
          'Message is centered both horizontally and vertically',
          'Uses semi-transparent dark background for visibility',
          'Component unmounts after fade out completes'
        ]}
      />
      {showOverlay && (
        <FadeOverlay
          message="Welcome to the Demo!"
          duration={1500}
          fadeOutDuration={700}
          onComplete={() => setShowOverlay(false)}
        />
      )}
    </>
  )
}

export default FadeOverlayDoc

