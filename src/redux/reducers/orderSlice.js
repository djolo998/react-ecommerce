import {
  createSelector,
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import axios from "../../axios";

export const fetchOrders = createAsyncThunk("ui/fetchOrders", async () => {
  return await axios(`/order`);
});

const initialState = {
  isLoading: false,
  items: [],
};

const startLoading = (state) => {
  state.isLoading = true;
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchOrders.pending]: startLoading,
    [fetchOrders.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
  },
});
export default orderSlice.reducer;
