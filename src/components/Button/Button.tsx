import React from 'react';

interface ButtonProps {
    
  text: string;
  onClick?: () => void;
  isDisabled?: boolean;
  type?: 'button' | 'submit' | 'reset'; // Type of button (default: 'button')
  variant?: 'primary' | 'secondary' | 'outline'; // Style variant
  size?: 'small' | 'medium' | 'large'; // Button size
  label?: string; // Label for accessibility
  className?: string; // Additional class names
  icon?: React.JSX.Element;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  isDisabled,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  label,
  className = '',
}) => {
  // Conditional styling based on variant and size
  const variantStyles = {
    primary: 'bg-[#6a3aba] hover:bg-[#5b319c]',
    secondary: 'bg-[#4a4e69] hover:bg-[#2c2f44]',
    outline: 'border-2 border-[#6a3aba] bg-transparent text-[#6a3aba] hover:bg-[#1a1c26]',
  };

  const sizeStyles = {
    small: 'py-1 px-4 text-sm',
    medium: 'py-2 px-6 text-base',
    large: 'py-3 px-8 text-lg',
  };

  return (
    <button
      type={type}
      className={`w-full rounded-md text-white transition duration-300 ${variantStyles[variant]} ${sizeStyles[size]} ${isDisabled ? 'bg-gray-400 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={isDisabled}
      aria-label={label}
    >
      {text}
    </button>
  );
};

export default Button;
