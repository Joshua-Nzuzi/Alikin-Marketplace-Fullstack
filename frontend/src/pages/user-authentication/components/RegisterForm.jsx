import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegisterForm = ({ onSuccess = () => {}, onSwitchToLogin = () => {} }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'buyer',
    agreeToTerms: false,
    agreeToMarketing: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const userTypeOptions = [
    { value: 'buyer', label: 'Acheteur - Je veux acheter des produits' },
    { value: 'seller', label: 'Vendeur - Je veux vendre mes produits' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'Prénom requis';
    } else if (formData?.firstName?.length < 2) {
      newErrors.firstName = 'Le prénom doit contenir au moins 2 caractères';
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Nom requis';
    } else if (formData?.lastName?.length < 2) {
      newErrors.lastName = 'Le nom doit contenir au moins 2 caractères';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Format email invalide';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Numéro de téléphone requis';
    } else if (!/^\+243[0-9]{9}$/?.test(formData?.phone)) {
      newErrors.phone = 'Format: +243XXXXXXXXX (9 chiffres après +243)';
    }

    if (!formData?.password) {
      newErrors.password = 'Mot de passe requis';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    } else if (passwordStrength < 3) {
      newErrors.password = 'Mot de passe trop faible. Utilisez majuscules, minuscules, chiffres et symboles';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Confirmation du mot de passe requise';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'Vous devez accepter les conditions d\'utilisation';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength++;
    if (/[a-z]/?.test(password)) strength++;
    if (/[A-Z]/?.test(password)) strength++;
    if (/[0-9]/?.test(password)) strength++;
    if (/[^A-Za-z0-9]/?.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 0:
      case 1: return { text: 'Très faible', color: 'text-error' };
      case 2: return { text: 'Faible', color: 'text-warning' };
      case 3: return { text: 'Moyen', color: 'text-secondary' };
      case 4: return { text: 'Fort', color: 'text-success' };
      case 5: return { text: 'Très fort', color: 'text-success' };
      default: return { text: '', color: '' };
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Calculate password strength
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Format phone number
    if (name === 'phone' && value && !value?.startsWith('+243')) {
      if (value?.startsWith('0')) {
        setFormData(prev => ({
          ...prev,
          phone: '+243' + value?.substring(1)
        }));
      } else if (value?.startsWith('243')) {
        setFormData(prev => ({
          ...prev,
          phone: '+' + value
        }));
      }
    }

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
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Check if email already exists (mock check)
      const existingUsers = JSON.parse(localStorage.getItem('alikin_users') || '[]');
      if (existingUsers?.some(user => user?.email === formData?.email)) {
        setErrors({ email: 'Cet email est déjà utilisé' });
        setIsLoading(false);
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        name: `${formData?.firstName} ${formData?.lastName}`,
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        email: formData?.email,
        phone: formData?.phone,
        type: formData?.userType,
        avatar: `https://randomuser.me/api/portraits/${formData?.userType === 'buyer' ? 'women' : 'men'}/${Math.floor(Math.random() * 50)}.jpg`,
        isVerified: false,
        joinedDate: new Date()?.toISOString(),
        agreeToMarketing: formData?.agreeToMarketing
      };

      // Save user
      existingUsers?.push(newUser);
      localStorage.setItem('alikin_users', JSON.stringify(existingUsers));
      localStorage.setItem('alikin_user', JSON.stringify(newUser));
      localStorage.setItem('alikin_auth_token', `token_${Date.now()}`);

      onSuccess(newUser);

      // Redirect based on user type
      if (formData?.userType === 'seller') {
        navigate('/vendor-dashboard');
      } else {
        navigate('/product-discovery');
      }

    } catch (error) {
      setErrors({ general: 'Erreur lors de la création du compte. Veuillez réessayer.' });
    } finally {
      setIsLoading(false);
    }
  };

  const strengthInfo = getPasswordStrengthText(passwordStrength);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors?.general && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={20} className="text-error mt-0.5" />
            <p className="text-error text-sm">{errors?.general}</p>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Prénom"
          type="text"
          name="firstName"
          placeholder="Votre prénom"
          value={formData?.firstName}
          onChange={handleInputChange}
          error={errors?.firstName}
          required
        />

        <Input
          label="Nom"
          type="text"
          name="lastName"
          placeholder="Votre nom"
          value={formData?.lastName}
          onChange={handleInputChange}
          error={errors?.lastName}
          required
        />
      </div>
      <Input
        label="Adresse email"
        type="email"
        name="email"
        placeholder="votre@email.com"
        value={formData?.email}
        onChange={handleInputChange}
        error={errors?.email}
        required
      />
      <Input
        label="Numéro de téléphone"
        type="tel"
        name="phone"
        placeholder="+243123456789"
        value={formData?.phone}
        onChange={handleInputChange}
        error={errors?.phone}
        description="Format: +243 suivi de 9 chiffres"
        required
      />
      <Select
        label="Type de compte"
        options={userTypeOptions}
        value={formData?.userType}
        onChange={(value) => setFormData(prev => ({ ...prev, userType: value }))}
        description="Vous pourrez changer cela plus tard dans vos paramètres"
      />
      <div className="relative">
        <Input
          label="Mot de passe"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Créer un mot de passe"
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
        
        {formData?.password && (
          <div className="mt-2">
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${
                    passwordStrength <= 1 ? 'bg-error w-1/5' :
                    passwordStrength === 2 ? 'bg-warning w-2/5' :
                    passwordStrength === 3 ? 'bg-secondary w-3/5' :
                    passwordStrength === 4 ? 'bg-success w-4/5': 'bg-success w-full'
                  }`}
                ></div>
              </div>
              <span className={`text-xs font-medium ${strengthInfo?.color}`}>
                {strengthInfo?.text}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="relative">
        <Input
          label="Confirmer le mot de passe"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirmer votre mot de passe"
          value={formData?.confirmPassword}
          onChange={handleInputChange}
          error={errors?.confirmPassword}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
        >
          <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={18} />
        </button>
      </div>
      <div className="space-y-4">
        <Checkbox
          label="J'accepte les conditions d'utilisation et la politique de confidentialité"
          name="agreeToTerms"
          checked={formData?.agreeToTerms}
          onChange={handleInputChange}
          error={errors?.agreeToTerms}
          required
        />

        <Checkbox
          label="Je souhaite recevoir des offres et actualités par email"
          name="agreeToMarketing"
          checked={formData?.agreeToMarketing}
          onChange={handleInputChange}
        />
      </div>
      <Button
        type="submit"
        variant="default"
        loading={isLoading}
        fullWidth
        iconName="UserPlus"
        iconPosition="left"
      >
        {isLoading ? 'Création du compte...' : 'Créer mon compte'}
      </Button>
      <div className="text-center">
        <p className="text-muted-foreground text-sm">
          Déjà un compte ?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-primary hover:text-primary/80 font-medium transition-smooth"
          >
            Se connecter
          </button>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;