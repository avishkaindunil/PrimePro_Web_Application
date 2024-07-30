// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const AdminRoute = ({ element: Component, ...rest }) => {
//   const role = localStorage.getItem('role');

//   if (role === 'ADMIN') {
//     return <Component {...rest} />;
//   } else {
//     return <Navigate to="/login" />;
//   }
// };

// export default AdminRoute;


// AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const role = localStorage.getItem('role');

  if (role === 'ADMIN') {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AdminRoute;
