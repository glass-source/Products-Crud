import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Typography, Stack, Container } from "@mui/material";
import { useAuth } from "../context/AuthUtils";

export function RegisterPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await register(name, password);
      navigate("/login");
    } catch (err) {
        console.log(err);
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ mt: 4 }}>
          <Typography variant="h4" align="center">
            Register
          </Typography>

          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}

          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="contained" size="large">
            Register
          </Button>

          <Typography align="center">
            Already have an account? <Link to="/login">Login here</Link>
          </Typography>
        </Stack>
      </form>
    </Container>
  );
}