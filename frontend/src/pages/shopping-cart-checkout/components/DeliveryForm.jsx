import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DeliveryForm = ({ 
  deliveryInfo, 
  onDeliveryInfoChange, 
  onDeliveryZoneChange,
  errors = {} 
}) => {
  const [selectedZone, setSelectedZone] = useState(deliveryInfo?.zone || '');

  const kinshasaZones = [
    { value: 'gombe', label: 'Gombe', fee: 2000 },
    { value: 'kinshasa', label: 'Kinshasa', fee: 2500 },
    { value: 'lemba', label: 'Lemba', fee: 3000 },
    { value: 'limete', label: 'Limete', fee: 2500 },
    { value: 'matete', label: 'Matete', fee: 3500 },
    { value: 'ngaliema', label: 'Ngaliema', fee: 2000 },
    { value: 'bandalungwa', label: 'Bandalungwa', fee: 3000 },
    { value: 'selembao', label: 'Selembao', fee: 4000 },
    { value: 'mont-ngafula', label: 'Mont-Ngafula', fee: 4500 },
    { value: 'ngaba', label: 'Ngaba', fee: 3500 },
    { value: 'makala', label: 'Makala', fee: 3500 },
    { value: 'kintambo', label: 'Kintambo', fee: 2500 }
  ];

  const deliveryTimeSlots = [
    { value: 'morning', label: '8h00 - 12h00 (Matin)' },
    { value: 'afternoon', label: '12h00 - 17h00 (Après-midi)' },
    { value: 'evening', label: '17h00 - 20h00 (Soir)' },
    { value: 'flexible', label: 'Flexible (Toute la journée)' }
  ];

  useEffect(() => {
    if (selectedZone) {
      const zone = kinshasaZones?.find(z => z?.value === selectedZone);
      if (zone) {
        onDeliveryZoneChange(zone);
      }
    }
  }, [selectedZone, onDeliveryZoneChange]);

  const handleInputChange = (field, value) => {
    onDeliveryInfoChange({
      ...deliveryInfo,
      [field]: value
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-CD', {
      style: 'currency',
      currency: 'CDF',
      minimumFractionDigits: 0
    })?.format(price);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Icon name="MapPin" size={16} color="white" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          Informations de livraison
        </h3>
      </div>
      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nom complet"
          type="text"
          placeholder="Votre nom complet"
          value={deliveryInfo?.fullName || ''}
          onChange={(e) => handleInputChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          required
        />

        <Input
          label="Numéro de téléphone"
          type="tel"
          placeholder="+243 XXX XXX XXX"
          value={deliveryInfo?.phone || ''}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          error={errors?.phone}
          required
        />
      </div>
      {/* Delivery Zone */}
      <Select
        label="Zone de livraison"
        placeholder="Sélectionnez votre commune"
        options={kinshasaZones}
        value={selectedZone}
        onChange={setSelectedZone}
        error={errors?.zone}
        required
        className="mb-4"
      />
      {selectedZone && (
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Truck" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Frais de livraison pour {kinshasaZones?.find(z => z?.value === selectedZone)?.label}
              </span>
            </div>
            <span className="font-medium text-foreground">
              {formatPrice(kinshasaZones?.find(z => z?.value === selectedZone)?.fee || 0)}
            </span>
          </div>
        </div>
      )}
      {/* Address Details */}
      <div className="space-y-4">
        <Input
          label="Adresse complète"
          type="text"
          placeholder="Avenue, rue, numéro de maison"
          value={deliveryInfo?.address || ''}
          onChange={(e) => handleInputChange('address', e?.target?.value)}
          error={errors?.address}
          required
        />

        <Input
          label="Point de repère"
          type="text"
          placeholder="Près de... (optionnel)"
          value={deliveryInfo?.landmark || ''}
          onChange={(e) => handleInputChange('landmark', e?.target?.value)}
          description="Aidez le livreur à vous trouver facilement"
        />
      </div>
      {/* Delivery Preferences */}
      <div className="space-y-4">
        <Select
          label="Créneau de livraison préféré"
          placeholder="Choisissez votre créneau"
          options={deliveryTimeSlots}
          value={deliveryInfo?.timeSlot || ''}
          onChange={(value) => handleInputChange('timeSlot', value)}
          error={errors?.timeSlot}
        />

        <Input
          label="Instructions spéciales"
          type="text"
          placeholder="Instructions pour le livreur (optionnel)"
          value={deliveryInfo?.instructions || ''}
          onChange={(e) => handleInputChange('instructions', e?.target?.value)}
          description="Étage, code d'accès, etc."
        />
      </div>
      {/* Delivery Estimate */}
      {selectedZone && (
        <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
          <div className="flex items-start gap-3">
            <Icon name="Clock" size={20} className="text-accent mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">
                Estimation de livraison
              </h4>
              <p className="text-sm text-muted-foreground">
                Livraison prévue dans les <strong>2-4 heures</strong> pour votre zone.
                Vous recevrez un SMS de confirmation avec le suivi de votre commande.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryForm;