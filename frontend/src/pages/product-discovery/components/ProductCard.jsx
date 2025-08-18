import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onQuickAdd = () => {}, onAddToCart = () => {} }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showVariants, setShowVariants] = useState(false);
  const navigate = useNavigate();

  const handleQuickAdd = async (e) => {
    e?.stopPropagation();
    
    if (product?.variants && product?.variants?.length > 0) {
      setShowVariants(true);
      return;
    }

    setIsLoading(true);
    try {
      await onQuickAdd(product);
      onAddToCart(product);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVariantSelect = async (variant) => {
    setIsLoading(true);
    try {
      await onQuickAdd({ ...product, selectedVariant: variant });
      onAddToCart({ ...product, selectedVariant: variant });
      setShowVariants(false);
    } catch (error) {
      console.error('Error adding variant to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/product-discovery/product/${product?.id}`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={14} className="text-warning fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="StarHalf" size={14} className="text-warning fill-current" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-muted-foreground" />
      );
    }

    return stars;
  };

  return (
    <>
      <div 
        className="bg-card rounded-lg border border-border shadow-warm hover:shadow-warm-lg transition-smooth cursor-pointer group animate-scale-press"
        onClick={handleCardClick}
      >
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-t-lg aspect-square">
          <Image
            src={product?.image}
            alt={product?.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product?.isNew && (
              <span className="bg-success text-success-foreground text-xs font-medium px-2 py-1 rounded-full">
                Nouveau
              </span>
            )}
            {product?.discount > 0 && (
              <span className="bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded-full">
                -{product?.discount}%
              </span>
            )}
          </div>

          {/* Quick Add Button */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-smooth">
            <Button
              variant="secondary"
              size="icon"
              onClick={handleQuickAdd}
              loading={isLoading}
              className="w-8 h-8 rounded-full shadow-warm"
            >
              <Icon name="Plus" size={16} />
            </Button>
          </div>

          {/* Mobile Money Badge */}
          {product?.acceptsMobileMoney && (
            <div className="absolute bottom-2 left-2">
              <div className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                <Icon name="Smartphone" size={12} />
                <span>Mobile Money</span>
              </div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-3 space-y-2">
          {/* Vendor */}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Store" size={10} color="white" />
            </div>
            <span className="text-xs text-muted-foreground truncate">
              {product?.vendor?.name}
            </span>
            {product?.vendor?.verified && (
              <Icon name="BadgeCheck" size={12} className="text-primary" />
            )}
          </div>

          {/* Product Name */}
          <h3 className="font-medium text-sm line-clamp-2 text-foreground group-hover:text-primary transition-smooth">
            {product?.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {renderStars(product?.rating)}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product?.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {product?.originalPrice && product?.originalPrice > product?.price && (
                <span className="text-xs text-muted-foreground line-through">
                  {product?.originalPrice?.toLocaleString('fr-CD')} FC
                </span>
              )}
              <span className="font-bold text-primary">
                {product?.price?.toLocaleString('fr-CD')} FC
              </span>
            </div>
            
            {/* Stock Status */}
            {product?.stock <= 5 && product?.stock > 0 && (
              <span className="text-xs text-warning font-medium">
                Plus que {product?.stock}
              </span>
            )}
            {product?.stock === 0 && (
              <span className="text-xs text-error font-medium">
                Épuisé
              </span>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Icon name="MapPin" size={12} />
            <span className="truncate">{product?.location}</span>
          </div>
        </div>
      </div>
      {/* Variant Selection Modal */}
      {showVariants && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border shadow-warm-lg max-w-sm w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Choisir une variante</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowVariants(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-medium text-sm">{product?.name}</h4>
                  <p className="text-xs text-muted-foreground">{product?.vendor?.name}</p>
                </div>
              </div>

              <div className="space-y-2">
                {product?.variants?.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => handleVariantSelect(variant)}
                    disabled={isLoading || variant?.stock === 0}
                    className="w-full flex items-center justify-between p-3 border border-border rounded-lg hover:border-primary transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="text-left">
                      <p className="font-medium text-sm">{variant?.name}</p>
                      {variant?.description && (
                        <p className="text-xs text-muted-foreground">{variant?.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">
                        {variant?.price?.toLocaleString('fr-CD')} FC
                      </p>
                      {variant?.stock <= 5 && variant?.stock > 0 && (
                        <p className="text-xs text-warning">Plus que {variant?.stock}</p>
                      )}
                      {variant?.stock === 0 && (
                        <p className="text-xs text-error">Épuisé</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;