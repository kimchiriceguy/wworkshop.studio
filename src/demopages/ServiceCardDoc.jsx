import DocPage from './DocPage'
import { ServiceCard } from '../../components'
import '../../components/ServiceCard/ServiceCard.css'

const ServiceCardDoc = ({ onBack }) => {
  const services = [
    { title: 'Barbershop', description: 'Cut. Style. Fade.' },
    { title: 'School', description: 'Learn the craft.' },
    { title: 'Consultancy', description: 'Grow your business.' }
  ]

  return (
    <DocPage
      title="ServiceCard Component"
      onBack={onBack}
      overview="The ServiceCard component displays service information in a card format. It's perfect for showcasing different services, features, or offerings with a clean, clickable design."
      demo={
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              onClick={() => alert(`Clicked: ${service.title}`)}
            />
          ))}
        </div>
      }
      instructions={[
        {
          title: 'Step 1: Import the Component',
          code: `import { ServiceCard } from './components';
import './components/ServiceCard/ServiceCard.css';`
        },
        {
          title: 'Step 2: Use the Component',
          code: `function ServicesPage() {
  const handleServiceClick = (service) => {
    console.log('Service clicked:', service);
    // Navigate to booking or service details
  };

  return (
    <div className="services-grid">
      <ServiceCard
        title="Barbershop"
        description="Cut. Style. Fade."
        onClick={() => handleServiceClick('barbershop')}
      />
      <ServiceCard
        title="School"
        description="Learn the craft."
        onClick={() => handleServiceClick('school')}
      />
    </div>
  );
}`
        }
      ]}
      props={[
        { name: 'title', type: 'string', default: '-', description: 'Service title/name' },
        { name: 'description', type: 'string', default: '-', description: 'Service description text' },
        { name: 'onClick', type: 'function', default: '-', description: 'Callback when card is clicked: () => void' },
        { name: 'className', type: 'string', default: '\'\'', description: 'Additional CSS classes' }
      ]}
      examples={[
        {
          code: `import React from 'react';
import { ServiceCard } from './components';
import { useNavigate } from 'react-router-dom';

function ServicesPage() {
  const navigate = useNavigate();

  const services = [
    {
      title: 'Barbershop',
      description: 'Cut. Style. Fade.',
      route: '/calendar'
    },
    {
      title: 'School',
      description: 'Learn the craft.',
      route: '/calendar'
    },
    {
      title: 'Consultancy',
      description: 'Grow your business.',
      route: '/calendar'
    }
  ];

  return (
    <div className="services-container">
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          title={service.title}
          description={service.description}
          onClick={() => navigate(service.route)}
        />
      ))}
    </div>
  );
}

export default ServicesPage;`
        }
      ]}
      notes={[
        'Card has hover effects that lift and highlight on mouse over',
        'Perfect for grid layouts with multiple services',
        'Click handler can be used for navigation or opening modals',
        'Card is fully responsive and works on all screen sizes',
        'Styling matches the overall dark theme with purple accents'
      ]}
    />
  )
}

export default ServiceCardDoc

