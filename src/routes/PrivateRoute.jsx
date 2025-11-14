import React, { use } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  if (loading) {
    return <div className="text-center py-20 text-xl text-primary">Checking authentication...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
