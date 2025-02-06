import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { authToken, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">
        Home
      </Link>
      <div className="auth-section">
        {authToken ? (
          <button onClick={logout} className="nav-button">
            Logout
          </button>
        ) : (
          location.pathname !== '/login' && (
            <Link to="/login" className="nav-link">
              Login
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;