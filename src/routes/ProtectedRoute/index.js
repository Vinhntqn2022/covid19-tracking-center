import React from 'react';
import { Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { checkToken } from '../../ultils/checkToken';

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.AuthReducer.token);
  if (checkToken(token) === false) {
    return <Navigate to='/news' replace />;
  } else return children;
};
export { ProtectedRoute };
