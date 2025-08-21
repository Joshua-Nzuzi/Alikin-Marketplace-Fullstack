import React, { useState } from 'react';
import SearchBar from '../../../components/ui/SearchBar';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchHeader = ({ 
  onSearch = () => {}, 
  onFilterToggle = () => {},
  searchQuery = '',
  isFilterVisible = false 
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearchFocus = () => {
    setIsSearchExpanded(true);
  };

  const handleSearchBlur = () => {
    setIsSearchExpanded(false);
  };

return (
  <>
    <div className="sticky top-0 z-40 bg-card border-b border-border shadow-warm-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="flex items-center gap-2">
          {/* Search Bar */}
          <div className="flex-1 min-w-0 pt-4 px-4">

            <SearchBar
              placeholder="Rechercher des produits..."
              onSearch={onSearch}
              className="w-full text-sm h-10 sm:h-11"
            />
          </div>

          {/* Filter Toggle Button */}
          <Button
            variant={isFilterVisible ? "default" : "outline"}
            size="icon"
            onClick={onFilterToggle}
            className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 lg:hidden min-w-[40px]"
          >
            <Icon name="Filter" size={18} className="sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>
      {/* View Toggle - Desktop Only */}
      <div className="hidden lg:flex items-center gap-1 border border-border rounded-lg p-1">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-primary"
        >
          <Icon name="Grid3X3" size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-muted-foreground"
        >
          <Icon name="List" size={16} />
        </Button>
      </div>
    </div>

    <div className="lg:hidden mt-3 -mx-4">
      <div className="overflow-x-auto px-4 scrollbar-hide">
        <div className="flex space-x-3 py-2" style={{ minWidth: '150%' }}>
          {[
            { icon: "MapPin", text: "Près de moi" },
            { icon: "Truck", text: "Livraison rapide" },
            { icon: "Smartphone", text: "Mobile Money" },
            { icon: "Star", text: "Mieux notés" }
          ].map((filter, index) => (
            <button 
              key={index}
              className="flex-none px-3 py-2 rounded-full border border-border bg-card text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 min-w-max"
              style={{ minWidth: 'fit-content' }}
            >
              <Icon name={filter.icon} size={14} />
              {filter.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  </>
);
};

export default SearchHeader;