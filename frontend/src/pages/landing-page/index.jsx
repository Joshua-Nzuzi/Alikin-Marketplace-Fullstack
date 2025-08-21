import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PaymentMethodsSection from './components/PaymentMethodsSection';
import TestimonialsSection from './components/TestimonialsSection';

import Footer from './components/Footer';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-background pt-16 lg:pt-20">
      <Header />
      
      {/* Hero Section */}
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4 py-12 md:py-20">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
              {/* Hero Content */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                  <span className="text-primary">Bienvenu sur @LIKIN</span>
                  <br />
                  Le marché 100 % à la Kinoise
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                  Connectons les commerçants locaux avec leur communauté. Découvrez, achetez et vendez facilement sur la première marketplace de Kinshasa.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <button
                    onClick={() => navigate('/vendor-onboarding')}
                    className="w-full sm:w-auto h-12 bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 rounded-lg font-medium text-base sm:text-lg transition-smooth animate-scale-press shadow-warm"
                    aria-label="Commencer à vendre sur Alikin"
                  >
                    Commencer à vendre
                  </button>
                  <button
                    onClick={() => navigate('/product-discovery')}
                    className="w-full sm:w-auto h-12 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 sm:px-8 rounded-lg font-medium text-base sm:text-lg transition-smooth animate-scale-press"
                    aria-label="Parcourir les produits Alikin"
                  >
                    Parcourir les produits
                  </button>
                </div>
                
                {/* Stats */}
<div className="flex gap-4 sm:gap-8 justify-center lg:justify-start mt-12">
  <div className="text-center flex-1 sm:flex-none">
    <div className="text-xl sm:text-2xl font-bold text-primary">500+</div>
    <div className="text-xs sm:text-sm text-muted-foreground">Vendeurs</div>
  </div>
  <div className="text-center flex-1 sm:flex-none">
    <div className="text-xl sm:text-2xl font-bold text-primary">10k+</div>
    <div className="text-xs sm:text-sm text-muted-foreground">Produits</div>
  </div>
  <div className="text-center flex-1 sm:flex-none">
    <div className="text-xl sm:text-2xl font-bold text-primary">25k+</div>
    <div className="text-xs sm:text-sm text-muted-foreground">Commandes</div>
  </div>
</div>
              </div>
              
              {/* Hero Image */}
              <div className="flex-1 max-w-lg">
                <div className="relative">
                  <div className="aspect-[4/3] w-full max-h-72 overflow-hidden rounded-2xl shadow-warm-lg">
  <img
    src="/assets/images/alikin-man.jpg"
    alt="Alikin Marketplace - Commerçants locaux de Kinshasa"
    className="w-full h-full object-cover"
    loading="lazy"
    decoding="async"
    fetchpriority="low"
  />
</div>

                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Payment Methods Section */}
        <PaymentMethodsSection />
        <TestimonialsSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;