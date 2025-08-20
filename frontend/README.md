README — Alikin Marketplace Frontend (React + Vite + Tailwind)
Aperçu
Frontend du projet Alikin Marketplace, une application e-commerce multi-acteurs (acheteurs, vendeurs, livreurs, admin) avec navigation fluide, pages responsives mobile-first et design system Tailwind.

Framework: React 18 + Vite
UI: Tailwind CSS, composants custom réutilisables
Routing: React Router v6
Icônes: Lucide React
Fonctionnalités
Core (Phase 1)
Landing page (CTA, hero, moyens de paiement, footer)
Authentification utilisateur (login/register, redirections)
Découverte produits (recherche, filtres, tri, grille)
Panier & Checkout (Multi-vendeurs)
Tableau de bord vendeur (KPIs, commandes, inventaire)
Suivi de commande (carte, timeline, communication)
Admin (dashboard, users, transactions, modération, settings)
Onboarding vendeur (multi-étapes: infos, documents, Mobile Money, validation)
Secondaires (Phase 2)
Gestion produits (CRUD localStorage, modale, upload placeholder)
Gestion livraisons (courses, livreurs, métriques, carte)
Centre de support (tickets, FAQ)
Pile technique
React 18, Vite 5
Tailwind CSS 3.4 + tailwindcss-animate + tailwind-merge
react-router-dom 6
lucide-react, class-variance-authority (variants boutons)
Option alias: vite-tsconfig-paths + jsconfig baseUrl
Structure du projet (frontend)
frontend/
  src/
    components/
      ui/                  # Composants UI réutilisables (.jsx)
      AppIcon.jsx
      AppImage.jsx
      ErrorBoundary.jsx
      ScrollToTop.jsx
    pages/
      landing-page/        # Landing + Footer + PaymentMethodsSection
      product-discovery/   # SearchHeader, FilterSidebar, ProductGrid, ProductCard...
      shopping-cart-checkout/
      vendor-dashboard/
      order-tracking/
      user-authentication/
      admin/
      vendor-onboarding/
      product-management/
      delivery-management/
      support-center/
      NotFound.jsx
    styles/
      tailwind.css         # Design tokens + utilitaires + reset UI
      index.css            # Reset global + fallback
    utils/
      cn.js                # classnames + tailwind-merge
    App.jsx
    Routes.jsx
    index.jsx
  index.html
  vite.config.mjs
  tailwind.config.js
  postcss.config.js
  package.json
  jsconfig.json
Conventions & Design System
Fichiers composants UI en .jsx, dans src/components/ui
Respect strict de Tailwind et des tokens déclarés dans tailwind.css/tailwind.config.js
Pas de nouveaux dossiers sans validation
Réutilisation des composants existants et styles utilitaires (shadow-warm*, transition-smooth, etc.)
Navigation (principales)
Routes configurées dans src/Routes.jsx (modifiables selon besoin)
Landing: /landing-page (peut devenir / si souhaité)
Découverte: /product-discovery
Panier/Checkout: /shopping-cart-checkout
Commandes: /order-tracking
Vendeur: /vendor-dashboard, /product-management
Onboarding vendeur: /vendor-onboarding
Livraisons (ops/driver): /delivery-management
Support: /support
Admin (nested): /admin, /admin/users, /admin/transactions, /admin/moderation, /admin/settings
Astuce: si vous souhaitez que le logo redirige vers la landing, adaptez l’action du logo dans src/components/ui/Header.jsx.

Mobile & Responsiveness
Header translucide, sticky/fixed (selon configuration), CTA full-width sur mobile
Landing optimisée mobile (image hero lazy, sections denses, footer centré)
Product Discovery mobile:
Grille single-column sur mobile
Images cadrées via aspect-square w-full et object-cover
Défilement vertical unique (pas de scroll interne)
Blocage global du scroll horizontal:
tailwind.css + index.css: html, body, #root { overflow-x: hidden; width: 100%; } et img, video { max-width: 100% }
Installation & Démarrage
# Prérequis: Node 18+ (ou 20)
cd frontend
npm install
npm start
# Ouvre http://localhost:5173
Scripts

npm start: dev server Vite
npm run build: build de production
npm run serve: prévisualisation du build
Build & Déploiement (Vercel)
Monorepo: repo GitHub racine contient backend/ (vide) et frontend/ (ce projet).

Dashboard Vercel
Root Directory: frontend/
Framework Preset: Vite
Install Command: npm ci (ou npm install)
Build Command: npm run build
Output Directory: selon vite.config.mjs
Par défaut de ce projet: "build" (voir vite.config.mjs → build.outDir)
Sinon, si vous supprimez l’override, Vite utilisera dist
Node: 18 ou 20
SPA rewrites (React Router): frontend/vercel.json (optionnel mais recommandé)
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
CLI:
cd frontend
vercel --prod --yes
Alias d’import (facultatif mais recommandé)
frontend/jsconfig.json:
{ "compilerOptions": { "baseUrl": "./src" } }
vite.config.mjs: plugin vite-tsconfig-paths() (déjà présent)
Exemple:
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';
Si erreur de résolution sur un environnement, utilisez les imports relatifs ../../components/....

Personnalisation & Extensions
Ajouter une page:
Créez src/pages/<ma-page>/index.jsx
Ajoutez la route dans src/Routes.jsx
Réutilisez Header, Button, Input, Select, etc.
Onboarding vendeur:
Multi-étapes (form state local + validations simples)
Mock storage: localStorage
Product Management:
CRUD localStorage + Modale + Upload placeholder
Delivery Management:
Courses, livreurs, métriques, carte (Google Maps embed)
Support:
Création de tickets + FAQ
Sécurité & Accès (à implémenter/étendre)
RBAC recommandé (buyers/sellers/admin/drivers) via guards de routes
Gestion JWT côté frontend (stockage sécurisé) et redirections post-login
Validation de schéma (Zod/Yup) pour formulaires avant intégration API
Qualité & Performances (roadmap)
Code splitting via React.lazy/Suspense
Toasters globaux (succès/erreur)
Tests (Jest + RTL), E2E (Cypress)
React Query pour le state serveur
Maintainers
Contribuez en respectant la structure et le design system existants.
N’ajoutez pas de nouveaux dossiers sans validation préalable.
Priorisez la réutilisation des composants UI src/components/ui.
Bon développement !