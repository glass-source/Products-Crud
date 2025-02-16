import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types"; // Add prop-types for prop validation

export function ProtectedRoute({ children }) {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};