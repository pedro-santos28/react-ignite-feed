import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type ProtectedRouteProps = {
  authentication: boolean;
  route?: string;
}

const ProtectedRoute = ({ authentication, route = '/login' } : ProtectedRouteProps) => {
  if (!authentication) {
    return <Navigate to={route} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
