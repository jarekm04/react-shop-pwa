import { createContext, useContext, useReducer } from "react";
import { ProductStateTypes } from "@features/products/models/ProductState";


const initialState: ProductStateTypes = {
  products: [],
  cart: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

const ProductContext = createContext();

const productReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT_PRODUCT':
    case 'DECREMENT_PRODUCT':
      return {
        ...state,
        cart: modifyQtyByOne(state.cart, action.payload, action.type === 'INCREMENT_PRODUCT' ? 'INCREMENT' : 'DECREMENT'),
      };
    case 'RESET_CART':
      return {
        ...state,
        cart: [],
      };
    case 'GET_PRODUCTS_PENDING':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_PRODUCTS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        products: action.payload.data || [],
      };
    case 'GET_PRODUCTS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        products: [],
      };
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  return useContext(ProductContext);
};