// Configuration centralisée pour la responsivité d'ALIKIN MARKETPLACE

export const RESPONSIVE_CONFIG = {
  // Breakpoints principaux
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1400px',
    '3xl': '1536px',
  },

  // Breakpoints personnalisés
  customBreakpoints: {
    mobile: { max: '767px' },
    tablet: { min: '768px', max: '1023px' },
    desktop: { min: '1024px' },
  },

  // Tailles d'écran cibles
  targetScreens: {
    mobile: {
      min: 320,
      max: 767,
      container: '100%',
      padding: '1rem',
      columns: 1,
    },
    tablet: {
      min: 768,
      max: 1023,
      container: '768px',
      padding: '1.5rem',
      columns: 2,
    },
    desktop: {
      min: 1024,
      max: 1439,
      container: '1200px',
      padding: '2rem',
      columns: 3,
    },
    wide: {
      min: 1440,
      max: null,
      container: '1400px',
      padding: '2rem',
      columns: 4,
    },
  },

  // Espacements optimisés par écran
  spacing: {
    mobile: {
      xs: '0.25rem',    // 4px
      sm: '0.5rem',     // 8px
      md: '0.75rem',    // 12px
      lg: '1rem',       // 16px
      xl: '1.5rem',     // 24px
      '2xl': '2rem',    // 32px
    },
    tablet: {
      xs: '0.25rem',    // 4px
      sm: '0.5rem',     // 8px
      md: '1rem',       // 16px
      lg: '1.5rem',     // 24px
      xl: '2rem',       // 32px
      '2xl': '3rem',    // 48px
    },
    desktop: {
      xs: '0.5rem',     // 8px
      sm: '1rem',       // 16px
      md: '1.5rem',     // 24px
      lg: '2rem',       // 32px
      xl: '3rem',       // 48px
      '2xl': '4rem',    // 64px
    },
  },

  // Tailles de texte optimisées par écran
  typography: {
    mobile: {
      xs: '0.625rem',   // 10px
      sm: '0.75rem',    // 12px
      base: '0.875rem', // 14px
      lg: '1rem',       // 16px
      xl: '1.125rem',   // 18px
      '2xl': '1.25rem', // 20px
      '3xl': '1.5rem',  // 24px
    },
    tablet: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
    },
    desktop: {
      xs: '0.875rem',   // 14px
      sm: '1rem',       // 16px
      base: '1.125rem', // 18px
      lg: '1.25rem',    // 20px
      xl: '1.5rem',     // 24px
      '2xl': '1.875rem', // 30px
      '3xl': '2.25rem',  // 36px
    },
  },

  // Tailles minimales pour les cibles tactiles
  touchTargets: {
    small: '40px',
    default: '44px',
    large: '48px',
    xlarge: '56px',
  },

  // Ombres optimisées par écran
  shadows: {
    mobile: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
      default: '0 1px 3px rgba(0, 0, 0, 0.1)',
      lg: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    tablet: {
      sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
      default: '0 4px 6px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    },
    desktop: {
      sm: '0 1px 3px rgba(0, 0, 0, 0.12)',
      default: '0 4px 6px rgba(0, 0, 0, 0.12)',
      lg: '0 20px 25px rgba(0, 0, 0, 0.12)',
    },
  },

  // Animations et transitions
  animations: {
    duration: {
      fast: '150ms',
      default: '200ms',
      slow: '300ms',
      slower: '500ms',
    },
    easing: {
      default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // Grilles responsives
  grids: {
    mobile: {
      columns: 1,
      gap: '1rem',
      minWidth: '280px',
    },
    tablet: {
      columns: 2,
      gap: '1.5rem',
      minWidth: '320px',
    },
    desktop: {
      columns: 3,
      gap: '2rem',
      minWidth: '350px',
    },
    wide: {
      columns: 4,
      gap: '2rem',
      minWidth: '300px',
    },
  },

  // Modales responsives
  modals: {
    mobile: {
      width: '100%',
      maxWidth: '100%',
      margin: '1rem',
      padding: '1rem',
    },
    tablet: {
      width: '100%',
      maxWidth: '600px',
      margin: '1.5rem',
      padding: '1.5rem',
    },
    desktop: {
      width: 'auto',
      maxWidth: '800px',
      margin: '2rem auto',
      padding: '2rem',
    },
  },
};

// Fonctions utilitaires pour la responsivité

/**
 * Détermine la taille d'écran actuelle
 * @returns {string} 'mobile', 'tablet', 'desktop', ou 'wide'
 */
export const getCurrentScreenSize = () => {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  if (width < 1440) return 'desktop';
  return 'wide';
};

/**
 * Vérifie si l'écran est mobile
 * @returns {boolean}
 */
export const isMobile = () => getCurrentScreenSize() === 'mobile';

/**
 * Vérifie si l'écran est tablette
 * @returns {boolean}
 */
export const isTablet = () => getCurrentScreenSize() === 'tablet';

/**
 * Vérifie si l'écran est desktop
 * @returns {boolean}
 */
export const isDesktop = () => getCurrentScreenSize() === 'desktop';

/**
 * Vérifie si l'écran est large
 * @returns {boolean}
 */
export const isWide = () => getCurrentScreenSize() === 'wide';

/**
 * Obtient la configuration pour la taille d'écran actuelle
 * @returns {object}
 */
export const getCurrentConfig = () => {
  const screenSize = getCurrentScreenSize();
  return RESPONSIVE_CONFIG.targetScreens[screenSize];
};

/**
 * Génère des classes CSS responsives
 * @param {object} classes - Objet avec les classes par breakpoint
 * @returns {string} Classes CSS concaténées
 */
export const getResponsiveClasses = (classes) => {
  const screenSize = getCurrentScreenSize();
  return classes[screenSize] || classes.default || '';
};

/**
 * Hook personnalisé pour la responsivité (pour React)
 * @returns {object} État de la responsivité
 */
export const useResponsive = () => {
  const [screenSize, setScreenSize] = React.useState(getCurrentScreenSize());
  
  React.useEffect(() => {
    const handleResize = () => {
      setScreenSize(getCurrentScreenSize());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return {
    screenSize,
    isMobile: screenSize === 'mobile',
    isTablet: screenSize === 'tablet',
    isDesktop: screenSize === 'desktop',
    isWide: screenSize === 'wide',
    config: RESPONSIVE_CONFIG.targetScreens[screenSize],
  };
};

// Export des constantes individuelles pour une utilisation directe
export const {
  breakpoints,
  customBreakpoints,
  targetScreens,
  spacing,
  typography,
  touchTargets,
  shadows,
  animations,
  grids,
  modals,
} = RESPONSIVE_CONFIG;
