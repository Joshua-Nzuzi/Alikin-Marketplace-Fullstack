import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Upload, 
  User, 
  Building, 
  CreditCard, 
  FileText,
  Phone,
  Mail,
  MapPin,
  Globe
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { 
  MobileStepper, 
  MobileCard, 
  ResponsiveModal 
} from '../../components/ui';

const VendorOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationalId: '',
    
    // Step 2: Business Information
    businessName: '',
    businessType: '',
    businessAddress: '',
    businessPhone: '',
    businessEmail: '',
    businessDescription: '',
    
    // Step 3: Documents
    businessLicense: null,
    nationalIdFront: null,
    nationalIdBack: null,
    taxCertificate: null,
    
    // Step 4: Payment & Verification
    bankName: '',
    accountNumber: '',
    accountHolderName: '',
    mobileMoneyNumber: '',
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const steps = [
    { id: 1, title: 'Informations Personnelles', icon: User },
    { id: 2, title: 'Informations Entreprise', icon: Building },
    { id: 3, title: 'Documents Requis', icon: FileText },
    { id: 4, title: 'Paiement & Vérification', icon: CreditCard }
  ];

  const businessTypes = [
    { value: 'retail', label: 'Commerce de Détail' },
    { value: 'wholesale', label: 'Commerce de Gros' },
    { value: 'manufacturing', label: 'Fabrication' },
    { value: 'services', label: 'Services' },
    { value: 'food', label: 'Restauration & Alimentation' },
    { value: 'fashion', label: 'Mode & Accessoires' },
    { value: 'electronics', label: 'Électronique & Technologie' },
    { value: 'other', label: 'Autre' }
  ];

  const bankNames = [
    { value: 'rawbank', label: 'Rawbank' },
    { value: 'bic', label: 'BIC (Banque Internationale du Congo)' },
    { value: 'sobc', label: 'SOBC (Société Congolaise de Banque)' },
    { value: 'ecobank', label: 'Ecobank RDC' },
    { value: 'stanbic', label: 'Stanbic Bank RDC' },
    { value: 'trust', label: 'Trust Merchant Bank' },
    { value: 'other', label: 'Autre' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (field, file) => {
    if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
      setErrors(prev => ({ ...prev, [field]: 'Le fichier ne doit pas dépasser 5MB' }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [field]: file }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'Le prénom est requis';
        if (!formData.lastName) newErrors.lastName = 'Le nom est requis';
        if (!formData.email) newErrors.email = 'L\'email est requis';
        if (!formData.phone) newErrors.phone = 'Le téléphone est requis';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'La date de naissance est requise';
        if (!formData.nationalId) newErrors.nationalId = 'La carte nationale est requise';
        break;
      
      case 2:
        if (!formData.businessName) newErrors.businessName = 'Le nom de l\'entreprise est requis';
        if (!formData.businessType) newErrors.businessType = 'Le type d\'entreprise est requis';
        if (!formData.businessAddress) newErrors.businessAddress = 'L\'adresse de l\'entreprise est requise';
        if (!formData.businessPhone) newErrors.businessPhone = 'Le téléphone de l\'entreprise est requis';
        break;
      
      case 3:
        if (!formData.businessLicense) newErrors.businessLicense = 'La licence commerciale est requise';
        if (!formData.nationalIdFront) newErrors.nationalIdFront = 'Le recto de la carte nationale est requis';
        if (!formData.nationalIdBack) newErrors.nationalIdBack = 'Le verso de la carte nationale est requis';
        break;
      
      case 4:
        if (!formData.termsAccepted) newErrors.termsAccepted = 'Vous devez accepter les termes et conditions';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success - move to confirmation
      setCurrentStep(5);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const FileUploadField = ({ field, label, description, required = false }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
        <input
          type="file"
          className="hidden"
          id={field}
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleFileUpload(field, e.target.files[0])}
        />
        <label htmlFor={field} className="cursor-pointer">
          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Cliquez pour sélectionner ou glissez-déposez
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            PDF, JPG, PNG (max 5MB)
          </p>
        </label>
      </div>
      {formData[field] && (
        <div className="flex items-center space-x-2 text-sm text-success">
          <Check className="w-4 h-4" />
          <span>{formData[field].name}</span>
        </div>
      )}
      {errors[field] && (
        <p className="text-sm text-destructive">{errors[field]}</p>
      )}
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Informations Personnelles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Prénom"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                error={errors.firstName}
                required
              />
              <Input
                label="Nom"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                error={errors.lastName}
                required
              />
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                required
              />
              <Input
                label="Téléphone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                error={errors.phone}
                required
              />
              <Input
                label="Date de Naissance"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                error={errors.dateOfBirth}
                required
              />
              <Input
                label="Numéro Carte Nationale"
                value={formData.nationalId}
                onChange={(e) => handleInputChange('nationalId', e.target.value)}
                error={errors.nationalId}
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Informations de l'Entreprise</h2>
            <div className="space-y-4">
              <Input
                label="Nom de l'Entreprise"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                error={errors.businessName}
                required
              />
              <Select
                label="Type d'Entreprise"
                value={formData.businessType}
                onChange={(value) => handleInputChange('businessType', value)}
                options={businessTypes}
                error={errors.businessType}
                required
              />
              <Input
                label="Adresse de l'Entreprise"
                value={formData.businessAddress}
                onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                error={errors.businessAddress}
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Téléphone de l'Entreprise"
                  value={formData.businessPhone}
                  onChange={(e) => handleInputChange('businessPhone', e.target.value)}
                  error={errors.businessPhone}
                  required
                />
                <Input
                  label="Email de l'Entreprise"
                  type="email"
                  value={formData.businessEmail}
                  onChange={(e) => handleInputChange('businessEmail', e.target.value)}
                />
              </div>
              <Input
                label="Description de l'Entreprise"
                value={formData.businessDescription}
                onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                description="Décrivez brièvement votre activité commerciale"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Documents Requis</h2>
            <p className="text-sm text-muted-foreground">
              Veuillez fournir les documents suivants pour la vérification de votre compte vendeur.
            </p>
            <div className="space-y-6">
              <FileUploadField
                field="businessLicense"
                label="Licence Commerciale"
                description="Licence d'exploitation commerciale valide"
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FileUploadField
                  field="nationalIdFront"
                  label="Recto Carte Nationale"
                  required
                />
                <FileUploadField
                  field="nationalIdBack"
                  label="Verso Carte Nationale"
                  required
                />
              </div>
              <FileUploadField
                field="taxCertificate"
                label="Certificat Fiscal (Optionnel)"
                description="Certificat de conformité fiscale si disponible"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Informations de Paiement & Vérification</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Banque"
                  value={formData.bankName}
                  onChange={(value) => handleInputChange('bankName', value)}
                  options={bankNames}
                />
                <Input
                  label="Numéro de Compte"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                />
              </div>
              <Input
                label="Nom du Titulaire du Compte"
                value={formData.accountHolderName}
                onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
              />
                             <Input
                 label="Numéro Mobile Money"
                 value={formData.mobileMoneyNumber}
                 onChange={(e) => handleInputChange('mobileMoneyNumber', e.target.value)}
                 description="Orange Money, Vodacom M-Pesa, ou Airtel Money"
               />
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.termsAccepted}
                  onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground">
                  J'accepte les{' '}
                  <a href="#" className="text-primary hover:underline">termes et conditions</a>
                  {' '}et la{' '}
                  <a href="#" className="text-primary hover:underline">politique de confidentialité</a>
                  {' '}d'ALIKIN Marketplace
                </label>
              </div>
              {errors.termsAccepted && (
                <p className="text-sm text-destructive">{errors.termsAccepted}</p>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-success" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Demande Soumise avec Succès !</h2>
              <p className="text-muted-foreground mt-2">
                Votre demande d'inscription en tant que vendeur a été reçue et est en cours de traitement.
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 max-w-md mx-auto">
              <h3 className="font-medium text-foreground mb-2">Prochaines Étapes :</h3>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li>• Vérification des documents (24-48h)</li>
                <li>• Validation de l'équipe ALIKIN</li>
                <li>• Email de confirmation</li>
                <li>• Accès à votre tableau de bord vendeur</li>
              </ul>
            </div>
            <Button variant="default" onClick={() => window.location.href = '/'}>
              Retour à l'Accueil
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  if (currentStep === 5) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          {renderStep()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-foreground">Inscription Vendeur</h1>
          <p className="text-muted-foreground">Rejoignez ALIKIN Marketplace et développez votre activité</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <MobileStepper
            steps={steps.map(step => ({
              id: step.id,
              label: step.title,
              description: step.description
            }))}
            currentStep={currentStep - 1}
            onStepClick={(stepIndex) => setCurrentStep(stepIndex + 1)}
          />
        </div>

        {/* Form Content */}
        <div className="bg-card rounded-lg border border-border p-8">
          {renderStep()}

          {/* Navigation Buttons */}
          {currentStep < 5 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                iconName="ArrowLeft"
              >
                Précédent
              </Button>
              
              <div className="flex items-center space-x-3">
                {currentStep === 4 ? (
                  <Button
                    variant="default"
                    onClick={handleSubmit}
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    iconName="CheckCircle"
                  >
                    {isSubmitting ? 'Soumission...' : 'Soumettre la Demande'}
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    onClick={nextStep}
                    iconName="ArrowRight"
                  >
                    Suivant
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorOnboarding;