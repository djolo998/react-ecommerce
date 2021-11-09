import {
  createSelector,
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import axios from "../../axios";

export const fetchBrands = createAsyncThunk(
  "ui/fetchBrands",
  async (qs = "") => {
    return await axios(`/brands`);
  }
);

const initialState = {
  isLoading: false,
  items: {},
};

const startLoading = (state) => {
  state.isLoading = true;
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBrands.pending]: startLoading,
    [fetchBrands.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
  },
});
export default brandSlice.reducer;
