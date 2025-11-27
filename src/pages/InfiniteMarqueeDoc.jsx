import React, { useEffect, useRef } from 'react';

const DocPage = ({ title, onBack, overview, demo, instructions, props, examples, notes }) => {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <button
        onClick={onBack}
        style={{
          marginBottom: '2rem',
          padding: '0.5rem 1rem',
          background: '#8400ff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        ← Back
      </button>

      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{title}</h1>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Overview</h2>
        <p style={{ lineHeight: '1.6', color: '#666' }}>{overview}</p>
      </section>

      {demo && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Demo</h2>
          <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
            {demo}
          </div>
        </section>
      )}

      {instructions && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Usage Instructions</h2>
          {instructions.map((instruction, idx) => (
            <div key={idx} style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{instruction.title}</h3>
              <pre style={{
                background: '#1a1a1a',
                padding: '1rem',
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '0.9rem',
                color: '#00ff00'
              }}>
                <code>{instruction.code}</code>
              </pre>
            </div>
          ))}
        </section>
      )}

      {props && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Props</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#000000' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Name</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Type</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Default</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {props.map((prop, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.75rem', fontFamily: 'monospace', color: '#8400ff' }}>{prop.name}</td>
                  <td style={{ padding: '0.75rem', fontFamily: 'monospace' }}>{prop.type}</td>
                  <td style={{ padding: '0.75rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>{prop.default}</td>
                  <td style={{ padding: '0.75rem', color: '#666' }}>{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {examples && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Examples</h2>
          {examples.map((example, idx) => (
            <div key={idx} style={{ marginBottom: '2rem' }}>
              <pre style={{
                background: '#1a1a1a',
                padding: '1rem',
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '0.85rem',
                color: '#00ff00'
              }}>
                <code>{example.code}</code>
              </pre>
            </div>
          ))}
        </section>
      )}

      {notes && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Notes</h2>
          <ul style={{ lineHeight: '1.8', color: '#666' }}>
            {notes.map((note, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>{note}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

// Custom Marquee Component with Click Interactions
const CustomMarquee = ({ items = ['barbershop', 'school', 'consultancy'] }) => {
  const trackRef = useRef(null);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    if (!trackRef.current) return;

    const handleClick = (e) => {
      if (e.target.tagName === 'H1') {
        const newColor = getRandomColor();
        e.target.style.setProperty('--clicked-color', newColor);
        e.target.classList.add('clicked');

        setTimeout(() => {
          e.target.classList.remove('clicked');
        }, 2500);
      }
    };

    trackRef.current.addEventListener('click', handleClick);

    return () => {
      if (trackRef.current) {
        trackRef.current.removeEventListener('click', handleClick);
      }
    };
  }, []);

  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items, ...items, ...items, ...items, ...items];

  return (
    <div style={{
      width: '100%',
      height: '70px',
      backgroundColor: 'black',
      fontSize: '12px',
      whiteSpace: 'nowrap',
      userSelect: 'none',
      overflow: 'hidden',
      fontFamily: '"Inconsolata", monospace',
      position: 'relative'
    }}>
      <style>{`
        @keyframes marqueemovetext {
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes fadeColor {
          from {
            filter: brightness(100);
          }
          to {
            filter: brightness(1);
          }
        }
        .marquee-text-track {
          display: flex;
          gap: 1px;
          width: max-content;
          color: white;
          animation: marqueemovetext 60s linear infinite;
        }
        .marquee-text-track h1 {
          padding: 0.3rem 2.5rem;
          color: rgb(93, 35, 255);
          transition: color 0.3s ease;
          margin: 0;
          font-size: 16px;
          font-weight: bold;
        }
        .marquee-text-track h1.clicked {
          color: var(--clicked-color);
        }
        .marquee-text-track h1:hover {
          color: #ffffff;
          cursor: crosshair;
        }
      `}</style>
      <div
        ref={trackRef}
        className="marquee-text-track"
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%'
        }}
      >
        {duplicatedItems.map((item, index) => (
          <h1 key={index}>{item}</h1>
        ))}
      </div>
    </div>
  );
};

const InfiniteMarqueeDoc = ({ onBack = () => { } }) => {
  return (
    <DocPage
      title="Custom Marquee Component"
      onBack={onBack}
      overview="A custom infinite scrolling marquee with interactive click effects. Click any word to change it to a random color! This component features smooth CSS animations and quirky user interactions. Aj was here, he really wanted to keep this part wow so quirky!"
      demo={
        <CustomMarquee items={['barbershop', 'school', 'consultancy']} />
      }
      instructions={[
        {
          title: 'Step 1: Create the Component',
          code: `import React, { useEffect, useRef } from 'react';

const CustomMarquee = ({ items = ['barbershop', 'school', 'consultancy'] }) => {
  const trackRef = useRef(null);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    if (!trackRef.current) return;

    const handleClick = (e) => {
      if (e.target.tagName === 'H1') {
        const newColor = getRandomColor();
        e.target.style.setProperty('--clicked-color', newColor);
        e.target.classList.add('clicked');
        
        setTimeout(() => {
          e.target.classList.remove('clicked');
        }, 2500);
      }
    };

    trackRef.current.addEventListener('click', handleClick);
    
    return () => {
      if (trackRef.current) {
        trackRef.current.removeEventListener('click', handleClick);
      }
    };
  }, []);

  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="wrapper">
      <div ref={trackRef} className="marquee-text-track">
        {duplicatedItems.map((item, index) => (
          <h1 key={index}>{item}</h1>
        ))}
      </div>
    </div>
  );
};

export default CustomMarquee;`
        },
        {
          title: 'Step 2: Add the CSS',
          code: `.wrapper {
    width: 100%;
    height: 70px;
    background-color: black;
    font-size: 12px;
    white-space: nowrap;
    user-select: none;
    overflow: hidden;
    position: fixed;
    top: 0;
    z-index: 100;
    font-family: "Inconsolata", monospace;
    animation: fadebg 1s ease forwards;
    animation-delay: 1s;
}

.marquee-text-track {
    display: flex;
    gap: 1px;
    width: max-content;
    color: white;
    animation: marqueemovetext 60s linear infinite;
}

.marquee-text-track h1 {
    padding: 0.3rem 2.5rem;
    color: rgb(93, 35, 255);
    transition: color 0.3s ease;
}

.marquee-text-track h1.clicked {
    color: var(--clicked-color);
}

.marquee-text-track h1:hover {
    color: #ffffff;
    cursor: crosshair;
}

@keyframes marqueemovetext {
    to {
        transform: translateX(-50%);
    }
}

@keyframes fadebg {
    from { background-color: rgba(0, 0, 0, 0); }
    to { background-color: black; }
}`
        },
        {
          title: 'Step 3: Use the Component',
          code: `import CustomMarquee from './components/CustomMarquee';

function App() {
  return (
    <div>
      <CustomMarquee 
        items={['barbershop', 'school', 'consultancy', 'grooming', 'styling']} 
      />
      {/* Your page content here */}
    </div>
  );
}`
        }
      ]}
      props={[
        { name: 'items', type: 'array', default: "['barbershop', 'school', 'consultancy']", description: 'Array of text items to display in the marquee' }
      ]}
      examples={[
        {
          code: `import React from 'react';
import CustomMarquee from './components/CustomMarquee';

function App() {
  const services = [
    'barbershop',
    'school',
    'consultancy',
    'grooming',
    'styling',
    'training',
    'spa',
    'salon'
  ];

  return (
    <div>
      <CustomMarquee items={services} />
      
      <main style={{ marginTop: '70px', padding: '2rem' }}>
        <h1>Welcome to Our Services</h1>
        <p>Click any word in the marquee above for a fun surprise!</p>
      </main>
    </div>
  );
}

export default App;`
        }
      ]}
      notes={[
        'this is just the marquee component, you can customize the items array to display any words you like (or images too! just format them properly lolz).',

        'i tried to make it look cooler, also slightly interactive',

        'yeah idk'
      ]}
    />
  )
}

export default InfiniteMarqueeDoc;