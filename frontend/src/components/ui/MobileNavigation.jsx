import React, { useState } from 'react';
import { Menu, X, Home, ShoppingCart, User, Package, Truck, Headphones, Settings, LogOut } from 'lucide-react';
import Button from  './Button';
import { cn } from '../../utils/cn';

const MobileNavigation = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navigationItems = [
    { icon: Home, label: 'Accueil', href: '/', active: true },
    { icon: ShoppingCart, label: 'Panier', href: '/cart', badge: user?.cartCount || 0 },
    { icon: Package, label: 'Commandes', href: '/orders' },
    { icon: User, label: 'Profil', href: '/profile' },
    { icon: Truck, label: 'Livraison', href: '/delivery' },
    { icon: Headphones, label: 'Support', href: '/support' },
    { icon: Settings, label: 'Paramètres', href: '/settings' },
  ];

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMenu}
        className="p-2 touch-target"
        aria-label="Menu principal"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">ALIKIN</h3>
                  <p className="text-sm text-gray-500">Marketplace</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMenu}
                className="p-2"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* User Info */}
            {user && (
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {user.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{user.name || 'Utilisateur'}</p>
                    <p className="text-sm text-gray-500">{user.email || 'user@example.com'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Items */}
            <nav className="flex-1 p-4 space-y-2">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors touch-target",
                    item.active
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <span className="bg-white text-primary text-xs font-medium px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </a>
              ))}
            </nav>

            {/* Footer Actions */}
            <div className="p-4 border-t border-gray-200">
              {user ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    onLogout?.();
                    setIsOpen(false);
                  }}
                  className="w-full justify-start touch-target-lg"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Se déconnecter
                </Button>
              ) : (
                <div className="space-y-3">
                  <Button className="w-full touch-target-lg">
                    Se connecter
                  </Button>
                  <Button variant="outline" className="w-full touch-target-lg">
                    S'inscrire
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavigation;
