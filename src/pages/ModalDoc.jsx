import { useState } from 'react'
import DocPage from './DocPage'
import { Modal, Button } from '../../components'
import '../../components/Modal/Modal.css'
import '../../components/Button/Button.css'

const ModalDoc = ({ onBack }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSmallOpen, setIsSmallOpen] = useState(false)
  const [isLargeOpen, setIsLargeOpen] = useState(false)

  return (
    <>
      <DocPage
        title="Modal Component"
        onBack={onBack}
        overview="The Modal component is a reusable, flexible modal dialog that can be used for various purposes: confirmations, forms, content display, and more. It includes keyboard support (ESC to close), backdrop click handling, and multiple size options."
        demo={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <h3 style={{ color: '#8400ff', marginBottom: '1rem' }}>Try Opening Modals</h3>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Button variant="primary" onClick={() => setIsOpen(true)}>Open Medium Modal</Button>
                <Button variant="secondary" onClick={() => setIsSmallOpen(true)}>Open Small Modal</Button>
                <Button variant="outline" onClick={() => setIsLargeOpen(true)}>Open Large Modal</Button>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
              Click the buttons above to see different modal sizes in action. Press ESC or click outside to close.
            </p>
          </div>
        }
      instructions={[
        {
          title: 'Step 1: Import the Component',
          code: `import { Modal } from './components';
import './components/Modal/Modal.css';`
        },
        {
          title: 'Step 2: Use the Component',
          code: `function App() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Example Modal"
        size="medium"
      >
        <p>This is modal content</p>
      </Modal>
    </>
  );
}`
        }
      ]}
      props={[
        { name: 'isOpen', type: 'boolean', default: '-', description: 'Controls whether the modal is visible' },
        { name: 'onClose', type: 'function', default: '-', description: 'Callback function to close the modal: () => void' },
        { name: 'children', type: 'ReactNode', default: '-', description: 'Content to display inside the modal' },
        { name: 'title', type: 'string', default: '-', description: 'Optional title displayed at the top of the modal' },
        { name: 'showCloseButton', type: 'boolean', default: 'true', description: 'Whether to show the X close button' },
        { name: 'closeOnBackdropClick', type: 'boolean', default: 'true', description: 'Whether clicking the backdrop closes the modal' },
        { name: 'className', type: 'string', default: '\'\'', description: 'Additional CSS classes for the modal content' },
        { name: 'size', type: 'string', default: '\'medium\'', description: 'Modal size: \'small\', \'medium\', \'large\', \'fullscreen\'' }
      ]}
      examples={[
        {
          title: 'Basic Modal',
          code: `function BasicModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Basic Modal"
      >
        <p>This is a basic modal example.</p>
      </Modal>
    </>
  );
}`
        },
        {
          title: 'Confirmation Modal',
          code: `function ConfirmModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    console.log('Confirmed!');
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Confirm Action"
      size="small"
    >
      <p>Are you sure you want to proceed?</p>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
      </div>
    </Modal>
  );
}`
        },
        {
          title: 'Form Modal',
          code: `function FormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Contact Form"
      size="medium"
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
}`
        }
      ]}
      notes={[
        'The modal automatically prevents body scrolling when open',
        'Press ESC key to close the modal (if onClose is provided)',
        'Clicking the backdrop closes the modal by default (can be disabled)',
        'Modal sizes: small (400px), medium (600px), large (900px), fullscreen (95vw/95vh)',
        'The modal includes a backdrop blur effect for better focus',
        'Custom scrollbar styling is included for better UX',
        'The close button (×) is positioned in the top-right corner',
        'All event listeners are properly cleaned up on unmount'
      ]}
      />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Medium Modal" size="medium">
        <p>This is a medium-sized modal. It's perfect for most content.</p>
        <Button variant="primary" onClick={() => setIsOpen(false)} style={{ marginTop: '1rem' }}>Close</Button>
      </Modal>
      <Modal isOpen={isSmallOpen} onClose={() => setIsSmallOpen(false)} title="Small Modal" size="small">
        <p>This is a small modal, great for confirmations.</p>
        <Button variant="primary" onClick={() => setIsSmallOpen(false)} style={{ marginTop: '1rem' }}>Close</Button>
      </Modal>
      <Modal isOpen={isLargeOpen} onClose={() => setIsLargeOpen(false)} title="Large Modal" size="large">
        <p>This is a large modal for more content.</p>
        <Button variant="primary" onClick={() => setIsLargeOpen(false)} style={{ marginTop: '1rem' }}>Close</Button>
      </Modal>
    </>
  )
}

export default ModalDoc

