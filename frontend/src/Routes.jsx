import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LandingPage from './pages/landing-page';
import ShoppingCartCheckout from './pages/shopping-cart-checkout';
import ProductDiscovery from './pages/product-discovery';
import VendorDashboard from './pages/vendor-dashboard';
import OrderTracking from './pages/order-tracking';
import UserAuthentication from './pages/user-authentication';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminTransactions from './pages/admin/Transactions';
import AdminModeration from './pages/admin/Moderation';
import AdminSettings from './pages/admin/Settings';
import VendorOnboarding from './pages/vendor-onboarding';
import ProductManagement from './pages/product-management';
import DeliveryManagement from './pages/delivery-management';
import SupportCenter from './pages/support-center';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<OrderTracking />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/shopping-cart-checkout" element={<ShoppingCartCheckout />} />
        <Route path="/product-discovery" element={<ProductDiscovery />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        <Route path="/order-tracking" element={<OrderTracking />} />
        <Route path="/user-authentication" element={<UserAuthentication />} />
        {/* Admin nested routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="transactions" element={<AdminTransactions />} />
          <Route path="moderation" element={<AdminModeration />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        {/* Secondary features */}
        <Route path="/product-management" element={<ProductManagement />} />
        <Route path="/delivery-management" element={<DeliveryManagement />} />
        <Route path="/support" element={<SupportCenter />} />
        {/* Vendor onboarding */}
        <Route path="/vendor-onboarding" element={<VendorOnboarding />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;