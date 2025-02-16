import { AppBar, Toolbar, Button, TextField, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthUtils";
import PropTypes from "prop-types"; // Add prop-types for prop validation

export function Navbar({ onSearch }) {
  const { logout } = useAuth();
  const navigate = useNavigate();


  return (
    <AppBar position="static" color="inherit">
      <Container>
        <Toolbar>
          <TextField
            size="small"
            placeholder="Search products..."
            onChange={(e) => onSearch(e.target.value)}
            sx={{ flexGrow: 1, mr: 2 }}
          />
          <Button component={Link} to="/dashboard">
            Dashboard
          </Button>
          <Button component={Link} to="/create-product">
            New Product
          </Button>
          <Button
            color="error"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

Navbar.propTypes = {
  onSearch: PropTypes.node.isRequired,
};