import DocPage from './DocPage'
import { Card } from '../../components'
import '../../components/Card/Card.css'

const CardDoc = ({ onBack }) => {
  return (
    <DocPage
      title="Card Component"
      onBack={onBack}
      overview="The Card component is a generic, reusable content card that can display text, images, headers, and footers. It's perfect for displaying any type of content in a consistent card format."
      demo={
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <Card
            title="Basic Card"
            description="A simple card with title and description"
            image="/vite.svg"
            imageAlt="Demo image"
          />
          <Card
            title="Card with Footer"
            description="This card includes a footer section"
            image="/vite.svg"
            footer={<span style={{ color: '#8400ff' }}>Footer content</span>}
          />
          <Card
            title="Card with Header"
            description="This card includes a header section"
            header={<span style={{ color: '#00ff00' }}>Header</span>}
            image="/vite.svg"
          />
        </div>
      }
      instructions={[
        {
          title: 'Step 1: Import the Component',
          code: `import { Card } from './components';
import './components/Card/Card.css';`
        },
        {
          title: 'Step 2: Use the Component',
          code: `<Card
  title="Card Title"
  description="Card description text"
  image="/path/to/image.jpg"
  imageAlt="Image description"
/>`
        }
      ]}
      props={[
        { name: 'title', type: 'string', default: '-', description: 'Card title text' },
        { name: 'description', type: 'string', default: '-', description: 'Card description text' },
        { name: 'image', type: 'string', default: '-', description: 'URL to the card image' },
        { name: 'imageAlt', type: 'string', default: "''", description: 'Alt text for the image' },
        { name: 'onClick', type: 'function', default: '-', description: 'Click handler: () => void' },
        { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' },
        { name: 'header', type: 'ReactNode', default: '-', description: 'Custom header content' },
        { name: 'footer', type: 'ReactNode', default: '-', description: 'Custom footer content' }
      ]}
      examples={[
        {
          code: `import { Card } from './components';

function App() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
      <Card
        title="Product Name"
        description="Product description here"
        image="/product.jpg"
        onClick={() => console.log('Card clicked')}
      />
      <Card
        title="Service"
        description="Service description"
        image="/service.jpg"
        footer={<button>Learn More</button>}
      />
    </div>
  );
}`
        }
      ]}
      notes={[
        'Card is fully customizable with optional header and footer sections',
        'Image is optional - card will work without it',
        'Card has hover effects and is clickable if onClick is provided',
        'All styling is self-contained in Card.css'
      ]}
    />
  )
}

export default CardDoc

