import React, { useState } from 'react';
import './FormInput.css';

const FormInput = ({
  type = 'text',
  label,
  name,
  value,
  placeholder,
  required = false,
  error,
  helperText,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  className = '',
  icon,
  iconPosition = 'left'
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const handleChange = (e) => {
    if (onChange) onChange(e);
  };

  return (
    <div className={`form-input-wrapper ${className} ${error ? 'has-error' : ''} ${isFocused ? 'is-focused' : ''} ${disabled ? 'is-disabled' : ''}`}>
      {label && (
        <label htmlFor={name} className="form-input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <div className={`form-input-container ${icon ? `has-icon icon-${iconPosition}` : ''}`}>
        {icon && iconPosition === 'left' && (
          <span className="form-input-icon form-input-icon-left">{icon}</span>
        )}
        <input
          type={type}
          id={name}
          name={name}
          value={value || ''}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="form-input"
        />
        {icon && iconPosition === 'right' && (
          <span className="form-input-icon form-input-icon-right">{icon}</span>
        )}
      </div>
      {error && <span className="form-input-error">{error}</span>}
      {helperText && !error && (
        <span className="form-input-helper">{helperText}</span>
      )}
    </div>
  );
};

export default FormInput;

