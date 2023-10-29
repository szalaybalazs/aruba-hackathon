import { Typography, Container } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CodeIcon from "@mui/icons-material/Code";

const Footer = () => {
  return (
    <footer>
      <Container maxWidth="lg">
        <Typography
          textTransform="uppercase"
          align="center"
          fontSize={15}
          sx={{ display: "inlineBlock" }}
        >
          <div>
            <CodeIcon fontSize="inherit" /> with{" "}
            <FavoriteBorderIcon fontSize="inherit" sx={{ color: "#e63946" }} /> by{" "}
            <b>Nubem ante Solis</b>
          </div>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
