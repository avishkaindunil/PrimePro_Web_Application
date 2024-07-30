import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserService from '../service/UserService';

const PrivateRoute = ({ userType, children }) => {
  if (!UserService.isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (UserService.isAuthenticated() && UserService.isAdmin() && userType === 'ADMIN') {
    return children ? children : <Outlet />;
  }

  if (UserService.isAuthenticated() && !UserService.isAdmin() && userType === 'EMPLOYEE') {
    return children ? children : <Outlet />;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
