import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

function formatPrice(cdf) {
  try { return Number(cdf).toLocaleString() + ' CDF'; } catch { return cdf; }
}

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // TODO: Remplace par un fetch/lookup réel
  // Ex: slug = `${slugify(name)}-${id}` -> récupère par id
  const mock = {
    id: 'PROD-001',
    name: slug?.replace(/-/g, ' ') || 'Produit',
    price: 250000,
    stock: 7,
    images: ['/assets/images/no_image.png'],
    description: 'Description du produit. À remplacer par les données réelles.'
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <img src={mock.images[0]} alt={mock.name} className="w-full h-auto object-cover" />
          </div>
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-foreground">{mock.name}</h1>
            <div className="text-xl font-semibold">{formatPrice(mock.price)}</div>
            <div className="text-sm">{mock.stock > 0 ? 'En stock' : 'Rupture'}</div>
            <p className="text-muted-foreground">{mock.description}</p>
          </div>
        </div>
      </main>

      {/* CTA sticky bas de page */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-semibold">{formatPrice(mock.price)}</div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate(-1)}>Retour</Button>
            <Button iconName="ShoppingCart">Ajouter au panier</Button>
          </div>
        </div>
      </div>
    </div>
  );
}