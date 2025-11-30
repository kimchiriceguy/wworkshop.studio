import DocPage from './DocPage'
import { SearchBar } from '../../components'
import '../../components/SearchBar/SearchBar.css'

const SearchBarDoc = ({ onBack }) => {
  return (
    <DocPage
      title="SearchBar Component"
      onBack={onBack}
      overview="The SearchBar component provides a search input field with a submit button. It's perfect for product searches, content filtering, or any search functionality in your application."
      demo={
        <div>
          <SearchBar
            placeholder="Try searching for something..."
            onSearch={(value) => alert(`Searching for: ${value}`)}
          />
          <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
            Type something and press Enter or click the search button.
          </p>
        </div>
      }
      instructions={[
        {
          title: 'Step 1: Import the Component',
          code: `import { SearchBar } from './components';
import './components/SearchBar/SearchBar.css';`
        },
        {
          title: 'Step 2: Use the Component',
          code: `function SearchPage() {
  const handleSearch = (searchValue) => {
    console.log('Searching for:', searchValue);
    // Implement search logic
  };

  return (
    <SearchBar
      placeholder="Search products..."
      onSearch={handleSearch}
    />
  );
}`
        }
      ]}
      props={[
        { name: 'placeholder', type: 'string', default: '"Search..."', description: 'Placeholder text for search input' },
        { name: 'onSearch', type: 'function', default: '-', description: 'Callback when search is submitted: (searchValue) => void' },
        { name: 'className', type: 'string', default: '\'\'', description: 'Additional CSS classes' }
      ]}
      examples={[
        {
          code: `import React, { useState } from 'react';
import { SearchBar } from './components';

function ProductSearch() {
  const [searchResults, setSearchResults] = useState([]);
  const [products] = useState([
    { id: 1, name: 'Product A', category: 'Hair' },
    { id: 2, name: 'Product B', category: 'Beard' }
  ]);

  const handleSearch = (searchValue) => {
    if (!searchValue.trim()) {
      setSearchResults([]);
      return;
    }

    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      product.category.toLowerCase().includes(searchValue.toLowerCase())
    );
    
    setSearchResults(results);
  };

  return (
    <div>
      <SearchBar
        placeholder="Search products..."
        onSearch={handleSearch}
      />
      <div className="search-results">
        {searchResults.map(product => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div>
    </div>
  );
}

export default ProductSearch;`
        }
      ]}
      notes={[
        'Search is triggered on form submit (Enter key or button click)',
        'Input value is passed to onSearch callback',
        'Search icon is included in the button',
        'Component is fully accessible with proper form semantics',
        'Styling matches the dark theme with purple accent on focus'
      ]}
    />
  )
}

export default SearchBarDoc

