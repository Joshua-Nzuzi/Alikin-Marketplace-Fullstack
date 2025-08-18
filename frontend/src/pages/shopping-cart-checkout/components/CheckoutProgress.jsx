import React from 'react';
import Icon from '../../../components/AppIcon';

const CheckoutProgress = ({ currentStep, onStepClick }) => {
  const steps = [
    {
      id: 'cart',
      title: 'Panier',
      icon: 'ShoppingCart',
      description: 'Vérifiez vos articles'
    },
    {
      id: 'delivery',
      title: 'Livraison',
      icon: 'MapPin',
      description: 'Adresse de livraison'
    },
    {
      id: 'payment',
      title: 'Paiement',
      icon: 'CreditCard',
      description: 'Mode de paiement'
    },
    {
      id: 'confirmation',
      title: 'Confirmation',
      icon: 'Check',
      description: 'Finaliser la commande'
    }
  ];

  const getStepStatus = (stepId) => {
    const stepIndex = steps?.findIndex(step => step?.id === stepId);
    const currentIndex = steps?.findIndex(step => step?.id === currentStep);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => {
          const status = getStepStatus(step?.id);
          const isClickable = status === 'completed' || status === 'current';
          
          return (
            <div key={step?.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <button
                onClick={() => isClickable && onStepClick(step?.id)}
                disabled={!isClickable}
                className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-smooth ${
                  status === 'completed'
                    ? 'bg-success border-success text-white hover:bg-success/90'
                    : status === 'current' ?'bg-primary border-primary text-white' :'bg-muted border-muted-foreground text-muted-foreground'
                } ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              >
                {status === 'completed' ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step?.icon} size={16} />
                )}
              </button>
              {/* Step Info */}
              <div className="ml-3 flex-1 min-w-0">
                <div className="hidden sm:block">
                  <p className={`text-sm font-medium ${
                    status === 'current' ? 'text-primary' : 
                    status === 'completed'? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {step?.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {step?.description}
                  </p>
                </div>
              </div>
              {/* Connector Line */}
              {index < steps?.length - 1 && (
                <div className={`hidden sm:block w-full h-0.5 mx-4 ${
                  getStepStatus(steps?.[index + 1]?.id) === 'completed' || 
                  (getStepStatus(steps?.[index + 1]?.id) === 'current' && status === 'completed')
                    ? 'bg-success' :'bg-muted'
                }`} />
              )}
            </div>
          );
        })}
      </div>
      {/* Mobile Step Info */}
      <div className="sm:hidden mt-4 text-center">
        <p className="text-sm font-medium text-primary">
          {steps?.find(step => step?.id === currentStep)?.title}
        </p>
        <p className="text-xs text-muted-foreground">
          {steps?.find(step => step?.id === currentStep)?.description}
        </p>
      </div>
    </div>
  );
};

export default CheckoutProgress;