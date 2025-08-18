import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const NotificationSettings = ({ onSaveSettings }) => {
  const [settings, setSettings] = useState({
    orderConfirmation: true,
    preparationStart: true,
    orderDispatched: true,
    deliveryArrival: true,
    orderDelivered: true,
    orderCancelled: true,
    promotions: false,
    weeklyDigest: true,
    smsNotifications: true,
    emailNotifications: true,
    pushNotifications: true
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    onSaveSettings(settings);
  };

  const notificationTypes = [
    {
      category: 'Suivi de commande',
      items: [
        {
          key: 'orderConfirmation',
          label: 'Confirmation de commande',
          description: 'Recevoir une notification quand la commande est confirmée'
        },
        {
          key: 'preparationStart',
          label: 'Début de préparation',
          description: 'Être notifié quand le vendeur commence à préparer'
        },
        {
          key: 'orderDispatched',
          label: 'Commande expédiée',
          description: 'Notification quand la commande est en route'
        },
        {
          key: 'deliveryArrival',
          label: 'Arrivée du livreur',
          description: 'Alerte quand le livreur arrive près de chez vous'
        },
        {
          key: 'orderDelivered',
          label: 'Livraison terminée',
          description: 'Confirmation de la livraison réussie'
        },
        {
          key: 'orderCancelled',
          label: 'Annulation de commande',
          description: 'Notification en cas d\'annulation'
        }
      ]
    },
    {
      category: 'Marketing et promotions',
      items: [
        {
          key: 'promotions',
          label: 'Offres spéciales',
          description: 'Recevoir les promotions et réductions'
        },
        {
          key: 'weeklyDigest',
          label: 'Résumé hebdomadaire',
          description: 'Récapitulatif de vos commandes et nouveautés'
        }
      ]
    }
  ];

  const deliveryMethods = [
    {
      key: 'pushNotifications',
      label: 'Notifications push',
      description: 'Notifications dans l\'application mobile',
      icon: 'Smartphone'
    },
    {
      key: 'smsNotifications',
      label: 'SMS',
      description: 'Messages texte sur votre téléphone',
      icon: 'MessageSquare'
    },
    {
      key: 'emailNotifications',
      label: 'Email',
      description: 'Notifications par courrier électronique',
      icon: 'Mail'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Bell" size={20} className="text-primary" />
            <h3 className="font-semibold text-foreground">Préférences de notification</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Personnalisez vos notifications de suivi de commande
        </p>
      </div>
      {/* Quick Settings */}
      <div className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {deliveryMethods?.map((method) => (
            <div
              key={method?.key}
              className={`p-3 rounded-lg border transition-smooth ${
                settings?.[method?.key]
                  ? 'border-primary bg-primary/5' :'border-border hover:border-border/80'
              }`}
            >
              <Checkbox
                checked={settings?.[method?.key]}
                onChange={(e) => handleSettingChange(method?.key, e?.target?.checked)}
                label={
                  <div className="flex items-center space-x-3">
                    <Icon name={method?.icon} size={18} className="text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{method?.label}</p>
                      <p className="text-xs text-muted-foreground">{method?.description}</p>
                    </div>
                  </div>
                }
              />
            </div>
          ))}
        </div>

        {/* Expanded Settings */}
        {isExpanded && (
          <div className="space-y-6 animate-slide-in">
            {notificationTypes?.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h4 className="font-medium text-foreground mb-3">{category?.category}</h4>
                <div className="space-y-3">
                  {category?.items?.map((item) => (
                    <div key={item?.key} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth">
                      <Checkbox
                        checked={settings?.[item?.key]}
                        onChange={(e) => handleSettingChange(item?.key, e?.target?.checked)}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-foreground">{item?.label}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item?.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Quiet Hours */}
            <div className="pt-4 border-t border-border">
              <h4 className="font-medium text-foreground mb-3">Heures de silence</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Début des heures de silence
                  </label>
                  <input
                    type="time"
                    defaultValue="22:00"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Fin des heures de silence
                  </label>
                  <input
                    type="time"
                    defaultValue="07:00"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Aucune notification ne sera envoyée pendant ces heures, sauf pour les urgences
              </p>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-border">
              <Button
                onClick={handleSaveSettings}
                iconName="Save"
                iconPosition="left"
                className="w-full lg:w-auto"
              >
                Enregistrer les préférences
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationSettings;