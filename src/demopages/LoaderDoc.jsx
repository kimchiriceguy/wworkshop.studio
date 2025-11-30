import { useState } from 'react'
import DocPage from './DocPage'
import { Loader, Button } from '../../components'
import '../../components/Loader/Loader.css'
import '../../components/Button/Button.css'

const LoaderDoc = ({ onBack }) => {
  const [showFullScreen, setShowFullScreen] = useState(false)

  return (
    <>
      <DocPage
        title="Loader Component"
        onBack={onBack}
        overview="The Loader component provides multiple loading spinner variants (spinner, tres_barberboys, pulse) in different sizes. Perfect for indicating async operations and data loading states."
        demo={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3 style={{ color: '#8400ff', marginBottom: '1rem' }}>Spinner Variants</h3>
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <Loader variant="spinner" size="small" />
                <Loader variant="spinner" size="medium" />
                <Loader variant="spinner" size="large" />
              </div>
            </div>
            <div>
              <h3 style={{ color: '#8400ff', marginBottom: '1rem' }}>Tres_Barberboys Variant</h3>
              <Loader variant="tres_barberboys" size="medium" />
            </div>
            <div>
              <h3 style={{ color: '#8400ff', marginBottom: '1rem' }}>Pulse Variant</h3>
              <Loader variant="pulse" size="medium" />
            </div>
            <div>
              <h3 style={{ color: '#8400ff', marginBottom: '1rem' }}>With Text</h3>
              <Loader variant="spinner" size="medium" text="Loading..." />
            </div>
            <div>
              <Button variant="primary" onClick={() => setShowFullScreen(true)}>
                Show Full Screen Loader
              </Button>
            </div>
          </div>
        }
        instructions={[
          {
            title: 'Step 1: Import the Component',
            code: `import { Loader } from './components';
import './components/Loader/Loader.css';`
          },
          {
            title: 'Step 2: Use the Component',
            code: `<Loader variant="spinner" size="medium" text="Loading..." />`
          }
        ]}
        props={[
          { name: 'variant', type: 'string', default: "'spinner'", description: "Loader variant: 'spinner', 'tres_barberboys', or 'pulse'" },
          { name: 'size', type: 'string', default: "'medium'", description: "Size: 'small', 'medium', or 'large'" },
          { name: 'color', type: 'string', default: "'#8400ff'", description: 'Loader color (hex code)' },
          { name: 'text', type: 'string', default: '-', description: 'Optional text to display below loader' },
          { name: 'fullScreen', type: 'boolean', default: 'false', description: 'Display as full screen overlay' },
          { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' }
        ]}
        examples={[
          {
            code: `import { useState, useEffect } from 'react';
import { Loader } from './components';

function DataComponent() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then(result => {
      setData(result);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loader variant="spinner" size="large" text="Loading data..." />;
  }

  return <div>{/* Your content */}</div>;
}`
          }
        ]}
        notes={[
          'Three variants available: spinner (default), tres_barberboys, and pulse',
          'Full screen mode overlays the entire page',
          'Color can be customized to match your theme',
          'Text is optional and appears below the loader'
        ]}
      />
      {showFullScreen && (
        <Loader
          variant="spinner"
          size="large"
          text="Loading..."
          fullScreen={true}
        />
      )}
      {showFullScreen && (
        <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 10000 }}>
          <Button variant="secondary" onClick={() => setShowFullScreen(false)}>
            Close
          </Button>
        </div>
      )}
    </>
  )
}

export default LoaderDoc

