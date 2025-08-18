import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ currentSort = 'relevance', onSortChange = () => {}, resultsCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Pertinence', icon: 'Target' },
    { value: 'price-low', label: 'Prix croissant', icon: 'ArrowUp' },
    { value: 'price-high', label: 'Prix décroissant', icon: 'ArrowDown' },
    { value: 'distance', label: 'Distance', icon: 'MapPin' },
    { value: 'newest', label: 'Plus récents', icon: 'Clock' },
    { value: 'rating', label: 'Mieux notés', icon: 'Star' },
    { value: 'popular', label: 'Populaires', icon: 'TrendingUp' }
  ];

  const currentSortOption = sortOptions?.find(option => option?.value === currentSort) || sortOptions?.[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-card border-b border-border">
      {/* Results Count */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon name="Package" size={16} />
        <span>
          {resultsCount?.toLocaleString('fr-CD')} produit{resultsCount !== 1 ? 's' : ''} trouvé{resultsCount !== 1 ? 's' : ''}
        </span>
      </div>
      {/* Sort Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 min-w-[160px] justify-between"
        >
          <div className="flex items-center gap-2">
            <Icon name={currentSortOption?.icon} size={16} />
            <span className="text-sm">{currentSortOption?.label}</span>
          </div>
          <Icon 
            name="ChevronDown" 
            size={16} 
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </Button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-warm-lg z-50 animate-slide-in">
            <div className="p-2">
              {sortOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => handleSortSelect(option?.value)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-smooth hover:bg-muted ${
                    currentSort === option?.value
                      ? 'bg-primary/10 text-primary' :'text-foreground'
                  }`}
                >
                  <Icon name={option?.icon} size={16} />
                  <span className="text-sm font-medium">{option?.label}</span>
                  {currentSort === option?.value && (
                    <Icon name="Check" size={16} className="ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;