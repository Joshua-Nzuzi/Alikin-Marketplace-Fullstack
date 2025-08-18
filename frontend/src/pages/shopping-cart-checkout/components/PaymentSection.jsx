import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const PaymentSection = ({ 
  selectedPaymentMethod, 
  onPaymentMethodChange, 
  paymentDetails, 
  onPaymentDetailsChange,
  onProcessPayment,
  isProcessing,
  errors = {} 
}) => {
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);

  const paymentMethods = [
    {
      id: 'orange-money',
      name: 'Orange Money',
      icon: 'Smartphone',
      description: 'Paiement sécurisé via Orange Money',
      color: 'bg-orange-500',
      textColor: 'text-white',
      popular: true
    },
    {
      id: 'm-pesa',
      name: 'M-Pesa',
      icon: 'CreditCard',
      description: 'Paiement mobile M-Pesa',
      color: 'bg-green-600',
      textColor: 'text-white',
      popular: true
    },
    {
      id: 'cash-delivery',
      name: 'Paiement à la livraison',
      icon: 'Banknote',
      description: 'Payez en espèces lors de la réception',
      color: 'bg-muted',
      textColor: 'text-foreground',
      popular: false
    }
  ];

  const handlePaymentMethodSelect = (methodId) => {
    onPaymentMethodChange(methodId);
    setShowPaymentDetails(methodId !== 'cash-delivery');
  };

  const handlePaymentDetailChange = (field, value) => {
    onPaymentDetailsChange({
      ...paymentDetails,
      [field]: value
    });
  };

  const renderPaymentForm = () => {
    if (!selectedPaymentMethod || selectedPaymentMethod === 'cash-delivery') {
      return null;
    }

    if (selectedPaymentMethod === 'orange-money') {
      return (
        <div className="space-y-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">OM</span>
            </div>
            <span className="font-medium text-orange-800">Orange Money</span>
          </div>
          <Input
            label="Numéro Orange Money"
            type="tel"
            placeholder="+243 XXX XXX XXX"
            value={paymentDetails?.phoneNumber || ''}
            onChange={(e) => handlePaymentDetailChange('phoneNumber', e?.target?.value)}
            error={errors?.phoneNumber}
            required
          />
          <div className="text-sm text-orange-700 bg-orange-100 p-3 rounded-lg">
            <div className="flex items-start gap-2">
              <Icon name="Info" size={16} className="mt-0.5" />
              <div>
                <p className="font-medium mb-1">Instructions de paiement:</p>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>Composez #144# sur votre téléphone</li>
                  <li>Sélectionnez "Transfert d'argent"</li>
                  <li>Entrez le code marchand qui vous sera envoyé</li>
                  <li>Confirmez le montant et validez avec votre PIN</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (selectedPaymentMethod === 'm-pesa') {
      return (
        <div className="space-y-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">M</span>
            </div>
            <span className="font-medium text-green-800">M-Pesa</span>
          </div>
          <Input
            label="Numéro M-Pesa"
            type="tel"
            placeholder="+243 XXX XXX XXX"
            value={paymentDetails?.phoneNumber || ''}
            onChange={(e) => handlePaymentDetailChange('phoneNumber', e?.target?.value)}
            error={errors?.phoneNumber}
            required
          />
          <div className="text-sm text-green-700 bg-green-100 p-3 rounded-lg">
            <div className="flex items-start gap-2">
              <Icon name="Info" size={16} className="mt-0.5" />
              <div>
                <p className="font-medium mb-1">Instructions de paiement:</p>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>Vous recevrez un SMS avec les détails de paiement</li>
                  <li>Suivez les instructions dans le SMS</li>
                  <li>Entrez votre PIN M-Pesa pour confirmer</li>
                  <li>Vous recevrez une confirmation de transaction</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Icon name="CreditCard" size={16} color="white" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          Mode de paiement
        </h3>
      </div>
      {/* Payment Methods */}
      <div className="space-y-3">
        {paymentMethods?.map((method) => (
          <div key={method?.id} className="relative">
            <button
              onClick={() => handlePaymentMethodSelect(method?.id)}
              className={`w-full p-4 border-2 rounded-lg text-left transition-smooth hover:border-primary/50 ${
                selectedPaymentMethod === method?.id
                  ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${method?.color} rounded-lg flex items-center justify-center`}>
                    {method?.id === 'orange-money' ? (
                      <span className={`${method?.textColor} text-sm font-bold`}>OM</span>
                    ) : method?.id === 'm-pesa' ? (
                      <span className={`${method?.textColor} text-sm font-bold`}>M</span>
                    ) : (
                      <Icon name={method?.icon} size={20} className={method?.textColor} />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{method?.name}</span>
                      {method?.popular && (
                        <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                          Populaire
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{method?.description}</p>
                  </div>
                </div>
                
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedPaymentMethod === method?.id
                    ? 'border-primary bg-primary' :'border-muted-foreground'
                }`}>
                  {selectedPaymentMethod === method?.id && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>
      {/* Payment Form */}
      {showPaymentDetails && renderPaymentForm()}
      {/* Cash on Delivery Info */}
      {selectedPaymentMethod === 'cash-delivery' && (
        <div className="p-4 bg-muted border border-border rounded-lg">
          <div className="flex items-start gap-3">
            <Icon name="Banknote" size={20} className="text-muted-foreground mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-2">
                Paiement à la livraison
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Payez en espèces lors de la réception de votre commande</li>
                <li>• Préparez le montant exact si possible</li>
                <li>• Vérifiez votre commande avant le paiement</li>
                <li>• Des frais supplémentaires de 500 FC s'appliquent</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {/* Security Notice */}
      <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="Shield" size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">
              Paiement sécurisé
            </h4>
            <p className="text-sm text-muted-foreground">
              Vos informations de paiement sont protégées par un cryptage SSL. 
              Nous ne stockons jamais vos données de paiement.
            </p>
          </div>
        </div>
      </div>
      {/* Process Payment Button */}
      {selectedPaymentMethod && (
        <Button
          variant="default"
          size="lg"
          fullWidth
          loading={isProcessing}
          onClick={onProcessPayment}
          disabled={!selectedPaymentMethod || (showPaymentDetails && !paymentDetails?.phoneNumber)}
          className="mt-6"
        >
          {isProcessing ? (
            'Traitement en cours...'
          ) : selectedPaymentMethod === 'cash-delivery' ? (
            'Confirmer la commande'
          ) : (
            'Procéder au paiement'
          )}
        </Button>
      )}
    </div>
  );
};

export default PaymentSection;