import { CircularProgress, Container, Grid } from "@mui/material";
import { useCart } from "../hooks/useCart";
import ShopItemCard from "../components/ShopItemCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { CartItemType } from "../contexts/CartContext";

const ShopPage = () => {
  const [shopItems, setShopItems] = useState<CartItemType[] | null>(null);
  const { addItemToCart } = useCart();

  const fetchShopItems = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5002/products");
      if (Array.isArray(response.data.data)) {
        //database schema fix needed
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setShopItems(response.data.data.map((item: any) => ({ ...item, id: item._id })));
      } else {
        console.error("API response is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching shop items:", error);
    }
  };

  useEffect(() => {
    fetchShopItems();
  }, []);

  if (!shopItems) return <CircularProgress />;

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {shopItems?.map((shopItem) => (
          <Grid item key={shopItem.id} xs={12} sm={6} md={4}>
            <ShopItemCard item={shopItem} addToCart={addItemToCart} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ShopPage;
