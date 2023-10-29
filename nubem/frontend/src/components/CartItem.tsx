import { Avatar, Box, Divider, IconButton, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import { CartItemType } from "../contexts/CartContext";
import AddIcon from "@mui/icons-material/Add";

type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (clickedItem: CartItemType) => void;
};

const CartItem = ({ item, addToCart, removeFromCart }: Props) => {
  return (
    <Box key={item.id}>
      <Box display="flex" sx={{ pt: 2, pb: 2 }} alignItems="start" justifyContent={"space-between"}>
        <Avatar src={item.imgs ?? "asd"} sx={{ width: 96, height: 96, mr: 2 }} />
        <Box display="flex" flexDirection={"column"} gap={1} alignItems={"center"}>
          <Typography variant="h6"> Cloud Stack</Typography>
          <Typography variant="body2">{item.name}</Typography>
        </Box>
        <Typography variant="body1">${item.price}</Typography>
      </Box>
      <Box display="flex" justifyContent="center" gap={2} alignItems="center">
        <IconButton aria-label="add item" onClick={() => removeFromCart(item)}>
          <RemoveIcon />
        </IconButton>
        <Typography variant="body1">{item.amount}</Typography>
        <IconButton aria-label="add item" onClick={() => addToCart(item)}>
          <AddIcon />
        </IconButton>
      </Box>
      <Divider variant="fullWidth" />
    </Box>
  );
};

export default CartItem;
