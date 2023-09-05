import { ProductDocumentTypes } from "@features/products/types/Product";
import { db } from "../../../db";
import { CartAction, CartActionsTypes, CartItemTypes } from "../types/Cart";

export const cartActions: CartActionsTypes = {
  INCREMENT_PRODUCT: "INCREMENT_PRODUCT",
  DECREMENT_PRODUCT: "DECREMENT_PRODUCT",
  RESET_CART: "RESET_CART",
};

export const incrementProduct = (payload: ProductDocumentTypes, dispatch: React.Dispatch<CartAction>) => {
  dispatch({ type: cartActions.INCREMENT_PRODUCT, payload });
};

export const decrementProduct = (payload: ProductDocumentTypes, dispatch: React.Dispatch<CartAction>) => {
  dispatch({ type: cartActions.DECREMENT_PRODUCT, payload });
};

export const resetCart = (dispatch: React.Dispatch<CartAction>) => {
  dispatch({ type: cartActions.RESET_CART });
};

export const addProductToIDB = async (payload: CartItemTypes) => {
  try {
    await db.cart.add(payload);
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const updateProductInIDB = async (key: string, payload: CartItemTypes) => {
  try {
    await db.cart.update(key, payload);
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const deleteProductFromIDB = async (key: string) => {
  try {
    await db.cart.delete(key);
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const clearCartInIDB = async () => {
  try {
    await db.cart.clear();
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getAllProductsFromIDB = async () => {
  try {
    const products = await db.cart.toArray();
    return products ? products : [];
  } catch (error) {
    console.log("Error: ", error);
    return [];
  }
};
