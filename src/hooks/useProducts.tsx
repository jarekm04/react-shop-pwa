import { useContext } from "react";
import { ProductContext } from "@providers/ProductsProvider";

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
