# Reusable React Components
<!-- THANKS SHANE!!!! -->

This directory contains universally reusable React JSX components extracted from the wworkshop.studio project.

## Components

### Header
Navigation header with logo, menu items, social media links, login status, and search functionality.

**Props:**
- `logoUrl` - URL to logo image
- `logoAlt` - Alt text for logo
- `navItems` - Array of navigation items `[{label, href, active, onClick}]`
- `socialLinks` - Array of social links `[{url, icon, title}]`
- `loginStatus` - Login status object `{isLoggedIn, username, accountLink, loginLink, onLogout}`
- `onSearch` - Search callback function
- `searchPlaceholder` - Search input placeholder

### SplashScreen
Video splash screen that shows once per session.

**Props:**
- `videoSrc` - Path to splash video
- `onComplete` - Callback when splash completes
- `fadeOutDuration` - Fade out animation duration (ms)
- `maxWaitTime` - Maximum wait time if video doesn't play (ms)
- `useSessionStorage` - Whether to use session storage to remember shown state

### MarqueeText
Scrolling marquee text component.

**Props:**
- `items` - Array of text items to scroll
- `speed` - Animation speed in seconds
- `onClickable` - Whether items are clickable
- `onItemClick` - Callback when item is clicked

### Carousel
Image/content carousel with thumbnails and auto-play.

**Props:**
- `slides` - Array of slide objects `[{content, thumbnail, thumbnailLink, thumbnailAlt}]`
- `autoPlay` - Enable auto-play
- `autoPlayInterval` - Auto-play interval (ms)
- `transitionDuration` - Transition duration (ms)
- `onSlideChange` - Callback when slide changes

### Modal
Reusable modal component for various use cases.

**Props:**
- `isOpen` - Whether modal is open
- `onClose` - Close callback
- `children` - Modal content
- `title` - Modal title
- `showCloseButton` - Show close button
- `closeOnBackdropClick` - Close on backdrop click
- `className` - Additional CSS classes
- `size` - Modal size: 'small', 'medium', 'large', 'fullscreen'

### ProductCard
Product card component for displaying products.

**Props:**
- `product` - Product object `{id, name, price, image, description, images, types}`
- `onClick` - Click callback
- `className` - Additional CSS classes

### ProductModal
Modal for displaying product details with image gallery, type selection, and add to cart.

**Props:**
- `isOpen` - Whether modal is open
- `onClose` - Close callback
- `product` - Product object
- `onAddToCart` - Add to cart callback

### ShoppingCart
Shopping cart component with cart icon, modal, and checkout form.

**Props:**
- `cart` - Array of cart items
- `onUpdateQuantity` - Update quantity callback `(itemId, newQuantity)`
- `onRemoveItem` - Remove item callback `(itemId)`
- `onCheckout` - Checkout callback `({cart, proofFile, totalAmount})`
- `cartIcon` - Custom cart icon element
- `showCartIcon` - Show cart icon

### Calendar
Calendar component for date selection and appointment booking.

**Props:**
- `onDateSelect` - Date selection callback `(dateString)`
- `onMonthChange` - Month change callback `(month, year)`
- `appointments` - Array of appointments `[{date}]`
- `selectedDate` - Currently selected date string
- `minDate` - Minimum selectable date
- `maxDate` - Maximum selectable date

### ServiceCard
Service card component for displaying services.

**Props:**
- `title` - Service title
- `description` - Service description
- `onClick` - Click callback
- `className` - Additional CSS classes

### SearchBar
Search input with button.

**Props:**
- `placeholder` - Input placeholder
- `onSearch` - Search callback `(searchValue)`
- `className` - Additional CSS classes

### QuantityPicker
Quantity selector with increment/decrement buttons.

**Props:**
- `value` - Current quantity value
- `onChange` - Change callback `(newValue)`
- `min` - Minimum value
- `max` - Maximum value
- `className` - Additional CSS classes

### Button
Reusable button component with variants and sizes.

**Props:**
- `children` - Button content
- `onClick` - Click handler
- `variant` - Button variant: 'primary', 'secondary', 'outline', 'ghost'
- `size` - Button size: 'small', 'medium', 'large'
- `disabled` - Disabled state
- `type` - Button type
- `className` - Additional CSS classes

### FadeOverlay
Fade-in/fade-out overlay for welcome messages or loading states.

**Props:**
- `message` - Overlay message text
- `duration` - Display duration before fade out (ms)
- `fadeOutDuration` - Fade out animation duration (ms)
- `onComplete` - Completion callback
- `className` - Additional CSS classes

### BackgroundVideo
Background video that plays on hover.

**Props:**
- `videoSrc` - Path to video file
- `opacity` - Opacity when playing (0-1)
- `onHover` - Hover callback `(isHovering)`
- `autoplay` - Auto-play video
- `loop` - Loop video
- `muted` - Mute video
- `playsInline` - Play inline on mobile
- `className` - Additional CSS classes

## Usage Example

```jsx
import { Header, SplashScreen, Carousel, ProductCard } from './components';

function App() {
  return (
    <>
      <SplashScreen 
        videoSrc="/assets/videos/splash.mp4"
        onComplete={() => console.log('Splash complete')}
      />
      <Header
        logoUrl="/assets/logos/logo.png"
        navItems={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' }
        ]}
        socialLinks={[
          { url: 'https://facebook.com', icon: '/icons/facebook.svg', title: 'Facebook' }
        ]}
      />
      <Carousel slides={[...]} />
    </>
  );
}
```

## Styling

All components include their own CSS files. The components use:
- Font: "Inconsolata" monospace (Google Fonts)
- Primary color: #8400ff (purple)
- Dark theme with rgba backgrounds
- Responsive design

## Dependencies

- React (with hooks)
- No external dependencies required

