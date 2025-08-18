import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CartItem = ({ 
  item, 
  onQuantityChange, 
  onRemove, 
  onMoveToWishlist 
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(true);
    try {
      await onQuantityChange(item?.id, newQuantity);
    } finally {
      setIsUpdating(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-CD', {
      style: 'currency',
      currency: 'CDF',
      minimumFractionDigits: 0
    })?.format(price);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card border border-border rounded-lg">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-muted">
          <Image
            src={item?.image}
            alt={item?.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-medium text-foreground line-clamp-2 mb-1">
              {item?.name}
            </h3>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Icon name="Store" size={14} />
              <span>{item?.vendor?.name}</span>
              <span>•</span>
              <span>{item?.vendor?.location}</span>
            </div>

            {item?.variant && (
              <div className="text-sm text-muted-foreground mb-2">
                <span className="font-medium">Variante:</span> {item?.variant}
              </div>
            )}

            <div className="flex items-center gap-2 text-sm">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item?.stock > 10 
                  ? 'bg-success/10 text-success' 
                  : item?.stock > 0 
                    ? 'bg-warning/10 text-warning' :'bg-error/10 text-error'
              }`}>
                {item?.stock > 10 ? 'En stock' : item?.stock > 0 ? `${item?.stock} restant(s)` : 'Rupture de stock'}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="font-semibold text-lg text-foreground">
              {formatPrice(item?.price)}
            </div>
            {item?.originalPrice && item?.originalPrice > item?.price && (
              <div className="text-sm text-muted-foreground line-through">
                {formatPrice(item?.originalPrice)}
              </div>
            )}
          </div>
        </div>

        {/* Quantity Controls & Actions */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            {/* Quantity Controls */}
            <div className="flex items-center border border-border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(item?.quantity - 1)}
                disabled={isUpdating || item?.quantity <= 1}
                className="h-8 w-8 rounded-r-none"
              >
                <Icon name="Minus" size={14} />
              </Button>
              
              <div className="px-3 py-1 text-sm font-medium min-w-[40px] text-center border-x border-border">
                {isUpdating ? (
                  <Icon name="Loader2" size={14} className="animate-spin mx-auto" />
                ) : (
                  item?.quantity
                )}
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(item?.quantity + 1)}
                disabled={isUpdating || item?.quantity >= item?.stock}
                className="h-8 w-8 rounded-l-none"
              >
                <Icon name="Plus" size={14} />
              </Button>
            </div>

            {/* Subtotal */}
            <div className="text-sm font-medium text-foreground">
              {formatPrice(item?.price * item?.quantity)}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMoveToWishlist(item?.id)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="Heart" size={16} className="mr-1" />
              <span className="hidden sm:inline">Favoris</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(item?.id)}
              className="text-error hover:text-error hover:bg-error/10"
            >
              <Icon name="Trash2" size={16} className="mr-1" />
              <span className="hidden sm:inline">Supprimer</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;