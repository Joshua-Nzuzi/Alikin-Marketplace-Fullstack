import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ activeFilters = {}, onRemoveFilter = () => {}, onClearAll = () => {} }) => {
  const getFilterChips = () => {
    const chips = [];

    // Category filter
    if (activeFilters?.category) {
      chips?.push({
        key: 'category',
        label: activeFilters?.category,
        value: activeFilters?.category
      });
    }

    // Price range filter
    if (activeFilters?.priceRange) {
      const { min, max } = activeFilters?.priceRange;
      chips?.push({
        key: 'priceRange',
        label: `${min?.toLocaleString('fr-CD')} - ${max?.toLocaleString('fr-CD')} FC`,
        value: activeFilters?.priceRange
      });
    }

    // Location filter
    if (activeFilters?.location) {
      chips?.push({
        key: 'location',
        label: activeFilters?.location,
        value: activeFilters?.location
      });
    }

    // Vendor type filter
    if (activeFilters?.vendorType) {
      chips?.push({
        key: 'vendorType',
        label: activeFilters?.vendorType === 'verified' ? 'Vendeurs Vérifiés' : activeFilters?.vendorType,
        value: activeFilters?.vendorType
      });
    }

    // Rating filter
    if (activeFilters?.rating) {
      chips?.push({
        key: 'rating',
        label: `${activeFilters?.rating}+ étoiles`,
        value: activeFilters?.rating
      });
    }

    // Mobile Money filter
    if (activeFilters?.mobileMoney) {
      chips?.push({
        key: 'mobileMoney',
        label: 'Mobile Money Accepté',
        value: activeFilters?.mobileMoney
      });
    }

    // Delivery zones filter
    if (activeFilters?.deliveryZone) {
      chips?.push({
        key: 'deliveryZone',
        label: `Livraison: ${activeFilters?.deliveryZone}`,
        value: activeFilters?.deliveryZone
      });
    }

    // In stock filter
    if (activeFilters?.inStock) {
      chips?.push({
        key: 'inStock',
        label: 'En Stock',
        value: activeFilters?.inStock
      });
    }

    return chips;
  };

  const filterChips = getFilterChips();

  if (filterChips?.length === 0) {
    return null;
  }

  return (
    <div className="bg-muted/30 border-b border-border">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground flex-shrink-0">
            <Icon name="Filter" size={16} />
            <span className="hidden sm:inline">Filtres actifs:</span>
            <span className="sm:hidden">Filtres:</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {filterChips?.map((chip) => (
              <div
                key={chip?.key}
                className="flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1.5 text-sm shadow-sm"
              >
                <span className="truncate max-w-28 sm:max-w-32">{chip?.label}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveFilter(chip?.key)}
                  className="w-4 h-4 p-0 hover:bg-primary/20 rounded-full flex-shrink-0"
                >
                  <Icon name="X" size={12} />
                </Button>
              </div>
            ))}
            
            {filterChips?.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearAll}
                className="text-muted-foreground hover:text-foreground text-xs px-2 py-1 rounded-full"
              >
                Effacer
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterChips;