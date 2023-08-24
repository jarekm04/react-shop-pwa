import { createContext, useContext, useReducer } from "react";
import { ProductAction, ProductDocumentTypes, ProductStateTypes } from "@features/products/types/Product";

const initialState: ProductStateTypes = {
  products: [],
  cart: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

const actions = {
  INCREMENT_PRODUCT: "INCREMENT_PRODUCT",
  DECREMENT_PRODUCT: "DECREMENT_PRODUCT",
  RESET_CART: "RESET_CART",
  GET_PRODUCTS_PENDING: "GET_PRODUCTS_PENDING",
  GET_PRODUCTS_FULFILLED: "GET_PRODUCTS_FULFILLED",
  GET_PRODUCTS_REJECTED: "GET_PRODUCTS_REJECTED",
};

const ProductContext = createContext(initialState);

const productReducer = (state: ProductStateTypes, action: ProductAction) => {
  switch (action.type) {
    case actions.INCREMENT_PRODUCT:
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id === action.payload._id) {
            return { ...product, quantity: product.quantity + 1 };
          }
          return product;
        }),
      };
    case actions.DECREMENT_PRODUCT:
      return {
        ...state,
        cart: state.cart
          .map((product) => {
            if (product._id === action.payload._id && product.quantity > 1) {
              return { ...product, quantity: product.quantity - 1 };
            }
            return product;
          })
          .filter((product) => product.quantity > 0),
      };
    case actions.RESET_CART:
      return {
        ...state,
        cart: [],
      };
    case actions.GET_PRODUCTS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case actions.GET_PRODUCTS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        products: action.payload.data || [],
      };
    case actions.GET_PRODUCTS_REJECTED:
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
    cart: state.cart,
    // products: state.products,
    isLoading: state.isLoading,
    isSuccess: state.isSuccess,
    isError: state.isError,
    incrementProduct: (payload: ProductDocumentTypes) => {
      dispatch({ type: "INCREMENT_PRODUCT", payload });
    },
    decrementProduct: (payload: ProductDocumentTypes) => {
      dispatch({ type: "DECREMENT_PRODUCT", payload });
    },
    resetCart: () => {
      dispatch({ type: "RESET_CART" });
    },
    getProductsPending: () => {
      dispatch({ type: "GET_PRODUCTS_PENDING" });
    },
    getProductsFulfilled: (data: ProductDocumentTypes[]) => {
      dispatch({ type: "GET_PRODUCTS_FULFILLED", payload: { data } });
    },
    getProductsRejected: () => {
      dispatch({ type: "GET_PRODUCTS_REJECTED" });
    },
  };

  return <ProductContext.Provider value={contextValue}>{children}</ProductContext.Provider>;
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  console.log(context);
  if (context === undefined) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
