import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ element: Component, ...rest }) => {
  const role = localStorage.getItem('role');

  if (role === 'ADMIN') {
    return <Component {...rest} />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AdminRoute;
