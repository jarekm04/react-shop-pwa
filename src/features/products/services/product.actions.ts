import { ProductActionsTypes } from "../types/Product";

export const productActions: ProductActionsTypes = {
  GET_PRODUCTS_PENDING: "GET_PRODUCTS_PENDING",
  GET_PRODUCTS_FULFILLED: "GET_PRODUCTS_FULFILLED",
  GET_PRODUCTS_REJECTED: "GET_PRODUCTS_REJECTED",
};
