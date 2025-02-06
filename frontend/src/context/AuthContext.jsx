import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token && isValidToken(token)) {
      setAuthToken(token);
    }
  }, []);

  const isValidToken = (token) => {
    try {
        const decoded = jwtDecode(token);
        return decoded.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  };

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, isValidToken }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

export const useAuth = () => useContext(AuthContext);