import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ 
  filters = {}, 
  onFiltersChange = () => {}, 
  isVisible = true,
  onClose = () => {},
  isMobile = false 
}) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    location: true,
    vendor: true,
    rating: true,
    features: true
  });

  const [priceRange, setPriceRange] = useState({
    min: filters?.priceRange?.min || '',
    max: filters?.priceRange?.max || ''
  });

  const categories = [
    { id: 'electronics', name: 'Électronique', count: 245 },
    { id: 'fashion', name: 'Mode & Vêtements', count: 189 },
    { id: 'home', name: 'Maison & Jardin', count: 156 },
    { id: 'beauty', name: 'Beauté & Santé', count: 134 },
    { id: 'sports', name: 'Sports & Loisirs', count: 98 },
    { id: 'books', name: 'Livres & Éducation', count: 87 },
    { id: 'food', name: 'Alimentation', count: 76 },
    { id: 'automotive', name: 'Automobile', count: 54 }
  ];

  const locations = [
    { id: 'gombe', name: 'Gombe', count: 145 },
    { id: 'kinshasa', name: 'Kinshasa Centre', count: 132 },
    { id: 'lemba', name: 'Lemba', count: 98 },
    { id: 'ngaliema', name: 'Ngaliema', count: 87 },
    { id: 'kasa-vubu', name: 'Kasa-Vubu', count: 76 },
    { id: 'lingwala', name: 'Lingwala', count: 65 },
    { id: 'bandalungwa', name: 'Bandalungwa', count: 54 },
    { id: 'kalamu', name: 'Kalamu', count: 43 }
  ];

  const deliveryZones = [
    { id: 'same-day', name: 'Livraison le jour même', count: 234 },
    { id: 'next-day', name: 'Livraison lendemain', count: 456 },
    { id: 'express', name: 'Livraison express (2h)', count: 123 },
    { id: 'standard', name: 'Livraison standard (3-5j)', count: 567 }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleCategoryChange = (categoryId, checked) => {
    const currentCategories = filters?.categories || [];
    const newCategories = checked
      ? [...currentCategories, categoryId]
      : currentCategories?.filter(id => id !== categoryId);
    
    onFiltersChange({
      ...filters,
      categories: newCategories
    });
  };

  const handleLocationChange = (locationId, checked) => {
    const currentLocations = filters?.locations || [];
    const newLocations = checked
      ? [...currentLocations, locationId]
      : currentLocations?.filter(id => id !== locationId);
    
    onFiltersChange({
      ...filters,
      locations: newLocations
    });
  };

  const handlePriceRangeApply = () => {
    if (priceRange?.min || priceRange?.max) {
      onFiltersChange({
        ...filters,
        priceRange: {
          min: parseInt(priceRange?.min) || 0,
          max: parseInt(priceRange?.max) || 999999999
        }
      });
    }
  };

  const handleRatingChange = (rating) => {
    onFiltersChange({
      ...filters,
      rating: filters?.rating === rating ? null : rating
    });
  };

  const handleFeatureChange = (feature, checked) => {
    const currentFeatures = filters?.features || [];
    const newFeatures = checked
      ? [...currentFeatures, feature]
      : currentFeatures?.filter(f => f !== feature);
    
    onFiltersChange({
      ...filters,
      features: newFeatures
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({});
    setPriceRange({ min: '', max: '' });
  };

  const FilterSection = ({ title, isExpanded, onToggle, children }) => (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-smooth"
      >
        <span className="font-medium text-sm">{title}</span>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 animate-slide-in">
          {children}
        </div>
      )}
    </div>
  );

  const sidebarContent = (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="font-semibold text-lg">Filtres</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Effacer tout
          </Button>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex-1 overflow-y-auto">
        {/* Categories */}
        <FilterSection
          title="Catégories"
          isExpanded={expandedSections?.category}
          onToggle={() => toggleSection('category')}
        >
          <div className="space-y-3">
            {categories?.map((category) => (
              <div key={category?.id} className="flex items-center justify-between">
                <Checkbox
                  label={category?.name}
                  checked={filters?.categories?.includes(category?.id) || false}
                  onChange={(e) => handleCategoryChange(category?.id, e?.target?.checked)}
                />
                <span className="text-xs text-muted-foreground">
                  {category?.count}
                </span>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection
          title="Fourchette de prix"
          isExpanded={expandedSections?.price}
          onToggle={() => toggleSection('price')}
        >
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min (FC)"
                value={priceRange?.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e?.target?.value }))}
              />
              <Input
                type="number"
                placeholder="Max (FC)"
                value={priceRange?.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e?.target?.value }))}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePriceRangeApply}
              className="w-full"
            >
              Appliquer
            </Button>
          </div>
        </FilterSection>

        {/* Location */}
        <FilterSection
          title="Zone de livraison"
          isExpanded={expandedSections?.location}
          onToggle={() => toggleSection('location')}
        >
          <div className="space-y-3">
            {locations?.map((location) => (
              <div key={location?.id} className="flex items-center justify-between">
                <Checkbox
                  label={location?.name}
                  checked={filters?.locations?.includes(location?.id) || false}
                  onChange={(e) => handleLocationChange(location?.id, e?.target?.checked)}
                />
                <span className="text-xs text-muted-foreground">
                  {location?.count}
                </span>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Vendor Type */}
        <FilterSection
          title="Type de vendeur"
          isExpanded={expandedSections?.vendor}
          onToggle={() => toggleSection('vendor')}
        >
          <div className="space-y-3">
            <Checkbox
              label="Vendeurs vérifiés"
              checked={filters?.vendorType === 'verified'}
              onChange={(e) => onFiltersChange({
                ...filters,
                vendorType: e?.target?.checked ? 'verified' : null
              })}
            />
            <Checkbox
              label="Nouveaux vendeurs"
              checked={filters?.vendorType === 'new'}
              onChange={(e) => onFiltersChange({
                ...filters,
                vendorType: e?.target?.checked ? 'new' : null
              })}
            />
          </div>
        </FilterSection>

        {/* Rating */}
        <FilterSection
          title="Note minimum"
          isExpanded={expandedSections?.rating}
          onToggle={() => toggleSection('rating')}
        >
          <div className="space-y-2">
            {[4, 3, 2, 1]?.map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange(rating)}
                className={`w-full flex items-center gap-2 p-2 rounded-lg transition-smooth ${
                  filters?.rating === rating
                    ? 'bg-primary/10 text-primary border border-primary/20' :'hover:bg-muted'
                }`}
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: rating }, (_, i) => (
                    <Icon key={i} name="Star" size={14} className="text-warning fill-current" />
                  ))}
                  {Array.from({ length: 5 - rating }, (_, i) => (
                    <Icon key={i} name="Star" size={14} className="text-muted-foreground" />
                  ))}
                </div>
                <span className="text-sm">& plus</span>
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Features */}
        <FilterSection
          title="Caractéristiques"
          isExpanded={expandedSections?.features}
          onToggle={() => toggleSection('features')}
        >
          <div className="space-y-3">
            <Checkbox
              label="Mobile Money accepté"
              checked={filters?.features?.includes('mobileMoney') || false}
              onChange={(e) => handleFeatureChange('mobileMoney', e?.target?.checked)}
            />
            <Checkbox
              label="Livraison gratuite"
              checked={filters?.features?.includes('freeDelivery') || false}
              onChange={(e) => handleFeatureChange('freeDelivery', e?.target?.checked)}
            />
            <Checkbox
              label="En stock"
              checked={filters?.features?.includes('inStock') || false}
              onChange={(e) => handleFeatureChange('inStock', e?.target?.checked)}
            />
            <Checkbox
              label="Nouveau produit"
              checked={filters?.features?.includes('new') || false}
              onChange={(e) => handleFeatureChange('new', e?.target?.checked)}
            />
            <Checkbox
              label="En promotion"
              checked={filters?.features?.includes('onSale') || false}
              onChange={(e) => handleFeatureChange('onSale', e?.target?.checked)}
            />
          </div>
        </FilterSection>
      </div>
    </div>
  );

  if (isMobile) {
    return isVisible ? (
      <div className="fixed inset-0 z-50 lg:hidden">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-card shadow-warm-lg">
          {sidebarContent}
        </div>
      </div>
    ) : null;
  }

  return (
    <div className={`hidden lg:block w-64 border-r border-border ${isVisible ? '' : 'hidden'}`}>
      {sidebarContent}
    </div>
  );
};

export default FilterSidebar;