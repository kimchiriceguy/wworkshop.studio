import { useState } from 'react'
import DocPage from './DocPage'
import { FormInput } from '../../components'
import '../../components/FormInput/FormInput.css'

const FormInputDoc = ({ onBack }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  return (
    <DocPage
      title="FormInput Component"
      onBack={onBack}
      overview="The FormInput component provides a styled, accessible form input with support for labels, validation, icons, and helper text. Perfect for building forms with consistent styling."
      demo={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
          <FormInput
            type="text"
            label="Email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            helperText="We'll never share your email"
          />
          <FormInput
            type="password"
            label="Password"
            name="password"
            value={password}
            placeholder="Enter your password"
            required
            onChange={(e) => setPassword(e.target.value)}
            error={error}
          />
          <FormInput
            type="text"
            label="With Icon"
            name="search"
            placeholder="Search..."
            icon="🔍"
            iconPosition="left"
          />
        </div>
      }
      instructions={[
        {
          title: 'Step 1: Import the Component',
          code: `import { FormInput } from './components';
import './components/FormInput/FormInput.css';`
        },
        {
          title: 'Step 2: Use the Component',
          code: `const [value, setValue] = useState('');

<FormInput
  type="text"
  label="Name"
  name="name"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Enter your name"
  required
/>`
        }
      ]}
      props={[
        { name: 'type', type: 'string', default: "'text'", description: 'Input type (text, email, password, etc.)' },
        { name: 'label', type: 'string', default: '-', description: 'Label text for the input' },
        { name: 'name', type: 'string', default: '-', description: 'Input name attribute' },
        { name: 'value', type: 'string', default: '-', description: 'Input value (controlled)' },
        { name: 'placeholder', type: 'string', default: '-', description: 'Placeholder text' },
        { name: 'required', type: 'boolean', default: 'false', description: 'Whether input is required' },
        { name: 'error', type: 'string', default: '-', description: 'Error message to display' },
        { name: 'helperText', type: 'string', default: '-', description: 'Helper text below input' },
        { name: 'onChange', type: 'function', default: '-', description: 'Change handler: (e) => void' },
        { name: 'onBlur', type: 'function', default: '-', description: 'Blur handler: (e) => void' },
        { name: 'onFocus', type: 'function', default: '-', description: 'Focus handler: (e) => void' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the input' },
        { name: 'icon', type: 'ReactNode', default: '-', description: 'Icon element to display' },
        { name: 'iconPosition', type: 'string', default: "'left'", description: "Icon position: 'left' or 'right'" },
        { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' }
      ]}
      examples={[
        {
          code: `import { useState } from 'react';
import { FormInput } from './components';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form>
      <FormInput
        type="email"
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />
      <FormInput
        type="password"
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
      />
    </form>
  );
}`
        }
      ]}
      notes={[
        'FormInput is a controlled component - use value and onChange',
        'Error and helperText are mutually exclusive',
        'Icons can be positioned on left or right',
        'Input automatically shows focus and error states'
      ]}
    />
  )
}

export default FormInputDoc

