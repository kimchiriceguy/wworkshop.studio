import DocPage from './DocPage'
import { StoreCard } from '../../components'
import '../../components/StoreCard/StoreCard.css'

const StoreCardDoc = ({ onBack }) => {
  const stores = [
    {
      id: 1,
      name: 'Downtown Location',
      image: '/vite.svg',
      address: '123 Main St, City',
      phone: '(555) 123-4567',
      hours: 'Mon-Sat: 9AM-6PM',
      rating: 4.8,
      description: 'Our flagship location in the heart of downtown.'
    },
    {
      id: 2,
      name: 'Mall Location',
      image: '/vite.svg',
      address: '456 Mall Ave, City',
      phone: '(555) 987-6543',
      hours: 'Mon-Sun: 10AM-8PM',
      rating: 4.5
    }
  ]

  return (
    <DocPage
      title="StoreCard Component"
      onBack={onBack}
      overview="The StoreCard component displays store information including name, address, phone, hours, rating, and description. Perfect for showcasing multiple store locations."
      demo={
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {stores.map(store => (
            <StoreCard
              key={store.id}
              store={store}
              onClick={(data) => alert(`Selected: ${data.name}`)}
            />
          ))}
        </div>
      }
      instructions={[
        {
          title: 'Step 1: Import the Component',
          code: `import { StoreCard } from './components';
import './components/StoreCard/StoreCard.css';`
        },
        {
          title: 'Step 2: Use the Component',
          code: `const store = {
  id: 1,
  name: 'Store Name',
  image: '/store.jpg',
  address: '123 Main St',
  phone: '(555) 123-4567',
  hours: 'Mon-Sat: 9AM-6PM',
  rating: 4.8,
  description: 'Store description'
};

<StoreCard
  store={store}
  onClick={(data) => console.log('Store selected:', data)}
/>`
        }
      ]}
      props={[
        { name: 'store', type: 'object', default: '-', description: 'Store object: {id, name, image?, address?, phone?, hours?, rating?, description?}' },
        { name: 'onClick', type: 'function', default: '-', description: 'Click handler: (storeData) => void' },
        { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' }
      ]}
      examples={[
        {
          code: `import { StoreCard } from './components';

function StoreLocations() {
  const stores = [
    {
      id: 1,
      name: 'Downtown',
      address: '123 Main St',
      phone: '(555) 123-4567',
      hours: 'Mon-Sat: 9AM-6PM',
      rating: 4.8
    }
  ];

  return (
    <div>
      {stores.map(store => (
        <StoreCard
          key={store.id}
          store={store}
          onClick={(data) => navigateToStore(data.id)}
        />
      ))}
    </div>
  );
}`
        }
      ]}
      notes={[
        'All store properties are optional except id and name',
        'Rating is displayed with a star icon',
        'Card includes hover effects and is clickable',
        'Image is optional - card will display without it'
      ]}
    />
  )
}

export default StoreCardDoc

