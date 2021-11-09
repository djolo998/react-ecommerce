import {
  createSelector,
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import axios from "../../axios";

export const fetchProducts = createAsyncThunk(
  "ui/fetchProducts",
  async (qs = "") => {
    return await axios(`/products${qs}`);
  }
);

export const fetchProduct = createAsyncThunk(
  "ui/fetchProduct",
  async (productId) => {
    return await axios(`/products/${productId}`);
  }
);

const initialState = {
  isLoading: false,
  items: {},
  products: {},
  product: {},
};

const startLoading = (state) => {
  state.isLoading = true;
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: startLoading,
    [fetchProducts.fulfilled]: (state, action) => {
      const { data, ...rest } = action.payload;
      const { arg = "/" } = action.meta;
      state.isLoading = false;
      state.items[arg] = { ...rest, products: data };
      state.items[arg].productMinPrice = Number(action.payload.productMinPrice);
      state.items[arg].productMaxPrice = Number(action.payload.productMaxPrice);
      state.items[arg].showSlider = true;
    },
    [fetchProduct.fulfilled]: (state, action) => {
      const { product_id } = action.payload.data;
      state.product[product_id] = action.payload.data;
    },
  },
});
export default productsSlice.reducer;

export const getProducts = createSelector(
  [(state) => state.products, (state, products) => products],
  (products, qs) => products.items[qs] || defaultProductState
);

export const getProduct = createSelector(
  [(state) => state.products, (state, products) => products],
  (products, selectedProduct) => products.product[selectedProduct] || null
);

const defaultProductState = {
  current_page: 1,
  pageSize: 0,
  count: 0,
  hasNext: false,
  last_page: 0,
  products: [],
  total: null,
  productMinPrice: 0,
  productMaxPrice: 0,
  showSlider: false,
};
