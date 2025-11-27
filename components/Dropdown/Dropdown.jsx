import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

const Dropdown = ({
  options = [],
  value,
  placeholder = 'Select an option...',
  onChange,
  label,
  error,
  helperText,
  disabled = false,
  className = '',
  searchable = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = searchable && searchTerm
    ? options.filter(option =>
      (option.label || option).toLowerCase().includes(searchTerm.toLowerCase())
    )
    : options;

  const selectedOption = options.find(opt => {
    const optValue = typeof opt === 'object' ? opt.value : opt;
    return optValue === value;
  });

  const displayValue = selectedOption
    ? (typeof selectedOption === 'object' ? selectedOption.label : selectedOption)
    : placeholder;

  const handleSelect = (option) => {
    const optionValue = typeof option === 'object' ? option.value : option;
    if (onChange) onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className={`dropdown-wrapper ${className} ${error ? 'has-error' : ''} ${disabled ? 'is-disabled' : ''}`} ref={dropdownRef}>
      {label && (
        <label className="dropdown-label">
          {label}
        </label>
      )}
      <div className="dropdown-container">
        <button
          type="button"
          className={`dropdown-button ${isOpen ? 'is-open' : ''}`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <span className="dropdown-value">{displayValue}</span>
          <span className="dropdown-arrow">▼</span>
        </button>
        {isOpen && (
          <div className="dropdown-menu">
            {searchable && (
              <div className="dropdown-search">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="dropdown-search-input"
                  autoFocus
                />
              </div>
            )}
            <div className="dropdown-options">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => {
                  const optValue = typeof option === 'object' ? option.value : option;
                  const optLabel = typeof option === 'object' ? option.label : option;
                  const isSelected = optValue === value;

                  return (
                    <div
                      key={index}
                      className={`dropdown-option ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => handleSelect(option)}
                    >
                      {optLabel}
                    </div>
                  );
                })
              ) : (
                <div className="dropdown-no-options">No options found</div>
              )}
            </div>
          </div>
        )}
      </div>
      {error && <span className="dropdown-error">{error}</span>}
      {helperText && !error && (
        <span className="dropdown-helper">{helperText}</span>
      )}
    </div>
  );
};

export default Dropdown;

