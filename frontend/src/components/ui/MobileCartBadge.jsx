import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const MobileCartBadge = ({ cartCount = 0, onCartClick = () => {} }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCartClick = () => {
    navigate('/shopping-cart-checkout');
    onCartClick();
  };

  // Don't show on cart page or vendor dashboard
  if (location?.pathname === '/shopping-cart-checkout'|| location?.pathname?.startsWith('/vendor-dashboard')) {
    return null;
  }

  return (
    <div className="lg:hidden fixed bottom-4 right-4 z-40">
      <button
        onClick={handleCartClick}
        className="relative bg-primary text-primary-foreground rounded-full p-4 shadow-warm-lg transition-smooth animate-scale-press hover:scale-105"
        aria-label={`Panier avec ${cartCount} articles`}
      >
        <Icon name="ShoppingCart" size={24} />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center min-w-[24px]">
            {cartCount > 99 ? '99+' : cartCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default MobileCartBadge;