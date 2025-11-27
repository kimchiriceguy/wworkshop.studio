# Component Showcase - test_env

This is a Vite + React project that demonstrates all the reusable components from the wworkshop.studio project.

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
test_env/
├── components/          # All reusable React components
│   ├── Header/
│   ├── SplashScreen/
│   ├── MarqueeText/
│   ├── Carousel/
│   ├── Modal/
│   ├── ProductCard/
│   ├── ProductModal/
│   ├── ShoppingCart/
│   ├── Calendar/
│   ├── ServiceCard/
│   ├── SearchBar/
│   ├── QuantityPicker/
│   ├── Button/
│   ├── FadeOverlay/
│   └── BackgroundVideo/
├── samples/             # HTML documentation pages
│   ├── index.html       # Main documentation index
│   └── *.html          # Individual component docs
└── src/
    ├── App.jsx         # Main showcase application
    ├── main.jsx        # Entry point
    └── index.css       # Global styles
```

## Features

The showcase app demonstrates:

- **Header** - Navigation with logo, menu, social links, and search
- **SplashScreen** - Video splash screen
- **MarqueeText** - Scrolling text banner
- **Carousel** - Image/content carousel
- **Modal** - Reusable modal dialogs
- **ProductCard** - Product display cards
- **ProductModal** - Product detail modals
- **ShoppingCart** - Shopping cart with checkout
- **Calendar** - Date selection calendar
- **ServiceCard** - Service display cards
- **SearchBar** - Search input component
- **QuantityPicker** - Quantity selector
- **Button** - Reusable buttons with variants
- **FadeOverlay** - Welcome/loading overlays
- **BackgroundVideo** - Background video on hover

## Viewing Documentation

The HTML documentation pages are available in the `samples/` folder. You can:

1. Open them directly in a browser
2. Serve them through the Vite dev server (they should be accessible at `/samples/index.html`)
3. Use them as reference for component implementation

## Using Components

Import components in your React files:

```jsx
import { Header, Button, Modal } from '../components'
import '../components/Header/Header.css'
import '../components/Button/Button.css'
import '../components/Modal/Modal.css'
```

## Notes

- All components use the "Inconsolata" font family
- Components follow a dark theme with purple (#8400ff) accents
- Each component is self-contained with its own CSS file
- Components are fully reusable and customizable via props
