import { useContext } from "react";
import { CartContext } from "@providers/CartProvider";

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
