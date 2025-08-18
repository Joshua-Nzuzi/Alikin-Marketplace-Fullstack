import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { cn } from '../../utils/cn';

const FloatingActionButton = ({
  icon: Icon = Plus,
  label,
  onClick,
  variant = 'primary',
  size = 'default',
  position = 'bottom-right',
  className,
  children,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMainClick = () => {
    if (children) {
      toggleExpanded();
    } else {
      onClick?.();
    }
  };

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'center-right': 'right-4 top-1/2 -translate-y-1/2',
    'center-left': 'left-4 top-1/2 -translate-y-1/2',
  };

  const sizeClasses = {
    small: 'w-12 h-12',
    default: 'w-14 h-14',
    large: 'w-16 h-16',
  };

  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-secondary text-white hover:bg-secondary/90',
    accent: 'bg-accent text-white hover:bg-accent/90',
    success: 'bg-success text-white hover:bg-success/90',
    warning: 'bg-warning text-white hover:bg-warning/90',
    error: 'bg-error text-white hover:bg-error/90',
  };

  const iconSizes = {
    small: 'h-5 w-5',
    default: 'h-6 w-6',
    large: 'h-7 w-7',
  };

  return (
    <div className={cn('fixed z-40', positionClasses[position])}>
      {/* Main FAB */}
      <button
        onClick={handleMainClick}
        className={cn(
          'rounded-full shadow-lg transition-all duration-300 ease-in-out touch-target',
          'hover:shadow-xl active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
          sizeClasses[size],
          variantClasses[variant],
          isExpanded && 'rotate-45',
          className
        )}
        aria-label={label || 'Action principale'}
        {...props}
      >
        <Icon className={cn('mx-auto', iconSizes[size])} />
      </button>

      {/* Expanded Actions */}
      {children && isExpanded && (
        <div className="absolute bottom-full right-0 mb-4 space-y-3">
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              className="animate-slide-in"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both',
              }}
            >
              {child}
            </div>
          ))}
        </div>
      )}

      {/* Backdrop for expanded state */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-30 bg-black/20"
          onClick={toggleExpanded}
        />
      )}
    </div>
  );
};

// FAB Action Item Component
FloatingActionButton.Action = ({
  icon: Icon,
  label,
  onClick,
  variant = 'primary',
  size = 'default',
  className,
  ...props
}) => {
  const sizeClasses = {
    small: 'w-10 h-10',
    default: 'w-12 h-12',
    large: 'w-14 h-14',
  };

  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-secondary text-white hover:bg-secondary/90',
    accent: 'bg-accent text-white hover:bg-accent/90',
    success: 'bg-success text-white hover:bg-success/90',
    warning: 'bg-warning text-white hover:bg-warning/90',
    error: 'bg-error text-white hover:bg-error/90',
  };

  const iconSizes = {
    small: 'h-4 w-4',
    default: 'h-5 w-5',
    large: 'h-6 w-6',
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Label */}
      <div className="bg-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
        <span className="text-sm font-medium text-gray-900">{label}</span>
      </div>

      {/* Action Button */}
      <button
        onClick={onClick}
        className={cn(
          'rounded-full shadow-lg transition-all duration-200 ease-in-out touch-target',
          'hover:shadow-xl active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        aria-label={label}
        {...props}
      >
        <Icon className={cn('mx-auto', iconSizes[size])} />
      </button>
    </div>
  );
};

export default FloatingActionButton;
