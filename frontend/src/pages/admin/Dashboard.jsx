import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign, 
  Package, 
  AlertTriangle,
  Activity,
  BarChart3,
  Calendar,
  MapPin
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { 
  MobileCard, 
  ResponsiveGrid, 
  ResponsiveList 
} from '../../components/ui';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 1247,
    totalVendors: 89,
    totalOrders: 3456,
            totalRevenue: 2500000,
    pendingApprovals: 12,
    activeDeliveries: 45
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'order', message: 'Nouvelle commande #ORD-2024-001', time: '2 min ago', status: 'pending' },
    { id: 2, type: 'vendor', message: 'Nouveau vendeur en attente d\'approbation', time: '15 min ago', status: 'warning' },
    { id: 3, type: 'payment', message: 'Paiement Mobile Money confirmé', time: '1h ago', status: 'success' },
    { id: 4, type: 'delivery', message: 'Livraison #DEL-2024-001 complétée', time: '2h ago', status: 'success' },
    { id: 5, type: 'user', message: 'Nouveau utilisateur inscrit', time: '3h ago', status: 'info' }
  ]);

  const [quickActions] = useState([
    { title: 'Approuver Vendeurs', icon: 'Users', count: 5, variant: 'warning' },
    { title: 'Gérer Commandes', icon: 'ShoppingCart', count: 23, variant: 'default' },
    { title: 'Surveiller Paiements', icon: 'DollarSign', count: 8, variant: 'success' },
    { title: 'Modération Contenu', icon: 'AlertTriangle', count: 3, variant: 'destructive' }
  ]);

  const StatCard = ({ title, value, icon: Icon, trend, color = 'primary' }) => (
    <MobileCard padding="default" shadow="mobile">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-xl md:text-2xl font-bold text-foreground">{value}</p>
          {trend && (
            <p className={`text-sm ${trend > 0 ? 'text-success' : 'text-destructive'}`}>
              {trend > 0 ? '+' : ''}{trend}% vs mois dernier
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}/10`}>
          <Icon className={`w-6 h-6 text-${color}`} />
        </div>
      </div>
    </MobileCard>
  );

  const ActivityItem = ({ activity }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'success': return 'text-success';
        case 'warning': return 'text-warning';
        case 'error': return 'text-destructive';
        default: return 'text-muted-foreground';
      }
    };

    const getStatusIcon = (type) => {
      switch (type) {
        case 'order': return <ShoppingCart className="w-4 h-4" />;
        case 'vendor': return <Users className="w-4 h-4" />;
        case 'payment': return <DollarSign className="w-4 h-4" />;
        case 'delivery': return <Package className="w-4 h-4" />;
        case 'user': return <Users className="w-4 h-4" />;
        default: return <Activity className="w-4 h-4" />;
      }
    };

    return (
      <div className="flex items-center space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-colors">
        <div className="flex-shrink-0">
          {getStatusIcon(activity.type)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">{activity.message}</p>
          <p className="text-xs text-muted-foreground">{activity.time}</p>
        </div>
        <div className={`text-xs font-medium ${getStatusColor(activity.status)}`}>
          {activity.status}
        </div>
      </div>
    );
  };

  const QuickActionCard = ({ action }) => (
    <div className="bg-card rounded-lg p-4 border border-border shadow-warm-sm hover:shadow-warm transition-shadow cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full bg-${action.variant}/10`}>
            <div className={`w-5 h-5 text-${action.variant}`}>
              {action.icon === 'Users' && <Users className="w-5 h-5" />}
              {action.icon === 'ShoppingCart' && <ShoppingCart className="w-5 h-5" />}
              {action.icon === 'DollarSign' && <DollarSign className="w-5 h-5" />}
              {action.icon === 'AlertTriangle' && <AlertTriangle className="w-5 h-5" />}
            </div>
          </div>
          <div>
            <h3 className="font-medium text-foreground">{action.title}</h3>
            <p className="text-sm text-muted-foreground">{action.count} en attente</p>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          Gérer
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Tableau de Bord Administrateur</h1>
            <p className="text-muted-foreground">Gestion complète de la plateforme ALIKIN</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" iconName="Calendar">
              Aujourd'hui
            </Button>
            <Button variant="default" iconName="BarChart3">
              Rapport Complet
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Overview */}
        <ResponsiveGrid cols={{ mobile: 1, tablet: 2, desktop: 3, wide: 6 }} gap={{ mobile: 4, tablet: 4, desktop: 4 }}>
          <StatCard 
            title="Utilisateurs Totaux" 
            value={stats.totalUsers.toLocaleString()} 
            icon={Users} 
            trend={12.5}
          />
          <StatCard 
            title="Vendeurs Actifs" 
            value={stats.totalVendors} 
            icon={Users} 
            trend={8.2}
          />
          <StatCard 
            title="Commandes" 
            value={stats.totalOrders.toLocaleString()} 
            icon={ShoppingCart} 
            trend={15.7}
          />
          <StatCard 
            title="Revenus (CDF)" 
            value={stats.totalRevenue.toLocaleString()} 
            icon={DollarSign} 
            trend={22.1}
            color="success"
          />
          <StatCard 
            title="Approbations" 
            value={stats.pendingApprovals} 
            icon={AlertTriangle} 
            trend={-5.3}
            color="warning"
          />
          <StatCard 
            title="Livraisons" 
            value={stats.activeDeliveries} 
            icon={Package} 
            trend={18.9}
            color="accent"
          />
        </ResponsiveGrid>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Actions Rapides</h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <QuickActionCard key={index} action={action} />
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Activité Récente</h2>
              <Button variant="ghost" size="sm">
                Voir Tout
              </Button>
            </div>
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="space-y-2">
                {recentActivity.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* System Health & Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Health */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">État du Système</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Serveur Principal</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm text-success">Opérationnel</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Base de Données</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm text-success">Opérationnel</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">API Mobile Money</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm text-success">Opérationnel</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Service de Livraison</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <span className="text-sm text-warning">Maintenance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Métriques de Performance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Temps de Réponse API</span>
                  <span className="text-sm font-medium text-foreground">125ms</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Taux de Disponibilité</span>
                  <span className="text-sm font-medium text-foreground">99.8%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '99.8%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Utilisation CPU</span>
                  <span className="text-sm font-medium text-foreground">45%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
