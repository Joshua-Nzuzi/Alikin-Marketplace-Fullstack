import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MobileCartBadge from '../../components/ui/MobileCartBadge';
import FilterSidebar from './components/FilterSidebar';
import FilterChips from './components/FilterChips';
import SearchHeader from './components/SearchHeader';
import SortDropdown from './components/SortDropdown';
import ProductGrid from './components/ProductGrid';



const ProductDiscovery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
const [query, setQuery] = useState(searchParams.get('q') || '');
const [category, setCategory] = useState(searchParams.get('category') || '');
const [sort, setSort] = useState(searchParams.get('sort') || 'relevance');
const [minPrice, setMinPrice] = useState(searchParams.get('min') || '');
const [maxPrice, setMaxPrice] = useState(searchParams.get('max') || '');

function updateParams(next) {
  const current = Object.fromEntries([...searchParams]);
  const merged = { ...current, ...next };
  // Nettoie les clés vides
  Object.keys(merged).forEach(k => { if (merged[k] === '' || merged[k] == null) delete merged[k]; });
  setSearchParams(merged, { replace: true });
}

const onQueryChange = (val) => { setQuery(val); updateParams({ q: val }); };
const onCategoryChange = (val) => { setCategory(val); updateParams({ category: val }); };
const onSortChange = (val) => { setSort(val); updateParams({ sort: val }); };
const onMinChange = (val) => { setMinPrice(val); updateParams({ min: val }); };
const onMaxChange = (val) => { setMaxPrice(val); updateParams({ max: val }); };

