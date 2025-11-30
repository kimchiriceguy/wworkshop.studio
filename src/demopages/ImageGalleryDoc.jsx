import DocPage from './DocPage'
import { ImageGallery } from '../../components'
import '../../components/ImageGallery/ImageGallery.css'

const ImageGalleryDoc = ({ onBack }) => {
  const images = [
    { src: '/vite.svg', alt: 'Image 1' },
    { src: '/vite.svg', alt: 'Image 2' },
    { src: '/vite.svg', alt: 'Image 3' }
  ]

  return (
    <DocPage
      title="ImageGallery Component"
      onBack={onBack}
      overview="The ImageGallery component displays a collection of images with navigation, thumbnails, and indicators. Perfect for product images, portfolios, or any image showcase."
      demo={
        <div style={{ maxWidth: '800px' }}>
          <ImageGallery
            images={images}
            showThumbnails={true}
            showNavigation={true}
            onImageChange={(index) => console.log('Image changed to:', index)}
          />
        </div>
      }
      instructions={[
        {
          title: 'Step 1: Import the Component',
          code: `import { ImageGallery } from './components';
import './components/ImageGallery/ImageGallery.css';`
        },
        {
          title: 'Step 2: Use the Component',
          code: `const images = [
  { src: '/image1.jpg', alt: 'Image 1' },
  { src: '/image2.jpg', alt: 'Image 2' }
];

<ImageGallery
  images={images}
  showThumbnails={true}
  showNavigation={true}
/>`
        }
      ]}
      props={[
        { name: 'images', type: 'array', default: '[]', description: 'Array of image objects: [{src, alt?}] or string URLs' },
        { name: 'currentIndex', type: 'number', default: '0', description: 'Initial image index' },
        { name: 'onImageChange', type: 'function', default: '-', description: 'Callback when image changes: (index) => void' },
        { name: 'showThumbnails', type: 'boolean', default: 'true', description: 'Show thumbnail navigation' },
        { name: 'showNavigation', type: 'boolean', default: 'true', description: 'Show prev/next buttons' },
        { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' }
      ]}
      examples={[
        {
          code: `import { ImageGallery } from './components';

function ProductImages() {
  const productImages = [
    '/product-front.jpg',
    '/product-back.jpg',
    '/product-side.jpg'
  ];

  return (
    <ImageGallery
      images={productImages}
      showThumbnails={true}
      showNavigation={true}
      onImageChange={(index) => {
        console.log('Viewing image:', index);
      }}
    />
  );
}`
        }
      ]}
      notes={[
        'Images can be provided as objects with src/alt or as string URLs',
        'Gallery automatically handles image transitions',
        'Thumbnails are scrollable if there are many images',
        'Navigation buttons only show when there are multiple images'
      ]}
    />
  )
}

export default ImageGalleryDoc

