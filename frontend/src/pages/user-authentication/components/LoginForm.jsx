import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = ({ onSuccess = () => {}, onSwitchToRegister = () => {} }) => {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  // Mock credentials for different user types
  const mockCredentials = {
    buyer: { email: 'acheteur@alikin.cd', phone: '+243123456789', password: 'Acheteur123!' },
    seller: { email: 'vendeur@alikin.cd', phone: '+243987654321', password: 'Vendeur123!' },
    admin: { email: 'admin@alikin.cd', phone: '+243555000111', password: 'Admin123!' }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.emailOrPhone?.trim()) {
      newErrors.emailOrPhone = 'Email ou numéro de téléphone requis';
    } else if (!isValidEmailOrPhone(formData?.emailOrPhone)) {
      newErrors.emailOrPhone = 'Format email ou téléphone invalide';
    }

    if (!formData?.password) {
      newErrors.password = 'Mot de passe requis';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const isValidEmailOrPhone = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+243[0-9]{9}$/;
    return emailRegex?.test(value) || phoneRegex?.test(value);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      const isValidCredential = Object.values(mockCredentials)?.some(cred => 
        (cred?.email === formData?.emailOrPhone || cred?.phone === formData?.emailOrPhone) && 
        cred?.password === formData?.password
      );

      if (!isValidCredential) {
        setErrors({
          general: `Identifiants incorrects. Utilisez: ${mockCredentials?.buyer?.email} / ${mockCredentials?.buyer?.password} (Acheteur) ou ${mockCredentials?.seller?.email} / ${mockCredentials?.seller?.password} (Vendeur)`
        });
        setIsLoading(false);
        return;
      }

      // Determine user type and redirect
      const userType = Object.entries(mockCredentials)?.find(([type, cred]) => 
        (cred?.email === formData?.emailOrPhone || cred?.phone === formData?.emailOrPhone) && 
        cred?.password === formData?.password
      )?.[0];

      const userData = {
        id: Date.now(),
        name: userType === 'buyer' ? 'Marie Kabila' : userType === 'seller' ? 'Jean Mukendi' : 'Admin User',
        email: formData?.emailOrPhone?.includes('@') ? formData?.emailOrPhone : mockCredentials?.[userType]?.email,
        phone: formData?.emailOrPhone?.startsWith('+243') ? formData?.emailOrPhone : mockCredentials?.[userType]?.phone,
        type: userType,
        avatar: `https://randomuser.me/api/portraits/${userType === 'buyer' ? 'women' : 'men'}/32.jpg`,
        isVerified: true,
        joinedDate: new Date()?.toISOString()
      };

      // Save user data
      localStorage.setItem('alikin_user', JSON.stringify(userData));
      localStorage.setItem('alikin_auth_token', `token_${Date.now()}`);

      onSuccess(userData);

      // Redirect based on user type
      if (userType === 'seller') {
        navigate('/vendor-dashboard');
      } else {
        navigate('/product-discovery');
      }

    } catch (error) {
      setErrors({ general: 'Erreur de connexion. Veuillez réessayer.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // Mock social login
    const userData = {
      id: Date.now(),
      name: provider === 'google' ? 'Utilisateur Google' : 'Utilisateur Facebook',
      email: `user@${provider}.com`,
      phone: '+243123456789',
      type: 'buyer',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      isVerified: true,
      joinedDate: new Date()?.toISOString()
    };

    localStorage.setItem('alikin_user', JSON.stringify(userData));
    localStorage.setItem('alikin_auth_token', `${provider}_token_${Date.now()}`);
    
    onSuccess(userData);
    navigate('/product-discovery');
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const ForgotPasswordModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-lg p-6 w-full max-w-md animate-scale-press">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Mot de passe oublié</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowForgotPassword(false)}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>
        
        <p className="text-muted-foreground mb-4">
          Entrez votre email ou numéro de téléphone pour recevoir un lien de réinitialisation.
        </p>
        
        <Input
          label="Email ou Téléphone"
          type="text"
          placeholder="votre@email.com ou +243123456789"
          className="mb-4"
        />
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={() => setShowForgotPassword(false)}
            className="flex-1"
          >
            Annuler
          </Button>
          <Button
            variant="default"
            onClick={() => {
              setShowForgotPassword(false);
              // Mock success message
              alert('Lien de réinitialisation envoyé !');
            }}
            className="flex-1"
          >
            Envoyer
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors?.general && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertCircle" size={20} className="text-error mt-0.5" />
              <p className="text-error text-sm">{errors?.general}</p>
            </div>
          </div>
        )}

        <Input
          label="Email ou Numéro de téléphone"
          type="text"
          name="emailOrPhone"
          placeholder="votre@email.com ou +243123456789"
          value={formData?.emailOrPhone}
          onChange={handleInputChange}
          error={errors?.emailOrPhone}
          required
        />

        <div className="relative">
          <Input
            label="Mot de passe"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Votre mot de passe"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <Checkbox
            label="Se souvenir de moi"
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
          />
          
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-primary hover:text-primary/80 text-sm font-medium transition-smooth"
          >
            Mot de passe oublié ?
          </button>
        </div>

        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          fullWidth
          iconName="LogIn"
          iconPosition="left"
        >
          {isLoading ? 'Connexion...' : 'Se connecter'}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-card px-4 text-muted-foreground">Ou continuer avec</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin('google')}
            iconName="Chrome"
            iconPosition="left"
          >
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin('facebook')}
            iconName="Facebook"
            iconPosition="left"
          >
            Facebook
          </Button>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            Pas encore de compte ?{' '}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-primary hover:text-primary/80 font-medium transition-smooth"
            >
              Créer un compte
            </button>
          </p>
        </div>
      </form>
      {showForgotPassword && <ForgotPasswordModal />}
    </>
  );
};

export default LoginForm;