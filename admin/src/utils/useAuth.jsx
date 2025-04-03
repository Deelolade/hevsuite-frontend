import { useState, useEffect } from 'react';
import { base_url } from '../constants/axiosConfig';

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(base_url + '/api/admin/check-auth', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(data.isAuthenticated);
        setLoading(false);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

  return { isAuthenticated, loading };
}

export default useAuth;
