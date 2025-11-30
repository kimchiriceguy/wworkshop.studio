import { useState } from 'react'
import DocPage from './DocPage'
import { Dropdown } from '../../components'
import '../../components/Dropdown/Dropdown.css'

const DropdownDoc = ({ onBack }) => {
  const [selected, setSelected] = useState('')
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]

  return (
    <DocPage
      title="Dropdown Component"
      onBack={onBack}
      overview="The Dropdown component provides a customizable select dropdown with search functionality, keyboard navigation, and styling options. Perfect for forms and selection interfaces."
      demo={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
          <Dropdown
            label="Select an option"
            options={options}
            value={selected}
            onChange={setSelected}
            placeholder="Choose..."
          />
          <Dropdown
            label="Searchable Dropdown"
            options={options}
            searchable={true}
            placeholder="Search and select..."
          />
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>
            Selected: {selected || 'None'}
          </p>
        </div>
      }
      instructions={[
        {
          title: 'Step 1: Import the Component',
          code: `import { Dropdown } from './components';
import './components/Dropdown/Dropdown.css';`
        },
        {
          title: 'Step 2: Use the Component',
          code: `const options = [
  { value: 'opt1', label: 'Option 1' },
  { value: 'opt2', label: 'Option 2' }
];

<Dropdown
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="Select..."
/>`
        }
      ]}
      props={[
        { name: 'options', type: 'array', default: '[]', description: 'Array of options: [{value, label}] or string[]' },
        { name: 'value', type: 'any', default: '-', description: 'Selected value (controlled)' },
        { name: 'onChange', type: 'function', default: '-', description: 'Change handler: (value) => void' },
        { name: 'placeholder', type: 'string', default: "'Select an option...'", description: 'Placeholder text' },
        { name: 'label', type: 'string', default: '-', description: 'Label text' },
        { name: 'error', type: 'string', default: '-', description: 'Error message' },
        { name: 'helperText', type: 'string', default: '-', description: 'Helper text' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the dropdown' },
        { name: 'searchable', type: 'boolean', default: 'false', description: 'Enable search functionality' },
        { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' }
      ]}
      examples={[
        {
          code: `import { useState } from 'react';
import { Dropdown } from './components';

function Form() {
  const [country, setCountry] = useState('');
  
  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' }
  ];

  return (
    <Dropdown
      label="Country"
      options={countries}
      value={country}
      onChange={setCountry}
      searchable={true}
      placeholder="Select country..."
    />
  );
}`
        }
      ]}
      notes={[
        'Options can be objects with value/label or simple strings',
        'Dropdown closes when clicking outside',
        'Searchable mode filters options as you type',
        'Selected option is highlighted in the dropdown'
      ]}
    />
  )
}

export default DropdownDoc

