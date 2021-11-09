import {
  createSelector,
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import axios from "../../axios";

export const fetchCategories = createAsyncThunk(
  "ui/fetchCategories",
  async (qs = "") => {
    return await axios(`/categories`);
  }
);

const initialState = {
  isLoading: false,
  items: {},
};

const startLoading = (state) => {
  state.isLoading = true;
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCategories.pending]: startLoading,
    [fetchCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
  },
});
export default categorySlice.reducer;
