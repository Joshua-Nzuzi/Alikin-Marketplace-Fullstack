import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Header from '../../components/ui/Header';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import MobileMoneySection from './components/MobileMoneySection';

const UserAuthentication = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [user, setUser] = useState(null);
  const [showMobileMoney, setShowMobileMoney] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('alikin_user');
    const authToken = localStorage.getItem('alikin_auth_token');
    
    if (savedUser && authToken) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      
      // Redirect to appropriate page
      const redirectTo = location?.state?.from || (userData?.type === 'seller' ? '/vendor-dashboard' : '/product-discovery');
      navigate(redirectTo, { replace: true });
    }

    // Check URL params for tab
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams?.get('tab');
    if (tab === 'register') {
      setActiveTab('register');
    }
  }, [navigate, location]);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setShowMobileMoney(true);
    
    // Auto-hide mobile money section after 3 seconds and redirect
    setTimeout(() => {
      const redirectTo = location?.state?.from || (userData?.type === 'seller' ? '/vendor-dashboard' : '/product-discovery');
      navigate(redirectTo, { replace: true });
    }, 3000);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Update URL without page reload
    const newUrl = tab === 'register' ? '?tab=register' : '/user-authentication';
    window.history?.replaceState(null, '', newUrl);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  if (showMobileMoney && user) {
    return (
      <>
        <Helmet>
          <title>Configuration Mobile Money - Alikin Marketplace</title>
          <meta name="description" content="Configurez votre compte Mobile Money pour des paiements sécurisés sur Alikin" />
        </Helmet>
        <div className="min-h-screen bg-background">
          <Header user={user} onNavigate={handleNavigation} />
          
          <main className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={32} color="white" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Compte créé avec succès !
                </h1>
                <p className="text-muted-foreground">
                  Bienvenue {user?.name}. Configurez maintenant votre Mobile Money pour commencer.
                </p>
              </div>

              <MobileMoneySection userType={user?.type} />

              <div className="text-center mt-8">
                <button
                  onClick={() => {
                    const redirectTo = user?.type === 'seller' ? '/vendor-dashboard' : '/product-discovery';
                    navigate(redirectTo);
                  }}
                  className="text-primary hover:text-primary/80 font-medium transition-smooth"
                >
                  Passer cette étape →
                </button>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{activeTab === 'login' ? 'Connexion' : 'Inscription'} - Alikin Marketplace</title>
        <meta 
          name="description" 
          content={activeTab === 'login' ?'Connectez-vous à votre compte Alikin pour accéder au marketplace de Kinshasa' :'Créez votre compte Alikin et rejoignez le marketplace local de Kinshasa'
          } 
        />
        <meta name="keywords" content="alikin, connexion, inscription, marketplace, kinshasa, mobile money" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Simplified Header */}
        <header className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-warm-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div 
                className="flex items-center cursor-pointer transition-smooth hover:opacity-80"
                onClick={() => navigate('/product-discovery')}
              >
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg mr-3">
                  <Icon name="Store" size={24} color="white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Alikin</h1>
                  <p className="text-xs text-muted-foreground -mt-1">Marketplace</p>
                </div>
              </div>

              {/* Help Link */}
              <button
                onClick={() => navigate('/product-discovery')}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-smooth"
              >
                <Icon name="HelpCircle" size={20} />
                <span className="hidden sm:inline text-sm">Aide</span>
              </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 lg:py-16">
          <div className="max-w-md mx-auto">
            {/* Welcome Section */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Store" size={32} color="white" />
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                {activeTab === 'login' ? 'Bon retour !' : 'Rejoignez Alikin'}
              </h1>
              <p className="text-muted-foreground">
                {activeTab === 'login' ?'Connectez-vous pour accéder au marketplace de Kinshasa' :'Créez votre compte et découvrez les produits locaux'
                }
              </p>
            </div>

            {/* Auth Card */}
            <div className="bg-card rounded-lg border border-border shadow-warm-lg p-6 lg:p-8">
              <AuthTabs activeTab={activeTab} onTabChange={handleTabChange} />

              {activeTab === 'login' ? (
                <LoginForm 
                  onSuccess={handleAuthSuccess}
                  onSwitchToRegister={() => handleTabChange('register')}
                />
              ) : (
                <RegisterForm 
                  onSuccess={handleAuthSuccess}
                  onSwitchToLogin={() => handleTabChange('login')}
                />
              )}
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center space-x-6 mb-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span className="text-xs text-muted-foreground">Sécurisé</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} className="text-primary" />
                  <span className="text-xs text-muted-foreground">Kinshasa</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Smartphone" size={16} className="text-secondary" />
                  <span className="text-xs text-muted-foreground">Mobile Money</span>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground">
                En vous connectant, vous acceptez nos{' '}
                <button className="text-primary hover:text-primary/80 transition-smooth">
                  Conditions d'utilisation
                </button>
                {' '}et notre{' '}
                <button className="text-primary hover:text-primary/80 transition-smooth">
                  Politique de confidentialité
                </button>
              </p>
            </div>

            {/* Mobile Money Logos */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-xs text-center text-muted-foreground mb-3">
                Paiements acceptés
              </p>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                  <Icon name="Smartphone" size={16} color="white" />
                </div>
                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                  <Icon name="Smartphone" size={16} color="white" />
                </div>
                <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                  <Icon name="Smartphone" size={16} color="white" />
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3 mt-2">
                <span className="text-xs text-muted-foreground">Orange Money</span>
                <span className="text-xs text-muted-foreground">M-Pesa</span>
                <span className="text-xs text-muted-foreground">Airtel Money</span>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-card mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                © {new Date()?.getFullYear()} Alikin Marketplace. Tous droits réservés.
              </p>
              <div className="flex items-center justify-center space-x-6">
                <button className="text-xs text-muted-foreground hover:text-foreground transition-smooth">
                  À propos
                </button>
                <button className="text-xs text-muted-foreground hover:text-foreground transition-smooth">
                  Contact
                </button>
                <button className="text-xs text-muted-foreground hover:text-foreground transition-smooth">
                  Aide
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default UserAuthentication;