import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderTimeline = ({ order }) => {
  const timelineSteps = [
    {
      key: 'confirmed',
      label: 'Commande confirmée',
      description: 'Votre commande a été reçue et confirmée',
      icon: 'CheckCircle'
    },
    {
      key: 'prepared',
      label: 'En préparation',
      description: 'Le vendeur prépare votre commande',
      icon: 'Package'
    },
    {
      key: 'dispatched',
      label: 'Expédiée',
      description: 'Votre commande est en route',
      icon: 'Truck'
    },
    {
      key: 'delivered',
      label: 'Livrée',
      description: 'Commande livrée avec succès',
      icon: 'CheckCircle2'
    }
  ];

  const getStepStatus = (stepKey) => {
    const statusOrder = ['confirmed', 'prepared', 'dispatched', 'delivered'];
    const currentIndex = statusOrder?.indexOf(order?.status);
    const stepIndex = statusOrder?.indexOf(stepKey);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 border-green-200';
      case 'current': return 'text-primary bg-primary/10 border-primary';
      case 'pending': return 'text-gray-400 bg-gray-50 border-gray-200';
      default: return 'text-gray-400 bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString)?.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Suivi de commande</h3>
      <div className="relative">
        {timelineSteps?.map((step, index) => {
          const status = getStepStatus(step?.key);
          const isLast = index === timelineSteps?.length - 1;
          
          return (
            <div key={step?.key} className="relative flex items-start pb-8">
              {/* Connector Line */}
              {!isLast && (
                <div className={`absolute left-6 top-12 w-0.5 h-16 ${
                  status === 'completed' ? 'bg-green-200' : 'bg-gray-200'
                }`} />
              )}
              {/* Step Icon */}
              <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${getStepColor(status)}`}>
                <Icon 
                  name={status === 'completed' ? 'Check' : step?.icon} 
                  size={20} 
                />
              </div>
              {/* Step Content */}
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className={`font-medium ${
                    status === 'pending' ? 'text-muted-foreground' : 'text-foreground'
                  }`}>
                    {step?.label}
                  </h4>
                  {order?.timeline && order?.timeline?.[step?.key] && (
                    <span className="text-sm text-muted-foreground">
                      {formatDate(order?.timeline?.[step?.key])}
                    </span>
                  )}
                </div>
                <p className={`text-sm mt-1 ${
                  status === 'pending' ? 'text-muted-foreground' : 'text-muted-foreground'
                }`}>
                  {step?.description}
                </p>
                
                {/* Additional Info for Current Step */}
                {status === 'current' && (
                  <div className="mt-2 p-3 bg-primary/5 rounded-lg">
                    {step?.key === 'prepared' && (
                      <p className="text-sm text-primary">
                        <Icon name="Clock" size={16} className="inline mr-1" />
                        Temps estimé: 30-45 minutes
                      </p>
                    )}
                    {step?.key === 'dispatched' && order?.driver && (
                      <div className="space-y-1">
                        <p className="text-sm text-primary">
                          <Icon name="User" size={16} className="inline mr-1" />
                          Livreur: {order?.driver?.name}
                        </p>
                        <p className="text-sm text-primary">
                          <Icon name="Phone" size={16} className="inline mr-1" />
                          {order?.driver?.phone}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Estimated Delivery */}
      {order?.estimatedDelivery && order?.status !== 'delivered' && (
        <div className="mt-6 p-4 bg-accent/10 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={18} className="text-accent" />
            <div>
              <p className="font-medium text-foreground">Livraison estimée</p>
              <p className="text-sm text-muted-foreground">
                {new Date(order.estimatedDelivery)?.toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTimeline;