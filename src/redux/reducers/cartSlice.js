import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";
import { login, register } from "./authSlice";

export const fetchAddToCart = createAsyncThunk(
  "cart/addToCart",
  async (params) => {
    return await axios.post(`/cart`, { ...params });
  }
);

export const fetchUpdateCart = createAsyncThunk(
  "cart/updateCart",
  async (params) => {
    return await axios({
      method: "put",
      url: "/cart",
      data: { ...params },
    });
  }
);

export const fetchDeleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (params) => {
    return await axios.delete(`/cart/${params}`, { ...params });
  }
);

export const fetchCreateOrder = createAsyncThunk(
  "cart/fetchCreateOrder",
  async () => {
    return await axios.post(`/order`);
  }
);

const initialState = {
  isLoading: false,
  items: [],
  checkout: null,
};

const startLoading = (state) => {
  state.isLoading = true;
};

const addItemsAndCheckout = (state, action) => {
  const { cart, checkout } = action.payload;
  state.isLoading = false;
  state.items = cart;
  state.checkout = checkout;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {},
    [fetchUpdateCart.fulfilled]: addItemsAndCheckout,
    [fetchDeleteCartItem.fulfilled]: addItemsAndCheckout,
    [fetchCreateOrder.fulfilled]: (state, action) => {
      state.items = [];
    },
    [fetchAddToCart.fulfilled]: addItemsAndCheckout,
    [register.fulfilled]: addItemsAndCheckout,
    [login.fulfilled]: addItemsAndCheckout,
  },
});

export default cartSlice.reducer;
