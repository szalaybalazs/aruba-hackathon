import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CartItemType } from "../contexts/CartContext";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Box } from "@mui/material";

type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
};

const ShopItemCard = ({ item, addToCart }: Props) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 5,
      }}
    >
      <CardMedia
        component="div"
        sx={{
          pt: "56.25%",
        }}
        image={item.imgs}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2" textAlign="center">
          {item.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="h2" textAlign="center">
          Type: Cloud Stack
        </Typography>
        <Typography variant="body2">{item.description}</Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h6">${item.price}</Typography>
          <Button
            sx={{
              backgroundColor: "#1d3557",
              borderRadius: 5,
              color: "#f1faee",
              ":hover": { backgroundColor: "#457b9d" },
            }}
            component="label"
            variant="contained"
            onClick={() => addToCart(item)}
            startIcon={<AddShoppingCartIcon />}
          >
            Add to Cart
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ShopItemCard;
