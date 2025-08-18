import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderSummary = ({ 
  cartItems, 
  deliveryFee, 
  discount, 
  promoCode,
  onPromoCodeApply,
  onPromoCodeRemove 
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-CD', {
      style: 'currency',
      currency: 'CDF',
      minimumFractionDigits: 0
    })?.format(price);
  };

  const subtotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const totalItems = cartItems?.reduce((sum, item) => sum + item?.quantity, 0);
  const discountAmount = discount ? (subtotal * discount?.percentage / 100) : 0;
  const total = subtotal + deliveryFee - discountAmount;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Résumé de la commande
      </h3>
      {/* Items Summary */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Sous-total ({totalItems} article{totalItems > 1 ? 's' : ''})
          </span>
          <span className="font-medium text-foreground">
            {formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Frais de livraison</span>
          <span className="font-medium text-foreground">
            {deliveryFee === 0 ? (
              <span className="text-success">Gratuit</span>
            ) : (
              formatPrice(deliveryFee)
            )}
          </span>
        </div>

        {discount && (
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="text-success">Réduction ({discount?.code})</span>
              <button
                onClick={() => onPromoCodeRemove()}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
            <span className="font-medium text-success">
              -{formatPrice(discountAmount)}
            </span>
          </div>
        )}
      </div>
      {/* Promo Code Section */}
      {!discount && (
        <div className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Code promo"
              value={promoCode}
              onChange={(e) => onPromoCodeApply(e?.target?.value)}
              className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              onClick={() => onPromoCodeApply(promoCode)}
              disabled={!promoCode?.trim()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
            >
              Appliquer
            </button>
          </div>
        </div>
      )}
      {/* Total */}
      <div className="border-t border-border pt-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-foreground">Total</span>
          <span className="text-xl font-bold text-primary">
            {formatPrice(total)}
          </span>
        </div>
      </div>
      {/* Savings Highlight */}
      {discountAmount > 0 && (
        <div className="mt-3 p-3 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center gap-2 text-success text-sm">
            <Icon name="Tag" size={16} />
            <span className="font-medium">
              Vous économisez {formatPrice(discountAmount)} !
            </span>
          </div>
        </div>
      )}
      {/* Payment Security */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Icon name="Shield" size={16} />
          <span>Paiement sécurisé</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-8 h-6 bg-orange-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">OM</span>
            </div>
            <span className="text-xs text-muted-foreground">Orange Money</span>
          </div>
          
          <div className="flex items-center gap-1">
            <div className="w-8 h-6 bg-green-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">M</span>
            </div>
            <span className="text-xs text-muted-foreground">M-Pesa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;