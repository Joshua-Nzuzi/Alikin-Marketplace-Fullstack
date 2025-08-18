import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Input from './Input';

const SearchBar = ({ 
  onSearch = () => {}, 
  placeholder = "Rechercher des produits...",
  className = "",
  autoFocus = false 
}) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Mock suggestions - in real app, these would come from API
  const mockSuggestions = [
    'Téléphones Samsung',
    'Vêtements femme',
    'Chaussures Nike',
    'Ordinateurs portables',
    'Produits de beauté',
    'Électroménager',
    'Livres français',
    'Accessoires mode'
  ];

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('alikin_recent_searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (autoFocus && inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, [autoFocus]);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setQuery(value);

    if (value?.length > 0) {
      const filtered = mockSuggestions?.filter(item =>
        item?.toLowerCase()?.includes(value?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (searchQuery = query) => {
    if (searchQuery?.trim()) {
      // Save to recent searches
      const updated = [searchQuery, ...recentSearches?.filter(item => item !== searchQuery)]?.slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('alikin_recent_searches', JSON.stringify(updated));

      // Perform search
      onSearch(searchQuery);
      navigate(`/product-discovery?q=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
      setIsExpanded(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleSearch();
    } else if (e?.key === 'Escape') {
      setShowSuggestions(false);
      setIsExpanded(false);
      inputRef?.current?.blur();
    }
  };

  const handleFocus = () => {
    setIsExpanded(true);
    if (query?.length === 0 && recentSearches?.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = (e) => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      if (!e?.currentTarget?.contains(document.activeElement)) {
        setShowSuggestions(false);
        setIsExpanded(false);
      }
    }, 200);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('alikin_recent_searches');
  };

  return (
    <div className={`relative ${className}`} onBlur={handleBlur}>
      <div className={`relative transition-all duration-300 ${
        isExpanded ? 'transform scale-105' : ''
      }`}>
        <Input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={handleFocus}
          className="pl-10 pr-12"
        />
        
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Icon name="Search" size={18} className="text-muted-foreground" />
        </div>

        {/* Clear/Search Button */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {query ? (
            <button
              onClick={() => {
                setQuery('');
                setSuggestions([]);
                setShowSuggestions(false);
                inputRef?.current?.focus();
              }}
              className="text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name="X" size={18} />
            </button>
          ) : (
            <button
              onClick={() => handleSearch()}
              className="text-primary hover:text-primary/80 transition-smooth"
            >
              <Icon name="ArrowRight" size={18} />
            </button>
          )}
        </div>
      </div>
      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-warm-lg z-50 animate-slide-in">
          {query?.length === 0 && recentSearches?.length > 0 && (
            <div className="p-3 border-b border-border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-muted-foreground">Recherches récentes</h4>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-muted-foreground hover:text-foreground transition-smooth"
                >
                  Effacer
                </button>
              </div>
              <div className="space-y-1">
                {recentSearches?.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="w-full flex items-center space-x-3 p-2 rounded-lg text-left hover:bg-muted transition-smooth"
                  >
                    <Icon name="Clock" size={16} className="text-muted-foreground" />
                    <span className="text-sm">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {suggestions?.length > 0 && (
            <div className="p-2">
              <h4 className="text-sm font-medium text-muted-foreground px-2 py-1">Suggestions</h4>
              {suggestions?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(suggestion)}
                  className="w-full flex items-center space-x-3 p-2 rounded-lg text-left hover:bg-muted transition-smooth"
                >
                  <Icon name="Search" size={16} className="text-muted-foreground" />
                  <span className="text-sm">{suggestion}</span>
                </button>
              ))}
            </div>
          )}

          {query?.length > 0 && suggestions?.length === 0 && (
            <div className="p-4 text-center">
              <Icon name="Search" size={24} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Appuyez sur Entrée pour rechercher "{query}"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;