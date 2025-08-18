import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InventoryAlerts = ({ alerts = [], onRestock = () => {}, onViewProduct = () => {} }) => {
  const getAlertIcon = (type) => {
    switch (type) {
      case 'out_of_stock':
        return 'AlertTriangle';
      case 'low_stock':
        return 'AlertCircle';
      case 'expiring':
        return 'Clock';
      default:
        return 'Info';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'out_of_stock':
        return 'text-error bg-error/10 border-error/20';
      case 'low_stock':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'expiring':
        return 'text-accent bg-accent/10 border-accent/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getAlertTitle = (type) => {
    switch (type) {
      case 'out_of_stock':
        return 'Rupture de stock';
      case 'low_stock':
        return 'Stock faible';
      case 'expiring':
        return 'Expire bientôt';
      default:
        return 'Alerte';
    }
  };

  if (alerts?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Alertes Inventaire</h3>
          <div className="p-2 bg-success/10 text-success rounded-lg border border-success/20">
            <Icon name="CheckCircle" size={20} />
          </div>
        </div>
        <div className="text-center py-4">
          <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Aucune alerte d'inventaire</p>
          <p className="text-sm text-muted-foreground mt-1">
            Tous vos produits sont bien approvisionnés
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Alertes Inventaire</h3>
          <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full font-medium">
            {alerts?.length}
          </span>
        </div>
      </div>
      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {alerts?.map((alert) => (
          <div
            key={alert?.id}
            className={`flex items-start space-x-3 p-3 rounded-lg border ${getAlertColor(alert?.type)}`}
          >
            <div className="flex-shrink-0 mt-0.5">
              <Icon name={getAlertIcon(alert?.type)} size={18} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{getAlertTitle(alert?.type)}</h4>
                  <p className="text-sm font-medium mt-1">{alert?.productName}</p>
                  <p className="text-xs opacity-80 mt-1">{alert?.message}</p>
                  
                  {alert?.currentStock !== undefined && (
                    <div className="flex items-center space-x-4 mt-2 text-xs">
                      <span>Stock actuel: <strong>{alert?.currentStock}</strong></span>
                      {alert?.minStock && (
                        <span>Minimum: <strong>{alert?.minStock}</strong></span>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-1 ml-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewProduct(alert?.productId)}
                    className="h-8 w-8 p-0"
                  >
                    <Icon name="Eye" size={14} />
                  </Button>
                  
                  {alert?.type !== 'expiring' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRestock(alert?.productId)}
                      className="h-8 w-8 p-0"
                    >
                      <Icon name="Plus" size={14} />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <Button variant="outline" size="sm" className="w-full">
          <Icon name="Package" size={16} className="mr-2" />
          Gérer l'inventaire
        </Button>
      </div>
    </div>
  );
};

export default InventoryAlerts;