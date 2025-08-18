import React from 'react';
import { cn } from '../../utils/cn';

const ResponsiveList = ({
  children,
  className,
  variant = 'default',
  spacing = 'default',
  dividers = true,
  ...props
}) => {
  const variantClasses = {
    default: 'bg-white rounded-lg border border-gray-200',
    card: 'bg-white rounded-lg shadow-mobile',
    minimal: 'bg-transparent',
    bordered: 'bg-white border border-gray-200',
  };

  const spacingClasses = {
    none: '',
    small: 'divide-y divide-gray-100',
    default: 'divide-y divide-gray-200',
    large: 'divide-y divide-gray-300',
  };

  return (
    <div
      className={cn(
        'w-full',
        variantClasses[variant],
        dividers && spacingClasses[spacing],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// List Item Component
ResponsiveList.Item = ({
  children,
  className,
  onClick,
  interactive = false,
  selected = false,
  disabled = false,
  leading,
  trailing,
  ...props
}) => {
  const interactiveClasses = interactive && !disabled
    ? 'cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150'
    : '';

  const selectedClasses = selected
    ? 'bg-primary/5 border-l-4 border-l-primary'
    : '';

  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : '';

  return (
    <div
      className={cn(
        'flex items-center space-x-3 p-4 touch-target',
        interactiveClasses,
        selectedClasses,
        disabledClasses,
        className
      )}
      onClick={!disabled && onClick ? onClick : undefined}
      {...props}
    >
      {/* Leading Element */}
      {leading && (
        <div className="flex-shrink-0">
          {leading}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {children}
      </div>

      {/* Trailing Element */}
      {trailing && (
        <div className="flex-shrink-0">
          {trailing}
        </div>
      )}
    </div>
  );
};

// List Item Content Component
ResponsiveList.ItemContent = ({
  children,
  className,
  title,
  subtitle,
  description,
  ...props
}) => {
  return (
    <div className={cn('min-w-0', className)} {...props}>
      {title && (
        <div className="text-sm font-medium text-gray-900 truncate">
          {title}
        </div>
      )}
      {subtitle && (
        <div className="text-sm text-gray-500 truncate mt-1">
          {subtitle}
        </div>
      )}
      {description && (
        <div className="text-sm text-gray-600 mt-2 line-clamp-2">
          {description}
        </div>
      )}
      {children}
    </div>
  );
};

// List Item Avatar Component
ResponsiveList.ItemAvatar = ({
  src,
  alt,
  fallback,
  size = 'default',
  className,
  ...props
}) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    default: 'w-10 h-10',
    large: 'w-12 h-12',
  };

  return (
    <div
      className={cn(
        'flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <span className="text-sm font-medium text-gray-600">
          {fallback || '?'}
        </span>
      )}
    </div>
  );
};

// List Item Action Component
ResponsiveList.ItemAction = ({
  children,
  className,
  onClick,
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={cn(
        'p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-150 touch-target',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// List Header Component
ResponsiveList.Header = ({
  children,
  className,
  title,
  subtitle,
  action,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50',
        className
      )}
      {...props}
    >
      <div className="min-w-0">
        {title && (
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        )}
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>
      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
    </div>
  );
};

// List Footer Component
ResponsiveList.Footer = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'p-4 border-t border-gray-200 bg-gray-50',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Empty State Component
ResponsiveList.Empty = ({
  icon: Icon,
  title,
  description,
  action,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
      {...props}
    >
      {Icon && (
        <Icon className="h-12 w-12 text-gray-400 mb-4" />
      )}
      {title && (
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      )}
      {description && (
        <p className="text-sm text-gray-500 mb-4 max-w-sm">{description}</p>
      )}
      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
    </div>
  );
};

export default ResponsiveList;
