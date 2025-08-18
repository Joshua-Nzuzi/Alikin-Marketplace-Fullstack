import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import Button from  './Button';
import { cn } from '../../utils/cn';

const ResponsiveModal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'default',
  showCloseButton = true,
  closeOnOverlayClick = true,
  className,
  ...props
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    small: 'max-w-sm',
    default: 'max-w-md md:max-w-lg',
    large: 'max-w-lg md:max-w-xl',
    xlarge: 'max-w-xl md:max-w-2xl',
    full: 'max-w-full h-full',
    mobile: 'w-full max-w-sm mx-4',
    tablet: 'w-full max-w-md mx-6',
    desktop: 'max-w-lg mx-auto',
  };

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleOverlayClick}
      />

      {/* Modal */}
      <div
        className={cn(
          'relative bg-white rounded-lg shadow-xl w-full max-h-[90vh] overflow-hidden',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              {title}
            </h2>
            {showCloseButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2 touch-target"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {children}
        </div>

        {/* Close button for mobile if no title */}
        {!title && showCloseButton && (
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2 touch-target bg-white/80 backdrop-blur-sm"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Modal Footer Component
ResponsiveModal.Footer = ({ children, className, ...props }) => (
  <div
    className={cn(
      'flex flex-col sm:flex-row gap-3 justify-end p-4 md:p-6 border-t border-gray-200 bg-gray-50',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

// Modal Actions Component
ResponsiveModal.Actions = ({ children, className, ...props }) => (
  <div
    className={cn(
      'flex flex-col sm:flex-row gap-3',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

// Modal Section Component
ResponsiveModal.Section = ({ children, className, title, ...props }) => (
  <div className={cn('mb-6', className)} {...props}>
    {title && (
      <h3 className="text-base font-medium text-gray-900 mb-3">
        {title}
      </h3>
    )}
    {children}
  </div>
);

export default ResponsiveModal;
