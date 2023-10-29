import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const LoadingPage = () => {
  return (
    <Container
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Box sx={{ marginBottom: 2 }}>
        <CircularProgress sx={{ color: "#1d3557" }} />
      </Box>
      <Typography variant="h5" gutterBottom>
        Loading...
      </Typography>
    </Container>
  );
};

export default LoadingPage;
