import { useState } from 'react'
import './App.css'

// Import all components
import {
  Header,
  SplashScreen,
  InfiniteMarquee,
  Carousel,
  Modal,
  ProductCard,
  ProductModal,
  ShoppingCart,
  Calendar,
  ServiceCard,
  SearchBar,
  QuantityPicker,
  Button,
  FadeOverlay,
  BackgroundVideo,
  Card,
  StoreCard,
  FormInput,
  ImageGallery,
  Dropdown,
  Loader,
  Alert
} from '../components'

// Import documentation pages
import {
  DocsIndex,
  HeaderDoc,
  SplashScreenDoc,
  InfiniteMarqueeDoc,
  CarouselDoc,
  ModalDoc,
  ProductCardDoc,
  ProductModalDoc,
  ShoppingCartDoc,
  CalendarDoc,
  ServiceCardDoc,
  SearchBarDoc,
  QuantityPickerDoc,
  ButtonDoc,
  FadeOverlayDoc,
  BackgroundVideoDoc,
  CardDoc,
  StoreCardDoc,
  FormInputDoc,
  ImageGalleryDoc,
  DropdownDoc,
  LoaderDoc,
  AlertDoc
} from './pages'

// Import component CSS
import '../components/Header/Header.css'
import '../components/InfiniteMarquee/InfiniteMarquee'
import '../components/Modal/Modal.css'
import '../components/Button/Button.css'
import '../components/ProductCard/ProductCard.css'
import '../components/ProductModal/ProductModal.css'
import '../components/QuantityPicker/QuantityPicker.css'
import '../components/ShoppingCart/ShoppingCart.css'
import '../components/Calendar/Calendar.css'
import '../components/ServiceCard/ServiceCard.css'
import '../components/SearchBar/SearchBar.css'
import '../components/FadeOverlay/FadeOverlay.css'
import '../components/BackgroundVideo/BackgroundVideo.css'
import '../components/Carousel/Carousel.css'
import '../components/SplashScreen/SplashScreen.css'
import '../components/Card/Card.css'
import '../components/StoreCard/StoreCard.css'
import '../components/FormInput/FormInput.css'
import '../components/ImageGallery/ImageGallery.css'
import '../components/Dropdown/Dropdown.css'
import '../components/Loader/Loader.css'
import '../components/Alert/Alert.css'
import './pages/Docs.css'

