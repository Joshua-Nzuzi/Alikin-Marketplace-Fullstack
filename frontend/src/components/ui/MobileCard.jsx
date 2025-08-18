import React from 'react';
import { cn } from '../../utils/cn';

const MobileCard = ({ 
  children, 
  className, 
  padding = 'default',
  shadow = 'default',
  interactive = false,
  onClick,
  ...props 
}) => {
  const paddingClasses = {
    none: '',
    small: 'p-3',
    default: 'p-4',
    large: 'p-6',
    mobile: 'p-4 md:p-6',
  };

  const shadowClasses = {
    none: '',
    small: 'shadow-mobile',
    default: 'shadow-mobile',
    large: 'shadow-mobile-lg',
    mobile: 'shadow-mobile md:shadow-mobile-lg',
  };

  const interactiveClasses = interactive
    ? 'cursor-pointer hover:shadow-mobile-lg active:scale-[0.98] transition-all duration-200'
    : '';

  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-gray-200',
        paddingClasses[padding],
        shadowClasses[shadow],
        interactiveClasses,
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

// Card Header Component
MobileCard.Header = ({ children, className, ...props }) => (
  <div className={cn('border-b border-gray-200 pb-3 mb-3', className)} {...props}>
    {children}
  </div>
);

// Card Body Component
MobileCard.Body = ({ children, className, ...props }) => (
  <div className={cn('', className)} {...props}>
    {children}
  </div>
);

// Card Footer Component
MobileCard.Footer = ({ children, className, ...props }) => (
  <div className={cn('border-t border-gray-200 pt-3 mt-3', className)} {...props}>
    {children}
  </div>
);

// Card Image Component
MobileCard.Image = ({ src, alt, className, ...props }) => (
  <div className={cn('relative overflow-hidden rounded-t-lg', className)} {...props}>
    <img
      src={src}
      alt={alt}
      className="w-full h-48 object-cover"
      loading="lazy"
    />
  </div>
);

// Card Badge Component
MobileCard.Badge = ({ children, variant = 'default', className, ...props }) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-primary text-white',
    success: 'bg-success text-white',
    warning: 'bg-warning text-white',
    error: 'bg-error text-white',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default MobileCard;
