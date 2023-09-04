import { createContext, useReducer } from "react";
import { ProductAction, ProductStateTypes } from "@features/products/types/Product";
import { getProducts, productActions } from "@features/products/services/product.service";

const initialState: ProductStateTypes = {
  products: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  getProducts: () => null,
};

export const ProductContext = createContext(initialState);

const productReducer = (state: ProductStateTypes, action: ProductAction) => {
  switch (action.type) {
    case productActions.GET_PRODUCTS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case productActions.GET_PRODUCTS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        products: action.payload.data || [],
      };
    case productActions.GET_PRODUCTS_REJECTED:
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

export const ProductProvider = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const contextValue = {
    products: state.products,
    isLoading: state.isLoading,
    isSuccess: state.isSuccess,
    isError: state.isError,
    getProducts: () => getProducts(dispatch),
  };

  return <ProductContext.Provider value={contextValue}>{children}</ProductContext.Provider>;
};
