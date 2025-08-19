import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ user = null, cartCount = 0, onNavigate = () => {} }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Découvrir', path: '/product-discovery', icon: 'Search' },
    { label: 'Mon Panier', path: '/shopping-cart-checkout', icon: 'ShoppingCart', badge: cartCount },
    { label: 'Mes Commandes', path: '/order-tracking', icon: 'Package' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    onNavigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    navigate('/user-authentication');
    setIsUserMenuOpen(false);
    onNavigate('/user-authentication');
  };

  const handleVendorDashboard = () => {
    navigate('/vendor-dashboard');
    setIsUserMenuOpen(false);
    onNavigate('/vendor-dashboard');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event?.target?.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isUserMenuOpen]);

  const Logo = () => (
    <div className="flex items-center">
      <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg mr-3">
        <Icon name="Store" size={24} color="white" />
      </div>
      <div className="hidden sm:block">
        <h1 className="text-xl font-bold text-foreground">Alikin</h1>
        <p className="text-xs text-muted-foreground -mt-1">Marketplace</p>
      </div>
    </div>
  );

  return (
    <header className="fixed top-0 z-50 w-full bg-card border-b border-border shadow-warm-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer transition-smooth hover:opacity-80"
            onClick={() => handleNavigation('/landing-page')}
          >
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`relative flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth animate-scale-press ${
                  location?.pathname === item?.path
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
                {item?.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {item?.badge > 99 ? '99+' : item?.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button - Desktop */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex"
              onClick={() => {/* Search functionality */}}
            >
              <Icon name="Search" size={20} />
            </Button>

            {/* User Menu */}
            {user ? (
              <div className="relative user-menu-container">
                <button
                  onClick={handleUserMenuToggle}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-smooth animate-scale-press"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground text-sm font-medium">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <Icon name="ChevronDown" size={16} className="hidden sm:block" />
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-warm-lg animate-fade-in">
                    <div className="p-3 border-b border-border">
                      <p className="font-medium text-sm">{user?.name || 'Utilisateur'}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    <div className="py-2">
                      <button
                        onClick={() => handleNavigation('/order-tracking')}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-sm hover:bg-muted transition-smooth"
                      >
                        <Icon name="Package" size={16} />
                        <span>Mes Commandes</span>
                      </button>
                      <button
                        onClick={handleVendorDashboard}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-sm hover:bg-muted transition-smooth"
                      >
                        <Icon name="Store" size={16} />
                        <span>Tableau de Bord Vendeur</span>
                      </button>
                      <button
                        onClick={() => {/* Settings */}}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-sm hover:bg-muted transition-smooth"
                      >
                        <Icon name="Settings" size={16} />
                        <span>Paramètres</span>
                      </button>
                      <div className="border-t border-border mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-error hover:bg-error/10 transition-smooth"
                        >
                          <Icon name="LogOut" size={16} />
                          <span>Déconnexion</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button
                variant="default"
                onClick={() => handleNavigation('/user-authentication')}
                className="animate-scale-press"
              >
                <Icon name="User" size={18} className="mr-2" />
                Connexion
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card animate-slide-in">
            <nav className="py-4 space-y-2">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-smooth animate-scale-press ${
                    location?.pathname === item?.path
                      ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-medium">{item?.label}</span>
                  {item?.badge > 0 && (
                    <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {item?.badge > 99 ? '99+' : item?.badge}
                    </span>
                  )}
                </button>
              ))}
              
              {/* Mobile Search */}
              <button
                onClick={() => {/* Search functionality */}}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth animate-scale-press"
              >
                <Icon name="Search" size={20} />
                <span className="font-medium">Rechercher</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;