import React from 'react';
import Icon from '../../../components/AppIcon';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Marie Kabila",
      role: "Cliente fidèle • Kinshasa",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face",
      rating: 4.3,
      text: "Alikin a révolutionné ma façon de faire mes courses. Je trouve tout ce dont j'ai besoin depuis chez moi avec une livraison rapide !",
      verified: true,
      purchaseCount: "50+ commandes"
    },
    {
      id: 2,
      name: "Jean Mukendi", 
      role: "Vendeur partenaire • Matongé",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      text: "Grâce à Alikin, j'ai pu développer mon commerce et atteindre plus de clients. Mes ventes ont augmenté de 300% !",
      verified: false,
      purchaseCount: "Vendeur depuis 2 ans"
    },
    {
      id: 3,
      name: "Grace Mbuyi",
      role: "Acheteuse régulière • Gombe", 
      image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=150&h=150&fit=crop&crop=face",
      rating: 3.7,
      text: "Les paiements Mobile Money sont pratiques mais parfois la livraison prend du temps. Globalement satisfaite du service !",
      verified: false,
      purchaseCount: "25+ commandes"
    },
    {
      id: 4,
      name: "Patrick Moto",
      role: "Livreur partenaire • Kinshasa",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.6,
      text: "Travailler avec Alikin comme livreur moto m'a permis d'avoir un revenu stable. L'app est facile à utiliser et les clients sont sympas !",
      verified: true,
      purchaseCount: "500+ livraisons"
    }
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center space-x-1">
        {/* Full stars */}
        {[...Array(fullStars)].map((_, i) => (
          <Icon key={`full-${i}`} name="Star" size={16} className="text-amber-500 fill-current" />
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <div className="relative">
            <Icon name="Star" size={16} className="text-gray-300 fill-current" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Icon name="Star" size={16} className="text-amber-500 fill-current" />
            </div>
          </div>
        )}
        
        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <Icon key={`empty-${i}`} name="Star" size={16} className="text-gray-300 fill-current" />
        ))}
        
        <span className="ml-2 text-xs sm:text-sm font-medium text-gray-600">{rating}</span>
      </div>
    );
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-blue-50/30 py-12 sm:py-16 md:py-24 px-3 sm:px-4 overflow-hidden">
      {/* Background Pattern - Hidden on mobile */}
      <div className="absolute inset-0 opacity-5 hidden sm:block">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Icon name="Users" size={14} className="sm:w-4 sm:h-4" />
            <span>Témoignages clients</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight px-2">
            Plus de <span className="text-primary">25,000</span> clients satisfaits
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
            Découvrez pourquoi des milliers de Kinois font confiance à Alikin pour leurs achats quotidiens et leur développement commercial
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="group relative bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-primary/20 hover:-translate-y-1 sm:hover:-translate-y-2"
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              
              {/* Quote Icon */}
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <Icon name="MessageSquare" size={12} className="sm:w-3.5 sm:h-3.5" color="white" />
              </div>

              {/* Stars */}
              <div className="mb-4 sm:mb-6">
                {renderStars(testimonial.rating)}
              </div>
              
              {/* Text */}
              <blockquote className="text-gray-700 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed font-medium">
                "{testimonial.text}"
              </blockquote>
              
              {/* User Info */}
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="relative flex-shrink-0">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shadow-lg ring-2 ring-white"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback Avatar */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary to-blue-500 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white" style={{display: 'none'}}>
                    <span className="text-white font-bold text-base sm:text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <p className="font-bold text-gray-900 text-sm sm:text-base truncate">{testimonial.name}</p>
                    {testimonial.verified && (
                      <Icon name="CheckCircle" size={14} className="sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1 truncate">{testimonial.role}</p>
                  <p className="text-xs text-primary font-medium">{testimonial.purchaseCount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div className="space-y-1 sm:space-y-2">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">4.4/5</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Note moyenne</div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">25k+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Avis clients</div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">92%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Satisfaction</div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">24h</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Support client</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;