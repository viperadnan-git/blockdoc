import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useLogin = (redirect = false) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token and token expiration are present in local storage
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    if (!token || !tokenExpiration) {
      // Redirect to the login page
      navigate('/login');
      return;
    }

    // Check if the token has expired
    const expirationDate = new Date(tokenExpiration);
    if (expirationDate <= new Date()) {
      // Redirect to the login page
      navigate('/login');
      return;
    }
  }, [navigate]);

  return true; // Default to true if the check hasn't completed yet
};

export default useLogin;
