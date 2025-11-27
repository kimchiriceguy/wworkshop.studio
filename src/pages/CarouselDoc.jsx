import DocPage from './DocPage'
import { Carousel } from '../../components'
import '../../components/Carousel/Carousel.css'

const CarouselDoc = ({ onBack }) => {
  const slides = [
    {
      content: (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#fff', height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Slide 1</h1>
          <p>Welcome to the Carousel Demo</p>
        </div>
      ),
      thumbnail: '/vite.svg',
      thumbnailAlt: 'Slide 1'
    },
    {
      content: (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#fff', height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Slide 2</h1>
          <p>Click the thumbnail to advance</p>
        </div>
      ),
      thumbnail: '/vite.svg',
      thumbnailAlt: 'Slide 2'
    },
    {
      content: (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#fff', height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Slide 3</h1>
          <p>Auto-play is enabled</p>
        </div>
      ),
      thumbnail: '/vite.svg',
      thumbnailAlt: 'Slide 3'
    }
  ]

  return (
    <DocPage
      title="Carousel Component"
      onBack={onBack}
      overview="The Carousel component displays a series of slides with smooth transitions. It supports auto-play, thumbnail navigation, and manual controls."
      demo={
        <div style={{ position: 'relative', width: '100%', height: '400px', background: '#000' }}>
          <Carousel
            slides={slides}
            autoPlay={true}
            autoPlayInterval={4000}
            transitionDuration={3000}
            onSlideChange={(index) => console.log('Slide changed to:', index)}
          />
        </div>
      }
      instructions={[
        {
          title: 'Step 1: Import the Component',
          code: `import { Carousel } from './components';
import './components/Carousel/Carousel.css';`
        },
        {
          title: 'Step 2: Use the Component',
          code: `function App() {
  const slides = [
    {
      content: <div><h1>Slide 1</h1></div>,
      thumbnail: '/images/thumb1.jpg',
      thumbnailLink: '/slide1',
      thumbnailAlt: 'Slide 1 thumbnail'
    },
    {
      content: <div><h1>Slide 2</h1></div>,
      thumbnail: '/images/thumb2.jpg'
    }
  ];

  return (
    <Carousel
      slides={slides}
      autoPlay={true}
      autoPlayInterval={5000}
      transitionDuration={3000}
      onSlideChange={(index) => console.log('Slide:', index)}
    />
  );
}`
        }
      ]}
      props={[
        { name: 'slides', type: 'array', default: '[]', description: 'Array of slide objects: [{content, thumbnail?, thumbnailLink?, thumbnailAlt?}]' },
        { name: 'autoPlay', type: 'boolean', default: 'false', description: 'Enable automatic slide progression' },
        { name: 'autoPlayInterval', type: 'number', default: '5000', description: 'Time between auto-play transitions (ms)' },
        { name: 'transitionDuration', type: 'number', default: '3000', description: 'Duration of transition animation (ms)' },
        { name: 'onSlideChange', type: 'function', default: '-', description: 'Callback when slide changes: (index) => void' }
      ]}
      examples={[
        {
          code: `import React from 'react';
import { Carousel } from './components';
import './components/Carousel/Carousel.css';

function App() {
  const slides = [
    {
      content: (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Welcome to Our Site</h1>
          <p>This is the first slide</p>
        </div>
      ),
      thumbnail: './assets/images/homepage1.jpg',
      thumbnailLink: '/about',
      thumbnailAlt: 'About us'
    },
    {
      content: (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Our Services</h1>
          <p>This is the second slide</p>
        </div>
      ),
      thumbnail: './assets/images/homepage2.jpg',
      thumbnailAlt: 'Services'
    }
  ];

  return (
    <Carousel
      slides={slides}
      autoPlay={true}
      autoPlayInterval={5000}
      transitionDuration={3000}
      onSlideChange={(index) => {
        console.log('Current slide:', index);
      }}
    />
  );
}

export default App;`
        }
      ]}
      notes={[
        'The carousel is full viewport height by default',
        'Clicking the thumbnail advances to the next slide',
        'Auto-play can be enabled/disabled dynamically',
        'Only one slide is active at a time',
        'Thumbnails are optional - slides work without them',
        'Transition animations are smooth and performant'
      ]}
    />
  )
}

export default CarouselDoc

