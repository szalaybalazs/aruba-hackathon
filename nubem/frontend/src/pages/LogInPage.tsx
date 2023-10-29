import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
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
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AxiosError } from "axios";

const SignInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibilityToggle = () => {
    setShowPassword((show) => !show);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    if (!email || !password) {
      setError("Please fill out all required fields.");
      return;
    }

    setIsLoading(true);
    try {
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card elevation={5} sx={{ borderRadius: 3, overflow: "hidden" }}>
          <CardContent>
            <Typography fontWeight="bold" variant="h4" sx={{ mb: 2 }}>
              Sign in
            </Typography>
            <Typography variant="body1">The ultimate buy & sell experience awaits</Typography>
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
                autoFocus
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
                {isLoading ? <CircularProgress size={25} color="inherit" /> : "Sign In"}
              </Button>
            </Box>
          </CardContent>
        </Card>
        <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
          Don't have an account?{" "}
          <Link
            to="/register"
            state={{ from: location.state?.from ?? "/" }}
            color="primary.main"
            style={{ textDecoration: "none" }}
          >
            Register here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignInPage;
