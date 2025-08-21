import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import MobileCartBadge from '../../components/ui/MobileCartBadge';
import CheckoutProgress from './components/CheckoutProgress';
import VendorGroup from './components/VendorGroup';
import OrderSummary from './components/OrderSummary';
import DeliveryForm from './components/DeliveryForm';
import PaymentSection from './components/PaymentSection';
import EmptyCart from './components/EmptyCart';

import Button from '../../components/ui/Button';

const ShoppingCartCheckout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('cart');
  const [cartItems, setCartItems] = useState([]);
  const [deliveryInfo, setDeliveryInfo] = useState({});
  const [selectedDeliveryZone, setSelectedDeliveryZone] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({});
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(null);

  // Mock data
  useEffect(() => {
    // Mock user data
    setUser({
      id: 1,
      name: "Marie Kabila",
      email: "marie.kabila@email.com",
      phone: "+243 812 345 678"
    });

    // Mock cart items
    const mockCartItems = [
      {
        id: 1,
        name: "Samsung Galaxy A54 5G - 128GB",
        price: 450000,
        originalPrice: 500000,
        quantity: 1,
        stock: 15,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
        variant: "Noir, 128GB",
        vendor: {
          id: 1,
          name: "TechStore Kinshasa",
          location: "Gombe, Kinshasa",
          deliveryTime: "2-4h",
          deliveryFee: 2000,
          minOrderAmount: 100000,
          benefits: ["Livraison rapide", "Garantie 1 an"]
        }
      },
      {
        id: 2,
        name: "Écouteurs Bluetooth JBL",
        price: 85000,
        quantity: 2,
        stock: 8,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        vendor: {
          id: 1,
          name: "TechStore Kinshasa",
          location: "Gombe, Kinshasa",
          deliveryTime: "2-4h",
          deliveryFee: 2000,
          minOrderAmount: 100000,
          benefits: ["Livraison rapide", "Garantie 1 an"]
        }
      },
      {
        id: 3,
        name: "Robe Africaine Traditionnelle",
        price: 75000,
        quantity: 1,
        stock: 3,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
        variant: "Taille M, Bleu",
        vendor: {
          id: 2,
          name: "Mode Africaine Élégante",
          location: "Lemba, Kinshasa",
          deliveryTime: "4-6h",
          deliveryFee: 3000,
          benefits: ["Fait main", "Tissu authentique"]
        }
      }
    ];

    setCartItems(mockCartItems);
  }, []);

  // Group items by vendor
  const groupedItems = cartItems?.reduce((groups, item) => {
    const vendorId = item?.vendor?.id;
    if (!groups?.[vendorId]) {
      groups[vendorId] = {
        vendor: item?.vendor,
        items: []
      };
    }
    groups?.[vendorId]?.items?.push(item);
    return groups;
  }, {});

  const handleQuantityChange = async (itemId, newQuantity) => {
    setCartItems(prev => 
      prev?.map(item => 
        item?.id === itemId 
          ? { ...item, quantity: Math.max(1, Math.min(newQuantity, item?.stock)) }
          : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prev => prev?.filter(item => item?.id !== itemId));
  };

  const handleMoveToWishlist = (itemId) => {
    // Mock wishlist functionality
    handleRemoveItem(itemId);
    // Show success message
  };

  const handleDeliveryInfoChange = (info) => {
    setDeliveryInfo(info);
    setErrors(prev => ({ ...prev, ...Object.keys(info)?.reduce((acc, key) => ({ ...acc, [key]: '' }), {}) }));
  };

  const handleDeliveryZoneChange = (zone) => {
    setSelectedDeliveryZone(zone);
    setDeliveryInfo(prev => ({ ...prev, zone: zone?.value }));
  };

  const handlePromoCodeApply = (code) => {
    if (code === 'WELCOME10') {
      setAppliedDiscount({
        code: 'WELCOME10',
        percentage: 10,
        description: 'Réduction de bienvenue'
      });
      setPromoCode('');
    } else if (code === 'KINSHASA5') {
      setAppliedDiscount({
        code: 'KINSHASA5',
        percentage: 5,
        description: 'Réduction locale Kinshasa'
      });
      setPromoCode('');
    } else {
      setErrors(prev => ({ ...prev, promoCode: 'Code promo invalide' }));
    }
  };

  const handlePromoCodeRemove = () => {
    setAppliedDiscount(null);
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 'delivery') {
      if (!deliveryInfo?.fullName) newErrors.fullName = 'Nom complet requis';
      if (!deliveryInfo?.phone) newErrors.phone = 'Numéro de téléphone requis';
      if (!deliveryInfo?.zone) newErrors.zone = 'Zone de livraison requise';
      if (!deliveryInfo?.address) newErrors.address = 'Adresse complète requise';
    }

    if (step === 'payment') {
      if (!selectedPaymentMethod) newErrors.paymentMethod = 'Mode de paiement requis';
      if (selectedPaymentMethod !== 'cash-delivery' && !paymentDetails?.phoneNumber) {
        newErrors.phoneNumber = 'Numéro de téléphone requis pour le paiement mobile';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleStepChange = (step) => {
    if (step === 'delivery' && currentStep === 'cart') {
      setCurrentStep('delivery');
    } else if (step === 'payment' && validateStep('delivery')) {
      setCurrentStep('payment');
    } else if (step === 'confirmation' && validateStep('payment')) {
      setCurrentStep('confirmation');
    } else if (step === 'cart') {
      setCurrentStep('cart');
    }
  };

  const handleProcessPayment = async () => {
    if (!validateStep('payment')) return;

    setIsProcessing(true);
    
    try {
      // Mock payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate order number
      const orderNumber = `ALK${Date.now()?.toString()?.slice(-6)}`;
      
      // Navigate to order confirmation
      navigate('/order-tracking', { 
        state: { 
          orderNumber,
          orderDetails: {
            items: cartItems,
            deliveryInfo,
            paymentMethod: selectedPaymentMethod,
            total: calculateTotal()
          }
        }
      });
      
    } catch (error) {
      setErrors({ payment: 'Erreur lors du traitement du paiement. Veuillez réessayer.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateDeliveryFee = () => {
    if (!selectedDeliveryZone) return 0;
    
    // Add cash on delivery fee
    const cashFee = selectedPaymentMethod === 'cash-delivery' ? 500 : 0;
    
    return selectedDeliveryZone?.fee + cashFee;
  };

  const calculateTotal = () => {
    const subtotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
    const deliveryFee = calculateDeliveryFee();
    const discountAmount = appliedDiscount ? (subtotal * appliedDiscount?.percentage / 100) : 0;
    return subtotal + deliveryFee - discountAmount;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-CD', {
      style: 'currency',
      currency: 'CDF',
      minimumFractionDigits: 0
    })?.format(price);
  };

  if (cartItems?.length === 0) {
    return (
      <>
        <Helmet>
          <title>Panier - Alikin Marketplace</title>
          <meta name="description" content="Votre panier d'achats sur Alikin Marketplace" />
        </Helmet>
        
        <div className="min-h-screen bg-background">
          <Header user={user} cartCount={0} />
          <EmptyCart />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Panier & Commande - Alikin Marketplace</title>
        <meta name="description" content="Finalisez votre commande avec paiement Mobile Money sécurisé" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header user={user} cartCount={cartItems?.length} />
        
        <main className="container mx-auto px-4 py-6 lg:py-8">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/product-discovery')}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Continuer les achats
              </Button>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              {currentStep === 'cart' && 'Votre Panier'}
              {currentStep === 'delivery' && 'Informations de Livraison'}
              {currentStep === 'payment' && 'Paiement'}
              {currentStep === 'confirmation' && 'Confirmation de Commande'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {cartItems?.length} article{cartItems?.length > 1 ? 's' : ''} • Total: {formatPrice(calculateTotal())}
            </p>
          </div>

          {/* Progress Indicator */}
          <CheckoutProgress 
            currentStep={currentStep} 
            onStepClick={handleStepChange}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {currentStep === 'cart' && (
                <div className="space-y-6">
                  {Object.values(groupedItems)?.map((group) => (
                    <VendorGroup
                      key={group?.vendor?.id}
                      vendor={group?.vendor}
                      items={group?.items}
                      onQuantityChange={handleQuantityChange}
                      onRemove={handleRemoveItem}
                      onMoveToWishlist={handleMoveToWishlist}
                    />
                  ))}

                  <div className="flex justify-center sm:justify-end">
  <Button
    variant="default"
    size="lg"
    onClick={() => handleStepChange('delivery')}
    iconName="ArrowRight"
    iconPosition="right"
  >
    Continuer vers la livraison
  </Button>
</div>
                </div>
              )}

              {currentStep === 'delivery' && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <DeliveryForm
                    deliveryInfo={deliveryInfo}
                    onDeliveryInfoChange={handleDeliveryInfoChange}
                    onDeliveryZoneChange={handleDeliveryZoneChange}
                    errors={errors}
                  />

                  <div className="flex justify-between mt-8">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep('cart')}
                      iconName="ArrowLeft"
                      iconPosition="left"
                    >
                      Retour au panier
                    </Button>
                    
                    <Button
                      variant="default"
                      onClick={() => handleStepChange('payment')}
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      Continuer vers le paiement
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 'payment' && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <PaymentSection
                    selectedPaymentMethod={selectedPaymentMethod}
                    onPaymentMethodChange={setSelectedPaymentMethod}
                    paymentDetails={paymentDetails}
                    onPaymentDetailsChange={setPaymentDetails}
                    onProcessPayment={handleProcessPayment}
                    isProcessing={isProcessing}
                    errors={errors}
                  />

                  <div className="flex justify-between mt-8">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep('delivery')}
                      iconName="ArrowLeft"
                      iconPosition="left"
                    >
                      Retour à la livraison
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <OrderSummary
                  cartItems={cartItems}
                  deliveryFee={calculateDeliveryFee()}
                  discount={appliedDiscount}
                  promoCode={promoCode}
                  onPromoCodeApply={handlePromoCodeApply}
                  onPromoCodeRemove={handlePromoCodeRemove}
                />

                {/* Quick Actions */}
                <div className="mt-6 space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => navigate('/product-discovery')}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Ajouter d'autres articles
                  </Button>
                  
                  <div className="text-center">
                    <button
                      onClick={() => setCartItems([])}
                      className="text-sm text-error hover:underline"
                    >
                      Vider le panier
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <MobileCartBadge cartCount={cartItems?.length} />
      </div>
    </>
  );
};

export default ShoppingCartCheckout;