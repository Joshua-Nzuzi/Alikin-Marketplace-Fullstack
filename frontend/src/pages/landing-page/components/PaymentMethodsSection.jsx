import React from 'react';

const PaymentMethodsSection = () => {
  const paymentMethods = [
    {
      name: 'Visa',
      logo: (
        <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
          VISA
        </div>
      )
    },
    {
      name: 'Orange Money',
      logo: (
        <div className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold text-lg flex items-center">
          <span className="text-black bg-white px-2 py-1 rounded mr-2 text-sm">Om</span>
          ORANGE
        </div>
      )
    },
    {
      name: 'M-Pesa',
      logo: (
        <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
          M-PESA
        </div>
      )
    },
    {
      name: 'Paiement à la livraison',
      logo: (
        <div className="bg-blue-500 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center justify-center w-20 h-20">
          <div className="text-center">
            <div className="text-xs">COD</div>
            <div className="text-xs">💰</div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="bg-card py-16 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
          Paiement rapide & sécurisé
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {paymentMethods?.map((method, index) => (
            <div 
              key={index}
              className="flex flex-col items-center space-y-3 p-4 rounded-xl hover:bg-muted/50 transition-smooth"
            >
              {method?.logo}
              <span className="text-sm text-muted-foreground font-medium">
                {method?.name}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-12">
          <p className="text-muted-foreground">
            Tous vos paiements sont protégés par un cryptage de niveau bancaire
          </p>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethodsSection;