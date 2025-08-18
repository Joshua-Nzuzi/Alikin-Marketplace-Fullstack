import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentOrdersTable = ({ orders = [], onViewOrder = () => {}, onUpdateStatus = () => {} }) => {
  const [selectedOrders, setSelectedOrders] = useState([]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'confirmed':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'delivered':
        return 'bg-success/10 text-success border-success/20';
      case 'cancelled':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'confirmed':
        return 'Confirmée';
      case 'delivered':
        return 'Livrée';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev?.includes(orderId) 
        ? prev?.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders?.length === orders?.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders?.map(order => order?.id));
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (orders?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Aucune commande récente</h3>
        <p className="text-muted-foreground mb-4">
          Vos nouvelles commandes apparaîtront ici
        </p>
        <Button variant="outline" onClick={() => window.location.href = '/product-discovery'}>
          <Icon name="Eye" size={16} className="mr-2" />
          Voir le marketplace
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Commandes Récentes</h3>
          {selectedOrders?.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedOrders?.length} sélectionnée(s)
              </span>
              <Button variant="outline" size="sm">
                <Icon name="Check" size={14} className="mr-1" />
                Confirmer
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4">
                <input
                  type="checkbox"
                  checked={selectedOrders?.length === orders?.length}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Commande</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Client</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Produits</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Total</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Statut</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order?.id} className="border-b border-border hover:bg-muted/30 transition-smooth">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedOrders?.includes(order?.id)}
                    onChange={() => handleSelectOrder(order?.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <div className="font-medium text-sm">#{order?.id}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground text-xs font-medium">
                        {order?.customer?.name?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-sm">{order?.customer?.name}</div>
                      <div className="text-xs text-muted-foreground">{order?.customer?.phone}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm">
                    {order?.items?.length} produit{order?.items?.length > 1 ? 's' : ''}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {order?.items?.[0]?.name}
                    {order?.items?.length > 1 && ` +${order?.items?.length - 1} autre${order?.items?.length > 2 ? 's' : ''}`}
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-sm font-mono">{order?.total} FC</div>
                  <div className="text-xs text-muted-foreground">{order?.paymentMethod}</div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order?.status)}`}>
                    {getStatusText(order?.status)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="text-sm">{formatDate(order?.createdAt)}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewOrder(order?.id)}
                    >
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onUpdateStatus(order?.id, 'confirmed')}
                      disabled={order?.status !== 'pending'}
                    >
                      <Icon name="Check" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Affichage de {orders?.length} commandes
          </span>
          <Button variant="outline" size="sm">
            <Icon name="ExternalLink" size={14} className="mr-2" />
            Voir toutes les commandes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecentOrdersTable;