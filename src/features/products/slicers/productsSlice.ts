import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "../services/product.service";
import { CartTypes } from "../models/Cart";
import { ProductDocumentTypes } from "../models/Product";
import { ProductStateTypes } from "../models/ProductState";
import { ModificationTypes } from "../models/ModificationType";
import IDBManager from "@hooks/useIDB";

const initialState: ProductStateTypes = {
  products: [],
  cart: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

const CART_IDB = new IDBManager("cart", 1, {
  cart: "++id, _id, name, price, description, quantity", // Dodaj definicję dla koszyka
});
CART_IDB.openDatabase();

export const getProducts = createAsyncThunk("product", async () => {
  try {
    return await productService.getProducts();
  } catch (error) {
    console.error(error);
  }
});

export const addToCartIDB = async (product: ProductDocumentTypes) => {
  try {
    return await CART_IDB.addRecord("cart", { ...product });
  } catch (error) {
    console.log(error);
  }
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    incrementProduct: (state, action: PayloadAction<ProductDocumentTypes>) => {
      const selectedProduct = action.payload;
      const productInCart = state.cart.find((product) => product._id === selectedProduct._id);

      if (productInCart) {
        productInCart.quantity += 1;
      } else {
        state.cart.push({ ...selectedProduct, quantity: 1 });
      }
    },
    decrementProduct: (state, action: PayloadAction<ProductDocumentTypes>) => {
      const selectedProduct = action.payload;
      const productInCart = state.cart.find((product) => product._id === selectedProduct._id);

      if (productInCart) {
        if (productInCart.quantity > 1) {
          productInCart.quantity -= 1;
        } else {
          return state.cart.filter((product) => product._id !== selectedProduct._id);
        }
      }
    },
    resetCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload?.data || [];
      })
      .addCase(getProducts.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.products = [];
      });
  },
});

export const { incrementProduct, decrementProduct, resetCart } = productSlice.actions;
