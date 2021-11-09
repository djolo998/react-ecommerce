import { createSlice } from "@reduxjs/toolkit";

import {
  createResourceSelector,
  createCrudAsyncThunkFunctions,
  upsetNormalizedSlice,
} from "./util";

import { normalizeOrders, denormalizeOrders } from "../../../normalizr";

import { ordersAdapter } from "./adapter";

const upsetNormalizedOrders = upsetNormalizedSlice("orders");

export const { fetchMultypleResources: fetchOrders } =
  createCrudAsyncThunkFunctions({
    name: "order",
    url: "orders",
    multypleResourceNormalized: normalizeOrders,
  });

const ordersSlice = createSlice({
  name: "orders",
  initialState: ordersAdapter.getInitialState({
    update: { errors: null },
    create: { errors: null },
    queryString: {},
    isLoading: false,
  }),
  reducers: {},
  extraReducers: {
    [fetchOrders.fulfilled]: upsetNormalizedOrders,
  },
});

export const selectOrders = createResourceSelector(
  "orders",
  ["orders", "status", "users"],
  denormalizeOrders
);

export default ordersSlice.reducer;
