import React, { useState, useEffect, useCallback } from 'react';
import ProductCard from './ProductCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductGrid = ({ 
  products = [], 
  isLoading = false, 
  hasMore = true, 
  onLoadMore = () => {}, 
  onAddToCart = () => {},
  onRefresh = () => {}
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [pullDistance, setPullDistance] = useState(0);

  const handlePullToRefresh = useCallback(async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    try {
      await onRefresh();
    } catch (error) {
      console.error('Error refreshing:', error);
    } finally {
      setIsRefreshing(false);
      setPullDistance(0);
    }
  }, [isRefreshing, onRefresh]);

  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      setTouchStart(e?.touches?.[0]?.clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (!touchStart || window.scrollY > 0) return;

    const currentTouch = e?.touches?.[0]?.clientY;
    const distance = currentTouch - touchStart;

    if (distance > 0 && distance < 100) {
      setPullDistance(distance);
      e?.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    if (pullDistance > 60) {
      handlePullToRefresh();
    } else {
      setPullDistance(0);
    }
    setTouchStart(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement?.scrollTop
        >= document.documentElement?.offsetHeight - 1000
      ) {
        if (hasMore && !isLoading) {
          onLoadMore();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, isLoading, onLoadMore]);

  const SkeletonCard = () => (
    <div className="bg-card rounded-lg border border-border shadow-warm animate-pulse">
      <div className="aspect-square bg-muted rounded-t-lg" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-muted rounded w-1/2" />
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/3" />
        <div className="h-4 bg-muted rounded w-1/2" />
        <div className="h-3 bg-muted rounded w-2/3" />
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
        <Icon name="Package" size={32} className="text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Aucun produit trouvé</h3>
      <p className="text-muted-foreground mb-4 max-w-md">
        Nous n'avons trouvé aucun produit correspondant à vos critères. 
        Essayez de modifier vos filtres ou votre recherche.
      </p>
      <Button variant="outline" onClick={onRefresh}>
        <Icon name="RefreshCw" size={16} className="mr-2" />
        Actualiser
      </Button>
    </div>
  );

  return (
    <div
  className="flex-1"
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
>
      {/* Pull to Refresh Indicator */}
      {pullDistance > 0 && (
        <div 
          className="flex items-center justify-center py-4 transition-all duration-200"
          style={{ transform: `translateY(${Math.min(pullDistance, 60)}px)` }}
        >
          <div className={`flex items-center gap-2 text-primary ${pullDistance > 60 ? 'animate-spin' : ''}`}>
            <Icon name="RefreshCw" size={20} />
            <span className="text-sm font-medium">
              {pullDistance > 60 ? 'Relâchez pour actualiser' : 'Tirez pour actualiser'}
            </span>
          </div>
        </div>
      )}
      {/* Refreshing Indicator */}
      {isRefreshing && (
        <div className="flex items-center justify-center py-4 border-b border-border">
          <div className="flex items-center gap-2 text-primary">
            <Icon name="RefreshCw" size={20} className="animate-spin" />
            <span className="text-sm font-medium">Actualisation...</span>
          </div>
        </div>
      )}
      {/* Product Grid */}
      <div className="px-3 py-4 sm:px-4">
        {products?.length === 0 && !isLoading ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4">
            {products?.map((product) => (
              <ProductCard
                key={product?.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
            
            {/* Loading Skeletons */}
            {isLoading && (
              Array.from({ length: 12 }, (_, index) => (
                <SkeletonCard key={`skeleton-${index}`} />
              ))
            )}
          </div>
        )}

        {/* Load More Button */}
        {hasMore && products?.length > 0 && !isLoading && (
          <div className="flex justify-center mt-8">
            <div className="flex justify-center">
  <Button
    variant="outline"
    onClick={onLoadMore}
    className="min-w-[200px]"
  >
    <Icon name="Plus" size={16} className="mr-2" />
    Charger plus de produits
  </Button>
</div>
          </div>
        )}

        {/* End of Results */}
        {!hasMore && products?.length > 0 && (
          <div className="flex items-center justify-center py-8 text-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="CheckCircle" size={16} />
              <span className="text-sm">Vous avez vu tous les produits disponibles</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;