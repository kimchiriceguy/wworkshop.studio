import './Docs.css'

const DocsIndex = ({ onNavigate }) => {
  const components = [
    { name: 'Header', page: 'header', description: 'Navigation header with logo, menu, social links, and search' },
    { name: 'SplashScreen', page: 'splash-screen', description: 'Video splash screen that shows once per session' },
    { name: 'InfiniteMarquee', page: 'infinite-marquee', description: 'Scrolling marquee text component' },
    { name: 'Carousel', page: 'carousel', description: 'Image/content carousel with thumbnails' },
    { name: 'Modal', page: 'modal', description: 'Reusable modal component for various use cases' },
    { name: 'ProductCard', page: 'product-card', description: 'Product display card component' },
    { name: 'ProductModal', page: 'product-modal', description: 'Product detail modal with image gallery' },
    { name: 'ShoppingCart', page: 'shopping-cart', description: 'Shopping cart with icon and checkout form' },
    { name: 'Calendar', page: 'calendar', description: 'Date selection calendar for appointments' },
    { name: 'ServiceCard', page: 'service-card', description: 'Service display card component' },
    { name: 'SearchBar', page: 'search-bar', description: 'Search input with button' },
    { name: 'QuantityPicker', page: 'quantity-picker', description: 'Quantity selector with increment/decrement' },
    { name: 'Button', page: 'button', description: 'Reusable button with variants and sizes' },
    { name: 'FadeOverlay', page: 'fade-overlay', description: 'Fade-in/fade-out overlay for messages' },
    { name: 'BackgroundVideo', page: 'background-video', description: 'Background video that plays on hover' },
    { name: 'Card', page: 'card', description: 'Generic content card with text and image' },
    { name: 'StoreCard', page: 'store-card', description: 'Store location card with address, hours, and rating' },
    { name: 'FormInput', page: 'form-input', description: 'Styled form input with validation and icons' },
    { name: 'ImageGallery', page: 'image-gallery', description: 'Image gallery with navigation and thumbnails' },
    { name: 'Dropdown', page: 'dropdown', description: 'Select dropdown with search functionality' },
    { name: 'Loader', page: 'loader', description: 'Loading spinner with multiple variants' },
    { name: 'Alert', page: 'alert', description: 'Alert/Toast notifications for user feedback' }
  ]

  return (
    <div className="docs-container">
      <h1>Component Demonstrations</h1>
      <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '2rem' }}>
        Click on any component to see its demonstration and implementation instructions.
      </p>
      <div className="components-grid">
        {components.map((component) => (
          <div
            key={component.name}
            onClick={() => onNavigate && onNavigate(component.page)}
            className="component-card"
            style={{ cursor: 'pointer' }}
          >
            <h2>{component.name}</h2>
            <p>{component.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DocsIndex

