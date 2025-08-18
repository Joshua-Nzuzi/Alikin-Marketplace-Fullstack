import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const VendorSidebar = ({ 
  isCollapsed = false, 
  onToggle = () => {}, 
  vendorData = null, 
  businessMetrics = {},
  permissions = []
}) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const vendorMenuItems = [
    {
      label: 'Tableau de Bord',
      path: '/vendor-dashboard',
      icon: 'BarChart3',
      badge: businessMetrics?.pendingOrders || 0
    },
    {
      label: 'Produits',
      icon: 'Package',
      submenu: [
        { label: 'Tous les Produits', path: '/vendor-dashboard/products', icon: 'Grid3X3' },
        { label: 'Ajouter Produit', path: '/vendor-dashboard/products/add', icon: 'Plus' },
        { label: 'Stock', path: '/vendor-dashboard/inventory', icon: 'Archive' }
      ]
    },
    {
      label: 'Commandes',
      path: '/vendor-dashboard/orders',
      icon: 'ShoppingBag',
      badge: businessMetrics?.newOrders || 0
    },
    {
      label: 'Clients',
      path: '/vendor-dashboard/customers',
      icon: 'Users'
    },
    {
      label: 'Finances',
      icon: 'DollarSign',
      submenu: [
        { label: 'Revenus', path: '/vendor-dashboard/revenue', icon: 'TrendingUp' },
        { label: 'Paiements', path: '/vendor-dashboard/payments', icon: 'CreditCard' },
        { label: 'Rapports', path: '/vendor-dashboard/reports', icon: 'FileText' }
      ]
    },
    {
      label: 'Marketing',
      icon: 'Megaphone',
      submenu: [
        { label: 'Promotions', path: '/vendor-dashboard/promotions', icon: 'Tag' },
        { label: 'Coupons', path: '/vendor-dashboard/coupons', icon: 'Ticket' }
      ]
    },
    {
      label: 'Paramètres',
      path: '/vendor-dashboard/settings',
      icon: 'Settings'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSubmenuToggle = (index) => {
    if (isCollapsed) return;
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  const handleBackToMarketplace = () => {
    navigate('/product-discovery');
  };

  const VendorProfile = () => (
    <div className={`p-4 border-b border-border ${isCollapsed ? 'px-2' : ''}`}>
      {!isCollapsed ? (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Store" size={20} color="white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">
              {vendorData?.businessName || 'Mon Commerce'}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {vendorData?.category || 'Vendeur'}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Store" size={16} color="white" />
          </div>
        </div>
      )}
    </div>
  );

  const MenuItem = ({ item, index }) => {
    const hasSubmenu = item?.submenu && item?.submenu?.length > 0;
    const isActive = location?.pathname === item?.path || 
                    (hasSubmenu && item?.submenu?.some(sub => location?.pathname === sub?.path));
    const isSubmenuOpen = activeSubmenu === index;

    return (
      <div className="mb-1">
        <button
          onClick={() => {
            if (hasSubmenu) {
              handleSubmenuToggle(index);
            } else if (item?.path) {
              handleNavigation(item?.path);
            }
          }}
          className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-smooth animate-scale-press ${
            isActive
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          } ${isCollapsed ? 'px-2' : ''}`}
          title={isCollapsed ? item?.label : ''}
        >
          <div className="flex items-center space-x-3">
            <Icon name={item?.icon} size={18} />
            {!isCollapsed && (
              <>
                <span className="font-medium text-sm">{item?.label}</span>
                {item?.badge > 0 && (
                  <span className="bg-secondary text-secondary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {item?.badge > 99 ? '99+' : item?.badge}
                  </span>
                )}
              </>
            )}
          </div>
          {!isCollapsed && hasSubmenu && (
            <Icon 
              name="ChevronDown" 
              size={16} 
              className={`transition-transform ${isSubmenuOpen ? 'rotate-180' : ''}`}
            />
          )}
        </button>
        {/* Submenu */}
        {hasSubmenu && isSubmenuOpen && !isCollapsed && (
          <div className="ml-6 mt-2 space-y-1 animate-slide-in">
            {item?.submenu?.map((subItem, subIndex) => (
              <button
                key={subIndex}
                onClick={() => handleNavigation(subItem?.path)}
                className={`w-full flex items-center space-x-3 p-2 rounded-lg text-left transition-smooth animate-scale-press ${
                  location?.pathname === subItem?.path
                    ? 'bg-primary/20 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={subItem?.icon} size={16} />
                <span className="text-sm">{subItem?.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex-col bg-card border-r border-border transition-all duration-300 ${
        isCollapsed ? 'lg:w-16' : 'lg:w-64'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToMarketplace}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Retour au Marché
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="ml-auto"
          >
            <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
          </Button>
        </div>

        {/* Vendor Profile */}
        <VendorProfile />

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {vendorMenuItems?.map((item, index) => (
            <MenuItem key={index} item={item} index={index} />
          ))}
        </nav>

        {/* Business Metrics Summary */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border">
            <div className="bg-muted rounded-lg p-3">
              <h4 className="font-medium text-sm mb-2">Aperçu Rapide</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Commandes Aujourd'hui</span>
                  <span className="font-medium">{businessMetrics?.todayOrders || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Revenus du Mois</span>
                  <span className="font-medium font-mono">{businessMetrics?.monthlyRevenue || '0'} FC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Produits Actifs</span>
                  <span className="font-medium">{businessMetrics?.activeProducts || 0}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
        <nav className="flex items-center justify-around py-2">
          {vendorMenuItems?.slice(0, 4)?.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if (item?.path) {
                  handleNavigation(item?.path);
                } else if (item?.submenu) {
                  handleNavigation(item?.submenu?.[0]?.path);
                }
              }}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-smooth animate-scale-press ${
                location?.pathname === item?.path ||
                (item?.submenu && item?.submenu?.some(sub => location?.pathname === sub?.path))
                  ? 'text-primary' :'text-muted-foreground'
              }`}
            >
              <div className="relative">
                <Icon name={item?.icon} size={20} />
                {item?.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                    {item?.badge > 9 ? '9+' : item?.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{item?.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default VendorSidebar;