import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Container
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
        <Typography variant="h2" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Oops! The page you're looking for doesn't exist.
        </Typography>
        <Button
          sx={{
            backgroundColor: "#1d3557",
            borderRadius: 5,
            color: "#f1faee",
            ":hover": { backgroundColor: "#457b9d" },
          }}
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Go Home
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorPage;
