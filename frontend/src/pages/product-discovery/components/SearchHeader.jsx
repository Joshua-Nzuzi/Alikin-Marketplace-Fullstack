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
    <div className="sticky top-0 z-40 bg-card border-b border-border shadow-warm-sm">
      <div className="p-4">
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="flex-1">
            <SearchBar
              placeholder="Rechercher des produits à Kinshasa..."
              onSearch={onSearch}
             
              className="w-full"
            />
          </div>

          {/* Filter Toggle Button */}
          <Button
            variant={isFilterVisible ? "default" : "outline"}
            size="icon"
            onClick={onFilterToggle}
            className="shrink-0 lg:hidden"
          >
            <Icon name="Filter" size={20} />
          </Button>

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

        {/* Quick Filters - Mobile */}
        <div className="lg:hidden mt-3 flex items-center gap-2 overflow-x-auto pb-2">
          <Button variant="outline" size="sm" className="shrink-0">
            <Icon name="MapPin" size={14} className="mr-1" />
            Près de moi
          </Button>
          <Button variant="outline" size="sm" className="shrink-0">
            <Icon name="Truck" size={14} className="mr-1" />
            Livraison rapide
          </Button>
          <Button variant="outline" size="sm" className="shrink-0">
            <Icon name="Smartphone" size={14} className="mr-1" />
            Mobile Money
          </Button>
          <Button variant="outline" size="sm" className="shrink-0">
            <Icon name="Star" size={14} className="mr-1" />
            Mieux notés
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;