useEffect(() => {
  setQuery(searchParams.get('q') || '');
  setCategory(searchParams.get('category') || '');
  setSort(searchParams.get('sort') || 'relevance');
  setMinPrice(searchParams.get('min') || '');
  setMaxPrice(searchParams.get('max') || '');
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [searchParams.toString()]);
  
  // State management
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('relevance');
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') || '');
  const [isFilterSidebarVisible, setIsFilterSidebarVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);

  // Mock data
  const mockProducts = [
    {
      id: 1,
      name: "Samsung Galaxy A54 5G - 128GB",
      price: 450000,
      originalPrice: 500000,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
      vendor: {
        id: 1,
        name: "TechStore Kinshasa",
        verified: true
      },
      rating: 4.5,
      reviewCount: 128,
      location: "Gombe, Kinshasa",
      stock: 15,
      isNew: true,
      discount: 10,
      acceptsMobileMoney: true,
      category: "electronics",
      deliveryZone: "same-day",
      variants: [
        { name: "128GB - Noir", price: 450000, stock: 15, description: "Couleur noire" },
        { name: "128GB - Blanc", price: 450000, stock: 8, description: "Couleur blanche" },
        { name: "256GB - Noir", price: 520000, stock: 5, description: "Plus de stockage" }
      ]
    },
    {
      id: 2,
      name: "Robe Africaine Traditionnelle Wax",
      price: 85000,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
      vendor: {
        id: 2,
        name: "Mode Africaine Lemba",
        verified: false
      },
      rating: 4.8,
      reviewCount: 67,
      location: "Lemba, Kinshasa",
      stock: 3,
      isNew: false,
      discount: 0,
      acceptsMobileMoney: true,
      category: "fashion",
      deliveryZone: "next-day"
    },
    {
      id: 3,
      name: "Ordinateur Portable HP Pavilion 15",
      price: 1200000,
      originalPrice: 1350000,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
      vendor: {
        id: 3,
        name: "Informatique Plus",
        verified: true
      },
      rating: 4.3,
      reviewCount: 89,
      location: "Ngaliema, Kinshasa",
      stock: 7,
      isNew: false,
      discount: 11,
      acceptsMobileMoney: true,
      category: "electronics",
      deliveryZone: "standard"
    },
    {
      id: 4,
      name: "Chaussures Nike Air Max 270",
      price: 180000,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      vendor: {
        id: 4,
        name: "SportZone Kinshasa",
        verified: true
      },
      rating: 4.6,
      reviewCount: 156,
      location: "Kasa-Vubu, Kinshasa",
      stock: 12,
      isNew: true,
      discount: 0,
      acceptsMobileMoney: false,
      category: "sports",
      deliveryZone: "express",
      variants: [
        { name: "Taille 40", price: 180000, stock: 4 },
        { name: "Taille 41", price: 180000, stock: 3 },
        { name: "Taille 42", price: 180000, stock: 5 }
      ]
    },
    {
      id: 5,
      name: "Set de Cuisine Complet - 12 Pièces",
      price: 95000,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      vendor: {
        id: 5,
        name: "Maison & Décor",
        verified: false
      },
      rating: 4.2,
      reviewCount: 43,
      location: "Bandalungwa, Kinshasa",
      stock: 8,
      isNew: false,
      discount: 0,
      acceptsMobileMoney: true,
      category: "home",
      deliveryZone: "next-day"
    },
    {
      id: 6,
      name: "Produits de Beauté Bio - Kit Complet",
      price: 65000,
      originalPrice: 75000,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
      vendor: {
        id: 6,
        name: "Beauté Naturelle",
        verified: true
      },
      rating: 4.7,
      reviewCount: 92,
      location: "Lingwala, Kinshasa",
      stock: 0,
      isNew: false,
      discount: 13,
      acceptsMobileMoney: true,
      category: "beauty",
      deliveryZone: "same-day"
    },
    {
      id: 7,
      name: "Livre: Histoire du Congo - Édition 2024",
      price: 25000,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
      vendor: {
        id: 7,
        name: "Librairie Universitaire",
        verified: true
      },
      rating: 4.4,
      reviewCount: 28,
      location: "Kalamu, Kinshasa",
      stock: 20,
      isNew: true,
      discount: 0,
      acceptsMobileMoney: false,
      category: "books",
      deliveryZone: "standard"
    },
    {
      id: 8,
      name: "Riz Parfumé Premium - 25kg",
      price: 45000,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
      vendor: {
        id: 8,
        name: "Alimentation Centrale",
        verified: false
      },
      rating: 4.1,
      reviewCount: 76,
      location: "Gombe, Kinshasa",
      stock: 25,
      isNew: false,
      discount: 0,
      acceptsMobileMoney: true,
      category: "food",
      deliveryZone: "next-day"
    }
  ];

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setIsLoading(false);
      
      // Load cart count from localStorage
      const savedCartCount = localStorage.getItem('alikin_cart_count');
      if (savedCartCount) {
        setCartCount(parseInt(savedCartCount));
      }
      
      // Load user from localStorage
      const savedUser = localStorage.getItem('alikin_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    };

    initializeData();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let filtered = [...products];

    // Apply search query
    if (searchQuery) {
      filtered = filtered?.filter(product =>
        product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.vendor?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply category filters
    if (filters?.categories && filters?.categories?.length > 0) {
      filtered = filtered?.filter(product =>
        filters?.categories?.includes(product?.category)
      );
    }

    // Apply price range filter
    if (filters?.priceRange) {
      filtered = filtered?.filter(product =>
        product?.price >= filters?.priceRange?.min &&
        product?.price <= filters?.priceRange?.max
      );
    }

    // Apply location filters
    if (filters?.locations && filters?.locations?.length > 0) {
      filtered = filtered?.filter(product => {
        const productLocation = product?.location?.toLowerCase();
        return filters?.locations?.some(location => 
          productLocation?.includes(location?.toLowerCase())
        );
      });
    }

    // Apply vendor type filter
    if (filters?.vendorType === 'verified') {
      filtered = filtered?.filter(product => product?.vendor?.verified);
    } else if (filters?.vendorType === 'new') {
      filtered = filtered?.filter(product => !product?.vendor?.verified);
    }

    // Apply rating filter
    if (filters?.rating) {
      filtered = filtered?.filter(product => product?.rating >= filters?.rating);
    }

    // Apply feature filters
    if (filters?.features && filters?.features?.length > 0) {
      filtered = filtered?.filter(product => {
        return filters?.features?.every(feature => {
          switch (feature) {
            case 'mobileMoney':
              return product?.acceptsMobileMoney;
            case 'freeDelivery':
              return product?.freeDelivery || false;
            case 'inStock':
              return product?.stock > 0;
            case 'new':
              return product?.isNew;
            case 'onSale':
              return product?.discount > 0;
            default:
              return true;
          }
        });
      });
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a?.price - b?.price;
        case 'price-high':
          return b?.price - a?.price;
        case 'rating':
          return b?.rating - a?.rating;
        case 'newest':
          return b?.isNew - a?.isNew;
        case 'popular':
          return b?.reviewCount - a?.reviewCount;
        case 'distance':
          // Mock distance sorting
          return Math.random() - 0.5;
        default: // relevance
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, filters, searchQuery, sortBy]);

  // handleSearch -> utilise onQueryChange pour aussi maj les query params
const handleSearch = useCallback((q) => {
  onQueryChange(q);
}, [/* rien: onQueryChange est local */]);
  // handleFiltersChange -> pousse category/min/max dans URL si présents
const handleFiltersChange = useCallback((newFilters) => {
  setFilters(newFilters);
  const cat = newFilters?.categories?.[0] || '';
  const min = newFilters?.priceRange?.min ?? '';
  const max = newFilters?.priceRange?.max ?? '';
  updateParams({ category: cat, min, max });
}, [updateParams]);
  // Handle filter removal
  const handleRemoveFilter = useCallback((filterKey) => {
    const newFilters = { ...filters };
    delete newFilters?.[filterKey];
    setFilters(newFilters);
  }, [filters]);

  // Handle clear all filters
  const handleClearAllFilters = useCallback(() => {
    setFilters({});
  }, []);

  // handleSortChange -> pousse dans URL
const handleSortChange = useCallback((newSort) => {
  setSortBy(newSort);
  updateParams({ sort: newSort });
}, [updateParams]);

  // Handle load more
  const handleLoadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      setCurrentPage(prev => prev + 1);
      // In real app, this would load more data from API
    }
  }, [hasMore, isLoading]);

  // Handle refresh
  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentPage(1);
    setIsLoading(false);
  }, []);

  // Handle add to cart
  const handleAddToCart = useCallback((product) => {
    const newCartCount = cartCount + 1;
    setCartCount(newCartCount);
    localStorage.setItem('alikin_cart_count', newCartCount?.toString());
    
    // Show success feedback (you could add a toast notification here)
    console.log('Product added to cart:', product);
  }, [cartCount]);

  // Handle navigation
  const handleNavigation = useCallback((path) => {
    navigate(path);
  }, [navigate]);

  // Convert filters to active filters format for chips
  const getActiveFilters = () => {
    const activeFilters = {};
    
    if (filters?.categories && filters?.categories?.length > 0) {
      activeFilters.category = filters?.categories?.[0]; // Show first category
    }
    
    if (filters?.priceRange) {
      activeFilters.priceRange = filters?.priceRange;
    }
    
    if (filters?.locations && filters?.locations?.length > 0) {
      activeFilters.location = filters?.locations?.[0]; // Show first location
    }
    
    if (filters?.vendorType) {
      activeFilters.vendorType = filters?.vendorType;
    }
    
    if (filters?.rating) {
      activeFilters.rating = filters?.rating;
    }
    
    if (filters?.features && filters?.features?.includes('mobileMoney')) {
      activeFilters.mobileMoney = true;
    }
    
    return activeFilters;
  };

  return (
    <div className="flex pt-16 lg:pt-20 top-level">

      {/* Header */}
      <Header 
        user={user}
        cartCount={cartCount}
        onNavigate={handleNavigation}
      />
      <div className="flex">
        {/* Desktop Filter Sidebar */}
        <FilterSidebar
          filters={filters}
          onFiltersChange={handleFiltersChange}
          isVisible={true}
          isMobile={false}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Search Header */}
          <SearchHeader
            onSearch={handleSearch}
            onFilterToggle={() => setIsFilterSidebarVisible(!isFilterSidebarVisible)}
            searchQuery={searchQuery}
            isFilterVisible={isFilterSidebarVisible}
          />

          {/* Filter Chips */}
          <FilterChips
            activeFilters={getActiveFilters()}
            onRemoveFilter={handleRemoveFilter}
            onClearAll={handleClearAllFilters}
          />

          {/* Sort Dropdown */}
          <SortDropdown
            currentSort={sortBy}
            onSortChange={handleSortChange}
            resultsCount={filteredProducts?.length}
          />

          {/* Product Grid */}
          <ProductGrid
            products={filteredProducts}
            isLoading={isLoading}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
            onAddToCart={handleAddToCart}
            onRefresh={handleRefresh}
          />
        </div>
      </div>
      {/* Mobile Filter Sidebar */}
      <FilterSidebar
        filters={filters}
        onFiltersChange={handleFiltersChange}
        isVisible={isFilterSidebarVisible}
        onClose={() => setIsFilterSidebarVisible(false)}
        isMobile={true}
      />
      {/* Mobile Cart Badge */}
      <MobileCartBadge
        cartCount={cartCount}
        onCartClick={() => handleNavigation('/shopping-cart-checkout')}
      />
    </div>
  );
};

export default ProductDiscovery;