import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../utils/useAuth';

const Layout = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/admin');
  }

  if (loading) {
    return <div></div>;
  } else if (!isAuthenticated) {
    return (
      <div>
        <Outlet />
      </div>
    );
  }
};

export default Layout;
