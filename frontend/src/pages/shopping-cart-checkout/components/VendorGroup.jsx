import React from 'react';
import Icon from '../../../components/AppIcon';
import CartItem from './CartItem';

const VendorGroup = ({ 
  vendor, 
  items, 
  onQuantityChange, 
  onRemove, 
  onMoveToWishlist 
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-CD', {
      style: 'currency',
      currency: 'CDF',
      minimumFractionDigits: 0
    })?.format(price);
  };

  const vendorTotal = items?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const totalItems = items?.reduce((sum, item) => sum + item?.quantity, 0);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Vendor Header */}
      <div className="p-4 bg-muted border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Store" size={20} color="white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{vendor?.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="MapPin" size={14} />
                <span>{vendor?.location}</span>
                {vendor?.deliveryTime && (
                  <>
                    <span>•</span>
                    <Icon name="Clock" size={14} />
                    <span>{vendor?.deliveryTime}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-muted-foreground">
              {totalItems} article{totalItems > 1 ? 's' : ''}
            </div>
            <div className="font-semibold text-foreground">
              {formatPrice(vendorTotal)}
            </div>
          </div>
        </div>

        {/* Vendor Benefits */}
        {vendor?.benefits && vendor?.benefits?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {vendor?.benefits?.map((benefit, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 bg-success/10 text-success text-xs rounded-full"
              >
                <Icon name="Check" size={12} />
                {benefit}
              </span>
            ))}
          </div>
        )}
      </div>
      {/* Vendor Items */}
      <div className="divide-y divide-border">
        {items?.map((item) => (
          <div key={item?.id} className="p-0">
            <CartItem
              item={item}
              onQuantityChange={onQuantityChange}
              onRemove={onRemove}
              onMoveToWishlist={onMoveToWishlist}
            />
          </div>
        ))}
      </div>
      {/* Vendor Footer */}
      <div className="p-4 bg-muted/50 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Icon name="Truck" size={14} />
              <span>Livraison: {vendor?.deliveryFee ? formatPrice(vendor?.deliveryFee) : 'Gratuite'}</span>
            </div>
            {vendor?.minOrderAmount && vendorTotal < vendor?.minOrderAmount && (
              <div className="flex items-center gap-1 text-warning">
                <Icon name="AlertCircle" size={14} />
                <span>
                  Commande min: {formatPrice(vendor?.minOrderAmount)} 
                  (manque {formatPrice(vendor?.minOrderAmount - vendorTotal)})
                </span>
              </div>
            )}
          </div>
          
          <div className="font-medium text-foreground">
            Total: {formatPrice(vendorTotal + (vendor?.deliveryFee || 0))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorGroup;