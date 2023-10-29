import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
  Alert,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { AxiosError } from "axios";

const RegisterPage = () => {
  const { register, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibilityToggle = () => {
    setShowPassword((show) => !show);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = data.get("firstName") as string;
    const lastName = data.get("lastName") as string;
    const username = data.get("username") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const role = "customer";

    if (!firstName || !lastName || !email || !password || !username) {
      setError("Please fill out all required fields.");
      return;
    }
    setIsLoading(true);
    try {
      await register(email, firstName, lastName, username, password, role);
      await login(email, password);
      navigate(location.state?.from ?? "/", { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.msg ?? error.message);
      } else {
        setError("Registration in failed. Please try again.");
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card elevation={5} sx={{ borderRadius: 3, overflow: "hidden" }}>
          <CardContent>
            <Typography fontWeight="bold" variant="h4" sx={{ mb: 2 }}></Typography>
            <Typography variant="body1">Buy & sell products at unbeatable prices.</Typography>
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                variant="outlined"
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
              </Grid>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                variant="outlined"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handlePasswordVisibilityToggle}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 2,
                  borderRadius: "30px",
                  backgroundColor: "#1d3557",
                  color: "#f1faee",
                  ":hover": { backgroundColor: "#457b9d" },
                }}
              >
                {isLoading ? <CircularProgress size={25} color="inherit" /> : "Register"}
              </Button>
            </Box>
          </CardContent>
        </Card>
        <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            state={{ from: location.state?.from ?? "/" }}
            color="primary.main"
            style={{ textDecoration: "none" }}
          >
            Sign in here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;
