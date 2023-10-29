import { PropsWithChildren, useState } from "react";
import { CartContext, CartItemType } from "../contexts/CartContext";

export const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<CartItemType[]>([]);

  const countItemsInCart = () => items.reduce((prev, item) => prev + item.amount, 0);

  const calculateCartTotal = () => items.reduce((prev, item) => prev + item.amount * item.price, 0);

  const addItemToCart = (itemToAdd: CartItemType) => {
    setItems((prev) => {
      const cartItem = prev.find((item) => item.id === itemToAdd.id);
      if (cartItem) {
        return prev.map((item) =>
          item.id === itemToAdd.id ? { ...item, amount: item.amount + 1 } : item
        );
      }
      return [...prev, { ...itemToAdd, amount: 1 }];
    });
  };

  const removeItemFromCart = (itemToRemove: CartItemType) => {
    setItems((prev) => {
      const cartItem = prev.find((item) => item.id === itemToRemove.id);
      if (cartItem && cartItem.amount > 1) {
        return prev.map((item) =>
          item.id === itemToRemove.id ? { ...item, amount: item.amount - 1 } : item
        );
      }
      if (cartItem && cartItem.amount === 1) {
        return prev.filter((item) => item.id !== itemToRemove.id);
      }
      return prev;
    });
  };

  const toggleCartDrawer = () => setCartOpen((prev) => !prev);

  return (
    <CartContext.Provider
      value={{
        cartOpen,
        toggleCartDrawer,
        items,
        removeItemFromCart,
        addItemToCart,
        countItemsInCart,
        calculateCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
