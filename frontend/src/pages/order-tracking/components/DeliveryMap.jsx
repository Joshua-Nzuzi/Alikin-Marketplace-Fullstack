import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeliveryMap = ({ order, onRefreshLocation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const handleRefreshLocation = async () => {
    setIsLoading(true);
    await onRefreshLocation();
    setLastUpdated(new Date());
    setIsLoading(false);
  };

  // Mock coordinates for Kinshasa
  const kinshasaCenter = { lat: -4.4419, lng: 15.2663 };
  const deliveryLocation = order?.deliveryAddress?.coordinates || kinshasaCenter;
  const driverLocation = order?.driver?.location || kinshasaCenter;

  const mapSrc = `https://www.google.com/maps?q=${deliveryLocation?.lat},${deliveryLocation?.lng}&z=14&output=embed`;

  const formatTime = (date) => {
    return date?.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Map Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={20} className="text-primary" />
            <h3 className="font-semibold text-foreground">Suivi en temps réel</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefreshLocation}
            loading={isLoading}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Actualiser
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Dernière mise à jour: {formatTime(lastUpdated)}
        </p>
      </div>
      {/* Map Container */}
      <div className="relative">
        <div className="w-full h-64 lg:h-80">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Localisation de livraison"
            referrerPolicy="no-referrer-when-downgrade"
            src={mapSrc}
            className="border-0"
          />
        </div>
        
        {/* Map Overlay Info */}
        {order?.status === 'dispatched' && order?.driver && (
          <div className="absolute top-4 left-4 right-4">
            <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-warm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Truck" size={18} color="white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{order?.driver?.name}</p>
                  <p className="text-xs text-muted-foreground">En route vers vous</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-primary">~{order?.driver?.estimatedArrival} min</p>
                  <p className="text-xs text-muted-foreground">Distance: {order?.driver?.distance} km</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Location Details */}
      <div className="p-4 space-y-3">
        {/* Delivery Address */}
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
            <Icon name="MapPin" size={16} className="text-green-600" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground text-sm">Adresse de livraison</p>
            <p className="text-sm text-muted-foreground">
              {order?.deliveryAddress?.street}, {order?.deliveryAddress?.district}
            </p>
            <p className="text-sm text-muted-foreground">
              Kinshasa, {order?.deliveryAddress?.commune}
            </p>
          </div>
        </div>

        {/* Vendor Location */}
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
            <Icon name="Store" size={16} className="text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground text-sm">Point de départ</p>
            <p className="text-sm text-muted-foreground">
              {order?.vendor?.address?.district}, Kinshasa
            </p>
          </div>
        </div>

        {/* Driver Info (when dispatched) */}
        {order?.status === 'dispatched' && order?.driver && (
          <div className="flex items-start space-x-3 p-3 bg-accent/5 rounded-lg">
            <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center mt-0.5">
              <Icon name="User" size={16} className="text-accent" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground text-sm">Votre livreur</p>
              <p className="text-sm text-muted-foreground">{order?.driver?.name}</p>
              <p className="text-sm text-muted-foreground">{order?.driver?.phone}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`tel:${order?.driver?.phone}`)}
              iconName="Phone"
            />
          </div>
        )}

        {/* Delivery Instructions */}
        {order?.deliveryInstructions && (
          <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
            <Icon name="MessageSquare" size={16} className="text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium text-foreground text-sm">Instructions de livraison</p>
              <p className="text-sm text-muted-foreground">{order?.deliveryInstructions}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryMap;