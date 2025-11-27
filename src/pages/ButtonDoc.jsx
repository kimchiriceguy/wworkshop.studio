import DocPage from './DocPage'
import { Button } from '../../components'
import '../../components/Button/Button.css'

const ButtonDoc = ({ onBack }) => {
  return (
    <DocPage
      title="Button Component"
      onBack={onBack}
      overview="The Button component provides a consistent, reusable button with multiple variants and sizes. It's perfect for actions, forms, and navigation throughout your application."
      demo={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
          <div>
            <h3 style={{ color: '#8400ff', marginBottom: '1rem' }}>All Variants</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button variant="primary" onClick={() => alert('Primary clicked!')}>Primary</Button>
              <Button variant="secondary" onClick={() => alert('Secondary clicked!')}>Secondary</Button>
              <Button variant="outline" onClick={() => alert('Outline clicked!')}>Outline</Button>
              <Button variant="ghost" onClick={() => alert('Ghost clicked!')}>Ghost</Button>
            </div>
          </div>
          <div>
            <h3 style={{ color: '#8400ff', marginBottom: '1rem' }}>All Sizes</h3>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <Button size="small">Small</Button>
              <Button size="medium">Medium</Button>
              <Button size="large">Large</Button>
            </div>
          </div>
          <div>
            <h3 style={{ color: '#8400ff', marginBottom: '1rem' }}>Disabled State</h3>
            <Button variant="primary" disabled>Disabled Button</Button>
          </div>
        </div>
      }
      instructions={[
        {
          title: 'Step 1: Import the Component',
          code: `import { Button } from './components';
import './components/Button/Button.css';`
        },
        {
          title: 'Step 2: Use the Component',
          code: `function App() {
  return (
    <>
      <Button variant="primary" size="medium" onClick={() => alert('Clicked!')}>
        Click Me
      </Button>
    </>
  );
}`
        }
      ]}
      props={[
        { name: 'children', type: 'ReactNode', default: '-', description: 'Button content/text' },
        { name: 'onClick', type: 'function', default: '-', description: 'Click handler function' },
        { name: 'variant', type: 'string', default: '\'primary\'', description: 'Button style: \'primary\', \'secondary\', \'outline\', \'ghost\'' },
        { name: 'size', type: 'string', default: '\'medium\'', description: 'Button size: \'small\', \'medium\', \'large\'' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the button' },
        { name: 'type', type: 'string', default: '\'button\'', description: 'Button type: \'button\', \'submit\', \'reset\'' },
        { name: 'className', type: 'string', default: '\'\'', description: 'Additional CSS classes' }
      ]}
      examples={[
        {
          title: 'All Variants',
          code: `function ButtonShowcase() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}`
        },
        {
          title: 'All Sizes',
          code: `function SizeShowcase() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  );
}`
        },
        {
          title: 'Form Button',
          code: `function FormExample() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" />
      <Button type="submit" variant="primary">
        Submit
      </Button>
    </form>
  );
}`
        }
      ]}
      notes={[
        'Primary: Purple background, white text - for main actions',
        'Secondary: Transparent with border - for secondary actions',
        'Outline: Purple border, transparent background - for less emphasis',
        'Ghost: No border, transparent - for subtle actions',
        'All variants have hover effects',
        'Disabled buttons are visually distinct and non-interactive',
        'Buttons work as form submit buttons when type="submit"'
      ]}
    />
  )
}

export default ButtonDoc