function App() {
  const [currentPage, setCurrentPage] = useState('showcase') // 'showcase' or doc page names
  const [showSplash, setShowSplash] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showProductModal, setShowProductModal] = useState(false)
  const [showFadeOverlay, setShowFadeOverlay] = useState(false)
  const [cart, setCart] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [quantity, setQuantity] = useState(1)

  // Sample data
  const navItems = [
    { label: 'Showcase', href: '#', active: currentPage === 'showcase', onClick: () => setCurrentPage('showcase') },
    { label: 'Docs', href: '#', active: currentPage === 'docs', onClick: () => setCurrentPage('docs') }
  ]

  const socialLinks = [
    {
      url: 'https://www.facebook.com/wworkshop.studio',
      icon: '/assets/logos/facebook-circle.svg',
      title: 'Facebook'
    },
    {
      url: 'https://www.instagram.com/wworkshop.studio/',
      icon: '/assets/logos/instagram-svgrepo-com.svg',
      title: 'Instagram'
    }
  ]

  const loginStatus = {
    isLoggedIn: false,
    loginLink: '#'
  }

  const products = [
    {
      id: 1,
      name: 'DUST VOLUME POWER',
      price: 'P380',
      image: '/assets/shop/prod1/1.jpg',
      description: 'DUST VOLUME POWDER adds volume and texture to all hair types and lengths with a natural, matte finish.',
      images: [
        '/assets/shop/prod1/1.jpg',
        '/assets/shop/prod1/2.webp',
        '/assets/shop/prod1/3.webp',
        '/assets/shop/prod1/4.webp',
        '/assets/shop/prod1/5.webp',
        '/assets/shop/prod1/6.webp'
      ],
      types: []
    },
    {
      id: 2,
      name: 'ORIGINAL WATER-BASED POMADE',
      price: 'P480',
      image: '/assets/shop/prod2/1.jpg',
      description: 'Perfect for timeless, classic looks.',
      images: [
        '/assets/shop/prod2/1.jpg',
        '/assets/shop/prod2/2.webp',
        '/assets/shop/prod2/3.webp',
        '/assets/shop/prod2/4.webp',
        '/assets/shop/prod2/5.webp'
      ],
      types: ['NOMAD', 'FURY', 'REVOLT']
    }
  ]

  const services = [
    { title: 'Barbershop', description: 'Cut. Style. Fade.' },
    { title: 'School', description: 'Learn the craft.' },
    { title: 'Consultancy', description: 'Grow your business.' }
  ]

  const carouselSlides = [
    {
      content: (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#fff' }}>
          <h1>Welcome to wworkshop.studio</h1>
          <p>Barbershop • School • Consultancy</p>
        </div>
      ),
      thumbnail: '/assets/homepage/1.jpg',
      thumbnailAlt: 'Slide 1'
    },
    {
      content: (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#fff' }}>
          <h1>Our Services</h1>
          <p>Professional grooming services</p>
        </div>
      ),
      thumbnail: '/assets/homepage/2.jpg',
      thumbnailAlt: 'Slide 2'
    }
  ]

  const handleProductClick = (productData) => {
    setSelectedProduct(productData)
    setShowProductModal(true)
  }

  const handleAddToCart = (productData) => {
    setCart([...cart, productData])
    setShowProductModal(false)
    alert('Added to cart!')
  }

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCart(cart.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ))
  }

  const handleRemoveItem = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId))
  }

  const handleCheckout = ({ cart, proofFile, totalAmount }) => {
    console.log('Checkout:', { cart, proofFile, totalAmount })
    alert('Order placed!')
    setCart([])
  }

  const handleSearch = (searchValue) => {
    console.log('Searching for:', searchValue)
  }

  // Render documentation pages
  const renderDocPage = () => {
    const handleBack = () => setCurrentPage('docs')
    switch (currentPage) {
      case 'docs':
      case 'docs-index':
        return <DocsIndex onNavigate={setCurrentPage} />
      case 'header':
        return <HeaderDoc onBack={handleBack} />
      case 'splash-screen':
        return <SplashScreenDoc onBack={handleBack} />
      case 'infinite-marquee':
        return <InfiniteMarqueeDoc onBack={handleBack} />
      case 'carousel':
        return <CarouselDoc onBack={handleBack} />
      case 'modal':
        return <ModalDoc onBack={handleBack} />
      case 'product-card':
        return <ProductCardDoc onBack={handleBack} />
      case 'product-modal':
        return <ProductModalDoc onBack={handleBack} />
      case 'shopping-cart':
        return <ShoppingCartDoc onBack={handleBack} />
      case 'calendar':
        return <CalendarDoc onBack={handleBack} />
      case 'service-card':
        return <ServiceCardDoc onBack={handleBack} />
      case 'search-bar':
        return <SearchBarDoc onBack={handleBack} />
      case 'quantity-picker':
        return <QuantityPickerDoc onBack={handleBack} />
      case 'button':
        return <ButtonDoc onBack={handleBack} />
      case 'fade-overlay':
        return <FadeOverlayDoc onBack={handleBack} />
      case 'background-video':
        return <BackgroundVideoDoc onBack={handleBack} />
      case 'card':
        return <CardDoc onBack={handleBack} />
      case 'store-card':
        return <StoreCardDoc onBack={handleBack} />
      case 'form-input':
        return <FormInputDoc onBack={handleBack} />
      case 'image-gallery':
        return <ImageGalleryDoc onBack={handleBack} />
      case 'dropdown':
        return <DropdownDoc onBack={handleBack} />
      case 'loader':
        return <LoaderDoc onBack={handleBack} />
      case 'alert':
        return <AlertDoc onBack={handleBack} />
      default:
        return null
    }
  }

  // If showing a doc page, render it
  if (currentPage !== 'showcase') {
    return (
      <div className="app">
        <Header
          logoUrl="/assets/logos/wworkshopstudio_5@2x copy.png"
          logoAlt="Workshop Studio Logo"
          navItems={navItems}
          socialLinks={socialLinks}
          loginStatus={loginStatus}
          onSearch={handleSearch}
          searchPlaceholder="Search..."
        />
        <InfiniteMarquee
          items={['barbershop', 'school', 'consultancy']}
          speed={50}
        />
        {renderDocPage()}
      </div>
    )
  }

  // Showcase page
  return (
    <div className="app">
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>

      {/* Header */}
      <Header
        logoUrl="/assets/logos/wworkshopstudio_5@2x copy.png"
        logoAlt="Workshop Studio Logo"
        navItems={navItems}
        socialLinks={socialLinks}
        loginStatus={loginStatus}
        onSearch={handleSearch}
        searchPlaceholder="Search..."
      />

      {/* Marquee Text */}
      <InfiniteMarquee
        items={['barbershop', 'school', 'consultancy']}
        speed={50}
      />

      {/* Main Content */}
      <div style={{
        padding: '2rem',
        marginTop: '70px',
        maxWidth: '1200px',
        margin: '70px auto 0',
        minHeight: 'calc(100vh - 200px)'
      }}>
        <h1 style={{ marginBottom: '1rem', textAlign: 'center', color: '#8400ff' }}>
          Component Showcase
        </h1>

        <p style={{
          textAlign: 'center',
          marginBottom: '2rem',
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '1.1rem'
        }}>
          Interactive demonstrations of all React components
        </p>

        {/* Navigation to Docs - More Prominent */}
        <div style={{
          marginBottom: '3rem',
          textAlign: 'center',
          padding: '2rem',
          background: 'rgba(132, 0, 255, 0.1)',
          border: '2px solid #8400ff',
          borderRadius: '8px'
        }}>
          <h2 style={{ color: '#8400ff', marginBottom: '1rem' }}>
            🎯 View Live Component Demos
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1.5rem' }}>
            Each component includes interactive demonstrations with full implementation instructions
          </p>
          <Button
            variant="primary"
            onClick={() => setCurrentPage('docs')}
            size="large"
            style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}
          >
            📚 View All Component Demos →
          </Button>
        </div>

        {/* Quick Demo Section */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: '#8400ff', marginBottom: '1rem' }}>Quick Demos</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              Open Modal Demo
            </Button>
            <Button variant="secondary" onClick={() => setShowFadeOverlay(true)}>
              Show Fade Overlay
            </Button>
            <Button variant="outline" onClick={() => setShowSplash(true)}>
              Show Splash Screen
            </Button>
          </div>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>
            Try the buttons above, or click "View All Component Demos" to see interactive demonstrations for each component.
          </p>
        </section>

        {/* Splash Screen */}
        {showSplash && (
          <SplashScreen
            videoSrc="/assets/videos/wworkshopstudio_SPLASH.mp4"
            onComplete={() => setShowSplash(false)}
            useSessionStorage={false}
            maxWaitTime={2000}
          />
        )}

        {/* Fade Overlay */}
        {showFadeOverlay && (
          <FadeOverlay
            message="Welcome to the Demo"
            duration={1500}
            fadeOutDuration={700}
            onComplete={() => setShowFadeOverlay(false)}
          />
        )}

        {/* Buttons */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: '#8400ff', marginBottom: '1rem' }}>Button Variants</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </section>

        {/* Service Cards */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: '#8400ff', marginBottom: '1rem' }}>Service Cards</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                onClick={() => console.log('Service clicked:', service.title)}
              />
            ))}
          </div>
        </section>

        {/* Product Cards */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: '#8400ff', marginBottom: '1rem' }}>Product Cards</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={handleProductClick}
              />
            ))}
          </div>
        </section>

        {/* Quantity Picker */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: '#8400ff', marginBottom: '1rem' }}>Quantity Picker</h2>
          <QuantityPicker
            value={quantity}
            onChange={setQuantity}
            min={1}
            max={10}
          />
        </section>

        {/* Search Bar */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: '#8400ff', marginBottom: '1rem' }}>Search Bar</h2>
          <SearchBar
            placeholder="Search products..."
            onSearch={handleSearch}
          />
        </section>

        {/* Calendar */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: '#8400ff', marginBottom: '1rem' }}>Calendar</h2>
          <Calendar
            onDateSelect={(date) => {
              setSelectedDate(date)
              console.log('Selected date:', date)
            }}
            onMonthChange={(month, year) => console.log('Month changed:', month, year)}
            appointments={[]}
            selectedDate={selectedDate}
          />
        </section>

        {/* Carousel */}
        <section style={{ marginBottom: '3rem', height: '400px' }}>
          <h2 style={{ color: '#8400ff', marginBottom: '1rem' }}>Carousel</h2>
          <div style={{ height: '300px', position: 'relative' }}>
            <Carousel
              slides={carouselSlides}
              autoPlay={true}
              autoPlayInterval={5000}
            />
          </div>
        </section>
      </div>

      {/* Shopping Cart */}
      <ShoppingCart
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Product Modal */}
      <ProductModal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
      />

      {/* Generic Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Example Modal"
        size="medium"
      >
        <p>This is a modal example. You can put any content here.</p>
        <div style={{ marginTop: '1rem' }}>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </div>
      </Modal>

      {/* Background Video - Note: requires thumbnail element with class "thumbnail" */}
      <BackgroundVideo
        videoSrc="/assets/videos/barberpole.mp4"
        opacity={0.2}
      />
    </div>
  )
}

export default App
