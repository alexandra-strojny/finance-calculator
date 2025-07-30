import { useState, useRef } from 'react';

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  className?: string;
}

export const CurrencyInput = ({ value, onChange, placeholder, className = "" }: CurrencyInputProps) => {
  const [displayValue, setDisplayValue] = useState(value === 0 ? '' : value.toString());
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatCurrency = (num: number): string => {
    if (num === 0) return '';
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Show raw number when focused for easy editing
    setDisplayValue(value === 0 ? '' : value.toString());
    // Select all text for easy replacement
    setTimeout(() => {
      inputRef.current?.select();
    }, 0);
  };

  const handleBlur = () => {
    setIsFocused(false);
    const numericValue = parseFloat(displayValue) || 0;
    onChange(numericValue);
    // Format for display when not focused
    setDisplayValue(formatCurrency(numericValue));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Allow empty string, negative sign, numbers, and one decimal point
    if (inputValue === '' || /^-?\d*\.?\d*$/.test(inputValue)) {
      setDisplayValue(inputValue);
      
      // Update the value in real-time if it's a valid number
      const numericValue = parseFloat(inputValue) || 0;
      onChange(numericValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent scroll wheel from changing the value
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    // Prevent scroll from changing the value
    e.currentTarget.blur();
  };

  return (
    <div className="relative">
      {!isFocused && value !== 0 && (
        <span className={`absolute top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none ${
          value < 0 ? 'left-3' : 'left-3'
        }`}>
          $
        </span>
      )}
      <input
        ref={inputRef}
        type="text"
        inputMode="decimal"
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
        placeholder={placeholder}
        className={`border border-gray-300 rounded-lg p-2 flex-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
          !isFocused && value !== 0 ? 'pl-8' : ''
        } ${className}`}
      />
    </div>
  );
};
