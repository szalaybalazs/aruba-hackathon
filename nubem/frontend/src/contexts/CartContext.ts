import { createContext } from "react";

export type CartItemType = {
  id: number;
  name: string;
  description: string;
  price: number;
  amount?: number;
  imgs: string;
};

type CartContext = {
  cartOpen: boolean;
  toggleCartDrawer: () => void;
  items: CartItemType[];
  removeItemFromCart: (itemToRemove: CartItemType) => void;
  addItemToCart: (itemToAdd: CartItemType) => void;
  countItemsInCart: () => number;
  calculateCartTotal: () => number;
};

export const CartContext = createContext<CartContext | null>(null);
