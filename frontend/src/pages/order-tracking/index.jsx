import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MobileCartBadge from '../../components/ui/MobileCartBadge';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SearchBar from '../../components/ui/SearchBar';

// Import components
import OrderCard from './components/OrderCard';
import OrderTimeline from './components/OrderTimeline';
import DeliveryMap from './components/DeliveryMap';
import OrderFilters from './components/OrderFilters';
import CommunicationCenter from './components/CommunicationCenter';
import NotificationSettings from './components/NotificationSettings';

const OrderTracking = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState('timeline');
  const [filters, setFilters] = useState({
    status: 'all',
    timeRange: 'all',
    sortBy: 'newest'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock user data
  const currentUser = {
    id: 1,
    name: "Marie Kabila",
    email: "marie.kabila@email.com",
    phone: "+243 81 234 5678"
  };

  // Mock orders data
  const mockOrders = [
    {
      id: 1,
      orderNumber: "ALK-2025-001",
      orderDate: "2025-01-15T10:30:00Z",
      status: "dispatched",
      vendor: {
        id: 1,
        name: "Boutique Élégance",
        avatar: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=40&h=40&fit=crop&crop=face",
        address: { district: "Gombe", commune: "Gombe" }
      },
      items: [
        {
          id: 1,
          name: "Robe Africaine Traditionnelle",
          image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop",
          quantity: 1,
          price: 45000
        },
        {
          id: 2,
          name: "Collier Perles Dorées",
          image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop",
          quantity: 2,
          price: 15000
        }
      ],
      subtotal: 75000,
      deliveryFee: 5000,
      total: 80000,
      paymentMethod: "Orange Money",
      transactionId: "OM-789456123",
      deliveryAddress: {
        street: "Avenue Tombalbaye 45",
        district: "Lemba",
        commune: "Lemba",
        coordinates: { lat: -4.4419, lng: 15.2663 }
      },
      deliveryInstructions: "Appeler avant d'arriver, portail bleu",
      estimatedDelivery: "2025-01-15T16:00:00Z",
      timeline: {
        confirmed: "2025-01-15T10:30:00Z",
        prepared: "2025-01-15T11:15:00Z",
        dispatched: "2025-01-15T12:00:00Z"
      },
      driver: {
        name: "Jean Mukendi",
        phone: "+243 82 345 6789",
        location: { lat: -4.4319, lng: 15.2563 },
        estimatedArrival: 25,
        distance: 3.2
      }
    },
    {
      id: 2,
      orderNumber: "ALK-2025-002",
      orderDate: "2025-01-14T14:20:00Z",
      status: "delivered",
      vendor: {
        id: 2,
        name: "TechStore Kinshasa",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        address: { district: "Kalamu", commune: "Kalamu" }
      },
      items: [
        {
          id: 3,
          name: "Smartphone Samsung Galaxy A54",
          image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop",
          quantity: 1,
          price: 320000
        }
      ],
      subtotal: 320000,
      deliveryFee: 8000,
      total: 328000,
      paymentMethod: "M-Pesa",
      transactionId: "MP-456789012",
      deliveryAddress: {
        street: "Rue Kasa-Vubu 123",
        district: "Barumbu",
        commune: "Barumbu",
        coordinates: { lat: -4.4519, lng: 15.2763 }
      },
      estimatedDelivery: "2025-01-14T18:00:00Z",
      timeline: {
        confirmed: "2025-01-14T14:20:00Z",
        prepared: "2025-01-14T15:00:00Z",
        dispatched: "2025-01-14T15:30:00Z",
        delivered: "2025-01-14T17:45:00Z"
      }
    },
    {
      id: 3,
      orderNumber: "ALK-2025-003",
      orderDate: "2025-01-13T09:15:00Z",
      status: "prepared",
      vendor: {
        id: 3,
        name: "Marché Bio Kinshasa",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        address: { district: "Ngaliema", commune: "Ngaliema" }
      },
      items: [
        {
          id: 4,
          name: "Panier de Légumes Bio",
          image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=100&h=100&fit=crop",
          quantity: 1,
          price: 25000
        },
        {
          id: 5,
          name: "Fruits Tropicaux Assortis",
          image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=100&h=100&fit=crop",
          quantity: 2,
          price: 18000
        }
      ],
      subtotal: 61000,
      deliveryFee: 4000,
      total: 65000,
      paymentMethod: "Orange Money",
      transactionId: "OM-123789456",
      deliveryAddress: {
        street: "Boulevard du 30 Juin 89",
        district: "Gombe",
        commune: "Gombe",
        coordinates: { lat: -4.4219, lng: 15.2863 }
      },
      estimatedDelivery: "2025-01-13T15:00:00Z",
      timeline: {
        confirmed: "2025-01-13T09:15:00Z",
        prepared: "2025-01-13T10:30:00Z"
      }
    }
  ];

  const [orders, setOrders] = useState(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);

  useEffect(() => {
    // Check for specific order ID in URL params
    const orderId = searchParams?.get('order');
    if (orderId) {
      const order = orders?.find(o => o?.id === parseInt(orderId));
      if (order) {
        setSelectedOrder(order);
      }
    } else if (orders?.length > 0) {
      setSelectedOrder(orders?.[0]);
    }
  }, [searchParams, orders]);

  useEffect(() => {
    // Apply filters
    let filtered = [...orders];

    // Status filter
    if (filters?.status !== 'all') {
      filtered = filtered?.filter(order => order?.status === filters?.status);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered?.filter(order =>
        order?.orderNumber?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        order?.vendor?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        order?.items?.some(item => item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    // Time range filter
    const now = new Date();
    if (filters?.timeRange !== 'all') {
      filtered = filtered?.filter(order => {
        const orderDate = new Date(order.orderDate);
        switch (filters?.timeRange) {
          case 'today':
            return orderDate?.toDateString() === now?.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return orderDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return orderDate >= monthAgo;
          case '3months':
            const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
            return orderDate >= threeMonthsAgo;
          default:
            return true;
        }
      });
    }

    // Sort orders
    filtered?.sort((a, b) => {
      switch (filters?.sortBy) {
        case 'oldest':
          return new Date(a.orderDate) - new Date(b.orderDate);
        case 'amount_high':
          return b?.total - a?.total;
        case 'amount_low':
          return a?.total - b?.total;
        case 'newest':
        default:
          return new Date(b.orderDate) - new Date(a.orderDate);
      }
    });

    setFilteredOrders(filtered);
  }, [orders, filters, searchQuery]);

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    navigate(`/order-tracking?order=${order?.id}`, { replace: true });
  };

  const handleReorder = (order) => {
    // Add items to cart and navigate to checkout
    navigate('/shopping-cart-checkout', {
      state: { reorderItems: order?.items }
    });
  };

  const handleTrackOrder = (order) => {
    setSelectedOrder(order);
    setActiveTab('map');
  };

  const handleContactVendor = (vendor) => {
    // Open communication center
    setActiveTab('communication');
  };

  const handleSendMessage = (recipient, message) => {
    console.log(`Sending message to ${recipient}:`, message);
    // In real app, send message via API
  };

  const handleCallVendor = (vendor) => {
    window.open(`tel:${vendor?.phone || '+243 81 000 0000'}`);
  };

  const handleCallDriver = (driver) => {
    window.open(`tel:${driver?.phone}`);
  };

  const handleRefreshLocation = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleSaveNotificationSettings = (settings) => {
    console.log('Saving notification settings:', settings);
    // In real app, save to user preferences
  };

  const orderCounts = {
    all: orders?.length,
    confirmed: orders?.filter(o => o?.status === 'confirmed')?.length,
    prepared: orders?.filter(o => o?.status === 'prepared')?.length,
    dispatched: orders?.filter(o => o?.status === 'dispatched')?.length,
    delivered: orders?.filter(o => o?.status === 'delivered')?.length,
    cancelled: orders?.filter(o => o?.status === 'cancelled')?.length
  };

  const tabs = [
    { key: 'timeline', label: 'Suivi', icon: 'Clock' },
    { key: 'map', label: 'Carte', icon: 'MapPin' },
    { key: 'communication', label: 'Messages', icon: 'MessageCircle' },
    { key: 'notifications', label: 'Notifications', icon: 'Bell' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background pt-16 lg:pt-20">
      <Header 
        user={currentUser} 
        cartCount={3}
        onNavigate={(path) => navigate(path)}
      />
      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
            <button 
              onClick={() => navigate('/product-discovery')}
              className="hover:text-foreground transition-smooth"
            >
              Accueil
            </button>
            <Icon name="ChevronRight" size={16} />
            <span>Suivi des commandes</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                Mes Commandes
              </h1>
              <p className="text-muted-foreground mt-1">
                Suivez vos commandes en temps réel
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <SearchBar
                onSearch={setSearchQuery}
                placeholder="Rechercher une commande..."
                className="w-full lg:w-80"
              />
              <Button
                variant="outline"
                onClick={() => window.location?.reload()}
                iconName="RefreshCw"
                size="icon"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Orders List */}
          <div className="lg:col-span-4 space-y-4">
            {/* Filters */}
            <OrderFilters
              onFilterChange={setFilters}
              activeFilters={filters}
              orderCounts={orderCounts}
            />

            {/* Orders List */}
            <div className="space-y-4">
              {filteredOrders?.length === 0 ? (
                <div className="bg-card border border-border rounded-lg p-8 text-center">
                  <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium text-foreground mb-2">Aucune commande trouvée</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Aucune commande ne correspond à vos critères de recherche
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/product-discovery')}
                    iconName="ShoppingBag"
                    iconPosition="left"
                  >
                    Commencer vos achats
                  </Button>
                </div>
              ) : (
                filteredOrders?.map((order) => (
                  <OrderCard
                    key={order?.id}
                    order={order}
                    isSelected={selectedOrder?.id === order?.id}
                    onViewDetails={handleOrderSelect}
                    onReorder={handleReorder}
                    onTrackOrder={handleTrackOrder}
                    onContactVendor={handleContactVendor}
                  />
                ))
              )}
            </div>
          </div>

          {/* Right Content - Order Details */}
          <div className="lg:col-span-8">
            {selectedOrder ? (
              <div className="space-y-6">
                {/* Order Header */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        Commande #{selectedOrder?.orderNumber}
                      </h2>
                      <p className="text-muted-foreground">
                        Passée le {new Date(selectedOrder.orderDate)?.toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        onClick={() => handleReorder(selectedOrder)}
                        iconName="RotateCcw"
                        iconPosition="left"
                      >
                        Recommander
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => window.print()}
                        iconName="Printer"
                        iconPosition="left"
                      >
                        Imprimer
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Tabs Navigation */}
<div className="bg-card border border-border rounded-lg">
  <div className="border-b border-border">
    <nav className="flex gap-6 px-4 sm:px-6 overflow-x-auto whitespace-nowrap no-scrollbar">
      {tabs?.map((tab) => (
        <button
          key={tab?.key}
          onClick={() => setActiveTab(tab?.key)}
          className={`flex items-center gap-2 py-4 border-b-2 font-medium text-sm flex-shrink-0 transition-smooth ${
            activeTab === tab?.key
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name={tab?.icon} size={18} />
          <span>{tab?.label}</span>
        </button>
      ))}
    </nav>
  </div>

  {/* Tab Content */}
  <div className="p-6">
    {activeTab === 'timeline' && (
      <OrderTimeline order={selectedOrder} />
    )}
    {activeTab === 'map' && (
      <DeliveryMap 
        order={selectedOrder}
        onRefreshLocation={handleRefreshLocation}
      />
    )}
    {activeTab === 'communication' && (
      <CommunicationCenter
        order={selectedOrder}
        onSendMessage={handleSendMessage}
        onCallVendor={handleCallVendor}
        onCallDriver={handleCallDriver}
      />
    )}
    {activeTab === 'notifications' && (
      <NotificationSettings
        onSaveSettings={handleSaveNotificationSettings}
      />
    )}
  </div>
</div>

              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <Icon name="Package" size={64} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Sélectionnez une commande
                </h3>
                <p className="text-muted-foreground">
                  Choisissez une commande dans la liste pour voir les détails de suivi
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <MobileCartBadge cartCount={3} />
    </div>
  );
};

export default OrderTracking;