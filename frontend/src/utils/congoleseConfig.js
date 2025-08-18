// Configuration centralisée pour le contexte congolais et kinois d'ALIKIN
export const CONGOLESE_CONFIG = {
  // Devise
  currency: {
    code: 'CDF',
    name: 'Franc Congolais',
    symbol: 'FC'
  },

  // Réseaux mobiles de Kinshasa
  mobileNetworks: [
    { value: 'orange', label: 'Orange RDC', moneyService: 'Orange Money' },
    { value: 'vodacom', label: 'Vodacom RDC', moneyService: 'M-Pesa' },
    { value: 'airtel', label: 'Airtel RDC', moneyService: 'Airtel Money' }
  ],

  // Banques congolaises
  banks: [
    { value: 'rawbank', label: 'Rawbank' },
    { value: 'bic', label: 'BIC (Banque Internationale du Congo)' },
    { value: 'sobc', label: 'SOBC (Société Congolaise de Banque)' },
    { value: 'ecobank', label: 'Ecobank RDC' },
    { value: 'stanbic', label: 'Stanbic Bank RDC' },
    { value: 'trust', label: 'Trust Merchant Bank' },
    { value: 'bcdc', label: 'BCDC (Banque Commerciale du Congo)' },
    { value: 'other', label: 'Autre' }
  ],

  // Communes de Kinshasa
  communes: [
    { value: 'gombe', label: 'Gombe', description: 'Centre-ville, affaires' },
    { value: 'limete', label: 'Limete', description: 'Zone résidentielle' },
    { value: 'kalamu', label: 'Kalamu', description: 'Quartier populaire' },
    { value: 'ngaliema', label: 'Ngaliema', description: 'Zone résidentielle' },
    { value: 'masina', label: 'Masina', description: 'Zone industrielle' },
    { value: 'kimbanseke', label: 'Kimbanseke', description: 'Zone résidentielle' },
    { value: 'ndjili', label: 'Ndjili', description: 'Aéroport, zone commerciale' },
    { value: 'selembao', label: 'Selembao', description: 'Zone résidentielle' },
    { value: 'mont-ngafula', label: 'Mont Ngafula', description: 'Zone résidentielle' },
    { value: 'masanga', label: 'Masanga', description: 'Zone résidentielle' }
  ],

  // Quartiers populaires de Kinshasa
  neighborhoods: [
    { value: 'matonge', label: 'Matonge', commune: 'kalamu', description: 'Quartier animé, commerce' },
    { value: 'bandal', label: 'Bandal', commune: 'ngaliema', description: 'Zone résidentielle' },
    { value: 'binza', label: 'Binza', commune: 'ngaliema', description: 'Zone résidentielle' },
    { value: 'ngaba', label: 'Ngaba', commune: 'masina', description: 'Zone résidentielle' },
    { value: 'kimbaseke', label: 'Kimbaseke', commune: 'kimbanseke', description: 'Zone résidentielle' },
    { value: 'masina', label: 'Masina', commune: 'masina', description: 'Zone industrielle' },
    { value: 'limete', label: 'Limete', commune: 'limete', description: 'Zone résidentielle' },
    { value: 'gombe', label: 'Gombe', commune: 'gombe', description: 'Centre-ville' }
  ],

  // Marchés de Kinshasa
  markets: [
    { value: 'marche-central', label: 'Marché Central', commune: 'gombe', description: 'Grand marché central' },
    { value: 'marche-gombe', label: 'Marché Gombe', commune: 'gombe', description: 'Marché de proximité' },
    { value: 'marche-limete', label: 'Marché Limete', commune: 'limete', description: 'Marché de quartier' },
    { value: 'marche-kalamu', label: 'Marché Kalamu', commune: 'kalamu', description: 'Marché populaire' },
    { value: 'marche-ngaliema', label: 'Marché Ngaliema', commune: 'ngaliema', description: 'Marché de quartier' }
  ],

  // Noms congolais courants
  names: {
    male: [
      'Jean Mukiela', 'Pierre Kabasele', 'Thomas Odilon', 'David Ngoy',
      'Paul Mphuti', 'Joseph Kaba', 'André Tshibola', 'Michel Mwamba',
      'Patrick Kumbu', 'Robert Ekila', 'François Mvomba', 'Georges Alita'
    ],
    female: [
      'Marie Mbuyi', 'Jeanne Eyala', 'Thérèse Mwamba', 'Catherine Tshibola',
      'Ange tatu', 'Madeleine Mwamba', 'Suzanne Tshibola', 'Monique Mukendi',
      'Claudine Mwamba', 'Joséphine Tshibola', 'Françoise Mukendi', 'Brigitte Mwamba'
    ]
  },

  // Plaques d'immatriculation
  licensePlates: {
    prefix: 'KN', // Kinshasa
    format: 'KN-XXXX-XX'
  },

  // Coordonnées GPS de Kinshasa
  coordinates: {
    center: { lat: -4.4419, lng: 15.2663 },
    bounds: {
      north: -4.2,
      south: -4.6,
      east: 15.4,
      west: 15.1
    }
  },

  // Prix moyens en CDF
  prices: {
    smartphone: 2500000,      // 2.5M CDF
    laptop: 8000000,          // 8M CDF
    clothing: 50000,          // 50K CDF
    shoes: 150000,            // 150K CDF
    food: 25000,              // 25K CDF
    delivery: 50000,          // 50K CDF
    commission: 0.15          // 15% de commission
  },

  // Formats de téléphone congolais
  phoneFormats: {
    mobile: '+243 8XXXXXXXX', // Format standard
    landline: '+243 1XXXXXXXX'
  },

  // Langues
  languages: [
    { code: 'fr', label: 'Français', native: 'Français' },
    { code: 'ln', label: 'Lingala', native: 'Lingala' },
    { code: 'sw', label: 'Swahili', native: 'Kiswahili' }
  ]
};

// Fonctions utilitaires
export const formatPrice = (amount, currency = 'CDF') => {
  return `${amount.toLocaleString()} ${currency}`;
};

export const getRandomCongoleseName = (gender = 'male') => {
  const names = CONGOLESE_CONFIG.names[gender];
  return names[Math.floor(Math.random() * names.length)];
};

export const getRandomKinshasaAddress = () => {
  const neighborhoods = CONGOLESE_CONFIG.neighborhoods;
  const neighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
  return `${neighborhood.label}, ${neighborhood.commune}`;
};

export const getRandomPhone = () => {
  const prefix = '+243 8';
  const number = Math.floor(Math.random() * 90000000) + 10000000;
  return `${prefix}${number}`;
};
