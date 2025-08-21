import React from 'react';

const PaymentMethodsSection = () => {
  const paymentMethods = [
    {
      imageSrc: '/assets/images/Visa.png'
    },
    {
      imageSrc: '/assets/images/Orange_money.png'
    },
    {
      imageSrc: '/assets/images/Mpesa.png'
    },
    {
      imageSrc: '/assets/images/Cash.png'
    }
  ];

  return (
    <section className="bg-card py-12 md:py-16 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
          Paiement rapide & sécurisé
        </h2>

        <div className="flex gap-4 sm:gap-6 md:gap-8 items-center justify-center">
          {paymentMethods.map((method, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 p-2 sm:p-3 md:p-4 rounded-xl hover:bg-muted/50 transition-smooth flex-1 max-w-[80px] sm:max-w-none"
            >
              <img
                src={method.imageSrc}
                alt={method.name}
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
                loading="lazy"
                decoding="async"
              />
              <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                {method.name}
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