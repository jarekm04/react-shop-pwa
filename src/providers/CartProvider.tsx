import { createContext, useReducer } from "react";
import { ProductDocumentTypes } from "@features/products/types/Product";
import {
  addProductToIDB,
  cartActions,
  clearCartInIDB,
  decrementProduct,
  deleteProductFromIDB,
  getAllProductsFromIDB,
  incrementProduct,
  resetCart,
  updateProductInIDB,
} from "@features/cart/services/cart.service";
import { CartAction, CartStateTypes, CartTypes } from "@features/cart/types/Cart";

const storedCart: CartTypes = await getAllProductsFromIDB();

const initialState: CartStateTypes = {
  cart: storedCart,
  incrementProduct: () => null,
  decrementProduct: () => null,
  resetCart: () => null,
};

export const CartContext = createContext(initialState);

const cartReducer = (state: CartStateTypes, action: CartAction) => {
  switch (action.type) {
    case cartActions.INCREMENT_PRODUCT: {
      const updatedCart = [...state.cart];
      const existingProductIndex = updatedCart.findIndex((product) => product._id === action.payload._id);

      if (existingProductIndex !== -1) {
        const id = updatedCart[existingProductIndex]._id;

        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1,
        };

        updateProductInIDB(id, updatedCart[existingProductIndex]);
      } else {
        updatedCart.push({ ...action.payload, quantity: 1 });
        addProductToIDB({ ...action.payload, quantity: 1 });
      }

      return {
        ...state,
        cart: updatedCart,
      };
    }
    case cartActions.DECREMENT_PRODUCT: {
      const updatedCart = [...state.cart];
      const existingProductIndex = updatedCart.findIndex((product) => product._id === action.payload._id);

      if (existingProductIndex !== -1) {
        const id = updatedCart[existingProductIndex]._id;

        if (updatedCart[existingProductIndex].quantity > 1) {
          updatedCart[existingProductIndex] = {
            ...updatedCart[existingProductIndex],
            quantity: updatedCart[existingProductIndex].quantity - 1,
          };

          updateProductInIDB(id, updatedCart[existingProductIndex]);
        } else {
          updatedCart.splice(existingProductIndex, 1);
          deleteProductFromIDB(id);
        }
      }

      return {
        ...state,
        cart: updatedCart,
      };
    }
    case cartActions.RESET_CART:
      clearCartInIDB();

      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const contextValue = {
    cart: state.cart,
    incrementProduct: (payload: ProductDocumentTypes) => incrementProduct(payload, dispatch),
    decrementProduct: (payload: ProductDocumentTypes) => decrementProduct(payload, dispatch),
    resetCart: () => resetCart(dispatch),
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};
