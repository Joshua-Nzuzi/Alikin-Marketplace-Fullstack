import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyCart = () => {
  const navigate = useNavigate();

  const handleStartShopping = () => {
    navigate('/product-discovery');
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">
        {/* Empty Cart Icon */}
        <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
          <Icon name="ShoppingCart" size={48} className="text-muted-foreground" />
        </div>

        {/* Empty State Content */}
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          Votre panier est vide
        </h2>
        
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Découvrez nos produits locaux et ajoutez vos articles préférés 
          pour commencer vos achats sur Alikin Marketplace.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="default"
            size="lg"
            fullWidth
            onClick={handleStartShopping}
            iconName="Search"
            iconPosition="left"
          >
            Découvrir les produits
          </Button>

          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => navigate('/order-tracking')}
            iconName="Package"
            iconPosition="left"
          >
            Voir mes commandes
          </Button>
        </div>

        {/* Popular Categories */}
        <div className="mt-12">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Catégories populaires
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'Électronique', icon: 'Smartphone' },
              { name: 'Mode', icon: 'Shirt' },
              { name: 'Maison', icon: 'Home' },
              { name: 'Beauté', icon: 'Sparkles' }
            ]?.map((category) => (
              <button
                key={category?.name}
                onClick={handleStartShopping}
                className="p-3 border border-border rounded-lg hover:bg-muted transition-smooth text-left"
              >
                <div className="flex items-center gap-2">
                  <Icon name={category?.icon} size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {category?.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <div className="flex items-start gap-3">
            <Icon name="HelpCircle" size={20} className="text-primary mt-0.5" />
            <div className="text-left">
              <h4 className="font-medium text-foreground mb-1">
                Besoin d'aide ?
              </h4>
              <p className="text-sm text-muted-foreground">
                Contactez notre équipe support pour toute question sur vos achats.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;