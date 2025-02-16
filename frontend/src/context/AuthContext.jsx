import { createContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = async (name, password) => {
    try {
      // Login to get JWT
      const loginResponse = await axios.post(
        "https://localhost:443/auth/login",
        { username: name, password: password },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const { token } = loginResponse.data;

      // Verify token with /users/me
      const meResponse = await axios.get("https://localhost:443/users/me", {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "auth-token": token,
        },
      });

      // Store token only after verification
      localStorage.setItem("token", token);
      setToken(token);

      return meResponse.data;
    } catch (error) {
      localStorage.removeItem("token");
      setToken(null);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const register = async (name, password) => {
    try {
      await axios.post('https://localhost:443/auth/register', {
        username: name,
        password: password
      });
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);

  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;