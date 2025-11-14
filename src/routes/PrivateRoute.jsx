import React, { use } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Navigate } from 'react-router';
import Spinner from '../utils/Spinner';

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  if (loading) {
    return (
      <div className='mt-20'>
        <Spinner></Spinner>;
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
