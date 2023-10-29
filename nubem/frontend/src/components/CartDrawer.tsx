import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Drawer, Container, Badge, IconButton, Button, Typography } from "@mui/material";
import CartItem from "./CartItem";
import { useCart } from "../hooks/useCart";

const CartDrawer = () => {
  const {
    cartOpen,
    toggleCartDrawer,
    items,
    removeItemFromCart,
    addItemToCart,
    countItemsInCart,
    calculateCartTotal,
  } = useCart();

  return (
    <>
      <Drawer anchor="right" open={cartOpen} onClose={toggleCartDrawer}>
        <Container sx={{ maxWidth: "500px", padding: "20px" }}>
          <Typography variant="h3" textAlign="center" sx={{ mb: 2 }}>
            Your Cart
          </Typography>
          {items.length === 0 ? (
            <Typography variant="body2" textAlign="center" sx={{ mb: 2 }}>
              Your Cart is Empty
            </Typography>
          ) : null}
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              addToCart={addItemToCart}
              removeFromCart={removeItemFromCart}
            />
          ))}
          <Typography variant="h6" textAlign="center" sx={{ mb: 2 }}>
            Total: ${calculateCartTotal().toFixed(2)}
          </Typography>
        </Container>
        <Container sx={{ maxWidth: "500px", padding: "20px" }}>
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
            Checkout
          </Button>
        </Container>
      </Drawer>
      <IconButton onClick={toggleCartDrawer} sx={{ p: 0 }}>
        <Badge badgeContent={countItemsInCart()} color="error">
          <ShoppingCartIcon sx={{ fontSize: 40, color: "#f1faee" }} />
        </Badge>
      </IconButton>
    </>
  );
};

export default CartDrawer;
