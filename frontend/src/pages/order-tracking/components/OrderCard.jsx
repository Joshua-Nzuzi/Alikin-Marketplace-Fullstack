import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OrderCard = ({ 
  order, 
  onViewDetails, 
  onReorder, 
  onTrackOrder, 
  onContactVendor,
  isSelected = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-blue-600 bg-blue-50';
      case 'prepared': return 'text-yellow-600 bg-yellow-50';
      case 'dispatched': return 'text-purple-600 bg-purple-50';
      case 'delivered': return 'text-green-600 bg-green-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Confirmée';
      case 'prepared': return 'En préparation';
      case 'dispatched': return 'Expédiée';
      case 'delivered': return 'Livrée';
      case 'cancelled': return 'Annulée';
      default: return 'En attente';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-CD', {
      style: 'currency',
      currency: 'CDF',
      minimumFractionDigits: 0
    })?.format(amount);
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-warm transition-smooth hover:shadow-warm-lg ${
      isSelected ? 'ring-2 ring-primary' : ''
    }`}>
      {/* Order Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Package" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">#{order?.orderNumber}</h3>
              <p className="text-sm text-muted-foreground">{formatDate(order?.orderDate)}</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order?.status)}`}>
            {getStatusText(order?.status)}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image 
              src={order?.vendor?.avatar} 
              alt={order?.vendor?.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm font-medium text-foreground">{order?.vendor?.name}</span>
          </div>
          <div className="text-right">
            <p className="font-bold text-foreground">{formatCurrency(order?.total)}</p>
            <p className="text-xs text-muted-foreground">{order?.items?.length} article(s)</p>
          </div>
        </div>
      </div>
      {/* Order Items Preview */}
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          {order?.items?.slice(0, 3)?.map((item, index) => (
            <div key={index} className="relative">
              <Image 
                src={item?.image} 
                alt={item?.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              {item?.quantity > 1 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {item?.quantity}
                </span>
              )}
            </div>
          ))}
          {order?.items?.length > 3 && (
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <span className="text-xs font-medium text-muted-foreground">+{order?.items?.length - 3}</span>
            </div>
          )}
        </div>

        {/* Delivery Info */}
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="MapPin" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{order?.deliveryAddress?.district}, Kinshasa</span>
        </div>

        {/* Estimated Delivery */}
        {order?.estimatedDelivery && order?.status !== 'delivered' && (
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Livraison estimée: {formatDate(order?.estimatedDelivery)}
            </span>
          </div>
        )}

        {/* Payment Method */}
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="CreditCard" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{order?.paymentMethod}</span>
          {order?.transactionId && (
            <span className="text-xs text-muted-foreground">• ID: {order?.transactionId}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onTrackOrder(order)}
            iconName="MapPin"
            iconPosition="left"
          >
            Suivre
          </Button>
          
          {order?.status === 'delivered' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onReorder(order)}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Recommander
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onContactVendor(order?.vendor)}
            iconName="MessageCircle"
            iconPosition="left"
          >
            Contacter
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            Détails
          </Button>
        </div>
      </div>
      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-border p-4 bg-muted/30 animate-slide-in">
          <h4 className="font-medium text-foreground mb-3">Articles commandés</h4>
          <div className="space-y-3">
            {order?.items?.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Image 
                  src={item?.image} 
                  alt={item?.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item?.name}</p>
                  <p className="text-xs text-muted-foreground">Qté: {item?.quantity}</p>
                </div>
                <p className="text-sm font-medium text-foreground">
                  {formatCurrency(item?.price * item?.quantity)}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-3 border-t border-border">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Sous-total:</span>
              <span className="text-foreground">{formatCurrency(order?.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Livraison:</span>
              <span className="text-foreground">{formatCurrency(order?.deliveryFee)}</span>
            </div>
            <div className="flex justify-between text-sm font-medium pt-2 border-t border-border">
              <span className="text-foreground">Total:</span>
              <span className="text-foreground">{formatCurrency(order?.total)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;