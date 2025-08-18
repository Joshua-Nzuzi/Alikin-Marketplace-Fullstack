import React from 'react';
import { cn } from '../../utils/cn';

const ResponsiveGrid = ({ 
  children, 
  className,
  cols = { mobile: 1, tablet: 2, desktop: 3, wide: 4 },
  gap = { mobile: 4, tablet: 6, desktop: 8 },
  ...props 
}) => {
  const gridColsClasses = {
    mobile: `grid-cols-${cols.mobile}`,
    tablet: `md:grid-cols-${cols.tablet}`,
    desktop: `lg:grid-cols-${cols.desktop}`,
    wide: `xl:grid-cols-${cols.wide}`,
  };

  const gapClasses = {
    mobile: `gap-${gap.mobile}`,
    tablet: `md:gap-${gap.tablet}`,
    desktop: `lg:gap-${gap.desktop}`,
  };

  return (
    <div
      className={cn(
        'grid',
        gridColsClasses.mobile,
        gridColsClasses.tablet,
        gridColsClasses.desktop,
        gridColsClasses.wide,
        gapClasses.mobile,
        gapClasses.tablet,
        gapClasses.desktop,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Responsive Grid Item with automatic sizing
ResponsiveGrid.Item = ({ 
  children, 
  className,
  span = { mobile: 1, tablet: 1, desktop: 1 },
  ...props 
}) => {
  const spanClasses = {
    mobile: `col-span-${span.mobile}`,
    tablet: `md:col-span-${span.tablet}`,
    desktop: `lg:col-span-${span.desktop}`,
  };

  return (
    <div
      className={cn(
        spanClasses.mobile,
        spanClasses.tablet,
        spanClasses.desktop,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Responsive Grid Container with auto-fit
ResponsiveGrid.AutoFit = ({ 
  children, 
  className,
  minWidth = { mobile: '280px', tablet: '320px', desktop: '350px' },
  gap = { mobile: 4, tablet: 6, desktop: 8 },
  ...props 
}) => {
  const gapClasses = {
    mobile: `gap-${gap.mobile}`,
    tablet: `md:gap-${gap.tablet}`,
    desktop: `lg:gap-${gap.desktop}`,
  };

  return (
    <div
      className={cn(
        'grid',
        gapClasses.mobile,
        gapClasses.tablet,
        gapClasses.desktop,
        className
      )}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth.mobile}, 1fr))`,
        '@media (min-width: 768px)': {
          gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth.tablet}, 1fr))`,
        },
        '@media (min-width: 1024px)': {
          gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth.desktop}, 1fr))`,
        },
      }}
      {...props}
    >
      {children}
    </div>
  );
};

// Responsive Masonry Grid
ResponsiveGrid.Masonry = ({ 
  children, 
  className,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = { mobile: 4, tablet: 6, desktop: 8 },
  ...props 
}) => {
  const gapClasses = {
    mobile: `gap-${gap.mobile}`,
    tablet: `md:gap-${gap.tablet}`,
    desktop: `lg:gap-${gap.desktop}`,
  };

  return (
    <div
      className={cn(
        'columns-1',
        `md:columns-${columns.tablet}`,
        `lg:columns-${columns.desktop}`,
        gapClasses.mobile,
        gapClasses.tablet,
        gapClasses.desktop,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Responsive Masonry Item
ResponsiveGrid.MasonryItem = ({ 
  children, 
  className,
  ...props 
}) => (
  <div
    className={cn(
      'break-inside-avoid mb-4',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export default ResponsiveGrid;
