import { ProductDocumentTypes } from "../../products/types/Product";

export interface CartItemTypes extends ProductDocumentTypes {
  quantity: number;
}

export type CartTypes = CartItemTypes[];

export interface CartStateTypes {
  cart: CartTypes;
  incrementProduct: (payload: ProductDocumentTypes) => void;
  decrementProduct: (payload: ProductDocumentTypes) => void;
  resetCart: () => void;
}

export type CartAction =
  | { type: "INCREMENT_PRODUCT"; payload: ProductDocumentTypes }
  | { type: "DECREMENT_PRODUCT"; payload: ProductDocumentTypes }
  | { type: "RESET_CART" };

export interface CartActionsTypes {
  INCREMENT_PRODUCT: "INCREMENT_PRODUCT";
  DECREMENT_PRODUCT: "DECREMENT_PRODUCT";
  RESET_CART: "RESET_CART";
}
