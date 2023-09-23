import axios from "axios";
import { ProductAction, ProductActionsTypes, ProductDocumentTypes } from "../types/Product";

export const productActions: ProductActionsTypes = {
  GET_PRODUCTS_PENDING: "GET_PRODUCTS_PENDING",
  GET_PRODUCTS_FULFILLED: "GET_PRODUCTS_FULFILLED",
  GET_PRODUCTS_REJECTED: "GET_PRODUCTS_REJECTED",
};

export const getProducts = async (dispatch: (value: ProductAction) => void) => {
  dispatch({ type: productActions.GET_PRODUCTS_PENDING });

  try {
    const response = await axios.get<ProductDocumentTypes[]>(`${import.meta.env.VITE_API_HOST}/product`);
    dispatch({ type: productActions.GET_PRODUCTS_FULFILLED, payload: response });
  } catch (error) {
    console.log("Error: ", error);
    dispatch({ type: productActions.GET_PRODUCTS_REJECTED });
  }
};
