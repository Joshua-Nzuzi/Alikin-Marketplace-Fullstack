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
    <div className="flex flex-wrap items-center gap-2 p-4 bg-muted/30 border-b border-border">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon name="Filter" size={16} />
        <span>Filtres actifs:</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {filterChips?.map((chip) => (
          <div
            key={chip?.key}
            className="flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-sm"
          >
            <span className="truncate max-w-32">{chip?.label}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveFilter(chip?.key)}
              className="w-4 h-4 p-0 hover:bg-primary/20 rounded-full"
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
            className="text-muted-foreground hover:text-foreground text-xs"
          >
            Tout effacer
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterChips;