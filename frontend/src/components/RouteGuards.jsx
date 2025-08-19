import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function getCurrentUser() {
  try {
    const raw = localStorage.getItem('alikin_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function isAuthenticated() {
  return !!localStorage.getItem('alikin_auth_token');
}

function userHasRole(user, allowedRoles = []) {
  if (!user) return false;
  const role = user.role || user.type; // compat: le projet utilise parfois "type"
  if (!allowedRoles?.length) return !!role;
  return allowedRoles.includes(role);
}

export function RequireAuth({ children }) {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/user-authentication" replace state={{ from: location.pathname + location.search }} />;
  }
  return children;
}

export function RequireRole({ roles = [], children }) {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/user-authentication" replace state={{ from: location.pathname + location.search }} />;
  }
  const user = getCurrentUser();
  if (!userHasRole(user, roles)) {
    return <Navigate to="/product-discovery" replace />;
  }
  return children;
}