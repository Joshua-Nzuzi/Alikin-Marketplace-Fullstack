import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onAction = () => {} }) => {
  const actions = [
    {
      id: 'add_product',
      title: 'Ajouter Produit',
      description: 'Créer un nouveau produit',
      icon: 'Plus',
      color: 'primary',
      shortcut: 'Ctrl+N'
    },
    {
      id: 'manage_inventory',
      title: 'Gérer Stock',
      description: 'Mettre à jour l\'inventaire',
      icon: 'Archive',
      color: 'accent',
      shortcut: 'Ctrl+I'
    },
    {
      id: 'view_messages',
      title: 'Messages',
      description: 'Répondre aux clients',
      icon: 'MessageCircle',
      color: 'success',
      badge: 3
    },
    {
      id: 'payment_settings',
      title: 'Paiements',
      description: 'Configurer Mobile Money',
      icon: 'CreditCard',
      color: 'warning'
    },
    {
      id: 'promotions',
      title: 'Promotions',
      description: 'Créer des offres',
      icon: 'Tag',
      color: 'secondary'
    },
    {
      id: 'analytics',
      title: 'Rapports',
      description: 'Voir les statistiques',
      icon: 'BarChart3',
      color: 'muted'
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20';
      case 'accent':
        return 'bg-accent/10 text-accent border-accent/20 hover:bg-accent/20';
      case 'success':
        return 'bg-success/10 text-success border-success/20 hover:bg-success/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20 hover:bg-warning/20';
      case 'secondary':
        return 'bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20';
      default:
        return 'bg-muted text-muted-foreground border-border hover:bg-muted/80';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold">Actions Rapides</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Gérez votre boutique efficacement
        </p>
      </div>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => onAction(action?.id)}
            className={`relative p-4 rounded-lg border text-left transition-smooth animate-scale-press ${getColorClasses(action?.color)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Icon name={action?.icon} size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm">{action?.title}</h4>
                  <p className="text-xs opacity-80 mt-1">{action?.description}</p>
                  {action?.shortcut && (
                    <p className="text-xs opacity-60 mt-2 font-mono">{action?.shortcut}</p>
                  )}
                </div>
              </div>
              
              {action?.badge && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {action?.badge}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <Button variant="outline" size="sm" className="w-full">
          <Icon name="Settings" size={16} className="mr-2" />
          Personnaliser les actions
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;