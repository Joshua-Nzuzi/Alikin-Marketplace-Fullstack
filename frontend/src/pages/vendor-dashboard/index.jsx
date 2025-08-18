import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import VendorSidebar from '../../components/ui/VendorSidebar';
import MobileCartBadge from '../../components/ui/MobileCartBadge';
import MetricsCard from './components/MetricsCard';
import RecentOrdersTable from './components/RecentOrdersTable';
import InventoryAlerts from './components/InventoryAlerts';
import PerformanceChart from './components/PerformanceChart';
import QuickActions from './components/QuickActions';
import MobileMoneyTracker from './components/MobileMoneyTracker';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const VendorDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [dashboardData, setDashboardData] = useState({});
  const navigate = useNavigate();

  // Mock vendor data
  const mockVendorData = {
    businessName: "Boutique Mama Ngozi",
    category: "Mode & Accessoires",
    email: "mama.ngozi@alikin.cd",
    phone: "+243 812 345 678",
    address: "Avenue Kasa-Vubu, Kinshasa",
    joinedDate: "2024-01-15",
    verified: true
  };

  // Mock business metrics
  const mockBusinessMetrics = {
    pendingOrders: 8,
    newOrders: 3,
    todayOrders: 12,
    monthlyRevenue: "2,450,000",
    activeProducts: 45,
    totalSales: 156,
    totalRevenue: 8750000,
    averageOrderValue: 56089,
    customerSatisfaction: 4.8
  };

  // Mock recent orders
  const mockRecentOrders = [
    {
      id: "ORD-2024-001",
      customer: {
        name: "Marie Kabila",
        phone: "+243 998 123 456"
      },
      items: [
        { name: "Robe Wax Moderne", quantity: 1, price: 45000 }
      ],
      total: 45000,
      status: "pending",
      paymentMethod: "Orange Money",
      createdAt: new Date(Date.now() - 1800000) // 30 minutes ago
    },
    {
      id: "ORD-2024-002",
      customer: {
        name: "Jean Mukendi",
        phone: "+243 897 654 321"
      },
      items: [
        { name: "Chemise Homme", quantity: 2, price: 25000 },
        { name: "Pantalon Classique", quantity: 1, price: 35000 }
      ],
      total: 85000,
      status: "confirmed",
      paymentMethod: "M-Pesa",
      createdAt: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
      id: "ORD-2024-003",
      customer: {
        name: "Grace Mbuyi",
        phone: "+243 812 987 654"
      },
      items: [
        { name: "Sac à Main Cuir", quantity: 1, price: 65000 }
      ],
      total: 65000,
      status: "delivered",
      paymentMethod: "Orange Money",
      createdAt: new Date(Date.now() - 7200000) // 2 hours ago
    }
  ];

  // Mock inventory alerts
  const mockInventoryAlerts = [
    {
      id: "ALERT-001",
      type: "out_of_stock",
      productId: "PROD-001",
      productName: "Robe Wax Traditionnelle",
      message: "Ce produit est en rupture de stock",
      currentStock: 0,
      minStock: 5
    },
    {
      id: "ALERT-002",
      type: "low_stock",
      productId: "PROD-002",
      productName: "Chaussures Femme Élégantes",
      message: "Stock faible - réapprovisionnement recommandé",
      currentStock: 2,
      minStock: 10
    },
    {
      id: "ALERT-003",
      type: "low_stock",
      productId: "PROD-003",
      productName: "Bijoux Artisanaux",
      message: "Stock critique",
      currentStock: 1,
      minStock: 8
    }
  ];

  // Mock performance data
  const mockPerformanceData = [
    { date: '08/01', sales: 12, orders: 8, revenue: 340000 },
    { date: '09/01', sales: 19, orders: 12, revenue: 520000 },
    { date: '10/01', sales: 8, orders: 5, revenue: 280000 },
    { date: '11/01', sales: 25, orders: 18, revenue: 680000 },
    { date: '12/01', sales: 22, orders: 15, revenue: 590000 },
    { date: '13/01', sales: 30, orders: 22, revenue: 750000 },
    { date: '14/01', sales: 28, orders: 20, revenue: 720000 }
  ];

  // Mock Mobile Money transactions
  const mockMobileMoneyTransactions = [
    {
      id: "TXN-001",
      orderId: "ORD-2024-001",
      provider: "orange_money",
      amount: 45000,
      fees: 450,
      status: "completed",
      customerPhone: "+243 998 123 456",
      createdAt: new Date(Date.now() - 1800000)
    },
    {
      id: "TXN-002",
      orderId: "ORD-2024-002",
      provider: "m_pesa",
      amount: 85000,
      fees: 850,
      status: "completed",
      customerPhone: "+243 897 654 321",
      createdAt: new Date(Date.now() - 3600000)
    },
    {
      id: "TXN-003",
      orderId: "ORD-2024-003",
      provider: "orange_money",
      amount: 65000,
      fees: 650,
      status: "pending",
      customerPhone: "+243 812 987 654",
      createdAt: new Date(Date.now() - 7200000)
    }
  ];

  useEffect(() => {
    // Simulate loading and data fetching
    const timer = setTimeout(() => {
      setCurrentUser({
        name: mockVendorData?.businessName,
        email: mockVendorData?.email,
        role: 'vendor'
      });
      
      setDashboardData({
        vendor: mockVendorData,
        metrics: mockBusinessMetrics,
        orders: mockRecentOrders,
        alerts: mockInventoryAlerts,
        performance: mockPerformanceData,
        transactions: mockMobileMoneyTransactions
      });
      
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'add_product': navigate('/vendor-dashboard/products/add');
        break;
      case 'manage_inventory': navigate('/vendor-dashboard/inventory');
        break;
      case 'view_messages': navigate('/vendor-dashboard/messages');
        break;
      case 'payment_settings': navigate('/vendor-dashboard/settings/payments');
        break;
      case 'promotions': navigate('/vendor-dashboard/promotions');
        break;
      case 'analytics': navigate('/vendor-dashboard/reports');
        break;
      default:
        console.log('Action:', actionId);
    }
  };

  const handleViewOrder = (orderId) => {
    navigate(`/order-tracking?order=${orderId}`);
  };

  const handleUpdateOrderStatus = (orderId, status) => {
    console.log('Update order status:', orderId, status);
    // In real app, this would update the order status
  };

  const handleRestock = (productId) => {
    navigate(`/vendor-dashboard/inventory?product=${productId}`);
  };

  const handleViewProduct = (productId) => {
    navigate(`/vendor-dashboard/products/${productId}`);
  };

  const handleExportTransactions = () => {
    console.log('Export transactions');
    // In real app, this would export transaction data
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Icon name="Store" size={32} color="white" />
          </div>
          <p className="text-lg font-semibold">Chargement du tableau de bord...</p>
          <p className="text-sm text-muted-foreground mt-1">Préparation de vos données</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        user={currentUser} 
        onNavigate={handleNavigation}
      />
      {/* Sidebar */}
      <VendorSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={handleSidebarToggle}
        vendorData={dashboardData?.vendor}
        businessMetrics={dashboardData?.metrics}
      />
      {/* Main Content */}
      <main className={`lg:pl-${sidebarCollapsed ? '16' : '64'} transition-all duration-300`}>
        <div className="container mx-auto px-4 py-6 lg:py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Bonjour, {dashboardData?.vendor?.businessName} 👋
                </h1>
                <p className="text-muted-foreground mt-1">
                  Voici un aperçu de votre activité aujourd'hui
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" onClick={() => navigate('/product-discovery')}>
                  <Icon name="Eye" size={16} className="mr-2" />
                  Voir ma boutique
                </Button>
                <Button onClick={() => handleQuickAction('add_product')}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Ajouter produit
                </Button>
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricsCard
              title="Ventes Totales"
              value={dashboardData?.metrics?.totalSales}
              change="+12%"
              changeType="positive"
              icon="TrendingUp"
              color="primary"
            />
            <MetricsCard
              title="Revenus du Mois"
              value={`${dashboardData?.metrics?.monthlyRevenue} FC`}
              change="+8%"
              changeType="positive"
              icon="DollarSign"
              color="success"
            />
            <MetricsCard
              title="Commandes en Attente"
              value={dashboardData?.metrics?.pendingOrders}
              change="+3"
              changeType="positive"
              icon="Clock"
              color="warning"
            />
            <MetricsCard
              title="Satisfaction Client"
              value={`${dashboardData?.metrics?.customerSatisfaction}/5`}
              change="+0.2"
              changeType="positive"
              icon="Star"
              color="success"
            />
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Recent Orders - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <RecentOrdersTable
                orders={dashboardData?.orders}
                onViewOrder={handleViewOrder}
                onUpdateStatus={handleUpdateOrderStatus}
              />
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <QuickActions onAction={handleQuickAction} />
              
              {/* Inventory Alerts */}
              <InventoryAlerts
                alerts={dashboardData?.alerts}
                onRestock={handleRestock}
                onViewProduct={handleViewProduct}
              />
            </div>
          </div>

          {/* Performance and Mobile Money */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Performance Chart */}
            <PerformanceChart
              data={dashboardData?.performance}
              type="sales"
              period="7d"
            />

            {/* Mobile Money Tracker */}
            <MobileMoneyTracker
              transactions={dashboardData?.transactions}
              totalEarnings={dashboardData?.metrics?.totalRevenue}
              onExport={handleExportTransactions}
            />
          </div>

          {/* Additional Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Icon name="Package" size={32} className="text-primary mx-auto mb-3" />
              <p className="text-2xl font-bold text-foreground">{dashboardData?.metrics?.activeProducts}</p>
              <p className="text-sm text-muted-foreground">Produits Actifs</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Icon name="Users" size={32} className="text-accent mx-auto mb-3" />
              <p className="text-2xl font-bold text-foreground">1,247</p>
              <p className="text-sm text-muted-foreground">Clients Totaux</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Icon name="MapPin" size={32} className="text-success mx-auto mb-3" />
              <p className="text-2xl font-bold text-foreground">15</p>
              <p className="text-sm text-muted-foreground">Zones de Livraison</p>
            </div>
          </div>
        </div>

        {/* Mobile spacing for bottom navigation */}
        <div className="h-20 lg:hidden"></div>
      </main>
      {/* Mobile Cart Badge */}
      <MobileCartBadge cartCount={0} />
    </div>
  );
};

export default VendorDashboard;