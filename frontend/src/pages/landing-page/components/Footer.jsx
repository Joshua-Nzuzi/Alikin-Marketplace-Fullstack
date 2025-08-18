import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const socialLinks = [
    { name: 'Facebook', icon: 'Facebook', href: 'https://facebook.com' },
    { name: 'Twitter', icon: 'Twitter', href: 'https://twitter.com' },
    { name: 'Instagram', icon: 'Instagram', href: 'https://instagram.com' }
  ];

  const serviceLinks = [
    { name: 'Vendeurs', path: '/vendor-dashboard' },
    { name: 'Acheteurs', path: '/product-discovery' },
    { name: 'Livreurs', path: '/order-tracking' },
    { name: 'Partenariats', path: '#' }
  ];

  const supportLinks = [
    { name: 'Centre d\'aide', path: '#' },
    { name: 'FAQ', path: '#' },
    { name: 'Conditions d\'utilisation', path: '#' },
    { name: 'Politique de confidentialité', path: '#' }
  ];

  const legalLinks = [
    { name: 'Mentions légales', path: '#' },
    { name: 'Cookies', path: '#' },
    { name: 'Plan du site', path: '#' }
  ];

  return (
    <footer className="bg-gray-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Icon name="Store" size={24} color="white" />
              </div>
              <h3 className="text-2xl font-bold text-primary">@LIKIN</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Le marché de Kinshasa sur votre téléphone. Connectons les commerçants locaux avec leur communauté.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-smooth animate-scale-press"
                  aria-label={social?.name}
                >
                  <Icon name={social?.icon} size={18} color="#9CA3AF" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Services</h4>
            <ul className="space-y-3">
              {serviceLinks?.map((link) => (
                <li key={link?.name}>
                  <button
                    onClick={() => handleNavigation(link?.path)}
                    className="text-gray-300 hover:text-white transition-smooth text-sm"
                  >
                    {link?.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Support</h4>
            <ul className="space-y-3">
              {supportLinks?.map((link) => (
                <li key={link?.name}>
                  <button
                    onClick={() => handleNavigation(link?.path)}
                    className="text-gray-300 hover:text-white transition-smooth text-sm"
                  >
                    {link?.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact</h4>
            <div className="space-y-3">
              <a 
                href="mailto:contact@likin.com"
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-smooth text-sm"
              >
                <div className="w-5 h-5 text-yellow-400">
                  <Icon name="Mail" size={18} />
                </div>
                <span>contact@likin.com</span>
              </a>
              
              <a 
                href="tel:+2438548462"
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-smooth text-sm"
              >
                <div className="w-5 h-5 text-yellow-400">
                  <Icon name="Phone" size={18} />
                </div>
                <span>+243 8 54 84 62 49</span>
              </a>
              
              <div className="flex items-start space-x-3 text-gray-300 text-sm">
                <div className="w-5 h-5 text-yellow-400 mt-0.5">
                  <Icon name="MapPin" size={18} />
                </div>
                <div>
                  <div>123 Avenue du Commerce</div>
                  <div>Kinshasa, R.D.Congo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              © 2025 @LIKIN. Tous droits réservés.
            </p>
            
            {/* Legal Links */}
            <div className="flex flex-wrap gap-6">
              {legalLinks?.map((link, index) => (
                <React.Fragment key={link?.name}>
                  <button
                    onClick={() => handleNavigation(link?.path)}
                    className="text-gray-400 hover:text-white transition-smooth text-sm"
                  >
                    {link?.name}
                  </button>
                  {index < legalLinks?.length - 1 && (
                    <span className="text-gray-600">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;