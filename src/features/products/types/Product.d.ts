import { StatusStateTypes } from "@types/index";
import { CartTypes } from "./Cart";

export interface ProductTypes {
  name: string;
  price: number;
  description: string;
}

export interface ProductDocumentTypes extends ProductTypes {
  _id: string;
  __v: number;
}

export type ProductsArrayTypes = ProductDocumentTypes[];

export interface ProductStateTypes extends StatusStateTypes {
  products: ProductDocumentTypes[];
  cart: CartTypes;
}

export type ProductAction =
  | { type: "INCREMENT_PRODUCT"; payload: ProductDocumentTypes }
  | { type: "DECREMENT_PRODUCT"; payload: ProductDocumentTypes }
  | { type: "RESET_CART" }
  | { type: "GET_PRODUCTS_PENDING" }
  | { type: "GET_PRODUCTS_FULFILLED"; payload: { data: ProductDocumentTypes[] } }
  | { type: "GET_PRODUCTS_REJECTED" };
