// import axios from "axios";
// import { ProductDocumentTypes } from "../models/Product";

// const getProducts = async () => {
//   const response = await axios.get<ProductDocumentTypes[]>(`${import.meta.env.VITE_API_HOST}/product`);
//   return response;
// };

// const productService = {
//   getProducts,
// };

// export default productService;

import { useProductContext } from "../../../providers/ProductsProvider";

export const incrementProduct = (product) => {
  const { dispatch } = useProductContext();
  dispatch({ type: "INCREMENT_PRODUCT", payload: product });
};

export const decrementProduct = (product) => {
  const { dispatch } = useProductContext();
  dispatch({ type: "DECREMENT_PRODUCT", payload: product });
};

export const resetCart = () => {
  const { dispatch } = useProductContext();
  dispatch({ type: "RESET_CART" });
};

export const fetchProducts = async () => {
  const { dispatch } = useProductContext();

  dispatch({ type: "GET_PRODUCTS_PENDING" });

  try {
    const response = await productService.getProducts();
    dispatch({ type: "GET_PRODUCTS_FULFILLED", payload: response });
  } catch (error) {
    console.log("Błąd: ", error);
    dispatch({ type: "GET_PRODUCTS_REJECTED" });
  }
};
