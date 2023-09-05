import { StatusStateTypes } from "@types/index";

export interface ProductTypes {
  name: string;
  price: number;
  description: string;
}

export interface ProductDocumentTypes extends ProductTypes {
  _id: string;
  __v: number;
  quantity: number;
}

export interface ProductStateTypes extends StatusStateTypes {
  products: ProductDocumentTypes[];
  getProducts: () => unknown;
}

export type ProductAction =
  | { type: "GET_PRODUCTS_PENDING" }
  | { type: "GET_PRODUCTS_FULFILLED"; payload: { data: ProductDocumentTypes[] } }
  | { type: "GET_PRODUCTS_REJECTED" };

export interface ProductActionsTypes {
  GET_PRODUCTS_PENDING: "GET_PRODUCTS_PENDING";
  GET_PRODUCTS_FULFILLED: "GET_PRODUCTS_FULFILLED";
  GET_PRODUCTS_REJECTED: "GET_PRODUCTS_REJECTED";
}
