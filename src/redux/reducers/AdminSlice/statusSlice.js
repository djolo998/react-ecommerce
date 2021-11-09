import { createSlice } from "@reduxjs/toolkit";

import { upsetNormalizedSlice } from "./util";

import { statusAdapter } from "./adapter";

import { fetchOrders } from "./ordersSlice";

const upsetStautsFromorders = upsetNormalizedSlice("status");

const statusSlice = createSlice({
  name: "status",
  initialState: statusAdapter.getInitialState({
    update: { errors: null },
    create: { errors: null },
    queryString: {},
    isLoading: false,
  }),
  reducers: {},
  extraReducers: {
    [fetchOrders.fulfilled]: upsetStautsFromorders,
  },
});

export default statusSlice.reducer;
