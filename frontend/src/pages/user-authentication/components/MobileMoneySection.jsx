import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MobileMoneySection = ({ userType = 'buyer' }) => {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLinking, setIsLinking] = useState(false);

  const mobileMoneyProviders = [
    {
      id: 'orange',
      name: 'Orange Money',
      logo: '/assets/images/Orange_money.png',
      
      prefix: '+243'
    },
    {
      id: 'mpesa',
      name: 'M-Pesa',
      logo: '/assets/images/Mpesa.png',
      prefix: '+243'
    },
  ];

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider);
    setPhoneNumber(provider?.prefix);
  };

  const handleLinkAccount = async () => {
    if (!phoneNumber || phoneNumber?.length < 13) {
      alert('Veuillez entrer un numéro de téléphone valide');
      return;
    }

    setIsLinking(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock success
      alert(`Compte ${selectedProvider?.name} lié avec succès !`);
      setSelectedProvider(null);
      setPhoneNumber('');
    } catch (error) {
      alert('Erreur lors de la liaison du compte. Veuillez réessayer.');
    } finally {
      setIsLinking(false);
    }
  };

  return (
    <div className="bg-muted/50 rounded-lg p-6 mt-8">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="Smartphone" size={20} color="white" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Mobile Money</h3>
          <p className="text-sm text-muted-foreground">
            {userType === 'buyer' ?'Liez votre compte pour des paiements rapides' :'Configurez vos comptes pour recevoir les paiements'
            }
          </p>
        </div>
      </div>
      {!selectedProvider ? (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground mb-4">
            Choisissez votre fournisseur Mobile Money :
          </p>
          
          {mobileMoneyProviders?.map((provider) => (
            <button
              key={provider?.id}
              onClick={() => handleProviderSelect(provider)}
              className="w-full flex items-center space-x-4 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-smooth animate-scale-press"
            >
              <div className={`w-12 h-12 ${provider?.color} rounded-lg flex items-center justify-center overflow-hidden`}>
                <img 
                  src={provider?.logo} 
                  alt={provider?.name}
                  className="w-8 h-8 object-cover rounded"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center" style={{display: 'none'}}>
                  <Icon name="Smartphone" size={16} color="white" />
                </div>
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">{provider?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {userType === 'buyer' ? 'Paiements instantanés' : 'Recevez vos paiements'}
                </p>
              </div>
              <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center space-x-3 mb-4">
            <button
              onClick={() => setSelectedProvider(null)}
              className="text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name="ArrowLeft" size={20} />
            </button>
            <div className={`w-8 h-8 ${selectedProvider?.color} rounded flex items-center justify-center`}>
              <Icon name="Smartphone" size={16} color="white" />
            </div>
            <span className="font-medium">{selectedProvider?.name}</span>
          </div>

          <Input
            label="Numéro de téléphone"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e?.target?.value)}
            placeholder="+243123456789"
            description="Entrez le numéro associé à votre compte Mobile Money"
          />

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setSelectedProvider(null)}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              variant="default"
              onClick={handleLinkAccount}
              loading={isLinking}
              className="flex-1"
              iconName="Link"
              iconPosition="left"
            >
              {isLinking ? 'Liaison...' : 'Lier le compte'}
            </Button>
          </div>
        </div>
      )}
      <div className="mt-6 p-4 bg-accent/10 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-accent mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Sécurisé et fiable</p>
            <p className="text-xs text-muted-foreground mt-1">
              Vos informations de paiement sont protégées par un chiffrement de niveau bancaire.
              Alikin ne stocke jamais vos codes PIN ou mots de passe Mobile Money.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMoneySection;