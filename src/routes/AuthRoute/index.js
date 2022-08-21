import React from 'react';
import { Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { checkToken } from '../../ultils/checkToken';

const AuthRoute = ({ children }) => {
  const token = useSelector((state) => state.AuthReducer.token);
  if (checkToken(token) === false) {
    return children;
  } else return <Navigate to='/' replace />;
};
export { AuthRoute };
