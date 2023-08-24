import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import productService from "../services/product.service";
import { CartTypes } from "../types/Cart";
import { ProductDocumentTypes } from "../types/Product";
import { ModificationTypes } from "../types/ModificationType";

export interface ProductStateTypes extends StatusStateTypes {
  products: ProductDocumentTypes[];
  cart: CartTypes;
}

const initialState: ProductStateTypes = {
  products: [],
  cart: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

const modifyQtyByOne = (
  cart: CartTypes,
  selectedProduct: ProductDocumentTypes,
  modificationType: ModificationTypes,
) => {
  const previousCart = [...cart];

  const productInCart = previousCart.find(
    (product) => product._id === selectedProduct._id
  );

  let newCart = [];

  if (!productInCart) {
    previousCart.push({ ...selectedProduct, quantity: 1 });
    newCart = previousCart;
  } else {
    const filteredCart = previousCart.filter(
      (p) => p._id !== productInCart._id
    );

    const modification = modificationType === 'INCREMENT' ? 1 : -1;

    productInCart.quantity = productInCart.quantity + modification;

    if (productInCart.quantity === 0) {
      newCart = [...filteredCart];
    } else {
      newCart = [...filteredCart, productInCart];
    }
  }
  return newCart;
};

export const getProducts = createAsyncThunk('product', async () => {
  try {
    return await productService.getProducts();
  } catch (error) {
    console.log('Error: ', error);
  }
});

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    incrementProduct: (state, action: PayloadAction<ProductDocumentTypes>) => {
      const modifiedCart = modifyQtyByOne(
        state.cart,
        action.payload,
        'INCREMENT'
      );
      state.cart = modifiedCart;
    },
    decrementProduct: (state, action: PayloadAction<ProductDocumentTypes>) => {
      const modifiedCart = modifyQtyByOne(
        state.cart,
        action.payload,
        'DECREMENT'
      );
      state.cart = modifiedCart;
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

export const { incrementProduct, decrementProduct, resetCart } =
  productSlice.actions;
